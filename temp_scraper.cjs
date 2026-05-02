const fs = require('fs');

const planetsData = require('../datasets/SWGalacticMap/planets.json');

const currentPlanetsStr = `export const planets = {
  'Coruscant': { x: 500, y: 300, description: 'Capital of the Republic and Empire.' },
  'Naboo': { x: 550, y: 450, description: 'A peaceful world with beautiful architecture.' },
  'Geonosis': { x: 650, y: 550, description: 'Rocky, bug-infested world; birthplace of the Clone Wars.' },
  'Mandalore': { x: 350, y: 250, description: 'Home to the fearsome Mandalorian warriors.' },
  'Mustafar': { x: 700, y: 600, description: 'Volcanic planet where Darth Vader was born.' },
  'Kamino': { x: 750, y: 200, description: 'Ocean planet where the clone army was created.' },
  'Corellia': { x: 450, y: 350, description: 'Industrial world famous for shipyards.' },
  'Tatooine': { x: 600, y: 500, description: 'A harsh desert world orbiting twin suns.' },
  'Lothal': { x: 700, y: 300, description: 'Outer Rim world that birthed a rebellion cell.' },
  'Ferrix': { x: 400, y: 400, description: 'Blue-collar industrial world with strong community.' },
  'Scarif': { x: 300, y: 600, description: 'Tropical paradise used for Imperial data archives.' },
  'Hoth': { x: 200, y: 200, description: 'Frigid ice planet that housed Echo Base.' },
  'Endor': { x: 250, y: 400, description: 'The forest moon, home to the Ewoks.' },
  'Nevarro': { x: 400, y: 650, description: 'Volcanic world turned prosperous trade hub.' },
  'Peridea': { x: 100, y: 100, description: 'A distant world in another galaxy.' },
  'Unknown Spaces': { x: 800, y: 700, description: 'Uncharted regions of the galaxy.' },
  'Castilon': { x: 150, y: 750, description: 'Ocean planet in the Outer Rim.' },
  'Jakku': { x: 450, y: 600, description: 'Desert planet littered with wreckage.' },
  'Crait': { x: 500, y: 700, description: 'Mineral world with a red surface beneath salt.' },
  'Exegol': { x: 850, y: 150, description: 'Hidden world of the Sith in the Unknown Regions.' }
};`;

// Extract using eval since it's just pure JS object
const planetsObj = eval('(' + currentPlanetsStr.replace('export const planets = ', '').replace(/};$/, '}') + ')');

const manualCoords = {
  'Nevarro': { X: 16.5, Y: 18.2 },
  'Exegol': { X: 3.1, Y: 18.5 },
  'Peridea': { X: 25.0, Y: -5.0 },
  'Castilon': { X: 18.0, Y: 4.5 },
  'Ferrix': { X: 14.2, Y: 12.5 },
  'Unknown Spaces': { X: 5.0, Y: 15.0 },
  'Crait': { X: 12.0, Y: 17.5 },
  'Lothal': { X: 17.2, Y: 8.5 },
  'Scarif': { X: 11.0, Y: 18.5 },
  'Jakku': { X: 10.5, Y: 13.5 }
};

let output = "export const planets = {\n";
for (const [name, data] of Object.entries(planetsObj)) {
  let found = planetsData.find(p => p.Name === name);
  let x, y;
  if (found && found.X !== undefined && found.Y !== undefined) {
    x = (found.X + (found.SubGridX || 0)) * 50;
    y = (found.Y + (found.SubGridY || 0)) * 50;
  } else if (manualCoords[name]) {
    x = manualCoords[name].X * 50;
    y = manualCoords[name].Y * 50;
  } else {
    x = data.x; y = data.y; // fallback
  }

  output += `  '${name}': { x: ${Math.round(x)}, y: ${Math.round(y)}, description: '${data.description}' },\n`;
}
output += "};\n";

console.log(output);
