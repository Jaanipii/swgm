const BASE_URL = 'https://starwars.fandom.com/api.php';
import { disambiguationMap } from './disambiguationMap';

// In-memory cache to avoid re-fetching identical queries
const wikiCache = new Map();

/**
 * Searches Wookieepedia for the given query and returns the summary extract and thumbnail image.
 * Uses a two-step process: Search -> Get Details of top result.
 * Results are cached in-memory for the lifetime of the session.
 */
export async function fetchWikiData(queryText) {
  if (!queryText || queryText === "Unknown Spaces") return null;
  
  // Check cache first
  if (wikiCache.has(queryText)) {
    return wikiCache.get(queryText);
  }
  
  try {
    // Clean up the query for better search results, particularly for TV episodes.
    // E.g., "The Clone Wars - S1E1: Ambush" -> "The Clone Wars Ambush"
    const cleanedQuery = queryText.replace(/- S\d+E\d+:/g, '').trim();
    
    // 1. Try an exact page match first (crucial for exact matches like Trade Routes)
    let bestMatchTitle = disambiguationMap[cleanedQuery] || cleanedQuery;
    let detailsData = null;

    const exactUrl = `${BASE_URL}?action=parse&page=${encodeURIComponent(bestMatchTitle)}&prop=text|images|categories&redirects=1&format=json&origin=*`;
    const exactRes = await fetch(exactUrl);
    const exactJson = await exactRes.json();

    if (exactJson.parse && exactJson.parse.text) {
      // Hard check: If the page is just a disambiguation menu, do NOT treat it as details data!
      const isDisambig = exactJson.parse.categories?.some(c => c['*'] === 'Disambiguation_pages');
      if (!isDisambig) {
        detailsData = exactJson;
      }
    } 
    
    if (!detailsData) {
      // 2. Fallback to searching for the best matching page title if exact fails
      const searchUrl = `${BASE_URL}?action=query&list=search&srsearch=${encodeURIComponent(cleanedQuery)}&utf8=&format=json&origin=*&srlimit=1`;
      const searchRes = await fetch(searchUrl);
      if (!searchRes.ok) throw new Error("Search network response was not ok");
      const searchData = await searchRes.json();
      
      if (!searchData.query?.search?.length) {
        return null;
      }
      
      bestMatchTitle = searchData.query.search[0].title;
      
      // 3. Fetch the fully parsed HTML for that search title
      const detailsUrl = `${BASE_URL}?action=parse&page=${encodeURIComponent(bestMatchTitle)}&prop=text|images&redirects=1&format=json&origin=*`;
      const detailsRes = await fetch(detailsUrl);
      if (!detailsRes.ok) throw new Error("Details network response was not ok");
      detailsData = await detailsRes.json();
      
      if (!detailsData.parse || !detailsData.parse.text) return null;
    }
    
    const htmlText = detailsData.parse.text['*'];
    
    // 3. Use DOMParser to safely extract text from the HTML
    const parser = new window.DOMParser();
    const doc = parser.parseFromString(htmlText, "text/html");
    
    // Find all paragraphs
    const paragraphs = doc.querySelectorAll('.mw-parser-output > p');
    let extract = "";
    
    for (let p of paragraphs) {
      // Clean up citation brackets like [1]
      const text = p.textContent.replace(/\[\d+\]/g, '').trim();
      
      // Skip empty paragraphs or coordinates
      if (text.length > 50 && !text.includes('may refer to:') && !text.toLowerCase().includes('coordinates')) {
        extract = text;
        break;
      }
    }
    
    // 4. Also try to get a thumbnail from pageimages
    let thumbnailUrl = null;
    try {
      const imgQueryUrl = `${BASE_URL}?action=query&prop=pageimages&pithumbsize=600&redirects=1&titles=${encodeURIComponent(bestMatchTitle)}&format=json&origin=*`;
      const imgRes = await fetch(imgQueryUrl);
      const imgData = await imgRes.json();
      const pageKeys = Object.keys(imgData.query?.pages || {});
      if (pageKeys.length > 0 && pageKeys[0] !== '-1') {
         const page = imgData.query.pages[pageKeys[0]];
         if (page.thumbnail && page.thumbnail.source) {
            thumbnailUrl = page.thumbnail.source;
         }
      }
    } catch (e) {
      console.error("Could not fetch thumbnail via pageimages", e);
    }
    
    const result = {
      title: detailsData.parse.title,
      extract: extract || "No detailed archival records found for this location.",
      thumbnail: thumbnailUrl,
      url: `https://starwars.fandom.com/wiki/${encodeURIComponent(detailsData.parse.title.replace(/ /g, '_'))}`
    };
    
    // Store in cache for future lookups
    wikiCache.set(queryText, result);
    return result;
  } catch (error) {
    console.error("Error fetching Wookieepedia data:", error);
    return null;
  }
}
