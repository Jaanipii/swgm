const fs = require('fs');

const timelineData = fs.readFileSync('./src/data/timeline.js', 'utf8');
const timelineMapMatch = timelineData.match(/export const planets = ({\n[\s\S]*?\n});/);
let timelineMap = {};
if (timelineMapMatch) timelineMap = eval(`(function() { return ${timelineMapMatch[1]}; })()`);

const timelineArrMatch = timelineData.match(/export const starWarsTimeline = (\[[\s\S]*?\]);\n/);
let timelineArr = [];
if (timelineArrMatch) timelineArr = eval(`(function() { return ${timelineArrMatch[1]}; })()`);

const loreData = fs.readFileSync('./src/data/planetLore.js', 'utf8');
const loreMatch = loreData.match(/export const planetLore = ({\n[\s\S]*?\n});/);
let loreMap = {};
if (loreMatch) loreMap = eval(`(function() { return ${loreMatch[1]}; })()`);

const allNotable = new Set(Object.keys(timelineMap));
timelineArr.forEach(t => {
  if (t.primaryPlanet && t.primaryPlanet !== 'Unknown Spaces') {
    allNotable.add(t.primaryPlanet);
  }
});

const emptyPlanets = [];
for (const pName of Array.from(allNotable)) {
  const lore = loreMap[pName];
  if (!lore || (lore.climate === 'unknown' && (lore.terrain === 'unknown' || String(lore.terrain).trim() === ''))) {
    emptyPlanets.push(pName);
  }
}

console.log("Empty planets count:", emptyPlanets.length);
fs.writeFileSync('./scripts/empty_planets_list.json', JSON.stringify(emptyPlanets, null, 2));
