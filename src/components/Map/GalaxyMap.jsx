import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { planets, starWarsTimeline } from '../../data/timeline';
import { galacticRegions, hyperlanes, allPlanets, timelinePlanets } from '../../data/galacticData';
import { historicalEvents } from '../../data/historicalEvents';
import planetFactions from '../../data/planetFactions.json';
import { fetchWikiData } from '../../utils/wikiApi';
import { planetLore } from '../../data/planetLore';
import { planetSpecies } from '../../data/planetSpecies';
import PlanetSearch from './PlanetSearch';

// === PRE-COMPUTED STATIC DATA (runs once at module load) ===

// Ambient dust particles for deep-space background
const ambientDust = Array.from({ length: 3000 }).map((_, i) => ({
  x: (Math.random() * 10000) - 3800,
  y: (Math.random() * 10000) - 3800,
  size: Math.random() * 2 + 0.5,
  opacity: Math.random() * 0.8 + 0.2
}));

// Spiral galaxy particles (logarithmic spiral)
const spiralStars = [];
const numArms = 5;
const arms = Array.from({ length: numArms }).map((_, i) => (Math.PI * 2 / numArms) * i);
const maxRadius = 1300;
for (let i = 0; i < 2500; i++) {
  const arm = arms[i % numArms];
  const r = Math.random() * maxRadius;
  const theta = arm + (r * 0.007) + (Math.random() * 0.3 - 0.15); 
  const isCore = r < 400;
  spiralStars.push({ 
    x: 1220 + r * Math.cos(theta),
    y: 1330 + r * Math.sin(theta),
    size: Math.random() * 1.5 + 0.5,
    opacity: isCore ? ((1 - r / maxRadius) * Math.random()) * 2 : (1 - r / maxRadius) * Math.random(), 
    color: isCore ? '#ffe8aa' : '#aaccff' 
  });
}

// O(1) lookup map for the 17K+ planet array (optimization #7)
const allPlanetsMap = new Map();
if (allPlanets) {
  allPlanets.forEach(p => allPlanetsMap.set(p.name.toLowerCase(), p));
}

function findPlanetByName(name) {
  if (!name) return null;
  const exact = allPlanetsMap.get(name.toLowerCase());
  if (exact) return exact;
  // Fallback to fuzzy partial match only if exact fails
  const lowerName = name.toLowerCase();
  for (const [key, val] of allPlanetsMap) {
    if (key.includes(lowerName) || lowerName.includes(key)) return val;
  }
  return null;
}

// Score lore relevance to prioritize planets in the density slider
const getLoreScore = (planetName) => {
  let score = 0;
  // Planets involved in major historical events
  if (historicalEvents.some(e => e.planetId === planetName)) {
    score += 50;
  }
  // Planets with detailed lore/descriptions
  if (planetLore[planetName]) {
    score += 10;
    if (planetLore[planetName].climate && planetLore[planetName].climate !== 'unknown') score += 10;
    if (planetLore[planetName].terrain && planetLore[planetName].terrain !== 'unknown') score += 10;
  }
  // Planets with known factions
  if (planetFactions[planetName]) {
    score += 15;
  }
  // Planets with known species
  if (planetSpecies[planetName] && planetSpecies[planetName].length > 0) {
    score += 15;
  }
  return score;
};

// Merge the canonical timeline injected locations dynamically
const timelineInjections = Object.entries(timelinePlanets).map(([name, data]) => ({
  name,
  x: data.x,
  y: data.y,
  region: 'Lore Location'
}));

const combinedMap = new Map();
if (allPlanets) {
  allPlanets.forEach(p => combinedMap.set(p.name.toLowerCase(), p));
}
timelineInjections.forEach(p => combinedMap.set(p.name.toLowerCase(), p));

const mergedPlanetsArray = Array.from(combinedMap.values());

// Sort strictly for the visible slider limit, fallback to alphabetical
const sortedAllPlanets = mergedPlanetsArray.sort((a, b) => {
  // Force heavily vetted Canon Injections to the absolute top so they are never slider-culled
  const aIsTimeline = timelinePlanets[a.name] ? 1 : 0;
  const bIsTimeline = timelinePlanets[b.name] ? 1 : 0;
  if (aIsTimeline !== bIsTimeline) return bIsTimeline - aIsTimeline;

  const scoreDiff = getLoreScore(b.name) - getLoreScore(a.name);
  if (scoreDiff !== 0) return scoreDiff;
  return a.name.localeCompare(b.name);
});


