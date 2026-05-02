const fs = require('fs');
const https = require('https');

const sampled = JSON.parse(fs.readFileSync('./sampled_planets.json', 'utf8'));
let existing = {};
try {
  existing = JSON.parse(fs.readFileSync('./src/data/planetFactions.json', 'utf8'));
} catch (e) {}

// Let's grab the next 200
const toProcess = sampled.filter(p => !existing[p]).slice(0, 200);
console.log(`Processing next ${toProcess.length} planets...`);

function parseAffiliations(text) {
  if (!text) return null;
  text = text.toLowerCase();
  
  const factions = {
    "Republic": false, "CIS": false, "Empire": false, 
    "Rebellion": false, "New Republic": false, "First Order": false,
    "Hutt/Syndicate": false, "Mandalorian": false, "Jedi": false, "Sith": false
  };

  if (text.includes("galactic republic") || text.includes("high republic") || text.includes("old republic")) factions["Republic"] = true;
  if (text.includes("confederacy of independent systems") || text.includes("separatist")) factions["CIS"] = true;
  if (text.includes("empire") || text.includes("imperial")) factions["Empire"] = true;
  if (text.includes("rebellion") || text.includes("rebel alliance") || text.includes("alliance to restore")) factions["Rebellion"] = true;
  if (text.includes("new republic")) factions["New Republic"] = true;
  if (text.includes("first order") || text.includes("final order")) factions["First Order"] = true;
  if (text.includes("resistance")) factions["New Republic"] = true;
  if (text.includes("hutt") || text.includes("syndicate") || text.includes("crimson dawn") || text.includes("black sun") || text.includes("pyke")) factions["Hutt/Syndicate"] = true;
  if (text.includes("mandalore") || text.includes("mandalorian") || text.includes("death watch")) factions["Mandalorian"] = true;
  if (text.includes("jedi order") || text.includes("jedi")) factions["Jedi"] = true;
  if (text.includes("sith")) factions["Sith"] = true;

  if (!Object.values(factions).some(v => v)) return null;
  return factions;
}

function fetchPlanet(planetName) {
  return new Promise((resolve) => {
    const url = `https://starwars.fandom.com/api.php?action=query&prop=revisions&rvprop=content&rvslots=main&titles=${encodeURIComponent(planetName)}&format=json&redirects=1`;
    
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query.pages;
          const pageId = Object.keys(pages)[0];
          if (pageId === "-1" || !pages[pageId].revisions) return resolve(null);
          
          const content = pages[pageId].revisions[0].slots.main['*'];
          
          // Naive parse of the infobox
          const lines = content.split('\n');
          let affiliationLines = [];
          let capturing = false;
          for (let line of lines) {
              if (line.trim().startsWith('|affiliation')) {
                  capturing = true;
                  if (line.includes('=')) affiliationLines.push(line.split('=').slice(1).join('='));
              } else if (capturing) {
                  if (line.trim().startsWith('|') || line.trim() === '}}') capturing = false;
                  else affiliationLines.push(line.trim());
              }
          }
          const raw = affiliationLines.join(' ');
          resolve(parseAffiliations(raw));
        } catch (e) {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
}

(async function run() {
  let added = 0;
  for (let i = 0; i < toProcess.length; i++) {
    const planet = toProcess[i];
    const factions = await fetchPlanet(planet);
    if (factions) {
      existing[planet] = factions;
      added++;
    }
    
    // writing every time to save progress
    fs.writeFileSync('./src/data/planetFactions.json', JSON.stringify(existing, null, 2));
    
    if (i % 10 === 0) console.log(`Processed ${i}/${toProcess.length}. Added ${added} new.`);
    await new Promise(r => setTimeout(r, 700)); // Delay between requests
  }
  
  console.log(`Done! Total enriched planets: ${Object.keys(existing).length}`);
})();
