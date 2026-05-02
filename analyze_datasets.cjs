const fs = require('fs');
const regions = require('./datasets/StarWarsMap/map_api/data/regions_db.json');
const hyperlanes = require('./datasets/StarWarsMap/map_api/data/hyperlanes_db.json');

// Find Coruscant in regions
let coruscantCoords = null;
for (const region of Object.values(regions)) {
  for (const subregion of Object.values(region)) {
    for (const planet of subregion) {
      if (planet.name === 'Coruscant') {
        coruscantCoords = planet.coords;
      }
    }
  }
}
console.log('Wason1797 Coruscant:', coruscantCoords);

// Let's also find Tatooine
let tatooineCoords = null;
for (const region of Object.values(regions)) {
  for (const subregion of Object.values(region)) {
    for (const planet of subregion) {
      if (planet.name === 'Tatooine') {
        tatooineCoords = planet.coords;
      }
    }
  }
}
console.log('Wason1797 Tatooine:', tatooineCoords);