// Faction colors shown in planet glows — used in legend
const factionColors = {
  "The High Republic": [
    { name: "Republic", color: "rgba(50, 150, 255, 0.45)" },
    { name: "Jedi Order", color: "rgba(255, 215, 0, 0.45)" },
  ],
  "Fall of the Jedi": [
    { name: "Republic", color: "rgba(50, 150, 255, 0.45)" },
    { name: "Separatists (CIS)", color: "rgba(255, 120, 50, 0.45)" },
  ],
  "Reign of the Empire": [
    { name: "Galactic Empire", color: "rgba(255, 50, 50, 0.35)" },
    { name: "Rebellion", color: "rgba(255, 150, 50, 0.6)" },
    { name: "Hutt / Syndicate", color: "rgba(50, 200, 50, 0.45)" },
  ],
  "Age of Rebellion": [
    { name: "Galactic Empire", color: "rgba(255, 50, 50, 0.35)" },
    { name: "Rebel Alliance", color: "rgba(255, 150, 50, 0.6)" },
    { name: "Hutt / Syndicate", color: "rgba(50, 200, 50, 0.45)" },
  ],
  "The New Republic": [
    { name: "New Republic", color: "rgba(50, 150, 255, 0.45)" },
    { name: "Imperial Remnant", color: "rgba(255, 50, 50, 0.45)" },
    { name: "Mandalorian", color: "rgba(150, 150, 150, 0.45)" },
  ],
  "Rise of the First Order": [
    { name: "First Order", color: "rgba(255, 50, 50, 0.45)" },
    { name: "Resistance", color: "rgba(50, 150, 255, 0.45)" },
  ],
};

const regionLabels = {
  "Deep Core": { x: 1200, y: 1250 },
  "Core": { x: 1200, y: 1100 },
  "Colonies": { x: 1200, y: 980 },
  "Inner Rim": { x: 1200, y: 880 },
  "Expansion Regions": { x: 1200, y: 750 },
  "Mid Rim": { x: 1200, y: 550 },
  "Outer Rim": { x: 1200, y: 250 },
  "Unknown Regions": { x: 600, y: 1500 },
  "Hutt Space": { x: 1900, y: 1300 },
  "Wild Space": { x: 2100, y: 1900 }
};

