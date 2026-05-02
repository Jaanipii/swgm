const fs = require('fs');

// We have ES Modules natively inside the app, but for a simple CJS script we can just parse the static JS files using Regex or require if we rewrite them to JSON.
// Since they are .js exports, we can read them as text and eval, or we can just run a fetch against the known suspect:
// For safety, let's read the JS files as strings and extract arrays.

function extractArrayFromExport(filePath, regex) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    const match = data.match(regex);
    if (!match) return [];
    
    // Simple sandbox eval to get the object/array
    // Note: this relies on the data being somewhat clean JSON-like structures
    const script = `(function() { return ${match[1]}; })()`;
    return eval(script);
  } catch (e) {
    console.log("Error extracting from", filePath, e);
    return [];
  }
}

async function checkDisambiguation(names) {
  const BATCH_SIZE = 10;
  const disambiguations = {};
  
  for (let i = 0; i < names.length; i += BATCH_SIZE) {
    const batch = names.slice(i, i + BATCH_SIZE);
    console.log(`Checking batch ${i} to ${i + BATCH_SIZE} of ${names.length}...`);
    
    await Promise.all(batch.map(async (name) => {
      try {
        const res = await fetch(`https://starwars.fandom.com/api.php?action=parse&page=${encodeURIComponent(name)}&prop=categories&redirects=1&format=json`);
        const json = await res.json();
        
        if (json.parse && json.parse.categories) {
          const isDisambig = json.parse.categories.some(c => c['*'] === 'Disambiguation_pages');
          if (isDisambig) {
            console.log(`[DISAMBIGUATION FOUND] ${name}`);
            disambiguations[name] = true;
          }
        }
      } catch (e) {
        // Ignore network errors or missing pages for this scan
      }
    }));
    
    // Small delay to be polite to the Wookieepedia API
    await new Promise(r => setTimeout(r, 200));
  }
  
  return Object.keys(disambiguations);
}

async function run() {
  console.log("Extracting names from local data...");
  const uniqueNames = new Set();
  
  // 1. Get characters from timeline
  try {
    const timelineData = fs.readFileSync('./src/data/timeline.js', 'utf8');
    const timelineMatch = timelineData.match(/export const starWarsTimeline = (\[[\s\S]*?\]);\n/);
    if (timelineMatch) {
      const timeline = eval(`(function() { return ${timelineMatch[1]}; })()`);
      timeline.forEach(item => {
        if (item.starring) {
          item.starring.forEach(s => uniqueNames.add(s));
        }
        if (item.primaryPlanet && item.primaryPlanet !== 'Unknown Spaces') {
          uniqueNames.add(item.primaryPlanet);
        }
      });
    }
  } catch(e) { console.error(e); }

  // 2. Get species from planetSpecies
  try {
    const speciesData = fs.readFileSync('./src/data/planetSpecies.js', 'utf8');
    const speciesMatch = speciesData.match(/export const planetSpecies = ({\n[\s\S]*?\n});/);
    if (speciesMatch) {
      const speciesMap = eval(`(function() { return ${speciesMatch[1]}; })()`);
      Object.values(speciesMap).forEach(list => {
        list.forEach(s => uniqueNames.add(s));
      });
    }
  } catch(e) { console.error(e); }
  
  const namesArray = Array.from(uniqueNames).filter(Boolean);
  console.log(`Found ${namesArray.length} unique terms. Checking Wookieepedia API...`);
  
  const result = await checkDisambiguation(namesArray);
  
  console.log("\\n--- DISAMBIGUATION MAP SKELETON ---");
  const outputObj = {};
  result.forEach(r => {
    outputObj[r] = r + "_(FIXME)";
  });
  
  fs.writeFileSync('./scripts/disambig_output.json', JSON.stringify(outputObj, null, 2));
  console.log("Wrote suspects to ./scripts/disambig_output.json");
}

run();
