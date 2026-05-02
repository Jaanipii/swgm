const fs = require('fs');
const crypto = require('crypto');

const files = fs.readdirSync(__dirname).filter(f => f.startsWith('scraped_') && f.endsWith('.json'));
const largestFile = files.reduce((prev, current) => {
  return (fs.statSync(current).size > fs.statSync(prev).size) ? current : prev;
});

const rawData = JSON.parse(fs.readFileSync(largestFile, 'utf8'));
const items = Array.isArray(rawData) ? rawData : (rawData.data || Object.values(rawData));

const validTypes = ['film', 'tv', 'book', 'comic', 'game', 'audio-drama', 'short-story', 'yr'];

let loreDict = {};
try {
  loreDict = JSON.parse(fs.readFileSync('src/data/lore_dictionary.json', 'utf8'));
} catch (e) {
  console.log("No lore patches found, proceeding with raw data.");
}

const onScreenItems = items.filter(item => {
  const t = (item.type || '').toLowerCase();
  return validTypes.includes(t);
});

let flatTimeline = [];

const extractText = (field) => {
  if (!field) return null;
  if (typeof field === 'string') return field;
  if (Array.isArray(field)) {
    return field.map(f => {
      if (typeof f === 'string') return f;
      if (f.text) return f.text;
      if (f.page) return f.page;
      if (f.type === 'list' && Array.isArray(f.data)) {
        return f.data.map(subItem => extractText(subItem)).join(' ');
      }
      return '';
    }).join('').trim();
  }
  return null;
};

const extractArrayText = (field) => {
  if (!field) return [];
  if (Array.isArray(field)) {
    // Sometimes it's an array of objects, sometimes an array of arrays
    return field.map(f => {
      if (Array.isArray(f)) return extractText(f);
      return extractText([f]);
    }).filter(text => text && text.trim() !== '');
  }
  return [];
};

onScreenItems.forEach(item => {
  const coverHashVal = item.coverHash ? item.coverHash : null;
  const dateStr = extractText(item.dateDetails) || item.date || item.releaseDate || 'Unknown';
  const notesStr = extractText(item.timelineNotes);
  const starsArray = extractArrayText(item.starring || item.characters);
  
  // For non-video media, map authors to writers and illustrators/developers to director
  const directorVal = extractArrayText(item.director || item.illustrator || item.developer);
  const writerVal = extractArrayText(item.writerDetails || item.author || item.writer);
  const producersVal = extractArrayText(item.executiveProducers || item.publisher);
  const runtimeVal = extractText(item.runtime || item.pages || item.pageCount);
  const networkVal = extractArrayText(item.network);
  const productionVal = extractArrayText(item.production);

  // Doomsday Risk Mitigation: Fallback Deterministic ID Generation
  const rawId = item._id || item.id;
  const safeId = rawId ? String(rawId) : crypto.createHash('md5').update((item.title || '') + (item.date || '')).digest('hex').substring(0, 10);

  // Normalize Type
  let normalizedType = item.type === 'yr' ? 'book' : item.type;

  if (normalizedType === 'film') {
    flatTimeline.push({
      id: safeId,
      title: item.title,
      type: 'movie',
      era: item.era || 'Unknown',
      year: item.date || item.releaseDate || 'Unknown',
      releaseDate: item.releaseDate,
      dateDetails: dateStr,
      timelineNotes: notesStr,
      starring: starsArray,
      director: directorVal,
      writer: writerVal,
      producers: producersVal,
      runtime: runtimeVal,
      network: networkVal,
      production: productionVal,
      coverHash: coverHashVal,
      primaryPlanet: 'Unknown Spaces' 
    });
  } else if (normalizedType === 'tv') {
    if (item.season || item.episode || item.series) {
       flatTimeline.push({
        id: safeId,
        title: item.series ? item.series + ' - S' + (item.season || '1') + 'E' + (item.episode || '1') + ': ' + item.title : item.title,
        type: 'series',
        era: item.era || 'Unknown',
        year: item.date || item.releaseDate || 'Unknown',
        releaseDate: item.releaseDate,
        dateDetails: dateStr,
        timelineNotes: notesStr,
        starring: starsArray,
        director: directorVal,
        writer: writerVal,
        producers: producersVal,
        runtime: runtimeVal,
        network: networkVal,
        production: productionVal,
        coverHash: coverHashVal,
        primaryPlanet: 'Unknown Spaces'
      });
    } else {
       flatTimeline.push({
        id: safeId,
        title: item.title,
        type: 'series',
        era: item.era || 'Unknown',
        year: item.date || item.releaseDate || 'Unknown',
        releaseDate: item.releaseDate,
        dateDetails: dateStr,
        timelineNotes: notesStr,
        starring: starsArray,
        director: directorVal,
        writer: writerVal,
        producers: producersVal,
        runtime: runtimeVal,
        network: networkVal,
        production: productionVal,
        coverHash: coverHashVal,
        primaryPlanet: 'Unknown Spaces'
      });
    }
  } else if (['book', 'comic', 'game', 'audio-drama', 'short-story'].includes(normalizedType)) {
    flatTimeline.push({
        id: safeId,
        title: item.title,
        type: normalizedType,
        era: item.era || 'Unknown',
        year: item.date || item.releaseDate || 'Unknown',
        releaseDate: item.releaseDate,
        dateDetails: dateStr,
        timelineNotes: notesStr,
        starring: starsArray,
        director: directorVal, // Mapping illustrator/dev
        writer: writerVal, // Mapping author
        producers: producersVal, // Mapping publisher
        runtime: runtimeVal, // Mapping page count
        network: networkVal,
        production: productionVal,
        coverHash: coverHashVal,
        primaryPlanet: 'Unknown Spaces'
    });
  }
});

flatTimeline = flatTimeline.map(item => {
  const patch = loreDict[item.id];
  if (patch) {
    if (patch.primaryPlanet) item.primaryPlanet = patch.primaryPlanet;
    if (patch.abstract) item.abstract = patch.abstract;
    if (patch.canon_state) item.canon_state = patch.canon_state;
    if (patch.key_characters) item.key_characters = patch.key_characters;
    if (patch.canon_tier) item.canon_tier = patch.canon_tier;
    
    // Apply physical constraints (using pages as runtime weight if text based)
    if (patch.pages) item.runtime = String(patch.pages) + ' pages';
    if (patch.metricDuration) item.runtime = String(patch.metricDuration) + ' mins';
  }
  return item;
});

const code = `// Extracted and mapped from starwarstl.com API
export const starWarsTimeline = ${JSON.stringify(flatTimeline, null, 2)};

export const planets = {
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
};
`;

fs.writeFileSync('src/data/timeline.js', code);
console.log('Saved ' + flatTimeline.length + ' items to src/data/timeline.js');