export default function GalaxyMap({ activePlanetId, previousPlanetId, activeEra, onPlanetSelect, onHistoricalEventSelect, onRouteSelect, isMapTransitioning, onPlanetHighlight, panTrigger }) {
  const canvasRef = useRef(null);
  const transformComponentRef = useRef(null);
  const bgCanvasRef = useRef(null);
  const [visiblePlanetCount, setVisiblePlanetCount] = useState(0);
  const [hoveredPlanet, setHoveredPlanet] = useState(null);
  const [hoveredEvent, setHoveredEvent] = useState(null); // Added
  const [hoveredRoute, setHoveredRoute] = useState(null);
  const [searchResults, setSearchResults] = useState([]); // Added
  const [showRegions, setShowRegions] = useState(true);
  const [showAllegiance, setShowAllegiance] = useState(true);
  const [detailThreshold, setDetailThreshold] = useState(1.8);

  const storyCriticalNames = useMemo(() => {
    const s = new Set();
    if (starWarsTimeline) {
      starWarsTimeline.forEach(ep => {
        if (ep.primaryPlanet && ep.primaryPlanet !== 'Unknown Spaces' && ep.primaryPlanet !== 'Planet Unknown') {
          s.add(ep.primaryPlanet.toLowerCase());
        }
      });
    }
    return s;
  }, [starWarsTimeline]);

  const [transform, setTransform] = useState({ scale: 1, x: 0, y: 0 });
  const [showTradeRoutes, setShowTradeRoutes] = useState(true);
  const [showHistoricalEvents, setShowHistoricalEvents] = useState(true);
  const [hoveredRouteData, setHoveredRouteData] = useState(null);
  const [isRouteLoading, setIsRouteLoading] = useState(false);
  const hoverTimerRef = useRef(null);
  
  // Find full system data using O(1) lookup map
    let activeStarSystem = null;
    let prevStarSystem = null;

    if (activePlanetId) {
      activeStarSystem = allPlanetsMap.get(activePlanetId.toLowerCase()) || findPlanetByName(activePlanetId) || timelinePlanets[activePlanetId] || planets[activePlanetId];
    }
    
    if (previousPlanetId) {
      prevStarSystem = allPlanetsMap.get(previousPlanetId.toLowerCase()) || findPlanetByName(previousPlanetId) || timelinePlanets[previousPlanetId] || planets[previousPlanetId];
    }

  const getPlanetFactionColor = (planetName) => {
    const factions = planetFactions[planetName];
    if (!factions || !activeEra) return null;

    if (activeEra === "The High Republic") {
      if (factions["Republic"]) return "rgba(50, 150, 255, 0.45)";
      if (factions["Jedi"]) return "rgba(255, 215, 0, 0.45)";
    } else if (activeEra === "Fall of the Jedi") {
      if (factions["CIS"]) return "rgba(255, 120, 50, 0.45)";
      if (factions["Republic"]) return "rgba(50, 150, 255, 0.45)";
    } else if (activeEra === "Reign of the Empire" || activeEra === "Age of Rebellion") {
      if (factions["Rebellion"]) return "rgba(255, 150, 50, 0.6)"; 
      if (factions["Empire"]) return "rgba(255, 50, 50, 0.35)";
      if (factions["Hutt/Syndicate"]) return "rgba(50, 200, 50, 0.45)";
    } else if (activeEra === "The New Republic") {
      if (factions["New Republic"]) return "rgba(50, 150, 255, 0.45)";
      if (factions["Empire"]) return "rgba(255, 50, 50, 0.45)";
      if (factions["Mandalorian"]) return "rgba(150, 150, 150, 0.45)";
    } else if (activeEra === "Rise of the First Order") {
      if (factions["First Order"]) return "rgba(255, 50, 50, 0.45)";
      if (factions["New Republic"]) return "rgba(50, 150, 255, 0.45)";
    }
    return null;
  };

  // Draw the 17000+ star systems onto the high-perf canvas layer once
  useEffect(() => {
    if (canvasRef.current && allPlanets) {
      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, 4800, 4800);
      
      ctx.save();
      ctx.translate(1200, 1200);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      
      allPlanets.forEach(sys => {
        ctx.fillRect(sys.x - 1, sys.y - 1, 2, 2);
      });

      ctx.restore();
    }
  }, []);

  // Optimization #2: Draw ambient dust + spiral galaxy onto a dedicated canvas (5500 fewer DOM nodes)
  useEffect(() => {
    if (!bgCanvasRef.current) return;
    const ctx = bgCanvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, 4800, 4800);
    
    ctx.save();
    ctx.translate(1200, 1200);

    // Draw ambient dust
    ambientDust.forEach(star => {
      ctx.globalAlpha = star.opacity;
      ctx.fillStyle = 'white';
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fill();
    });
    
    // Draw galactic core glow
    const coreGrad = ctx.createRadialGradient(1220, 1330, 0, 1220, 1330, 450);
    coreGrad.addColorStop(0, 'rgba(255, 255, 230, 0.9)');
    coreGrad.addColorStop(0.1, 'rgba(255, 232, 150, 0.6)');
    coreGrad.addColorStop(0.3, 'rgba(100, 180, 255, 0.2)');
    coreGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.globalAlpha = 1;
    ctx.fillStyle = coreGrad;
    ctx.beginPath();
    ctx.arc(1220, 1330, 450, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw spiral arm particles
    spiralStars.forEach(star => {
      ctx.globalAlpha = star.opacity;
      ctx.fillStyle = star.color;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fill();
    });
    
    ctx.restore();
    ctx.globalAlpha = 1;
  }, []);

  // Handle cinematic zoom-in effect dropping out of hyperspace
  useEffect(() => {
    if (isMapTransitioning && transformComponentRef.current) {
      const { setTransform } = transformComponentRef.current;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      
      // Center over Galactic Core (Coruscant area = ~1250 native + 1200 offset) -> ~2450
      const visibleCenterX = (vw - 450) / 2;
      const visibleCenterY = vh / 2;
      const px = 2450;
      const py = 2450;
      
      // Start at furthest safe bounds without revealing 4800px edge
      const startScale = 0.8; 
      // Zoom into map twice as deep (1.2 instead of 1.0)
      const targetScale = 1.2; 
      
      const xStart = visibleCenterX - (px * startScale);
      const yStart = visibleCenterY - (py * startScale);
      const xTarget = visibleCenterX - (px * targetScale);
      const yTarget = visibleCenterY - (py * targetScale);

      // Instantly snap out
      setTransform(xStart, yStart, startScale, 0); 
      
      // Animate inwards rapidly as flash starts to dissipate
      setTimeout(() => {
         // Check if still mounted
         if (transformComponentRef.current) {
             // 300ms zoom was too fast/jerky. Use a long 4000ms easeOut for a beautiful logarithmic cinematic crawl
             transformComponentRef.current.setTransform(xTarget, yTarget, targetScale, 4000, "easeOut");
         }
      }, 4000);
    }
  }, [isMapTransitioning]);

  useEffect(() => {
    if (activePlanetId && activeStarSystem && transformComponentRef.current && !isMapTransitioning) {
      const { setTransform } = transformComponentRef.current;
      // Protect Chrome compositor from crashing (4800px * 3.3 = 15840 < 16384 hardware limit)
      const targetScale = 3.3; 
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const visibleCenterX = (vw - 450) / 2;
      const visibleCenterY = vh / 2;
      
      const px = activeStarSystem.x + 1200;
      const py = activeStarSystem.y + 1200;
      
      const xTarget = visibleCenterX - (px * targetScale);
      const yTarget = visibleCenterY - (py * targetScale);

      setTransform(xTarget, yTarget, targetScale, 1500, "easeInOut");
    }
  }, [activePlanetId, activeStarSystem, isMapTransitioning, panTrigger]);

  // Optimization #3: Debounced route hover fetch (300ms delay, cached results are instant)
  useEffect(() => {
    if (hoveredRoute) {
      setIsRouteLoading(true);
      setHoveredRouteData(null);
      hoverTimerRef.current = setTimeout(() => {
        fetchWikiData(hoveredRoute).then(data => {
          setHoveredRouteData(data);
          setIsRouteLoading(false);
        });
      }, 300);
    } else {
      setHoveredRouteData(null);
      setIsRouteLoading(false);
    }
    return () => { clearTimeout(hoverTimerRef.current); };
  }, [hoveredRoute]);

  const displayDesc = activePlanetId && planets[activePlanetId] ? planets[activePlanetId].description : "A remote canonical star system.";

  // Frustum culling logic variables
  const minX = (-transform.x / transform.scale) - 400; // 400px over-render buffer
  const minY = (-transform.y / transform.scale) - 400;
  // Approximating max screen size
  const maxX = ((3000 - transform.x) / transform.scale) + 400;
  const maxY = ((2000 - transform.y) / transform.scale) + 400;

  return (
    <div className="map-container" style={{ width: '100%', height: '100%' }}>
      <TransformWrapper
        ref={transformComponentRef}
        initialScale={1}
        minScale={0.5}
        maxScale={10}
        centerOnInit={true}
        limitToBounds={true}
        wheel={{ step: 0.4 }}
        pinch={{ step: 5 }}
        panning={{ velocityDisabled: false }}
        onTransformed={(ref) => {
          setTransform({ scale: ref.state.scale, x: ref.state.positionX, y: ref.state.positionY });
        }}
        onZoom={(ref) => {
          setTransform({ scale: ref.state.scale, x: ref.state.positionX, y: ref.state.positionY });
        }}
      >
        <TransformComponent wrapperStyle={{ width: "100%", height: "100%" }}>
          <div style={{ position: 'relative', width: '4800px', height: '4800px', transformOrigin: '0 0' }}>
            {/* Background canvas: ambient dust + spiral galaxy (5500 particles, zero DOM nodes) */}
            <canvas
              ref={bgCanvasRef}
              width={4800}
              height={4800}
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
            />
            {/* Foreground canvas: 17K star systems */}
            <canvas
              ref={canvasRef}
              width={4800}
              height={4800}
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
            />
            <svg 
              viewBox="0 0 4800 4800" 
              className="galaxy-svg"
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'visible' }}
            >
              <g transform="translate(1200, 1200)">
              {/* Galactic Regions */}
              {showRegions && (
              <g className="regions">
          {galacticRegions.map((region, idx) => {
            return (
              <g key={`region-group-${idx}`}>
                <path
                  d={region.path}
                  fill="rgba(100, 150, 255, 0.03)"
                  stroke="rgba(100, 150, 255, 0.15)"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
                {regionLabels[region.name] && (
                  <text
                    x={regionLabels[region.name].x}
                    y={regionLabels[region.name].y}
                    fill="rgba(255, 255, 255, 0.15)"
                    fontSize="24"
                    fontWeight="bold"
                    textAnchor="middle"
                    letterSpacing="8"
                    style={{ pointerEvents: 'none', userSelect: 'none' }}
                  >
                    {region.name.toUpperCase()}
                  </text>
                )}
              </g>
            );
          })}
              </g>
              )}

        {/* Hyperspace Routes */}
        {showTradeRoutes && (
        <g className="hyperlanes">
          {hyperlanes.map((lane, idx) => {
            const isHovered = hoveredRoute === lane.name;
            return (
              <g key={`lane-group-${idx}`}>
                {/* Invisible thicker path for easier hover interaction */}
                <path
                  d={lane.path}
                  stroke="transparent"
                  strokeWidth="15"
                  fill="none"
                  style={{ cursor: 'pointer', pointerEvents: 'stroke' }}
                  onMouseEnter={() => setHoveredRoute(lane.name)}
                  onMouseLeave={() => setHoveredRoute(null)}
                  onClick={() => {
                    if (onRouteSelect) onRouteSelect(lane.name);
                    setHoveredRoute(null);
                  }}
                />
                {/* Visible Path */}
                <path
                  d={lane.path}
                  stroke={isHovered ? "#ffe81f" : "rgba(130, 220, 255, 0.3)"}
                  strokeWidth={isHovered ? "3" : "1.5"}
                  fill="none"
                  strokeLinejoin="round"
                  style={isHovered ? { filter: 'drop-shadow(0 0 6px rgba(255, 232, 31, 1))', pointerEvents: 'none', transition: 'all 0.2s ease' } : { pointerEvents: 'none', transition: 'all 0.2s ease' }}
                />
              </g>
            );
          })}
        </g>
        )}

        {/* Dynamic Hyperspace Travel Route */}
        <AnimatePresence>
          {activeStarSystem && prevStarSystem && (
            <motion.g
              key={`${previousPlanetId}-${activePlanetId}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Glow effect for the path */}
              <motion.path
                d={`M ${prevStarSystem.x} ${prevStarSystem.y} Q ${(prevStarSystem.x + activeStarSystem.x) / 2 + 100} ${(prevStarSystem.y + activeStarSystem.y) / 2 - 100} ${activeStarSystem.x} ${activeStarSystem.y}`}
                fill="none"
                stroke="#82dcff"
                strokeWidth={8}
                style={{ filter: 'blur(6px)' }}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
              {/* Bright inner path */}
              <motion.path
                d={`M ${prevStarSystem.x} ${prevStarSystem.y} Q ${(prevStarSystem.x + activeStarSystem.x) / 2 + 100} ${(prevStarSystem.y + activeStarSystem.y) / 2 - 100} ${activeStarSystem.x} ${activeStarSystem.y}`}
                fill="none"
                stroke="#ffffff"
                strokeWidth={2}
                strokeDasharray="8 6"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </motion.g>
          )}
        </AnimatePresence>

        {/* Background Planets & Story Planets Layout */}
        {sortedAllPlanets.map((p, idx) => {
          // Skip if it is already rendered as a major lore node
          if (planets[p.name]) return null;
          
          // Evaluated mathematically: is this a critical story node or timeline injection?
          const isCritical = timelinePlanets[p.name] || storyCriticalNames.has(p.name.toLowerCase());
          const isPastSliderCutoff = idx >= visiblePlanetCount;
          
          // GPU Cull: If it's aggressively past the slider limit and not a critical canon world, vanish it
          if (isPastSliderCutoff && !isCritical) return null;

          // Viewport GPU cull 
          if (p.x + 1200 < minX || p.x + 1200 > maxX || p.y + 1200 < minY || p.y + 1200 > maxY) return null;
          
          const lodDetailed = transform.scale >= detailThreshold;

          return (
            <g 
              key={`bg-planet-${idx}`}
              className="bg-planet-group"
              onClick={() => onPlanetSelect(p.name)}
              onMouseEnter={() => setHoveredPlanet(p.name)}
              onMouseLeave={() => setHoveredPlanet(null)}
              style={{ cursor: 'pointer' }}
            >
              <circle cx={p.x} cy={p.y} r={2} fill="#82dcff" opacity={0.6} />

              {/* Invisible Hitbox for easier hovering/clicking (ALWAYS active) */}
              <circle cx={p.x} cy={p.y} r={15} fill="transparent" style={{ pointerEvents: 'visiblePainted' }} />

              {/* Level of Detail Rendering (only when zoomed in, OR when hovered) */}
              {(lodDetailed || hoveredPlanet === p.name) && (
                <>
                  {/* Faction Glow (no blur for performance) */}
                  {showAllegiance && (() => { const fc = getPlanetFactionColor(p.name); return fc ? (
                    <circle 
                      cx={p.x} cy={p.y} 
                      r={6} 
                      fill={fc} 
                      opacity={0.5}
                      style={{ transition: 'fill 0.8s ease' }} 
                    />
                  ) : null; })()}
                  <text 
                    x={p.x} 
                    y={p.y + 8} 
                    fill="#82dcff"
                    fontSize="6"
                    textAnchor="middle"
                    opacity={0.8}
                    style={{ pointerEvents: 'none' }}
                  >
                    {p.name}
                  </text>
                </>
              )}
            </g>
          );
        })}

        {/* Major Timeline Planets */}
        {Object.entries(planets).map(([name, data]) => {
          // Sync hardcoded major planets with canonical scraped locations
          const realSys = allPlanetsMap.get(name.toLowerCase()) || findPlanetByName(name) || timelinePlanets[name] || data;
          
          const realX = realSys.x + 1200;
          const realY = realSys.y + 1200;

          // Still cull major planets if they are way off screen to save React updates
          if (realX < minX || realX > maxX || realY < minY || realY > maxY) return null;

          const isActive = activePlanetId === name;
          const lodDetailed = transform.scale >= (detailThreshold * 0.75); // Show major planet info slightly earlier
          
          return (
            <g 
              key={name}
              id={`planet-${name.replace(/[^a-zA-Z0-9]/g, '-')}`}
              className={`planet-group ${isActive ? 'active' : ''}`}
              transform={`translate(${realSys.x}, ${realSys.y})`}
              onClick={() => onPlanetSelect(name)}
              onMouseEnter={() => setHoveredPlanet(name)}
              onMouseLeave={() => setHoveredPlanet(null)}
              style={{ cursor: 'pointer' }}
            >
              <circle cx={0} cy={0} r={20} fill="transparent" style={{ pointerEvents: 'visiblePainted' }} />

              {/* Faction Territory Glow */}
              {showAllegiance && (lodDetailed || isActive || hoveredPlanet === name) && (() => { const fc = getPlanetFactionColor(name); return fc ? (
                <circle 
                  cx={0} cy={0} 
                  r={12} 
                  fill={fc} 
                  opacity={0.6}
                  style={{ transition: 'fill 0.8s ease' }} 
                />
              ) : null; })()}
              
              {/* Glow effect for active planet */}
              {isActive && (
                <motion.circle
                  cx={0}
                  cy={0}
                  r="15"
                  fill="rgba(255, 232, 31, 0.3)"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.2, 0.5] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
              )}
              
              <circle 
                cx={0} 
                cy={0} 
                r={isActive ? 8 : 4} 
                fill={isActive ? "#ffe81f" : "#4af"} 
                stroke={isActive ? "#fff" : "none"}
                strokeWidth="2"
              />
              {(lodDetailed || isActive || hoveredPlanet === name) && (
                <text 
                  x={0} 
                  y={15} 
                  fill={isActive ? "#ffe81f" : "#aaa"}
                  fontSize={isActive ? "14" : "10"}
                  textAnchor="middle"
                  fontWeight={isActive ? "bold" : "normal"}
                  style={{ pointerEvents: 'none' }}
                >
                  {name}
                </text>
              )}
            </g>
          );
        })}

        {/* Dynamic active star system if it's from the scraped dataset (not predefined) */}
        {activeStarSystem && !planets[activePlanetId] && (
            <g 
              id={`planet-${activePlanetId.replace(/[^a-zA-Z0-9]/g, '-')}`}
              className="planet-group active"
              transform={`translate(${activeStarSystem.x}, ${activeStarSystem.y})`}
              onMouseEnter={() => setHoveredPlanet(activePlanetId)}
              onMouseLeave={() => setHoveredPlanet(null)}
              onClick={() => onPlanetSelect(activePlanetId)}
              style={{ cursor: 'pointer' }}
            >
              {/* Invisible Hitbox for easier hovering/clicking */}
              <circle cx={0} cy={0} r={20} fill="transparent" style={{ pointerEvents: 'visiblePainted' }} />

              <motion.circle
                  cx={0}
                  cy={0}
                  r="15"
                  fill="rgba(255, 232, 31, 0.3)"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.2, 0.5] }}
                  transition={{ repeat: Infinity, duration: 2 }}
              />
              <circle cx={0} cy={0} r={8} fill="#ffe81f" stroke="#fff" strokeWidth="2" />
              <text x={0} y={15} fill="#ffe81f" fontSize="14" textAnchor="middle" fontWeight="bold">
                {activePlanetId}
              </text>
            </g>
        )}
        {/* Interactive Historical Events — with offset for co-located markers */}
        {showHistoricalEvents && (() => {
           // Pre-compute offsets: group events by planetId so co-located ones fan out
           const battles = historicalEvents.filter(e => e.type === 'battle' || e.category === 'battle');
           const planetGroups = {};
           battles.forEach(evt => {
             const key = evt.planetId;
             if (!planetGroups[key]) planetGroups[key] = [];
             planetGroups[key].push(evt);
           });

           return battles.map(evt => {
             let sys = findPlanetByName(evt.planetId) || planets[evt.planetId];
             if (!sys) return null;

             const siblings = planetGroups[evt.planetId];
             const idx = siblings.indexOf(evt);
             const count = siblings.length;

             // Fan out from center: spread at angles around the base point
             let ox = 0, oy = 0;
             if (count > 1) {
               const spacing = 20; // smaller spacing for smaller stars
               const startAngle = -Math.PI / 2 - ((count - 1) * 0.4) / 2;
               const angle = startAngle + idx * 0.4;
               ox = Math.cos(angle) * spacing * (idx + 1) * 0.6;
               oy = Math.sin(angle) * spacing * (idx + 1) * 0.6;
             }

             const ex = sys.x + ox;
             const ey = sys.y + oy;

             return (
               <g key={evt.id}
                  className="historical-event-marker"
                  style={{ cursor: 'pointer' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onHistoricalEventSelect) onHistoricalEventSelect(evt);
                  }}
               >
                  {/* Connector line from planet to offset marker */}
                  {count > 1 && (
                    <line x1={sys.x} y1={sys.y} x2={ex} y2={ey} stroke="rgba(255, 50, 50, 0.3)" strokeWidth={1} strokeDasharray="2 3" />
                  )}
                  {/* Half size star: scale the coordinates roughly by 0.5 */}
                  <path d={`M ${ex},${ey-5} L ${ex+1},${ey-1.5} L ${ex+5},${ey} L ${ex+1},${ey+1.5} L ${ex},${ey+5} L ${ex-1},${ey+1.5} L ${ex-5},${ey} L ${ex-1},${ey-1.5} Z`} fill="rgba(255, 50, 50, 0.4)" stroke="rgba(255, 50, 50, 0.8)" strokeWidth={1} style={{ filter: 'drop-shadow(0 0 4px rgba(255,50,50,0.8))' }} />
                  <circle cx={ex} cy={ey} r={6} fill="none" stroke="rgba(255, 50, 50, 0.8)" strokeWidth={1} strokeDasharray="1 2" />
                  <text x={ex + 8} y={ey + 3} fill="rgba(255, 100, 100, 0.9)" fontSize="8" fontWeight="bold" style={{ textShadow: '0 0 4px #000', pointerEvents: 'none' }}>{evt.title.toUpperCase()}</text>
               </g>
             );
           });
        })()}
              </g>
            </svg>
          </div>
        </TransformComponent>
      </TransformWrapper>

      {/* Planet Info Tooltip in Bottom Left */}
      <AnimatePresence>
        {(hoveredPlanet || hoveredRoute) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="planet-hover-card"
            style={{
              position: 'absolute',
              bottom: '40px',
              left: '40px',
              background: 'rgba(10, 15, 30, 0.85)',
              border: hoveredRoute ? '1px solid rgba(255, 232, 31, 0.5)' : '1px solid rgba(130, 220, 255, 0.3)',
              borderRadius: '8px',
              padding: '16px',
              maxWidth: '300px',
              backdropFilter: 'blur(8px)',
              pointerEvents: 'none',
              zIndex: 100,
              boxShadow: hoveredRoute ? '0 8px 32px rgba(255, 232, 31, 0.2)' : '0 8px 32px rgba(0, 0, 0, 0.5)'
            }}
          >
            {hoveredPlanet ? (
               (() => {
                 const lore = planetLore[hoveredPlanet];
                 const majorInfo = planets[hoveredPlanet];
                 const species = planetSpecies[hoveredPlanet];
                 const bgPlanet = !majorInfo ? findPlanetByName(hoveredPlanet) : null;
                 const region = bgPlanet?.region;
                 const climate = lore?.climate && lore.climate !== 'unknown' ? lore.climate : null;
                 const terrain = lore?.terrain && lore.terrain !== 'unknown' ? lore.terrain : null;
                 return (
                   <>
                     <h3 style={{ margin: '0 0 8px 0', color: '#ffe81f', fontFamily: 'Orbitron, sans-serif' }}>
                       {hoveredPlanet}
                     </h3>
                     <p style={{ margin: '0 0 4px 0', fontSize: '0.8rem', color: '#82dcff' }}>
                       {majorInfo ? 'Major System' : region ? region : 'Uncharted System'}
                     </p>
                     {majorInfo?.description ? (
                       <p style={{ margin: '0 0 6px 0', fontSize: '0.85rem', color: '#ccc', lineHeight: '1.4' }}>
                         {majorInfo.description}
                       </p>
                     ) : (climate || terrain) ? (
                       <p style={{ margin: '0 0 6px 0', fontSize: '0.85rem', color: '#ccc', lineHeight: '1.4' }}>
                         {climate && <><span style={{color:'#888'}}>Climate:</span> {climate}<br/></>}
                         {terrain && <><span style={{color:'#888'}}>Terrain:</span> {terrain}</>}
                       </p>
                     ) : (
                       <p style={{ margin: '0 0 6px 0', fontSize: '0.85rem', color: '#888', lineHeight: '1.4', fontStyle: 'italic' }}>
                         Archival data encrypted.
                       </p>
                     )}
                     {species && species.length > 0 && (
                       <p style={{ margin: 0, fontSize: '0.75rem', color: '#aaa' }}>
                         <span style={{color:'#666'}}>Species:</span> {species.slice(0, 4).join(', ')}{species.length > 4 ? ` +${species.length - 4} more` : ''}
                       </p>
                     )}
                   </>
                 );
               })()

            ) : hoveredRoute ? (
               <>
                 <h3 style={{ margin: '0 0 8px 0', color: '#ffe81f', fontFamily: 'Orbitron, sans-serif' }}>
                   {hoveredRoute}
                 </h3>
                 <p style={{ margin: '0 0 4px 0', fontSize: '0.8rem', color: '#82dcff' }}>
                   Major Trade Route
                 </p>
                 {isRouteLoading ? (
                   <p style={{ margin: 0, fontSize: '0.9rem', color: '#ccc', lineHeight: '1.4' }}>
                     Decrypting navigational charts...
                   </p>
                 ) : hoveredRouteData ? (
                   <p style={{ margin: 0, fontSize: '0.9rem', color: '#ccc', lineHeight: '1.4' }}>
                     {hoveredRouteData.extract.length > 200 ? hoveredRouteData.extract.substring(0, 200) + "..." : hoveredRouteData.extract}
                   </p>
                 ) : (
                   <p style={{ margin: 0, fontSize: '0.9rem', color: '#ccc', lineHeight: '1.4' }}>
                     Click to view archival data.
                   </p>
                 )}
               </>
             ) : null}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Map Controls & Legend */}
      <div 
        className="map-controls"
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          background: 'rgba(10, 15, 30, 0.85)',
          border: '1px solid rgba(130, 220, 255, 0.3)',
          borderRadius: '8px',
          padding: '16px',
          width: '280px',
          backdropFilter: 'blur(8px)',
          zIndex: 100,
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          opacity: isMapTransitioning ? 0 : 1,
          transition: 'opacity 0.5s ease',
        pointerEvents: isMapTransitioning ? 'none' : 'auto'
      }}
    >
      <PlanetSearch allPlanets={allPlanets} onSelect={onPlanetSelect} onHighlight={onPlanetHighlight} onResultsChange={setSearchResults} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid rgba(130, 220, 255, 0.2)', paddingTop: '16px' }}>
        <label style={{ fontSize: '0.9rem', color: '#82dcff', fontWeight: 'bold' }}>
          Planet Density: {visiblePlanetCount}
          </label>
          <input 
            type="range" 
            min="0" 
            max={allPlanets ? Math.min(allPlanets.length, 2000) : 0} 
            step="50"
            value={visiblePlanetCount}
            onChange={(e) => setVisiblePlanetCount(parseInt(e.target.value))}
            style={{ width: '100%', cursor: 'pointer' }}
          />
          <p style={{ margin: 0, fontSize: '0.7rem', color: '#aaa' }}>
            Drag to reveal canonical systems & names.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid rgba(130, 220, 255, 0.2)', paddingTop: '16px' }}>
          <label style={{ fontSize: '0.9rem', color: '#82dcff', fontWeight: 'bold' }}>
            Detail Threshold: {detailThreshold.toFixed(1)}x
          </label>
          <input 
            type="range" 
            min="0.2" 
            max="4.0" 
            step="0.1"
            value={detailThreshold}
            onChange={(e) => setDetailThreshold(parseFloat(e.target.value))}
            style={{ width: '100%', cursor: 'pointer', direction: 'rtl' }}
          />
          <p style={{ margin: 0, fontSize: '0.7rem', color: '#aaa' }}>
             Lower to reveal names & glows when zoomed out.
          </p>
        </div>

        {/* Faction Legend */}
        {activeEra && factionColors[activeEra] && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid rgba(130, 220, 255, 0.2)', paddingTop: '16px' }}>
            <h4 style={{ margin: 0, color: '#ffe81f', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
              {activeEra}
            </h4>
            <p style={{ margin: 0, fontSize: '0.65rem', color: '#888', fontStyle: 'italic' }}>Planet glows indicate faction allegiance</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px', marginBottom: '6px' }}>
              <input 
                type="checkbox" id="allegiance-toggle"
                checked={showAllegiance} onChange={(e) => setShowAllegiance(e.target.checked)} 
                style={{ cursor: 'pointer' }}
              />
              <label htmlFor="allegiance-toggle" style={{ fontSize: '0.8rem', color: '#ccc', cursor: 'pointer' }}>Show Planet Allegiance</label>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {factionColors[activeEra].map(({ name, color }) => (
                <div key={name} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '16px', height: '16px', backgroundColor: color, border: '1px solid rgba(255, 255, 255, 0.3)', borderRadius: '50%', boxShadow: `0 0 6px ${color}` }} />
                  <span style={{ fontSize: '0.75rem', color: '#ddd' }}>{name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Map Layers Toggle Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid rgba(130, 220, 255, 0.2)', paddingTop: '16px' }}>
          <h4 style={{ margin: 0, color: '#ffe81f', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
             Map Layers
          </h4>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input 
              type="checkbox" id="regions-toggle"
              checked={showRegions} onChange={(e) => setShowRegions(e.target.checked)} 
              style={{ cursor: 'pointer' }}
            />
            <label htmlFor="regions-toggle" style={{ fontSize: '0.8rem', color: '#ccc', cursor: 'pointer' }}>Show Galactic Regions</label>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input 
              type="checkbox" id="routes-toggle"
              checked={showTradeRoutes} onChange={(e) => setShowTradeRoutes(e.target.checked)} 
              style={{ cursor: 'pointer' }}
            />
            <label htmlFor="routes-toggle" style={{ fontSize: '0.8rem', color: '#ccc', cursor: 'pointer' }}>Show Trade Routes</label>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input 
              type="checkbox" id="history-toggle"
              checked={showHistoricalEvents} onChange={(e) => setShowHistoricalEvents(e.target.checked)} 
              style={{ cursor: 'pointer' }}
            />
            <label htmlFor="history-toggle" style={{ fontSize: '0.8rem', color: '#ffe81f', fontWeight: 'bold', textTransform: 'uppercase', cursor: 'pointer' }}>Show Major Battles</label>
          </div>
        </div>
      </div>

    </div>
  );
}
