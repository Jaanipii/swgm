const fs = require('fs');
const regionsDB = require('./datasets/StarWarsMap/map_api/data/regions_db.json');
const hyperlanesDB = require('./datasets/StarWarsMap/map_api/data/hyperlanes_db.json');

// Flat planet dictionary
const planetsDict = {};

// We define our scaling constants
const SCALE = 30; // Original wason coords range up to ~15000? Wait, tatooine was 644. Let's find max.
// Let's first dump max bounds

let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;

Object.entries(regionsDB).forEach(([regionName, subRegions]) => {
  Object.values(subRegions).forEach(planets => {
    planets.forEach(p => {
      planetsDict[p.name] = p.coords;
      if (p.coords[0] < minX) minX = p.coords[0];
      if (p.coords[0] > maxX) maxX = p.coords[0];
      if (p.coords[1] < minY) minY = p.coords[1];
      if (p.coords[1] > maxY) maxY = p.coords[1];
    });
  });
});

console.log(`Bounds: X:[${minX}, ${maxX}] Y:[${minY}, ${maxY}]`);
