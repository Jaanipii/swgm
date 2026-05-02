const fs = require('fs');

async function fetchAll() {
  let allPlanets = {};
  let url = 'https://swapi.py4e.com/api/planets/';
  
  while (url) {
    const res = await fetch(url);
    const data = await res.json();
    for (const p of data.results) {
      allPlanets[p.name] = {
        name: p.name,
        climate: p.climate,
        terrain: p.terrain,
        population: p.population,
        diameter: p.diameter,
        rotation_period: p.rotation_period,
        orbital_period: p.orbital_period
      };
    }
    url = data.next;
  }
  
  const content = `// Scraped from SWAPI
export const planetLore = ${JSON.stringify(allPlanets, null, 2)};
`;
  fs.writeFileSync('src/data/planetLore.js', content);
  console.log("Successfully wrote " + Object.keys(allPlanets).length + " planets to planetLore.js");
}

fetchAll();
