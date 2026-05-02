import fs from 'fs';
import path from 'path';

// Using file paths safely as ES Module imports can be tricky with local data caching
const LORE_DICT_PATH = './src/data/lore_dictionary.json';
const GALACTIC_DATA_PATH = './src/data/galacticData.js';
const PARSED_SYSTEMS_PATH = './parsed_systems.json';
const API_LOCATIONS_PATH = './src/data/api_locations.json';
const REPORT_OUTPUT_PATH = './unmapped_planets_report.md';

function stripSuffixes(name) {
    if (!name) return "";
    return name.toLowerCase()
        .replace(/\b(system|planet|sector|moon|world)\b/g, '')
        .replace(/[^a-z0-9]/g, ''); // strip all spaces and punctuation
}

async function alignCoordinates() {
    console.log("Loading Canonical Databases...");
    const loreDict = JSON.parse(fs.readFileSync(LORE_DICT_PATH, 'utf8'));
    const parsedSystems = JSON.parse(fs.readFileSync(PARSED_SYSTEMS_PATH, 'utf8'));
    const apiLocations = JSON.parse(fs.readFileSync(API_LOCATIONS_PATH, 'utf8'));
    
    // We dynamically pull JS data to see what the map already knows
    const { allPlanets, timelinePlanets } = await import('../src/data/galacticData.js');

    const knownUINames = new Set();
    allPlanets.forEach(p => knownUINames.add(stripSuffixes(p.planet)));
    Object.keys(timelinePlanets).forEach(pName => knownUINames.add(stripSuffixes(pName)));

    // 1. Isolate Unique Missing Planets
    const uniqueMissing = new Set();
    const episodeMapping = {}; // Track which episode pulled which planet for the report

    Object.entries(loreDict).forEach(([epId, data]) => {
        if (data.primaryPlanet && data.primaryPlanet !== 'Unknown Spaces') {
            const cleanName = stripSuffixes(data.primaryPlanet);
            if (!knownUINames.has(cleanName)) {
                uniqueMissing.add(data.primaryPlanet);
                if (!episodeMapping[data.primaryPlanet]) episodeMapping[data.primaryPlanet] = [];
                episodeMapping[data.primaryPlanet].push(epId);
            }
        }
    });

    console.log(`\nIdentified ${uniqueMissing.size} unique planets extracted by AI that are missing X,Y coordinates.`);

    // Prepare fuzzy lookup dictionaries for lightning fast O(1) correlation
    const canonicalGridFuzzy = {};
    Object.entries(parsedSystems).forEach(([key, val]) => {
        canonicalGridFuzzy[stripSuffixes(key)] = val;
    });

    const apiLocationsFuzzy = new Set();
    apiLocations.forEach(loc => {
        apiLocationsFuzzy.add(stripSuffixes(loc.name));
    });

    // 2. Cross-Reference Pipeline
    const fullyMapped = {};
    const unmappedButCanon = [];
    const hallucinations = [];
    
    let loreChangesMade = false;

    Array.from(uniqueMissing).forEach(planetName => {
        const fuzzyName = stripSuffixes(planetName);

        // Step A: Check Disney/Lucasfilm canonical map grid (6,695 systems)
        let gridData = canonicalGridFuzzy[fuzzyName];
        if (!gridData) {
            // Smarter Alias Substring Matcher
            const fallbackKey = Object.keys(canonicalGridFuzzy).find(k => k.startsWith(fuzzyName));
            if (fallbackKey) gridData = canonicalGridFuzzy[fallbackKey];
        }

        if (gridData) {
            fullyMapped[planetName] = {
                x: gridData.x,
                y: gridData.y,
                description: `A canonical world physically located in grid square ${gridData.grid} (${gridData.region}).`
            };
            console.log(`✅ MAP INJECTION: [${planetName}] successfully aligned to coordinate grid ${gridData.grid}.`);
        } 
        // Step B: Check raw API text dictionary (9,834 entries)
        else if (apiLocationsFuzzy.has(fuzzyName)) {
            unmappedButCanon.push(planetName);
            console.log(`⚠️ VERIFIED CANON: [${planetName}] exists in encyclopedias, but lacks official grid coordinates.`);
        } 
        // Step C: Fallback Hallucination Erasure
        else {
            hallucinations.push(planetName);
            console.log(`❌ ALIEN TEXT DETECTED: [${planetName}] failed all canonical lookups. Purging hallucination.`);
            // Revert the episodes aggressively
            episodeMapping[planetName].forEach(epId => {
                loreDict[epId].primaryPlanet = 'Unknown Spaces';
                loreChangesMade = true;
            });
        }
    });

    // 3. Output Generation
    if (loreChangesMade) {
        fs.writeFileSync(LORE_DICT_PATH, JSON.stringify(loreDict, null, 2));
        console.log(`\n[Sanitation] Reverted ${hallucinations.length} hallucinated planets back to 'Unknown Spaces'.`);
    }

    // Write diagnostic report
    const reportPath = path.resolve(REPORT_OUTPUT_PATH);
    let reportText = `# Diagnostic Report: Unmapped Canonical Planets\n\n`;
    reportText += `The following ${unmappedButCanon.length} planets were successfully verified as real Star Wars locations against the 10,000-entry encyclopedia, but they physically do not exist in the 6,695-entry Disney map grid database. Because we strictly refuse to 'guess' X/Y coordinates, they remain unmapped.\n\n`;
    
    unmappedButCanon.forEach(pName => {
        reportText += `### ${pName}\n`;
        reportText += `- **Generated by episodes**: ${episodeMapping[pName].join(", ")}\n`;
    });
    fs.writeFileSync(reportPath, reportText, 'utf8');

    // Safe File Injection into galacticData.js!
    if (Object.keys(fullyMapped).length > 0) {
        let galacticRaw = fs.readFileSync(GALACTIC_DATA_PATH, 'utf8');
        
        // Use a clean regex to find exactly where the `export const timelinePlanets = {` definition is
        const injectPoint = galacticRaw.indexOf('export const timelinePlanets = {');
        if (injectPoint !== -1) {
            // Find the opening brace of timelinePlanets
            const insertIdx = galacticRaw.indexOf('{', injectPoint) + 1;
            
            // Format our new object entries cleanly (slice out the outer braces so it merges perfectly inside)
            let injectionString = JSON.stringify(fullyMapped, null, 2).slice(1, -1);
            if (!injectionString.trim().endsWith(',')) injectionString += ',';
            
            galacticRaw = galacticRaw.slice(0, insertIdx) + '\n' + injectionString + galacticRaw.slice(insertIdx);
            fs.writeFileSync(GALACTIC_DATA_PATH, galacticRaw, 'utf8');
            console.log(`\n[UI Update] Seamlessly injected ${Object.keys(fullyMapped).length} new planets directly into timelinePlanets memory bank!`);
        } else {
            console.warn("\nCould not find 'export const timelinePlanets = {' in galacticData.js. Please insert manually.");
            fs.writeFileSync('./NEW_PLANETS_PAYLOAD.json', JSON.stringify(fullyMapped, null, 2));
        }
    }

    console.log(`\nCoordinate Alignment Complete! Wrote diagnostic log to ${REPORT_OUTPUT_PATH}`);
}

alignCoordinates();
