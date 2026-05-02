import fs from 'fs';
import * as cheerio from 'cheerio';

const BASE_URL = 'https://starwars.fandom.com/api.php';

async function fetchNarration(originalTitle, index, total) {
  // E.g., "Star Wars: The Clone Wars - S2E16: Cat and Mouse" -> "Cat and Mouse"
  const cleanedQuery = originalTitle.split(': ').pop().trim();
  
  try {
    // 1 & 2. Try Exact Title Slugs
    const titlesToTry = [`${cleanedQuery} (episode)`, cleanedQuery];
    let htmlText = null;
    let bestMatchTitle = null;

    for (const title of titlesToTry) {
        const detailsUrl = `${BASE_URL}?action=parse&page=${encodeURIComponent(title)}&prop=text&redirects=1&format=json&origin=*`;
        const detailsRes = await fetch(detailsUrl);
        const detailsData = await detailsRes.json();
        
        if (detailsData.parse && detailsData.parse.text) {
           const potentialHtml = detailsData.parse.text['*'];
           if (potentialHtml.includes('id="Opening_narration"')) {
              htmlText = potentialHtml;
              bestMatchTitle = title;
              break;
           }
        }
    }
    
    if (!htmlText) {
      console.log(`[${index}/${total}] ❌ Failed to find a valid Opening Narration payload for ${cleanedQuery}`);
      return null;
    }
    
    // 3. Load into Cheerio to exact-match the hard DOM block
    const $ = cheerio.load(htmlText);
    
    // Find the specific hook
    const narrationHook = $('#Opening_narration');
    if (narrationHook.length === 0) {
      console.log(`[${index}/${total}] ⚠️ No #Opening_narration anchor found for ${bestMatchTitle}`);
      return null;
    }

    // Usually wrapped in <h2>, so we get the parent, then grab the next <p> tag
    let narrationText = narrationHook.parent().nextAll('p').first().text().trim();
    
    // Clean up bracket citations
    narrationText = narrationText.replace(/\[\d+\]/g, '').trim();

    // Sometimes the Wookieepedia editors put it in an <i> tag or blockquote
    if (!narrationText || narrationText.length < 10) {
       narrationText = narrationHook.parent().nextAll('blockquote').first().text().trim();
       narrationText = narrationText.replace(/\[\d+\]/g, '').trim();
    }
    
    if (narrationText) {
      console.log(`[${index}/${total}] ✅ Extracted: ${bestMatchTitle}`);
      return narrationText;
    } else {
      console.log(`[${index}/${total}] ⚠️ Found anchor but text was empty for ${bestMatchTitle}`);
      return null;
    }

  } catch (error) {
    console.log(`[${index}/${total}] ❌ Network error for ${originalTitle}`);
    return null;
  }
}

async function scrapeAll() {
  console.log("Loading Map Memory Banks...");
  const { starWarsTimeline } = await import('../src/data/timeline.js');

  const cwEpisodes = starWarsTimeline.filter(ep => ep.title.includes('Star Wars: The Clone Wars - S'));
  console.log(`Found ${cwEpisodes.length} Clone Wars episodes targeting DOM extraction...`);

  const results = {};
  let total = cwEpisodes.length;
  
  // Rate-limiting block mapping to avoid Wookieepedia DDoS IP-banning
  for (let i = 0; i < total; i++) {
    const originalTitle = cwEpisodes[i].title;
    const narration = await fetchNarration(originalTitle, i + 1, total);
    if (narration) {
      results[originalTitle] = narration;
    }
    // Strict 100ms pause
    await new Promise(r => setTimeout(r, 100));
  }

  console.log(`\nSuccessfully scraped ${Object.keys(results).length}/${total} narrations!`);
  
  const jsContent = `// Automatically DOM-scraped from official Wookieepedia Anchors (Zero AI Hallucinations)
export const cwNarrations = ${JSON.stringify(results, null, 2)};
`;

  fs.writeFileSync('./src/data/cwNarrations.js', jsContent, 'utf8');
  console.log("💾 Safely committed to src/data/cwNarrations.js");
}

scrapeAll();
