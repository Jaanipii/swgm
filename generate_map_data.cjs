const fs = require('fs');
const regionsDB = require('./datasets/StarWarsMap/map_api/data/regions_db.json');
const hyperlanesDB = require('./datasets/StarWarsMap/map_api/data/hyperlanes_db.json');
// We don't need external imports for timeline

// 1. Data Extractor
const rawPlanets = {}; // name -> {x, y, is_canon, region}
Object.entries(regionsDB).forEach(([regionName, subRegions]) => {
  Object.values(subRegions).forEach((planetList) => {
    planetList.forEach(p => {
      rawPlanets[p.name] = { 
        x: p.coords[0], 
        y: p.coords[1], 
        region: regionName 
      };
    });
  });
});

// 2. Coordinate Transformer (to 2400x2400)
function toSvg(x, y) {
  return [Math.round(1200 + x), Math.round(1200 - y)];
}

// 3. Monotone Chain Convex Hull algorithm
function cross(a, b, o) {
  return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
}
function convexHull(points) {
  points.sort((a, b) => a[0] == b[0] ? a[1] - b[1] : a[0] - b[0]);
  const lower = [];
  for (let i = 0; i < points.length; i++) {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], points[i]) <= 0) {
      lower.pop();
    }
    lower.push(points[i]);
  }
  const upper = [];
  for (let i = points.length - 1; i >= 0; i--) {
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], points[i]) <= 0) {
      upper.pop();
    }
    upper.push(points[i]);
  }
  upper.pop();
  lower.pop();
  return lower.concat(upper);
}

// 4. Generate Regions
const outRegions = [];
const majorRegions = ["Deep Core", "Core", "Colonies", "Inner Rim", "Expansion Region", "Mid Rim", "Outer Rim", "Hutt Space", "Unknown Regions"];
// Wait, not all regions in Wason match perfectly to these string keys. Let's inspect region names. Wait!
const regionNames = Object.keys(regionsDB);

regionNames.forEach(rn => {
    let pts = [];
    Object.values(regionsDB[rn]).forEach(subList => {
        subList.forEach(p => pts.push(toSvg(p.coords[0], p.coords[1])));
    });
    if (pts.length > 2) {
        let hull = convexHull(pts);
        if (hull.length > 0) {
            let path = `M ${hull[0][0]} ${hull[0][1]}`;
            for (let i = 1; i < hull.length; i++) {
                path += ` L ${hull[i][0]} ${hull[i][1]}`;
            }
            path += ' Z';
            outRegions.push({ name: rn, path });
        }
    }
});

// 5. Generate Hyperlanes
const outHyperlanes = [];
Object.entries(hyperlanesDB).forEach(([laneName, pNames]) => {
  let pathStr = "";
  pNames.forEach(pn => {
    let raw = rawPlanets[pn];
    if (raw) {
      let [sx, sy] = toSvg(raw.x, raw.y);
      if (!pathStr) pathStr = `M ${sx} ${sy}`;
      else pathStr += ` L ${sx} ${sy}`;
    }
  });
  if (pathStr) outHyperlanes.push({ name: laneName, path: pathStr });
});

// 6. Our required timeline planets + fallbacks mapped to SVG
const timelinePlanetsList = [
  'Coruscant', 'Naboo', 'Geonosis', 'Mandalore', 'Mustafar', 'Kamino', 'Corellia', 'Tatooine', 'Lothal', 'Ferrix', 'Scarif', 'Hoth', 'Endor', 'Nevarro', 'Peridea', 'Unknown Spaces', 'Castilon', 'Jakku', 'Crait', 'Exegol'
];

// Provide manual fallbacks for disney era items that might be missing in Wason
const manualWason = {
  'Nevarro': { x: 700, y: -700, region: 'Outer Rim' }, // Near Tatooineish
  'Exegol': { x: -800, y: 700, region: 'Unknown Regions' },
  'Peridea': { x: -1400, y: 1400, region: 'Extragalactic' },
  'Castilon': { x: 800, y: 600, region: 'Outer Rim' },
  'Ferrix': { x: 200, y: 100, region: 'Mid Rim' },
  'Unknown Spaces': { x: -600, y: 500, region: 'Unknown Regions' },
  'Crait': { x: 400, y: -800, region: 'Outer Rim' },
  'Lothal': { x: 900, y: 400, region: 'Outer Rim' },
  'Scarif': { x: 500, y: 600, region: 'Outer Rim' }, // wait, Scarif is in Wason? Let's check when running.
  'Jakku': { x: 250, y: 150, region: 'Inner Rim' }
};

const mappedPlanets = {};
timelinePlanetsList.forEach(p => {
    let rp = rawPlanets[p];
    if (rp) {
        let [sx, sy] = toSvg(rp.x, rp.y);
        mappedPlanets[p] = { x: sx, y: sy, region: rp.region };
    } else if (manualWason[p]) {
        let [sx, sy] = toSvg(manualWason[p].x, manualWason[p].y);
        mappedPlanets[p] = { x: sx, y: sy, region: manualWason[p].region };
    } else {
        mappedPlanets[p] = { x: 1200, y: 1200, region: 'Unknown' };
    }
});

// 7. Write to galacticData.js
const allPlanetsArr = Object.entries(rawPlanets).map(([name, data]) => {
  let [sx, sy] = toSvg(data.x, data.y);
  return { name, x: sx, y: sy, region: data.region };
});

const output = `export const galacticRegions = ${JSON.stringify(outRegions, null, 2)};
export const hyperlanes = ${JSON.stringify(outHyperlanes, null, 2)};
export const timelinePlanets = ${JSON.stringify(mappedPlanets, null, 2)};
export const allPlanets = ${JSON.stringify(allPlanetsArr, null, 2)};
`;
fs.writeFileSync('./src/data/galacticData.js', output);
console.log('Galactic data generated to src/data/galacticData.js');
