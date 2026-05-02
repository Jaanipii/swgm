import { allPlanets } from './src/data/galacticData.js';
console.log(allPlanets.length);
console.log(allPlanets.slice(0, 5).map(p => p.name));
