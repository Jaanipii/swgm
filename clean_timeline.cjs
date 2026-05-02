const fs = require('fs');
let fileContent = fs.readFileSync('src/data/timeline.js', 'utf8');

// The file has:
// export const starWarsTimeline = [ ... ];
// export const planets = { ... };

// 1. Extract the array
const match = fileContent.match(/export const starWarsTimeline = (\[[\s\S]*?\]);\n\nexport const planets/);
if (!match) {
  console.log("Could not find the array");
  process.exit(1);
}

const arrStr = match[1];
const timeline = eval(`(${arrStr})`);

// 2. Filter out non-canonical
const filteredTimeline = timeline.filter(item => {
  const title = item.title || "";
  if (title.includes("Young Jedi Adventures") || title.includes("Fun with Nubs")) {
    return false;
  }
  return true;
});

// 3. Rebuild timeline.js
const newFileContent = `// Extracted and mapped from starwarstl.com API
export const starWarsTimeline = ${JSON.stringify(filteredTimeline, null, 2)};

export const planets = {
  'Coruscant': { x: 1200, y: 1200, description: 'Capital of the Republic and Empire.' },
  'Naboo': { x: 1522, y: 1968, description: 'A peaceful world with beautiful architecture.' },
  'Geonosis': { x: 1854, y: 1882, description: 'Rocky, bug-infested world; birthplace of the Clone Wars.' },
  'Mandalore': { x: 1522, y: 1008, description: 'Home to the fearsome Mandalorian warriors.' },
  'Mustafar': { x: 1200, y: 2160, description: 'Volcanic planet where Darth Vader was born.' },
  'Kamino': { x: 1972, y: 975, description: 'Ocean planet where the clone army was created.' },
  'Corellia': { x: 1307, y: 1392, description: 'Industrial world famous for shipyards.' },
  'Tatooine': { x: 1844, y: 1872, description: 'A harsh desert world orbiting twin suns.' },
  'Lothal': { x: 2059, y: 1008, description: 'Outer Rim world that birthed a rebellion cell.' },
  'Ferrix': { x: 1737, y: 624, description: 'Blue-collar industrial world with strong community.' },
  'Scarif': { x: 1951, y: 1776, description: 'Tropical paradise used for Imperial data archives.' },
  'Hoth': { x: 1415, y: 1200, description: 'Frigid ice planet that housed Echo Base.' },
  'Endor': { x: 1522, y: 1104, description: 'The forest moon, home to the Ewoks.' },
  'Nevarro': { x: 1093, y: 2256, description: 'Volcanic world turned prosperous trade hub.' },
  'Peridea': { x: 2300, y: 200, description: 'A distant world in another galaxy.' },
  'Unknown Spaces': { x: 300, y: 1500, description: 'Uncharted regions of the galaxy.' },
  'Castilon': { x: 878, y: 1872, description: 'Ocean planet in the Outer Rim.' },
  'Jakku': { x: 878, y: 1584, description: 'Desert planet littered with wreckage.' },
  'Crait': { x: 1415, y: 1968, description: 'Mineral world with a red surface beneath salt.' },
  'Exegol': { x: 556, y: 1008, description: 'Hidden world of the Sith in the Unknown Regions.' }
};
`;

fs.writeFileSync('src/data/timeline.js', newFileContent);
console.log("Timeline cleaned successfully.");
