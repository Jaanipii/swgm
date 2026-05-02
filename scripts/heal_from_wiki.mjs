import fs from 'fs';
import * as cheerio from 'cheerio';
import { starWarsTimeline } from '../src/data/timeline.js';

const DELAY_MS = 500; // 0.5 seconds to respect Fandom API limits securely
const OUTPUT_FILE = './src/data/lore_dictionary.json';

// Initialize or load the existing patched dictionary so we don't restart from 0 if it fails mid-run
let loreDict = {};
if (fs.existsSync(OUTPUT_FILE)) {
  try {
    loreDict = JSON.parse(fs.readFileSync(OUTPUT_FILE, 'utf8'));
  } catch(e) {
    console.warn("Could not parse existing lore_dictionary.json, starting fresh.");
  }
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

const parseNumber = (text) => {
  if (!text) return null;
  // Match any sequence of digits. e.g. "384 pages" -> 384, "22 minutes" -> 22, "1,024" -> 1024
  const stripped = text.replace(/,/g, '');
  const match = stripped.match(/\d+/);
  return match ? parseInt(match[0], 10) : null;
};

async function healData() {
  // Find all items missing mathematical durations
  const targets = starWarsTimeline.filter(item => {
    // If it's already patched in the dictionary, skip it
    if (loreDict[item.id] && (loreDict[item.id].pages || loreDict[item.id].runtime)) return false;

    if (item.type === 'book' || item.type === 'comic' || item.type === 'short-story') {
      return !item.runtime && !item.pages && !item.pageCount;
    }
    if (item.type === 'series' || item.type === 'movie' || item.type === 'tv') {
      return !item.runtime;
    }
    return false;
  });

  console.log(`Found ${targets.length} items missing mathematical durations out of ${starWarsTimeline.length}`);
  if (targets.length === 0) {
    console.log("Nothing to patch. Exiting.");
    return;
  }

  console.log(`Beginning deep scrape of ${targets.length} Infoboxes with a ${DELAY_MS}ms delay...`);

  let count = 0;
  for (const item of targets) {
    let targetUrl = item.url || `https://starwars.fandom.com/wiki/${item.title.replace(/ /g, '_')}`;

    try {
      // Reconstruct Wookieepedia page title from URL or fallback
      let pageTitle = item.title.replace(/ /g, '_');
      if (item.url && item.url.includes('/wiki/')) {
         pageTitle = item.url.split('/wiki/')[1];
      }

      const apiUrl = `https://starwars.fandom.com/api.php?action=parse&page=${encodeURIComponent(pageTitle)}&format=json`;

      console.log(`[${count+1}/${targets.length}] Fetching API for: ${pageTitle}`);
      const res = await fetch(apiUrl, {
        headers: {
          'User-Agent': 'StarWarsTimelineHealingBot/1.0 (jaani.piirainen@unitedimaginations.fi) NodeFetch/18.0'
        }
      });

      if (!res.ok) {
        console.error(`HTTP Error ${res.status} for ${pageTitle}`);
        await sleep(DELAY_MS);
        count++;
        continue;
      }

      const data = await res.json();
      
      // Handle redirects
      if (data.parse && data.parse.text && data.parse.text['*'].includes('redirectMsg')) {
         console.warn(`   -> Received Redirect for ${pageTitle}. Skipping integer scrape for now.`);
         await sleep(DELAY_MS);
         count++;
         continue;
      }

      if (!data.parse || !data.parse.text) {
         console.warn(`   -> API returned no text payload for ${pageTitle}.`);
         await sleep(DELAY_MS);
         count++;
         continue;
      }

      const html = data.parse.text['*'];
      const $ = cheerio.load(html);

      // Initialize missing item entry if absent
      if (!loreDict[item.id]) loreDict[item.id] = {};

      const isBook = ['book', 'comic', 'short-story'].includes(item.type);

      // Wookieepedia infobox selector
      let extractedValue = null;
      
      if (isBook) {
         // Target <div data-source="pages">
         const pagesEl = $('[data-source="pages"] .pi-data-value').first();
         if (pagesEl.length > 0) {
           extractedValue = parseNumber(pagesEl.text());
           if (extractedValue) loreDict[item.id].pages = extractedValue;
         }
      } else {
         // Target <div data-source="runtime"> or running_time
         const runtimeEl = $('[data-source="runtime"] .pi-data-value, [data-source="running_time"] .pi-data-value').first();
         if (runtimeEl.length > 0) {
           extractedValue = parseNumber(runtimeEl.text());
           if (extractedValue) {
              loreDict[item.id].runtime = `${extractedValue} minutes`;
              // Also store raw integer for math
              loreDict[item.id].metricDuration = extractedValue; 
           }
         }
      }

      if (extractedValue) {
        console.log(`   -> Success! Found: ${extractedValue} ${isBook ? 'pages' : 'minutes'}`);
      } else {
        console.log(`   -> No numeric duration found in infobox.`);
      }

      // Save incrementally every 10 items so we don't lose progress on a crash
      if (count % 10 === 0) {
         let currentDict = JSON.parse(fs.readFileSync(OUTPUT_FILE, 'utf8'));
         Object.keys(loreDict).forEach(k => {
           if (!currentDict[k]) currentDict[k] = {};
           Object.assign(currentDict[k], loreDict[k]);
         });
         fs.writeFileSync(OUTPUT_FILE, JSON.stringify(currentDict, null, 2));
      }

    } catch (e) {
      console.error(`Exception fetching ${targetUrl}:`, e.message);
    }

    count++;
    await sleep(DELAY_MS);
  }

  let finalDict = JSON.parse(fs.readFileSync(OUTPUT_FILE, 'utf8'));
  Object.keys(loreDict).forEach(k => {
    if (!finalDict[k]) finalDict[k] = {};
    Object.assign(finalDict[k], loreDict[k]);
  });
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(finalDict, null, 2));
  console.log(`\nFinished scraping Phase 2! Saved to ${OUTPUT_FILE}`);
}

healData();
