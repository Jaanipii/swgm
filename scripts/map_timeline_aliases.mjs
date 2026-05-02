import fs from 'fs';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY });

async function mapAliases() {
  console.log("Loading Map Memory Banks...");
  const { starWarsTimeline } = await import('../src/data/timeline.js');
  const { allPlanets, timelinePlanets } = await import('../src/data/galacticData.js');
  const { planets } = await import('../src/data/timeline.js');
  
  const allPlanetsMap = new Map();
  allPlanets.forEach(p => allPlanetsMap.set(p.name, p));

  // 1. Gather all timeline usages
  const timelineUsage = {};
  starWarsTimeline.forEach(item => {
    const pName = item.primaryPlanet;
    if (!pName || pName === 'Unknown Spaces' || pName === 'Planet Unknown') return;
    timelineUsage[pName] = (timelineUsage[pName] || 0) + 1;
  });

  // 2. Isolate exactly the ones completely missing
  const completelyMissing = [];
  Object.keys(timelineUsage).forEach((pName) => {
    if (!planets[pName] && !timelinePlanets[pName] && !allPlanetsMap.has(pName)) {
      completelyMissing.push(pName);
    }
  });

  if (completelyMissing.length === 0) {
    console.log("No missing aliases detected! Map is perfect.");
    return;
  }

  console.log(`Discovered ${completelyMissing.length} story planets completely missing coordinates.`);
  console.log("Loading Disney Grid Lexicon...");
  const rawGrid = JSON.parse(fs.readFileSync('parsed_systems.json', 'utf8'));
  const gridKeys = Object.keys(rawGrid); // 6,695 keys 

  console.log("Transmitting 6,695 grid keys to Gemini 2.5 Flash for rapid fuzzy-alias resolution...");
  
  // Create a condensed block of grid keys to save tokens
  const gridTextBlock = gridKeys.join(', ');

  const prompt = `
You are the Jedi Archivist AI. The following ${completelyMissing.length} planets appear in the Star Wars timeline, but they are missing exact canonical grid coordinates in our local database because their names are spelled differently.

MISSING PLANETS:
${completelyMissing.join(', ')}

I need you to map them to the EXACT matching canonical string from this gigantic 6,695-element dictionary of official grid keys.
For example, "Yavin 4" matches "Yavin Gordian Reach". "Nar Shaddaa" matches "Nal Hutta". "Arvala-7" might match "Arvala".
If a planet has absolutely no logical counterpart in the dictionary, return null for it.

Here is the dictionary (6,000+ string keys separated by commas):
${gridTextBlock}
  `;

  console.log("Awaiting Gemini Response...");

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: "OBJECT",
          description: "A dictionary mapping the missing timeline names to their exact exact string match in the grid dictionary. Or null if impossible to map.",
          properties: Object.fromEntries(
            completelyMissing.map(p => [p, { type: "STRING", nullable: true }])
          ),
          required: completelyMissing
        }
      }
    });

    const mappingResult = JSON.parse(response.text);
    console.log("Gemini returned mapping block:");
    console.log(mappingResult);

    // 3. Inject them into timelinePlanets inside galacticData.js!
    let successfulInjections = 0;
    const newInjections = {};

    for (const [missingItem, mappedKey] of Object.entries(mappingResult)) {
      if (mappedKey && rawGrid[mappedKey]) {
        const payload = rawGrid[mappedKey];
        if (payload.x !== undefined && payload.y !== undefined) {
          newInjections[missingItem] = {
            x: Math.round(payload.x),
            y: Math.round(payload.y),
            description: `A canonical world physically located in grid square ${payload.grid} (${payload.region || 'Unknown'}).`
          };
          successfulInjections++;
        }
      }
    }

    if (successfulInjections === 0) {
      console.log("No valid injections retrieved.");
      return;
    }

    console.log(`Successfully pulled ${successfulInjections} accurate coordinate sets! Fusing into galacticData.js...`);

    const galacticDataPath = './src/data/galacticData.js';
    let gdContent = fs.readFileSync(galacticDataPath, 'utf8');

    // We will append them natively into the timelinePlanets dictionary
    // We already have 200 items in there.
    
    // Find the end of export const timelinePlanets = {
    // and replace it with our new batch.
    
    // Simple regex trick: replace `export const timelinePlanets = {\n` with `export const timelinePlanets = {\n  [NEW DATA...],\n`
    for (const [name, data] of Object.entries(newInjections)) {
      const injectionString = `\n  "${name}": {\n    "x": ${data.x},\n    "y": ${data.y},\n    "description": "${data.description}"\n  },`;
      gdContent = gdContent.replace('export const timelinePlanets = {', `export const timelinePlanets = {${injectionString}`);
    }

    fs.writeFileSync(galacticDataPath, gdContent, 'utf8');
    console.log("Successfully patched galacticData.js! The Map is unified.");

  } catch(e) {
    console.error("Gemini Failure:", e);
  }
}

mapAliases();
