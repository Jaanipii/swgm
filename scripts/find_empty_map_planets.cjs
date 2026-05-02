const fs = require('fs');

const timelineData = fs.readFileSync('./src/data/timeline.js', 'utf8');
const timelineMapMatch = timelineData.match(/export const planets = ({\n[\s\S]*?\n});/);
let timelineMap = {};
if (timelineMapMatch) timelineMap = eval(`(function() { return ${timelineMapMatch[1]}; })()`);

const loreData = fs.readFileSync('./src/data/planetLore.js', 'utf8');
const loreMatch = loreData.match(/export const planetLore = ({\n[\s\S]*?\n});/);
let loreMap = {};
if (loreMatch) loreMap = eval(`(function() { return ${loreMatch[1]}; })()`);

const emptyMapPlanets = [];
for (const pName of Object.keys(timelineMap)) {
  const lore = loreMap[pName];
  // A planet is empty if it doesn't exist in the lore archive, or if its core fields are "unknown" or blank arrays.
  if (!lore || (lore.climate === 'unknown' && (lore.terrain === 'unknown' || String(lore.terrain).trim() === ''))) {
    emptyMapPlanets.push(pName);
  }
}

console.log(JSON.stringify(emptyMapPlanets, null, 2));
fs.writeFileSync('./scripts/empty_map_planets.json', JSON.stringify(emptyMapPlanets, null, 2));
