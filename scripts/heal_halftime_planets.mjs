import fs from 'fs';
import { GoogleGenAI, Type } from '@google/genai';
import { starWarsTimeline } from '../src/data/timeline.js';
import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
if (!API_KEY) {
  console.error("CRITICAL: No GEMINI_API_KEY found in .env.");
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey: API_KEY });
const OUTPUT_FILE = './src/data/lore_dictionary.json';

const planetCheckSchema = {
    type: Type.ARRAY,
    description: "An array of planetary metadata strictly matching the input items.",
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
            }
        },
        required: ["id", "primaryPlanet"]
    }
};

let loreDict = {};
if (fs.existsSync(OUTPUT_FILE)) {
  try {
    loreDict = JSON.parse(fs.readFileSync(OUTPUT_FILE, 'utf8'));
  } catch(e) {}
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function runHalftimeHeal() {
  const targets = starWarsTimeline.filter(item => {
     const existing = loreDict[item.id];
     // Target ONLY items that the AI confidently marked as 'Unknown Spaces' during any pass
     if (existing && existing.primaryPlanet === 'Unknown Spaces') {
         // Also ignore books and pure space combats if you want to save tokens, but we check them all just to be safe
         return true; 
     }
     return false;
  });

  console.log(`Found ${targets.length} items marked as 'Unknown Spaces' to surgically re-evaluate...`);
  if (targets.length === 0) return;

  // We can blast 100 items per batch because the output is incredibly tiny (just ID and string)
  const BATCH_SIZE = 100;
  for (let i = 0; i < targets.length; i += BATCH_SIZE) {
    const batch = targets.slice(i, i + BATCH_SIZE);
    
    // Tiny payload
    const promptPayload = batch.map(b => ({
      id: b.id,
      title: b.title,
      type: b.type,
      year: b.year
    }));

    console.log(`\n[Planet Audit Batch ${Math.floor(i/BATCH_SIZE) + 1}] Processing ${batch.length} items...`);
    
    const prompt = `You are a Grand Jedi Archivist. I am sending you a JSON array of title references that were previously categorized as 'Unknown Spaces'. 
Double check their canonical locations. If they happen on a known planet (like Umbara, Kadavo, Ryloth, Kamino, Mandalore, Coruscant), return that planet's name perfectly capitalized. Only return 'Unknown Spaces' if they genuinely happen in deep space.

Input Payload:
${JSON.stringify(promptPayload, null, 2)}`;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash', // We use Flash here because it's a simple string extraction and 10x faster
        contents: prompt,
        config: {
          temperature: 0.1,
          responseMimeType: "application/json",
          responseSchema: planetCheckSchema,
        }
      });

      const responseText = response.text;
      const patchedArray = JSON.parse(responseText);

      let currentDict = JSON.parse(fs.readFileSync(OUTPUT_FILE, 'utf8'));
      
      let changedCount = 0;
      patchedArray.forEach(patch => {
         if (patch.primaryPlanet !== 'Unknown Spaces') {
             if (currentDict[patch.id]) {
                 currentDict[patch.id].primaryPlanet = patch.primaryPlanet;
                 loreDict[patch.id].primaryPlanet = patch.primaryPlanet;
                 console.log(`  -> Audit Discovery: ${batch.find(b => b.id === patch.id)?.title} is natively on ${patch.primaryPlanet}!`);
                 changedCount++;
             }
         }
      });

      fs.writeFileSync(OUTPUT_FILE, JSON.stringify(currentDict, null, 2));
      console.log(`   * Re-categorized ${changedCount} hidden planets away from Unknown Spaces.`);

    } catch (e) {
      console.error(`Planet Audit Failed on Batch ${Math.floor(i/BATCH_SIZE) + 1}:`, e);
      await sleep(10000); 
    }

    await sleep(2000); 
  }

  console.log("\nFinished Halftime Planet Audit!");
}

runHalftimeHeal();
