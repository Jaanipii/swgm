const fs = require('fs');

// 1. Read the parsed_systems.json
const systems = JSON.parse(fs.readFileSync('parsed_systems.json', 'utf8'));

// Coruscant L-9 -> 1200, 1200
// Tatooine R-16 -> 1844, 1872
// L=12, R=18
const L_x = 12;
const L_y = 9;
const R_x = 18;
const R_y = 16;

const scale_x = (1844 - 1200) / (R_x - L_x); // 644 / 6 = 107.333
const scale_y = (1872 - 1200) / (R_y - L_y); // 672 / 7 = 96.0

let allStarSystemsStr = 'export const allStarSystems = {\n';

for (let key in systems) {
  const sys = systems[key];
  const gridMatch = sys.grid.match(/([A-Z])-?(\d+)/);
  if (gridMatch) {
    const letter = gridMatch[1];
    const number = parseInt(gridMatch[2], 10);
    const grid_x = letter.charCodeAt(0) - 64;
    const grid_y = number;
    
    const x = Math.round(1200 + (grid_x - 12) * scale_x);
    const y = Math.round(1200 + (grid_y - 9) * scale_y);
    
    // Update the system object
    sys.x = x;
    sys.y = y;
    
    allStarSystemsStr += `  ${JSON.stringify(sys.system)}: { x: ${x}, y: ${y}, region: ${JSON.stringify(sys.region)} },\n`;
  }
}
allStarSystemsStr += '};\n';

// Write to galacticData.js
let galacticData = fs.readFileSync('src/data/galacticData.js', 'utf8');
// remove the old export const allStarSystems block
galacticData = galacticData.replace(/export const allStarSystems = (\{[\s\S]*?\n\});/, '');
// append the new one
galacticData += '\n' + allStarSystemsStr;
fs.writeFileSync('src/data/galacticData.js', galacticData);

// Now calculate the new coordinates for the 20 major planets in timeline.js!
const planetsToFix = [
  'Coruscant', 'Naboo', 'Geonosis', 'Mandalore', 'Mustafar', 'Kamino', 
  'Corellia', 'Tatooine', 'Lothal', 'Ferrix', 'Scarif', 'Hoth', 'Endor', 
  'Nevarro', 'Peridea', 'Unknown Spaces', 'Castilon', 'Jakku', 'Crait', 'Exegol'
];

let majorPlanetsOut = 'export const planets = {\n';
planetsToFix.forEach(p => {
  let found = null;
  // fuzzy search
  for(let key in systems) {
    if(key.toLowerCase().includes(p.toLowerCase())) {
        found = systems[key];
        break;
    }
  }
  if(found) {
    majorPlanetsOut += `  '${p}': { x: ${found.x}, y: ${found.y}, description: 'A canonical planetary system.' },\n`;
  } else {
    // defaults if not found
    majorPlanetsOut += `  '${p}': { x: 1200, y: 1200, description: '' },\n`;
  }
});
majorPlanetsOut += '};\n';

console.log("SUCCESS. New major planets string generated.");
fs.writeFileSync('new_planets.txt', majorPlanetsOut);

