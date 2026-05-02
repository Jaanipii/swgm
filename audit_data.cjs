const fs = require('fs');
const path = require('path');

// Dynamically load the timeline array
const timelinePath = path.join(__dirname, 'src', 'data', 'timeline.js');
let timelineContent = fs.readFileSync(timelinePath, 'utf-8');

// Strip out the export to parse as pure JSON/Array
let startStr = 'export const starWarsTimeline = ';
let startIndex = timelineContent.indexOf(startStr);
let arrStr = timelineContent.substring(startIndex + startStr.length);
let nextExport = arrStr.indexOf('\nexport ');
if (nextExport !== -1) arrStr = arrStr.substring(0, nextExport);
arrStr = arrStr.replace(/;\s*$/, '');
const timeline = eval(arrStr);

const stats = {
   total: timeline.length,
   types: {},
   missingYear: 0,
   missingRuntime: 0,
   missingCreators: 0,
   missingCover: 0,
   missingPlanet: 0
};

timeline.forEach(item => {
   // Count Types
   const type = item.type || 'unknown';
   stats.types[type] = (stats.types[type] || 0) + 1;

   // 1. Missing Year
   if (!item.year || item.year === 'Unknown') {
      stats.missingYear++;
   }

   // 2. Missing Runtime/Pages (0 or falsy)
   if (!item.runtime || parseInt(item.runtime) === 0 || isNaN(parseInt(item.runtime))) {
      stats.missingRuntime++;
   }

   // 3. Missing Creators
   const hasWriter = Array.isArray(item.writer) ? item.writer.length > 0 : !!item.writer;
   const hasDirector = Array.isArray(item.director) ? item.director.length > 0 : !!item.director;
   const hasProducers = Array.isArray(item.producers) ? item.producers.length > 0 : !!item.producers;
   
   if (!hasWriter && !hasDirector && !hasProducers) {
      stats.missingCreators++;
   }

   // 4. Missing Cover
   if (!item.cover) {
      stats.missingCover++;
   }

   // 5. Missing Planet
   if (!item.primaryPlanet || item.primaryPlanet === 'Unknown Spaces') {
      stats.missingPlanet++;
   }
});

const report = `
# Data Health Diagnostic Report

**Total Items Analyzed:** ${stats.total}

### Breakdown by Media Type
${Object.keys(stats.types).map(t => `- **${t.toUpperCase()}**: ${stats.types[t]}`).join('\n')}

### Critical Deficiencies
- **Missing Temporal Data (Unknown Year):** ${stats.missingYear} items (${((stats.missingYear / stats.total) * 100).toFixed(1)}%)
  *Impact: Cannot be mathematically plotted on the master timeline.*

- **Missing Runtime/Pages:** ${stats.missingRuntime} items (${((stats.missingRuntime / stats.total) * 100).toFixed(1)}%)
  *Impact: Throws off the Hours Logged slider mathematics.*

### Lore Deficiencies
- **Nameless Creators (No Writer/Director/Producer):** ${stats.missingCreators} items (${((stats.missingCreators / stats.total) * 100).toFixed(1)}%)
  *Impact: Lore Cards look barren.*

- **Missing Primary Planetary Association:** ${stats.missingPlanet} items (${((stats.missingPlanet / stats.total) * 100).toFixed(1)}%)
  *Impact: Forces the item into the 'Unknown Spaces' default 3D rendering corner.*

- **Missing Cover Art URLs:** ${stats.missingCover} items (${((stats.missingCover / stats.total) * 100).toFixed(1)}%)
  *Impact: Null imagery in Lore Cards.*
`;

const outputPath = path.join('/Users/jaani/.gemini/antigravity/brain/a245ce3a-b000-4c53-9185-9ff7803eb06e', 'data_health_report.md');
fs.writeFileSync(outputPath, report, 'utf-8');
console.log('Saved health report to:', outputPath);
