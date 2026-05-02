import { starWarsTimeline } from '../data/timeline';

export function getShortSeriesName(title) {
  if (!title) return null;
  // E.g. "Star Wars: The Acolyte - S1E7: Choice" -> "The Acolyte"
  // "Star Wars Galaxy of Adventures - ..." -> "Galaxy of Adventures"
  
  // Extract up to the first ' - '
  let seriesPart = title.split(' - ')[0];
  
  // Remove "Star Wars:" or "Star Wars" prefix
  seriesPart = seriesPart.replace(/^Star Wars:\s*/i, '');
  seriesPart = seriesPart.replace(/^Star Wars\s+/i, '');
  
  // Remove qualifiers like "(television series)"
  seriesPart = seriesPart.replace(/\s*\(.*?\)/g, '');
  
  return seriesPart.trim();
}

export function getUniqueSeries() {
  const seriesNames = new Set();
  starWarsTimeline.forEach(item => {
    if (item.type === 'series' || item.type === 'Series') {
      const name = getShortSeriesName(item.title);
      if (name) seriesNames.add(name);
    }
  });
  return Array.from(seriesNames).sort();
}

export const filterEras = [
  "The High Republic",
  "Fall of the Jedi",
  "Reign of the Empire",
  "Age of Rebellion",
  "The New Republic",
  "Rise of the First Order",
  "Unknown"
];
