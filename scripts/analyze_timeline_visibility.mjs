import fs from 'fs';

async function analyze() {
  console.log("Loading Map Memory Banks...");
  
  const { starWarsTimeline, planets } = await import('../src/data/timeline.js');
  const timelineUsage = {};
  
  starWarsTimeline.forEach(item => {
    const pName = item.primaryPlanet;
    if (!pName || pName === 'Unknown Spaces' || pName === 'Planet Unknown') return;
    timelineUsage[pName] = (timelineUsage[pName] || 0) + 1;
  });

  console.log(`Found ${Object.keys(timelineUsage).length} unique planets actively featured in the timeline.`);

  // Load galactic data modules
  const { allPlanets, timelinePlanets } = await import('../src/data/galacticData.js');
  
  // Convert arrays to quick lookup maps
  const allPlanetsMap = new Map();
  allPlanets.forEach(p => allPlanetsMap.set(p.name, p));
  
  const metrics = {
    majorRendered: [], // In planets (always rendered huge)
    timelineInjectedRendered: [], // In timelinePlanets (promoted to front of slider)
    backgroundSliderCulled: [], // In allPlanets (subject to slider culling!)
    completelyMissing: [] // Has NO x/y coordinates anywhere
  };

  Object.entries(timelineUsage).forEach(([pName, count]) => {
    if (planets[pName]) {
      metrics.majorRendered.push({ name: pName, count });
    } else if (timelinePlanets[pName]) {
      metrics.timelineInjectedRendered.push({ name: pName, count });
    } else if (allPlanetsMap.has(pName)) {
      metrics.backgroundSliderCulled.push({ name: pName, count });
    } else {
      metrics.completelyMissing.push({ name: pName, count });
    }
  });

  const sortedCulled = metrics.backgroundSliderCulled.sort((a,b) => b.count - a.count);

  console.log(`\n--- DEEP ANALYSIS REPORT ---`);
  console.log(`🟢 ${metrics.majorRendered.length} Major Planets perfectly rendered (Tatooine, Coruscant)`);
  console.log(`🟢 ${metrics.timelineInjectedRendered.length} AI Injected Planets mathematically forced to render (Tenoo)`);
  console.log(`🟡 ${metrics.backgroundSliderCulled.length} Story Planets subject to Slider Culling (They have X/Y, but are rendered as background stars)`);
  console.log(`🔴 ${metrics.completelyMissing.length} Story Planets completely missing X/Y coordinates`);

  console.log(`\nTop 15 Story Planets vulnerable to Density Slider Culling:`);
  sortedCulled.slice(0, 15).forEach(p => console.log(` - ${p.name} (Used in ${p.count} episodes)`));
  
  console.log(`\nStory Planets completely missing X/Y:`);
  metrics.completelyMissing.slice(0, 15).forEach(p => console.log(` - ${p.name} (Used in ${p.count} episodes)`));

}

analyze();
