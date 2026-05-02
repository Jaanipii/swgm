import fs from 'fs';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
if (!API_KEY) {
  console.error("CRITICAL: No GEMINI_API_KEY found in .env.");
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey: API_KEY });
const LORE_JS_PATH = './src/data/planetLore.js';

const loreSchema = {
    type: Type.ARRAY,
    description: "An array of planetary lore strictly matching the requested names.",
    items: {
        type: Type.OBJECT,
        properties: {
            name: {
                type: Type.STRING,
                description: "The name of the planet exactly as requested."
            },
            climate: {
                type: Type.STRING,
                description: "The canon climate of the planet (e.g., 'arid', 'temperate', 'frozen'). If unlisted in canon, return 'unknown'."
            },
            terrain: {
                type: Type.STRING,
                description: "The primary canon terrain features (e.g., 'desert', 'jungle, rainforests', 'gas giant'). If unlisted, return 'unknown'."
            },
            population: {
                type: Type.STRING,
                description: "The exact canonical population as a string of numbers without commas (e.g., '2000000000'). If unlisted, return 'unknown'."
            },
            diameter: {
                type: Type.STRING,
                description: "The canonical diameter in kilometers as a string (e.g., '12500'). If unlisted, return 'unknown'."
            },
            rotation_period: {
                type: Type.STRING,
                description: "The canonical rotation period (day length) in hours as a string (e.g., '24'). If unlisted, return 'unknown'."
            },
            orbital_period: {
                type: Type.STRING,
                description: "The canonical orbital period (year length) in days as a string (e.g., '364'). If unlisted, return 'unknown'."
            }
        },
        required: ["name", "climate", "terrain", "population", "diameter", "rotation_period", "orbital_period"]
    }
};

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function fetchPlanetLore() {
    console.log("Loading Map Dependencies...");
    const { allPlanets, timelinePlanets } = await import('../src/data/galacticData.js');
    const { planetLore } = await import('../src/data/planetLore.js');

    // Combine all 3D Map visual planets into a master array
    const masterPlanets = new Set();
    allPlanets.forEach(p => masterPlanets.add(p.planet));
    Object.keys(timelinePlanets).forEach(k => masterPlanets.add(k));

    console.log(`Total planets physically rendered in local UI: ${masterPlanets.size}`);

    const targets = [];
    Array.from(masterPlanets).forEach(pName => {
        const lore = planetLore[pName];
        if (!lore) {
            targets.push(pName); // Completely missing from dictionary
        } else if (lore.climate === 'unknown' && lore.terrain === 'unknown' && lore.population === 'unknown') {
            targets.push(pName); // Present, but empty
        }
    });

    console.log(`Identified ${targets.length} planets missing vast Wookieepedia demographics.`);
    if (targets.length === 0) return;

    // Use Gemini 2.5 Pro because we want excruciatingly accurate Canon/Legends numeric data extraction
    const BATCH_SIZE = 40;
    let savedPlanetLore = { ...planetLore };

    for (let i = 0; i < targets.length; i += BATCH_SIZE) {
        const batch = targets.slice(i, i + BATCH_SIZE);
        console.log(`\n[Lore Extraction Batch ${Math.floor(i/BATCH_SIZE) + 1}] Ping Wookieepedia AI for ${batch.length} core worlds...`);

        const prompt = `You are the Grand Star Wars Archivist mapping the galaxy.
I will give you an array of canonical Star Wars planet names. 
You must return their official Wookieepedia demographic data (Canon or Legends).
If a value does not exist natively in the lore (e.g. population of 'Tenoo' is never stated), strictly return 'unknown'.

Planets to evaluate:
${JSON.stringify(batch)}`;

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

            const patchedArray = JSON.parse(response.text);
            
            let patchCount = 0;
            patchedArray.forEach(patch => {
                if (masterPlanets.has(patch.name)) {
                    savedPlanetLore[patch.name] = patch;
                    patchCount++;
                }
            });

            // Write robustly to JS file
            const jsContent = `// Automatically enriched by the Jedi Archivist Pipeline
export const planetLore = ${JSON.stringify(savedPlanetLore, null, 2)};
`;
            fs.writeFileSync(LORE_JS_PATH, jsContent, 'utf8');
            console.log(`  -> Successfully synthesized and saved planetary records for ${patchCount} worlds.`);

        } catch (e) {
            console.error(`  -> Archive Fetch Failed for Batch:`, e);
            await sleep(10000);
        }

        await sleep(2000); // Standard rate-limit cooling
    }

    console.log("\nFinished fetching all Planetary Lore!");
}

fetchPlanetLore();
