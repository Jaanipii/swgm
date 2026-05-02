import fs from 'fs';
import { GoogleGenAI, Type } from '@google/genai';
import { starWarsTimeline, planets as majorPlanets } from '../src/data/timeline.js';
import { allPlanets } from '../src/data/galacticData.js';
import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
if (!API_KEY) {
  console.error("CRITICAL: No GEMINI_API_KEY found in .env.");
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey: API_KEY });
const OUTPUT_FILE = './src/data/lore_dictionary.json';

// Build the strictly enforced Anti-Hallucination Planet Enum List
// We merge hand-crafted major planets and dynamically scraped background planets
const planetEnumSet = new Set(Object.keys(majorPlanets));
allPlanets.forEach(p => planetEnumSet.add(p.planet));
const PLANET_ENUM_LIST = [...planetEnumSet, 'Unknown Spaces'];

// Build the AI Response Schema to force perfect JSON types without conversational text
const loreSchema = {
    type: Type.ARRAY,
    description: "An array of enriched lore metadata strictly matching the input items.",
    items: {
        type: Type.OBJECT,
        properties: {
            id: {
                type: Type.STRING,
                description: "The identical ID passed in from the input."
            },
            primaryPlanet: {
                type: Type.STRING,
                description: "The primary canonical planet for this story exactly as it is spelled in canon (e.g., 'Tatooine', 'Umbara', 'Dathomir'). If the plot leaps across numerous equal locations or takes place entirely in the void of space, strictly return 'Unknown Spaces'."
            },
            abstract: {
                type: Type.STRING,
                nullable: true,
                description: "A 1-2 sentence compelling, in-universe summary of the story. Do NOT mention real-world publication facts. Return null if entirely obscure."
            },
            canon_state: {
                type: Type.STRING,
                description: "Is this currently considered 'Canon' or 'Legends' by Lucasfilm?"
            },
            key_characters: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                nullable: true,
                description: "Array of the top 3-5 iconic characters appearing. If completely unknown, return null."
            },
            canon_tier: {
                type: Type.INTEGER,
                description: "Rating 1 (Galactic Scale Event/Flagship Media) to 4 (Minor obscure isolated incident)."
            }
        },
        required: ["id", "primaryPlanet", "canon_state", "canon_tier"]
    }
};

let loreDict = {};
if (fs.existsSync(OUTPUT_FILE)) {
  try {
    loreDict = JSON.parse(fs.readFileSync(OUTPUT_FILE, 'utf8'));
  } catch(e) {}
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function runEnrichment() {
  // Find targets fully lacking AI Lore
  // A target is lacking lore if its ID isn't completely filled out in the dictionary
  const targets = starWarsTimeline.filter(item => {
    const existing = loreDict[item.id];
    // Check if the AI pass has already hit this object
    if (existing && existing.canon_state && existing.abstract !== undefined) {
      return false; // Skip, already processed
    }
    // We only process valid media items
    return ['film', 'movie', 'tv', 'series', 'book', 'comic', 'game', 'audio-drama', 'short-story'].includes(item.type);
  });

  console.log(`Found ${targets.length} items missing lore out of ${starWarsTimeline.length}`);
  if (targets.length === 0) return;

  const BATCH_SIZE = 40;
  for (let i = 0; i < targets.length; i += BATCH_SIZE) {
    const batch = targets.slice(i, i + BATCH_SIZE);
    
    // Strip the object to only necessary title/year context to save input tokens
    const promptPayload = batch.map(b => ({
      id: b.id,
      title: b.title,
      type: b.type,
      year: b.year
    }));

    console.log(`\n[Batch ${Math.floor(i/BATCH_SIZE) + 1}] Requesting AI enrichment for ${batch.length} items...`);
    
const prompt = `You are a Grand Jedi Archivist with flawless knowledge of Star Wars lore. 
I am sending you a JSON array of title references. 
Enrich them following the strict JSON schema provided. 
IMPORTANT: For 'primaryPlanet', return the most accurate canonical planet. Only use 'Unknown Spaces' if the event happens in deep space or spans too many planets to isolate one.

Input Payload:
${JSON.stringify(promptPayload, null, 2)}`;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: prompt,
        config: {
          temperature: 0.1,
          responseMimeType: "application/json",
          responseSchema: loreSchema,
        }
      });

      const responseText = response.text;
      const enrichedArray = JSON.parse(responseText);

      // Merge the results deeply so we don't wipe out 'pages' and 'runtime' from the Python scraper
      enrichedArray.forEach(patch => {
         if (!loreDict[patch.id]) loreDict[patch.id] = {};
         Object.assign(loreDict[patch.id], patch);
         console.log(`  -> Healed: ${batch.find(b => b.id === patch.id)?.title} (${patch.primaryPlanet} / ${patch.canon_state})`);
      });

      // Fetch fresh state to prevent overwriting the infobox scraper
      let currentDict = JSON.parse(fs.readFileSync(OUTPUT_FILE, 'utf8'));
      Object.keys(loreDict).forEach(k => {
        if (!currentDict[k]) currentDict[k] = {};
        Object.assign(currentDict[k], loreDict[k]);
      });
      fs.writeFileSync(OUTPUT_FILE, JSON.stringify(currentDict, null, 2));

    } catch (e) {
      console.error(`AI Generation Failed on Batch ${Math.floor(i/BATCH_SIZE) + 1}:`, e);
      // Wait to respect rate-limits on failure
      await sleep(10000); 
    }

    // Delay between normal batches
    await sleep(10000);
  }

  console.log("\nFinished AI Enrichment Pass!");
}

runEnrichment();
