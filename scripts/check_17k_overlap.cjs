const fs = require('fs');

const emptyList = JSON.parse(fs.readFileSync('./scripts/empty_planets_list.json', 'utf8'));

// Extract 17k background planets
const Data = fs.readFileSync('./src/data/galacticData.js', 'utf8');
const Match = Data.match(/export const allPlanets = (\[[\s\S]*?\]);/);
let allPlanetsList = [];
if (Match) allPlanetsList = eval(`(function() { return ${Match[1]}; })()`);

const allPlanetNames = new Set(allPlanetsList.map(p => p.name.toLowerCase()));

const overlap = emptyList.filter(name => name !== 'Unknown Spaces' && allPlanetNames.has(name.toLowerCase()));
console.log("Planets on the map missing local Lore Data:", JSON.stringify(overlap, null, 2));
