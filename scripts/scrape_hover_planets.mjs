import fs from 'fs';
import * as cheerio from 'cheerio';

const OUTPUT_FILE = './src/data/planetLore.js';

// Read all planets
const galacticData = fs.readFileSync('./src/data/galacticData.js', 'utf8');
const allPlanetsMatch = galacticData.match(/export const allPlanets = (\[[\s\S]*?\]);/);
let allPlanets = [];
if (allPlanetsMatch) allPlanets = eval(`(function() { return ${allPlanetsMatch[1]}; })()`);

// Read current lore
const loreData = fs.readFileSync(OUTPUT_FILE, 'utf8');
const loreMatch = loreData.match(/export const planetLore = ({\n[\s\S]*?\n});/);
let planetLore = {};
if (loreMatch) planetLore = eval(`(function() { return ${loreMatch[1]}; })()`);

// Read disambiguation map
const disambigData = fs.readFileSync('./src/utils/disambiguationMap.js', 'utf8');
const disambigMatch = disambigData.match(/export const disambiguationMap = ({\n[\s\S]*?\n});/);
let disambiguationMap = {};
if (disambigMatch) disambiguationMap = eval(`(function() { return ${disambigMatch[1]}; })()`);

const cleanText = (text) => {
  if (!text) return 'unknown';
  let cleaned = text.replace(/\[\d+\]/g, ' ').replace(/\s+/g, ' ').trim();
  // Add comma between lowercase and uppercase letter (e.g. Canyons Desert -> Canyons, Desert)
  cleaned = cleaned.replace(/([a-z])\s+([A-Z])/g, '$1, $2');
  return cleaned || 'unknown';
};

const DELAY_MS = 500;
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function scrapeLore() {
  const targets = [];
  
  for (const p of allPlanets) {
    const lore = planetLore[p.name];
    if (!lore || ((lore.climate === 'unknown' || !lore.climate) && (lore.terrain === 'unknown' || !lore.terrain))) {
      targets.push(p.name);
    }
  }

  console.log(`Found ${targets.length} planets missing lore out of ${allPlanets.length}.`);
  
  let count = 0;
  let newLoreDict = { ...planetLore };
  
  for (const name of targets) {
    count++;
    const canonicalName = disambiguationMap[name] || name;
    console.log(`[${count}/${targets.length}] Fetching: ${canonicalName}`);
    
    try {
      const res = await fetch(`https://starwars.fandom.com/api.php?action=parse&page=${encodeURIComponent(canonicalName)}&format=json`);
      if (!res.ok) {
        console.error(`HTTP Error ${res.status}`);
        await sleep(DELAY_MS);
        continue;
      }
      
      const data = await res.json();
      
      // Initialize if missing
      if (!newLoreDict[name]) {
        newLoreDict[name] = { name, climate: "unknown", terrain: "unknown", population: "unknown", diameter: "unknown", rotation_period: "unknown", orbital_period: "unknown" };
      }
      
      if (data.parse && data.parse.text) {
        const isDisambig = data.parse.categories?.some(c => c['*'] === 'Disambiguation_pages');
        if (isDisambig) {
          console.warn(`  -> Disambiguation page. Skipping.`);
        } else {
          const html = data.parse.text['*'];
          const $ = cheerio.load(html);
          
          const climate = cleanText($('[data-source="climate"] .pi-data-value').text());
          const terrain = cleanText($('[data-source="terrain"] .pi-data-value').text());
          const population = cleanText($('[data-source="population"] .pi-data-value').text());
          const diameter = cleanText($('[data-source="diameter"] .pi-data-value').text());
          
          if (climate !== 'unknown') newLoreDict[name].climate = climate;
          if (terrain !== 'unknown') newLoreDict[name].terrain = terrain;
          if (population !== 'unknown') newLoreDict[name].population = population;
          if (diameter !== 'unknown') newLoreDict[name].diameter = diameter;
          
          if (climate !== 'unknown' || terrain !== 'unknown') {
            console.log(`  -> Found: ${climate} / ${terrain}`);
          }
        }
      }
      
      // Save every 20 planets
      if (count % 20 === 0) {
         const fileContent = `// Automatically enriched by the Jedi Archivist Pipeline\nexport const planetLore = ${JSON.stringify(newLoreDict, null, 2)};\n`;
         fs.writeFileSync(OUTPUT_FILE, fileContent);
      }
      
    } catch (e) {
      console.error(`Exception on ${name}:`, e.message);
    }
    
    await sleep(DELAY_MS);
  }
  
  const finalContent = `// Automatically enriched by the Jedi Archivist Pipeline\nexport const planetLore = ${JSON.stringify(newLoreDict, null, 2)};\n`;
  fs.writeFileSync(OUTPUT_FILE, finalContent);
  console.log("Scraping complete!");
}

scrapeLore();
