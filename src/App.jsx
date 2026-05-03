import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GalaxyMap from './components/Map/GalaxyMap';
import TimelineCrawl from './components/Timeline/TimelineCrawl';
import SnakeTimelineOverlay from './components/Timeline/SnakeTimelineOverlay';
import HyperspaceOverlay from './components/Map/HyperspaceOverlay';
import { starWarsTimeline } from './data/timeline';
import LoreCard from './components/Map/LoreCard';
import { determineEra } from './utils/determineEra';
import './App.css';

const introStars = Array.from({ length: 400 }).map((_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 0.5,
  opacity: Math.random() * 0.8 + 0.2,
  blur: Math.random() // pre-computed, not in render path
}));

function App() {
  const [activeEpisodeId, setActiveEpisodeId] = useState(null);
  const [activePlanetId, setActivePlanetId] = useState(null);
  const [activeHistoricalEvent, setActiveHistoricalEvent] = useState(null);
  const [activeRoute, setActiveRoute] = useState(null);
  const [previousPlanetId, setPreviousPlanetId] = useState(null);
  const [panTrigger, setPanTrigger] = useState(0);
  const [activeEra, setActiveEra] = useState("Unknown");
  const [isIntroMode, setIsIntroMode] = useState(true);
  const [loreMode, setLoreMode] = useState(null);
  const [isSnakeTimelineOpen, setIsSnakeTimelineOpen] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [isMapTransitioning, setIsMapTransitioning] = useState(false);
  const [showGdprNotice, setShowGdprNotice] = useState(() => {
    try { return !localStorage.getItem('sw_gdpr_dismissed'); } catch { return true; }
  });
  const [showLegend, setShowLegend] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [isTimelineFullscreen, setIsTimelineFullscreen] = useState(false);

  // Phase 10: Persistent Progress Tracking State
  const [watchedIds, setWatchedIds] = useState(() => {
    try {
      const saved = localStorage.getItem('sw_watched_ids');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [showLogCheckmarks, setShowLogCheckmarks] = useState(() => {
    try {
      const saved = localStorage.getItem('sw_show_checkmarks');
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  useEffect(() => {
    localStorage.setItem('sw_watched_ids', JSON.stringify(watchedIds));
  }, [watchedIds]);

  useEffect(() => {
    localStorage.setItem('sw_show_checkmarks', JSON.stringify(showLogCheckmarks));
  }, [showLogCheckmarks]);

  const toggleWatchedStatus = (id) => {
    const strId = String(id);
    setWatchedIds(prev => prev.map(String).includes(strId) ? prev.filter(i => String(i) !== strId) : [...prev, strId]);
  };

  const syncHistoryUpTo = (targetId, allowedTypes) => {
    const targetIndex = starWarsTimeline.findIndex(item => String(item.id) === String(targetId));
    if (targetIndex === -1) return;
    
    const itemsToLog = starWarsTimeline
      .slice(0, targetIndex + 1)
      .filter(item => allowedTypes.includes(item.type))
      .map(item => String(item.id));
      
    setWatchedIds(prev => Array.from(new Set([...prev.map(String), ...itemsToLog])));
  };

  const resetWatchedHistory = () => {
    setWatchedIds([]);
  };

  const jumpToHyperspace = () => {
    if (isIntroMode) {
      setIsJumping(true);
      setIsMapTransitioning(true);
      setTimeout(() => setIsJumping(false), 4000);
      setTimeout(() => setIsMapTransitioning(false), 4400);
      setIsIntroMode(false);
      if (activePlanetId) {
        setPanTrigger(Date.now());
      }
    }
  };

  const handleTimelineSelect = (id) => {
    setActiveEpisodeId(id);
    setLoreMode('event');
    const episode = starWarsTimeline.find(item => item.id === id);
    if (episode) {
      if (episode.primaryPlanet && episode.primaryPlanet !== 'Unknown Spaces') {
        setPreviousPlanetId(activePlanetId);
        setActivePlanetId(episode.primaryPlanet);
        // Do NOT trigger pan here anymore. Leave camera anchored until manual jump.
      }
      setActiveEra(determineEra(episode.year));
    }
  };

  const handlePlanetSelect = (planet) => {
    if (isIntroMode) {
      setIsJumping(true);
      setIsMapTransitioning(true);
      setTimeout(() => setIsJumping(false), 4000);
      setTimeout(() => setIsMapTransitioning(false), 4400);
      setIsIntroMode(false);
    }
    setPreviousPlanetId(activePlanetId);
    setActivePlanetId(planet);
    setPanTrigger(Date.now());
    setLoreMode('planet');
    const episode = starWarsTimeline.find(item => item.primaryPlanet === planet);
    if (episode) {
      setActiveEpisodeId(episode.id);
      // Era is NOT changed here — it's driven by timeline scroll position
    } else {
      setActiveEpisodeId(null);
    }
  };

  const handleEraChange = (era) => {
    setActiveEra(era);
  };

  const handleEventMarkerSelect = (evt) => {
    setActiveHistoricalEvent(evt);
    setLoreMode('history');
    if (isIntroMode) {
      setIsJumping(true);
      setIsMapTransitioning(true);
      setTimeout(() => setIsJumping(false), 4000);
      setTimeout(() => setIsMapTransitioning(false), 4400);
      setIsIntroMode(false);
    }
  };

  const handleRouteSelect = (route) => {
    setActiveRoute(route);
    setLoreMode('route');
    if (isIntroMode) {
      setIsJumping(true);
      setIsMapTransitioning(true);
      setTimeout(() => setIsJumping(false), 4000);
      setTimeout(() => setIsMapTransitioning(false), 4400);
      setIsIntroMode(false);
    }
  };

  const handleCloseLoreCard = () => {
    setActiveEpisodeId(null);
    setActivePlanetId(null);
    setActiveHistoricalEvent(null);
    setActiveRoute(null);
    setLoreMode(null);
  };

  const handleTimelineFocus = (id) => {
    if (loreMode === 'planet' || loreMode === 'route' || loreMode === 'history') return;

    const episode = starWarsTimeline.find(item => item.id === id);
    if (episode && episode.primaryPlanet && episode.primaryPlanet !== activePlanetId && !isIntroMode && !isJumping) {
      if (episode.primaryPlanet !== 'Unknown Spaces') {
        setPreviousPlanetId(activePlanetId);
        setActivePlanetId(episode.primaryPlanet);
        setPanTrigger(Date.now());
      }
    }
  };

  const handlePlanetHighlight = (planet) => {
    if (loreMode === 'planet') return;
    
    if (planet !== activePlanetId) {
      setPreviousPlanetId(activePlanetId);
      setActivePlanetId(planet);
      setPanTrigger(Date.now());
    }
  };

  return (
    <div className="app-container">
      <AnimatePresence>
        {isJumping && (
          <motion.div
            key="hyperspace"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ position: 'absolute', zIndex: 9999, width: '100%', height: '100%', pointerEvents: 'none' }}
          >
            <HyperspaceOverlay />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isIntroMode ? { opacity: 0 } : { opacity: 1 }}
        transition={isIntroMode ? { duration: 0 } : { duration: 0.5, delay: 3.5, ease: "easeOut" }}
        style={{ width: '100%', height: '100%', position: 'absolute', pointerEvents: isIntroMode ? 'none' : 'auto' }}
      >
        <GalaxyMap 
          activePlanetId={activePlanetId} 
          previousPlanetId={previousPlanetId}
          activeEra={activeEra}
          activeEpisodeId={activeEpisodeId}
          onPlanetSelect={handlePlanetSelect} 
          onHistoricalEventSelect={handleEventMarkerSelect}
          onRouteSelect={handleRouteSelect}
          isMapTransitioning={isMapTransitioning}
          onPlanetHighlight={handlePlanetHighlight}
          panTrigger={panTrigger}
          hideControls={!isIntroMode && !showLegend}
        />
      </motion.div>

      {/* The star background should only be visible during intro mode, but stay mounted while jumping to animate out */}
      {(isIntroMode || isJumping) && (
        <div className="map-container intro-stars" style={{ 
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100dvh', 
          zIndex: 0, pointerEvents: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center',
          opacity: isJumping ? 0 : 1,
          transform: isJumping ? 'scale(4)' : 'scale(1)',
          transition: 'transform 0.4s cubic-bezier(0.9, 0, 1, 1), opacity 0.1s ease-out 0.3s'
        }}>
          <svg width="100%" height="100%" style={{ position: 'absolute' }}>
            {introStars.map(star => (
               <circle 
                  key={star.id} 
                  cx={`${star.x}%`} 
                  cy={`${star.y}%`} 
                  r={star.size} 
                  fill="#ffffff" 
                  opacity={star.opacity} 
                  style={{ filter: `blur(${star.blur}px)` }}
               />
            ))}
          </svg>
          
          {/* Mini-Galaxy Tease (Aesthetic element) */}
          <div style={{
            position: 'relative',
            width: '80px',
            height: '80px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: 0.85,
          }}>
            {/* The 3D spinning disk */}
            <div style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              transformStyle: 'preserve-3d',
              transform: 'perspective(300px) rotateX(55deg) rotateY(-10deg)',
            }}>
              <div style={{
                width: '100%',
                height: '100%',
                animation: 'spin-slow 60s linear infinite',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <svg viewBox="0 0 100 100" width="100%" height="100%" style={{ overflow: 'visible' }}>
                  <defs>
                    <radialGradient id="galaxyDisk" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="rgba(200, 230, 255, 0.4)" />
                      <stop offset="40%" stopColor="rgba(100, 180, 255, 0.2)" />
                      <stop offset="100%" stopColor="rgba(50, 100, 255, 0)" />
                    </radialGradient>
                  </defs>

                  {/* Background dense dust disk */}
                  <circle cx="50" cy="50" r="45" fill="url(#galaxyDisk)" filter="blur(4px)" />
                  <circle cx="50" cy="50" r="30" fill="url(#galaxyDisk)" filter="blur(2px)" />
<g filter="blur(3px)">
  <line x1="50.0" y1="50.0" x2="50.5" y2="50.1" stroke="rgba(130, 220, 255, 0.50)" strokeWidth="15.6" strokeLinecap="round" />
  <line x1="50.5" y1="50.1" x2="51.1" y2="50.5" stroke="rgba(130, 220, 255, 0.49)" strokeWidth="15.2" strokeLinecap="round" />
  <line x1="51.1" y1="50.5" x2="51.6" y2="51.2" stroke="rgba(130, 220, 255, 0.49)" strokeWidth="14.8" strokeLinecap="round" />
  <line x1="51.6" y1="51.2" x2="51.9" y2="52.2" stroke="rgba(130, 220, 255, 0.48)" strokeWidth="14.4" strokeLinecap="round" />
  <line x1="51.9" y1="52.2" x2="51.8" y2="53.4" stroke="rgba(130, 220, 255, 0.47)" strokeWidth="14.0" strokeLinecap="round" />
  <line x1="51.8" y1="53.4" x2="51.3" y2="54.7" stroke="rgba(130, 220, 255, 0.46)" strokeWidth="13.6" strokeLinecap="round" />
  <line x1="51.3" y1="54.7" x2="50.4" y2="55.9" stroke="rgba(130, 220, 255, 0.46)" strokeWidth="13.2" strokeLinecap="round" />
  <line x1="50.4" y1="55.9" x2="48.9" y2="57.0" stroke="rgba(130, 220, 255, 0.45)" strokeWidth="12.8" strokeLinecap="round" />
  <line x1="48.9" y1="57.0" x2="47.0" y2="57.7" stroke="rgba(130, 220, 255, 0.43)" strokeWidth="12.4" strokeLinecap="round" />
  <line x1="47.0" y1="57.7" x2="44.8" y2="57.9" stroke="rgba(130, 220, 255, 0.42)" strokeWidth="12.0" strokeLinecap="round" />
  <line x1="44.8" y1="57.9" x2="42.4" y2="57.4" stroke="rgba(130, 220, 255, 0.41)" strokeWidth="11.6" strokeLinecap="round" />
  <line x1="42.4" y1="57.4" x2="39.9" y2="56.3" stroke="rgba(130, 220, 255, 0.40)" strokeWidth="11.2" strokeLinecap="round" />
  <line x1="39.9" y1="56.3" x2="37.5" y2="54.4" stroke="rgba(130, 220, 255, 0.39)" strokeWidth="10.8" strokeLinecap="round" />
  <line x1="37.5" y1="54.4" x2="35.5" y2="51.8" stroke="rgba(130, 220, 255, 0.37)" strokeWidth="10.4" strokeLinecap="round" />
  <line x1="35.5" y1="51.8" x2="34.1" y2="48.6" stroke="rgba(130, 220, 255, 0.36)" strokeWidth="10.0" strokeLinecap="round" />
  <line x1="34.1" y1="48.6" x2="33.5" y2="44.8" stroke="rgba(130, 220, 255, 0.35)" strokeWidth="9.6" strokeLinecap="round" />
  <line x1="33.5" y1="44.8" x2="33.7" y2="40.7" stroke="rgba(130, 220, 255, 0.33)" strokeWidth="9.2" strokeLinecap="round" />
  <line x1="33.7" y1="40.7" x2="35.0" y2="36.4" stroke="rgba(130, 220, 255, 0.32)" strokeWidth="8.8" strokeLinecap="round" />
  <line x1="35.0" y1="36.4" x2="37.4" y2="32.3" stroke="rgba(130, 220, 255, 0.30)" strokeWidth="8.4" strokeLinecap="round" />
  <line x1="37.4" y1="32.3" x2="40.9" y2="28.7" stroke="rgba(130, 220, 255, 0.28)" strokeWidth="8.0" strokeLinecap="round" />
  <line x1="40.9" y1="28.7" x2="45.4" y2="25.7" stroke="rgba(130, 220, 255, 0.27)" strokeWidth="7.6" strokeLinecap="round" />
  <line x1="45.4" y1="25.7" x2="50.7" y2="23.8" stroke="rgba(130, 220, 255, 0.25)" strokeWidth="7.2" strokeLinecap="round" />
  <line x1="50.7" y1="23.8" x2="56.7" y2="23.0" stroke="rgba(130, 220, 255, 0.23)" strokeWidth="6.8" strokeLinecap="round" />
  <line x1="56.7" y1="23.0" x2="63.0" y2="23.6" stroke="rgba(130, 220, 255, 0.22)" strokeWidth="6.4" strokeLinecap="round" />
  <line x1="63.0" y1="23.6" x2="69.3" y2="25.8" stroke="rgba(130, 220, 255, 0.20)" strokeWidth="6.0" strokeLinecap="round" />
  <line x1="69.3" y1="25.8" x2="75.3" y2="29.4" stroke="rgba(130, 220, 255, 0.18)" strokeWidth="5.6" strokeLinecap="round" />
  <line x1="75.3" y1="29.4" x2="80.6" y2="34.6" stroke="rgba(130, 220, 255, 0.16)" strokeWidth="5.2" strokeLinecap="round" />
  <line x1="80.6" y1="34.6" x2="84.8" y2="41.1" stroke="rgba(130, 220, 255, 0.14)" strokeWidth="4.8" strokeLinecap="round" />
  <line x1="84.8" y1="41.1" x2="87.6" y2="48.7" stroke="rgba(130, 220, 255, 0.12)" strokeWidth="4.4" strokeLinecap="round" />
  <line x1="87.6" y1="48.7" x2="88.7" y2="57.0" stroke="rgba(130, 220, 255, 0.10)" strokeWidth="4.0" strokeLinecap="round" />
  <line x1="88.7" y1="57.0" x2="87.8" y2="65.8" stroke="rgba(130, 220, 255, 0.08)" strokeWidth="3.6" strokeLinecap="round" />
  <line x1="87.8" y1="65.8" x2="85.0" y2="74.5" stroke="rgba(130, 220, 255, 0.06)" strokeWidth="3.2" strokeLinecap="round" />
  <line x1="85.0" y1="74.5" x2="80.1" y2="82.7" stroke="rgba(130, 220, 255, 0.04)" strokeWidth="2.8" strokeLinecap="round" />
  <line x1="80.1" y1="82.7" x2="73.4" y2="89.9" stroke="rgba(130, 220, 255, 0.02)" strokeWidth="2.4" strokeLinecap="round" />
  <line x1="50.0" y1="50.0" x2="49.9" y2="50.5" stroke="rgba(130, 220, 255, 0.50)" strokeWidth="15.6" strokeLinecap="round" />
  <line x1="49.9" y1="50.5" x2="49.5" y2="51.1" stroke="rgba(130, 220, 255, 0.49)" strokeWidth="15.2" strokeLinecap="round" />
  <line x1="49.5" y1="51.1" x2="48.8" y2="51.6" stroke="rgba(130, 220, 255, 0.49)" strokeWidth="14.8" strokeLinecap="round" />
  <line x1="48.8" y1="51.6" x2="47.8" y2="51.9" stroke="rgba(130, 220, 255, 0.48)" strokeWidth="14.4" strokeLinecap="round" />
  <line x1="47.8" y1="51.9" x2="46.6" y2="51.8" stroke="rgba(130, 220, 255, 0.47)" strokeWidth="14.0" strokeLinecap="round" />
  <line x1="46.6" y1="51.8" x2="45.3" y2="51.3" stroke="rgba(130, 220, 255, 0.46)" strokeWidth="13.6" strokeLinecap="round" />
  <line x1="45.3" y1="51.3" x2="44.1" y2="50.4" stroke="rgba(130, 220, 255, 0.46)" strokeWidth="13.2" strokeLinecap="round" />
  <line x1="44.1" y1="50.4" x2="43.0" y2="48.9" stroke="rgba(130, 220, 255, 0.45)" strokeWidth="12.8" strokeLinecap="round" />
  <line x1="43.0" y1="48.9" x2="42.3" y2="47.0" stroke="rgba(130, 220, 255, 0.43)" strokeWidth="12.4" strokeLinecap="round" />
  <line x1="42.3" y1="47.0" x2="42.1" y2="44.8" stroke="rgba(130, 220, 255, 0.42)" strokeWidth="12.0" strokeLinecap="round" />
  <line x1="42.1" y1="44.8" x2="42.6" y2="42.4" stroke="rgba(130, 220, 255, 0.41)" strokeWidth="11.6" strokeLinecap="round" />
  <line x1="42.6" y1="42.4" x2="43.7" y2="39.9" stroke="rgba(130, 220, 255, 0.40)" strokeWidth="11.2" strokeLinecap="round" />
  <line x1="43.7" y1="39.9" x2="45.6" y2="37.5" stroke="rgba(130, 220, 255, 0.39)" strokeWidth="10.8" strokeLinecap="round" />
  <line x1="45.6" y1="37.5" x2="48.2" y2="35.5" stroke="rgba(130, 220, 255, 0.37)" strokeWidth="10.4" strokeLinecap="round" />
  <line x1="48.2" y1="35.5" x2="51.4" y2="34.1" stroke="rgba(130, 220, 255, 0.36)" strokeWidth="10.0" strokeLinecap="round" />
  <line x1="51.4" y1="34.1" x2="55.2" y2="33.5" stroke="rgba(130, 220, 255, 0.35)" strokeWidth="9.6" strokeLinecap="round" />
  <line x1="55.2" y1="33.5" x2="59.3" y2="33.7" stroke="rgba(130, 220, 255, 0.33)" strokeWidth="9.2" strokeLinecap="round" />
  <line x1="59.3" y1="33.7" x2="63.6" y2="35.0" stroke="rgba(130, 220, 255, 0.32)" strokeWidth="8.8" strokeLinecap="round" />
  <line x1="63.6" y1="35.0" x2="67.7" y2="37.4" stroke="rgba(130, 220, 255, 0.30)" strokeWidth="8.4" strokeLinecap="round" />
  <line x1="67.7" y1="37.4" x2="71.3" y2="40.9" stroke="rgba(130, 220, 255, 0.28)" strokeWidth="8.0" strokeLinecap="round" />
  <line x1="71.3" y1="40.9" x2="74.3" y2="45.4" stroke="rgba(130, 220, 255, 0.27)" strokeWidth="7.6" strokeLinecap="round" />
  <line x1="74.3" y1="45.4" x2="76.2" y2="50.7" stroke="rgba(130, 220, 255, 0.25)" strokeWidth="7.2" strokeLinecap="round" />
  <line x1="76.2" y1="50.7" x2="77.0" y2="56.7" stroke="rgba(130, 220, 255, 0.23)" strokeWidth="6.8" strokeLinecap="round" />
  <line x1="77.0" y1="56.7" x2="76.4" y2="63.0" stroke="rgba(130, 220, 255, 0.22)" strokeWidth="6.4" strokeLinecap="round" />
  <line x1="76.4" y1="63.0" x2="74.2" y2="69.3" stroke="rgba(130, 220, 255, 0.20)" strokeWidth="6.0" strokeLinecap="round" />
  <line x1="74.2" y1="69.3" x2="70.6" y2="75.3" stroke="rgba(130, 220, 255, 0.18)" strokeWidth="5.6" strokeLinecap="round" />
  <line x1="70.6" y1="75.3" x2="65.4" y2="80.6" stroke="rgba(130, 220, 255, 0.16)" strokeWidth="5.2" strokeLinecap="round" />
  <line x1="65.4" y1="80.6" x2="58.9" y2="84.8" stroke="rgba(130, 220, 255, 0.14)" strokeWidth="4.8" strokeLinecap="round" />
  <line x1="58.9" y1="84.8" x2="51.3" y2="87.6" stroke="rgba(130, 220, 255, 0.12)" strokeWidth="4.4" strokeLinecap="round" />
  <line x1="51.3" y1="87.6" x2="43.0" y2="88.7" stroke="rgba(130, 220, 255, 0.10)" strokeWidth="4.0" strokeLinecap="round" />
  <line x1="43.0" y1="88.7" x2="34.2" y2="87.8" stroke="rgba(130, 220, 255, 0.08)" strokeWidth="3.6" strokeLinecap="round" />
  <line x1="34.2" y1="87.8" x2="25.5" y2="85.0" stroke="rgba(130, 220, 255, 0.06)" strokeWidth="3.2" strokeLinecap="round" />
  <line x1="25.5" y1="85.0" x2="17.3" y2="80.1" stroke="rgba(130, 220, 255, 0.04)" strokeWidth="2.8" strokeLinecap="round" />
  <line x1="17.3" y1="80.1" x2="10.1" y2="73.4" stroke="rgba(130, 220, 255, 0.02)" strokeWidth="2.4" strokeLinecap="round" />
  <line x1="50.0" y1="50.0" x2="49.5" y2="49.9" stroke="rgba(130, 220, 255, 0.50)" strokeWidth="15.6" strokeLinecap="round" />
  <line x1="49.5" y1="49.9" x2="48.9" y2="49.5" stroke="rgba(130, 220, 255, 0.49)" strokeWidth="15.2" strokeLinecap="round" />
  <line x1="48.9" y1="49.5" x2="48.4" y2="48.8" stroke="rgba(130, 220, 255, 0.49)" strokeWidth="14.8" strokeLinecap="round" />
  <line x1="48.4" y1="48.8" x2="48.1" y2="47.8" stroke="rgba(130, 220, 255, 0.48)" strokeWidth="14.4" strokeLinecap="round" />
  <line x1="48.1" y1="47.8" x2="48.2" y2="46.6" stroke="rgba(130, 220, 255, 0.47)" strokeWidth="14.0" strokeLinecap="round" />
  <line x1="48.2" y1="46.6" x2="48.7" y2="45.3" stroke="rgba(130, 220, 255, 0.46)" strokeWidth="13.6" strokeLinecap="round" />
  <line x1="48.7" y1="45.3" x2="49.6" y2="44.1" stroke="rgba(130, 220, 255, 0.46)" strokeWidth="13.2" strokeLinecap="round" />
  <line x1="49.6" y1="44.1" x2="51.1" y2="43.0" stroke="rgba(130, 220, 255, 0.45)" strokeWidth="12.8" strokeLinecap="round" />
  <line x1="51.1" y1="43.0" x2="53.0" y2="42.3" stroke="rgba(130, 220, 255, 0.43)" strokeWidth="12.4" strokeLinecap="round" />
  <line x1="53.0" y1="42.3" x2="55.2" y2="42.1" stroke="rgba(130, 220, 255, 0.42)" strokeWidth="12.0" strokeLinecap="round" />
  <line x1="55.2" y1="42.1" x2="57.6" y2="42.6" stroke="rgba(130, 220, 255, 0.41)" strokeWidth="11.6" strokeLinecap="round" />
  <line x1="57.6" y1="42.6" x2="60.1" y2="43.7" stroke="rgba(130, 220, 255, 0.40)" strokeWidth="11.2" strokeLinecap="round" />
  <line x1="60.1" y1="43.7" x2="62.5" y2="45.6" stroke="rgba(130, 220, 255, 0.39)" strokeWidth="10.8" strokeLinecap="round" />
  <line x1="62.5" y1="45.6" x2="64.5" y2="48.2" stroke="rgba(130, 220, 255, 0.37)" strokeWidth="10.4" strokeLinecap="round" />
  <line x1="64.5" y1="48.2" x2="65.9" y2="51.4" stroke="rgba(130, 220, 255, 0.36)" strokeWidth="10.0" strokeLinecap="round" />
  <line x1="65.9" y1="51.4" x2="66.5" y2="55.2" stroke="rgba(130, 220, 255, 0.35)" strokeWidth="9.6" strokeLinecap="round" />
  <line x1="66.5" y1="55.2" x2="66.3" y2="59.3" stroke="rgba(130, 220, 255, 0.33)" strokeWidth="9.2" strokeLinecap="round" />
  <line x1="66.3" y1="59.3" x2="65.0" y2="63.6" stroke="rgba(130, 220, 255, 0.32)" strokeWidth="8.8" strokeLinecap="round" />
  <line x1="65.0" y1="63.6" x2="62.6" y2="67.7" stroke="rgba(130, 220, 255, 0.30)" strokeWidth="8.4" strokeLinecap="round" />
  <line x1="62.6" y1="67.7" x2="59.1" y2="71.3" stroke="rgba(130, 220, 255, 0.28)" strokeWidth="8.0" strokeLinecap="round" />
  <line x1="59.1" y1="71.3" x2="54.6" y2="74.3" stroke="rgba(130, 220, 255, 0.27)" strokeWidth="7.6" strokeLinecap="round" />
  <line x1="54.6" y1="74.3" x2="49.3" y2="76.2" stroke="rgba(130, 220, 255, 0.25)" strokeWidth="7.2" strokeLinecap="round" />
  <line x1="49.3" y1="76.2" x2="43.3" y2="77.0" stroke="rgba(130, 220, 255, 0.23)" strokeWidth="6.8" strokeLinecap="round" />
  <line x1="43.3" y1="77.0" x2="37.0" y2="76.4" stroke="rgba(130, 220, 255, 0.22)" strokeWidth="6.4" strokeLinecap="round" />
  <line x1="37.0" y1="76.4" x2="30.7" y2="74.2" stroke="rgba(130, 220, 255, 0.20)" strokeWidth="6.0" strokeLinecap="round" />
  <line x1="30.7" y1="74.2" x2="24.7" y2="70.6" stroke="rgba(130, 220, 255, 0.18)" strokeWidth="5.6" strokeLinecap="round" />
  <line x1="24.7" y1="70.6" x2="19.4" y2="65.4" stroke="rgba(130, 220, 255, 0.16)" strokeWidth="5.2" strokeLinecap="round" />
  <line x1="19.4" y1="65.4" x2="15.2" y2="58.9" stroke="rgba(130, 220, 255, 0.14)" strokeWidth="4.8" strokeLinecap="round" />
  <line x1="15.2" y1="58.9" x2="12.4" y2="51.3" stroke="rgba(130, 220, 255, 0.12)" strokeWidth="4.4" strokeLinecap="round" />
  <line x1="12.4" y1="51.3" x2="11.3" y2="43.0" stroke="rgba(130, 220, 255, 0.10)" strokeWidth="4.0" strokeLinecap="round" />
  <line x1="11.3" y1="43.0" x2="12.2" y2="34.2" stroke="rgba(130, 220, 255, 0.08)" strokeWidth="3.6" strokeLinecap="round" />
  <line x1="12.2" y1="34.2" x2="15.0" y2="25.5" stroke="rgba(130, 220, 255, 0.06)" strokeWidth="3.2" strokeLinecap="round" />
  <line x1="15.0" y1="25.5" x2="19.9" y2="17.3" stroke="rgba(130, 220, 255, 0.04)" strokeWidth="2.8" strokeLinecap="round" />
  <line x1="19.9" y1="17.3" x2="26.6" y2="10.1" stroke="rgba(130, 220, 255, 0.02)" strokeWidth="2.4" strokeLinecap="round" />
  <line x1="50.0" y1="50.0" x2="50.1" y2="49.5" stroke="rgba(130, 220, 255, 0.50)" strokeWidth="15.6" strokeLinecap="round" />
  <line x1="50.1" y1="49.5" x2="50.5" y2="48.9" stroke="rgba(130, 220, 255, 0.49)" strokeWidth="15.2" strokeLinecap="round" />
  <line x1="50.5" y1="48.9" x2="51.2" y2="48.4" stroke="rgba(130, 220, 255, 0.49)" strokeWidth="14.8" strokeLinecap="round" />
  <line x1="51.2" y1="48.4" x2="52.2" y2="48.1" stroke="rgba(130, 220, 255, 0.48)" strokeWidth="14.4" strokeLinecap="round" />
  <line x1="52.2" y1="48.1" x2="53.4" y2="48.2" stroke="rgba(130, 220, 255, 0.47)" strokeWidth="14.0" strokeLinecap="round" />
  <line x1="53.4" y1="48.2" x2="54.7" y2="48.7" stroke="rgba(130, 220, 255, 0.46)" strokeWidth="13.6" strokeLinecap="round" />
  <line x1="54.7" y1="48.7" x2="55.9" y2="49.6" stroke="rgba(130, 220, 255, 0.46)" strokeWidth="13.2" strokeLinecap="round" />
  <line x1="55.9" y1="49.6" x2="57.0" y2="51.1" stroke="rgba(130, 220, 255, 0.45)" strokeWidth="12.8" strokeLinecap="round" />
  <line x1="57.0" y1="51.1" x2="57.7" y2="53.0" stroke="rgba(130, 220, 255, 0.43)" strokeWidth="12.4" strokeLinecap="round" />
  <line x1="57.7" y1="53.0" x2="57.9" y2="55.2" stroke="rgba(130, 220, 255, 0.42)" strokeWidth="12.0" strokeLinecap="round" />
  <line x1="57.9" y1="55.2" x2="57.4" y2="57.6" stroke="rgba(130, 220, 255, 0.41)" strokeWidth="11.6" strokeLinecap="round" />
  <line x1="57.4" y1="57.6" x2="56.3" y2="60.1" stroke="rgba(130, 220, 255, 0.40)" strokeWidth="11.2" strokeLinecap="round" />
  <line x1="56.3" y1="60.1" x2="54.4" y2="62.5" stroke="rgba(130, 220, 255, 0.39)" strokeWidth="10.8" strokeLinecap="round" />
  <line x1="54.4" y1="62.5" x2="51.8" y2="64.5" stroke="rgba(130, 220, 255, 0.37)" strokeWidth="10.4" strokeLinecap="round" />
  <line x1="51.8" y1="64.5" x2="48.6" y2="65.9" stroke="rgba(130, 220, 255, 0.36)" strokeWidth="10.0" strokeLinecap="round" />
  <line x1="48.6" y1="65.9" x2="44.8" y2="66.5" stroke="rgba(130, 220, 255, 0.35)" strokeWidth="9.6" strokeLinecap="round" />
  <line x1="44.8" y1="66.5" x2="40.7" y2="66.3" stroke="rgba(130, 220, 255, 0.33)" strokeWidth="9.2" strokeLinecap="round" />
  <line x1="40.7" y1="66.3" x2="36.4" y2="65.0" stroke="rgba(130, 220, 255, 0.32)" strokeWidth="8.8" strokeLinecap="round" />
  <line x1="36.4" y1="65.0" x2="32.3" y2="62.6" stroke="rgba(130, 220, 255, 0.30)" strokeWidth="8.4" strokeLinecap="round" />
  <line x1="32.3" y1="62.6" x2="28.7" y2="59.1" stroke="rgba(130, 220, 255, 0.28)" strokeWidth="8.0" strokeLinecap="round" />
  <line x1="28.7" y1="59.1" x2="25.7" y2="54.6" stroke="rgba(130, 220, 255, 0.27)" strokeWidth="7.6" strokeLinecap="round" />
  <line x1="25.7" y1="54.6" x2="23.8" y2="49.3" stroke="rgba(130, 220, 255, 0.25)" strokeWidth="7.2" strokeLinecap="round" />
  <line x1="23.8" y1="49.3" x2="23.0" y2="43.3" stroke="rgba(130, 220, 255, 0.23)" strokeWidth="6.8" strokeLinecap="round" />
  <line x1="23.0" y1="43.3" x2="23.6" y2="37.0" stroke="rgba(130, 220, 255, 0.22)" strokeWidth="6.4" strokeLinecap="round" />
  <line x1="23.6" y1="37.0" x2="25.8" y2="30.7" stroke="rgba(130, 220, 255, 0.20)" strokeWidth="6.0" strokeLinecap="round" />
  <line x1="25.8" y1="30.7" x2="29.4" y2="24.7" stroke="rgba(130, 220, 255, 0.18)" strokeWidth="5.6" strokeLinecap="round" />
  <line x1="29.4" y1="24.7" x2="34.6" y2="19.4" stroke="rgba(130, 220, 255, 0.16)" strokeWidth="5.2" strokeLinecap="round" />
  <line x1="34.6" y1="19.4" x2="41.1" y2="15.2" stroke="rgba(130, 220, 255, 0.14)" strokeWidth="4.8" strokeLinecap="round" />
  <line x1="41.1" y1="15.2" x2="48.7" y2="12.4" stroke="rgba(130, 220, 255, 0.12)" strokeWidth="4.4" strokeLinecap="round" />
  <line x1="48.7" y1="12.4" x2="57.0" y2="11.3" stroke="rgba(130, 220, 255, 0.10)" strokeWidth="4.0" strokeLinecap="round" />
  <line x1="57.0" y1="11.3" x2="65.8" y2="12.2" stroke="rgba(130, 220, 255, 0.08)" strokeWidth="3.6" strokeLinecap="round" />
  <line x1="65.8" y1="12.2" x2="74.5" y2="15.0" stroke="rgba(130, 220, 255, 0.06)" strokeWidth="3.2" strokeLinecap="round" />
  <line x1="74.5" y1="15.0" x2="82.7" y2="19.9" stroke="rgba(130, 220, 255, 0.04)" strokeWidth="2.8" strokeLinecap="round" />
  <line x1="82.7" y1="19.9" x2="89.9" y2="26.6" stroke="rgba(130, 220, 255, 0.02)" strokeWidth="2.4" strokeLinecap="round" />
</g>
<g filter="blur(2px)">
  <line x1="50.0" y1="50.0" x2="50.2" y2="50.4" stroke="rgba(100, 160, 255, 0.40)" strokeWidth="11.6" strokeLinecap="round" />
  <line x1="50.2" y1="50.4" x2="50.4" y2="51.1" stroke="rgba(100, 160, 255, 0.39)" strokeWidth="11.3" strokeLinecap="round" />
  <line x1="50.4" y1="51.1" x2="50.2" y2="51.9" stroke="rgba(100, 160, 255, 0.39)" strokeWidth="10.9" strokeLinecap="round" />
  <line x1="50.2" y1="51.9" x2="49.6" y2="52.7" stroke="rgba(100, 160, 255, 0.38)" strokeWidth="10.5" strokeLinecap="round" />
  <line x1="49.6" y1="52.7" x2="48.7" y2="53.5" stroke="rgba(100, 160, 255, 0.37)" strokeWidth="10.2" strokeLinecap="round" />
  <line x1="48.7" y1="53.5" x2="47.4" y2="53.9" stroke="rgba(100, 160, 255, 0.36)" strokeWidth="9.8" strokeLinecap="round" />
  <line x1="47.4" y1="53.9" x2="45.8" y2="53.9" stroke="rgba(100, 160, 255, 0.35)" strokeWidth="9.4" strokeLinecap="round" />
  <line x1="45.8" y1="53.9" x2="44.1" y2="53.3" stroke="rgba(100, 160, 255, 0.34)" strokeWidth="9.1" strokeLinecap="round" />
  <line x1="44.1" y1="53.3" x2="42.4" y2="52.2" stroke="rgba(100, 160, 255, 0.33)" strokeWidth="8.7" strokeLinecap="round" />
  <line x1="42.4" y1="52.2" x2="40.9" y2="50.5" stroke="rgba(100, 160, 255, 0.32)" strokeWidth="8.3" strokeLinecap="round" />
  <line x1="40.9" y1="50.5" x2="39.9" y2="48.2" stroke="rgba(100, 160, 255, 0.31)" strokeWidth="8.0" strokeLinecap="round" />
  <line x1="39.9" y1="48.2" x2="39.4" y2="45.4" stroke="rgba(100, 160, 255, 0.30)" strokeWidth="7.6" strokeLinecap="round" />
  <line x1="39.4" y1="45.4" x2="39.7" y2="42.4" stroke="rgba(100, 160, 255, 0.29)" strokeWidth="7.2" strokeLinecap="round" />
  <line x1="39.7" y1="42.4" x2="40.9" y2="39.2" stroke="rgba(100, 160, 255, 0.27)" strokeWidth="6.9" strokeLinecap="round" />
  <line x1="40.9" y1="39.2" x2="43.0" y2="36.2" stroke="rgba(100, 160, 255, 0.26)" strokeWidth="6.5" strokeLinecap="round" />
  <line x1="43.0" y1="36.2" x2="46.0" y2="33.7" stroke="rgba(100, 160, 255, 0.24)" strokeWidth="6.1" strokeLinecap="round" />
  <line x1="46.0" y1="33.7" x2="49.8" y2="31.8" stroke="rgba(100, 160, 255, 0.23)" strokeWidth="5.8" strokeLinecap="round" />
  <line x1="49.8" y1="31.8" x2="54.3" y2="30.9" stroke="rgba(100, 160, 255, 0.21)" strokeWidth="5.4" strokeLinecap="round" />
  <line x1="54.3" y1="30.9" x2="59.1" y2="31.1" stroke="rgba(100, 160, 255, 0.20)" strokeWidth="5.0" strokeLinecap="round" />
  <line x1="59.1" y1="31.1" x2="64.1" y2="32.6" stroke="rgba(100, 160, 255, 0.18)" strokeWidth="4.7" strokeLinecap="round" />
  <line x1="64.1" y1="32.6" x2="68.9" y2="35.4" stroke="rgba(100, 160, 255, 0.17)" strokeWidth="4.3" strokeLinecap="round" />
  <line x1="68.9" y1="35.4" x2="73.1" y2="39.4" stroke="rgba(100, 160, 255, 0.15)" strokeWidth="3.9" strokeLinecap="round" />
  <line x1="73.1" y1="39.4" x2="76.4" y2="44.7" stroke="rgba(100, 160, 255, 0.13)" strokeWidth="3.6" strokeLinecap="round" />
  <line x1="76.4" y1="44.7" x2="78.4" y2="50.9" stroke="rgba(100, 160, 255, 0.11)" strokeWidth="3.2" strokeLinecap="round" />
  <line x1="78.4" y1="50.9" x2="79.0" y2="57.8" stroke="rgba(100, 160, 255, 0.10)" strokeWidth="2.8" strokeLinecap="round" />
  <line x1="79.0" y1="57.8" x2="77.8" y2="64.9" stroke="rgba(100, 160, 255, 0.08)" strokeWidth="2.5" strokeLinecap="round" />
  <line x1="77.8" y1="64.9" x2="74.9" y2="71.9" stroke="rgba(100, 160, 255, 0.06)" strokeWidth="2.1" strokeLinecap="round" />
  <line x1="74.9" y1="71.9" x2="70.1" y2="78.3" stroke="rgba(100, 160, 255, 0.04)" strokeWidth="1.7" strokeLinecap="round" />
  <line x1="70.1" y1="78.3" x2="63.7" y2="83.7" stroke="rgba(100, 160, 255, 0.02)" strokeWidth="1.4" strokeLinecap="round" />
  <line x1="50.0" y1="50.0" x2="49.6" y2="50.2" stroke="rgba(100, 160, 255, 0.40)" strokeWidth="11.6" strokeLinecap="round" />
  <line x1="49.6" y1="50.2" x2="48.9" y2="50.4" stroke="rgba(100, 160, 255, 0.39)" strokeWidth="11.3" strokeLinecap="round" />
  <line x1="48.9" y1="50.4" x2="48.1" y2="50.2" stroke="rgba(100, 160, 255, 0.39)" strokeWidth="10.9" strokeLinecap="round" />
  <line x1="48.1" y1="50.2" x2="47.3" y2="49.6" stroke="rgba(100, 160, 255, 0.38)" strokeWidth="10.5" strokeLinecap="round" />
  <line x1="47.3" y1="49.6" x2="46.5" y2="48.7" stroke="rgba(100, 160, 255, 0.37)" strokeWidth="10.2" strokeLinecap="round" />
  <line x1="46.5" y1="48.7" x2="46.1" y2="47.4" stroke="rgba(100, 160, 255, 0.36)" strokeWidth="9.8" strokeLinecap="round" />
  <line x1="46.1" y1="47.4" x2="46.1" y2="45.8" stroke="rgba(100, 160, 255, 0.35)" strokeWidth="9.4" strokeLinecap="round" />
  <line x1="46.1" y1="45.8" x2="46.7" y2="44.1" stroke="rgba(100, 160, 255, 0.34)" strokeWidth="9.1" strokeLinecap="round" />
  <line x1="46.7" y1="44.1" x2="47.8" y2="42.4" stroke="rgba(100, 160, 255, 0.33)" strokeWidth="8.7" strokeLinecap="round" />
  <line x1="47.8" y1="42.4" x2="49.5" y2="40.9" stroke="rgba(100, 160, 255, 0.32)" strokeWidth="8.3" strokeLinecap="round" />
  <line x1="49.5" y1="40.9" x2="51.8" y2="39.9" stroke="rgba(100, 160, 255, 0.31)" strokeWidth="8.0" strokeLinecap="round" />
  <line x1="51.8" y1="39.9" x2="54.6" y2="39.4" stroke="rgba(100, 160, 255, 0.30)" strokeWidth="7.6" strokeLinecap="round" />
  <line x1="54.6" y1="39.4" x2="57.6" y2="39.7" stroke="rgba(100, 160, 255, 0.29)" strokeWidth="7.2" strokeLinecap="round" />
  <line x1="57.6" y1="39.7" x2="60.8" y2="40.9" stroke="rgba(100, 160, 255, 0.27)" strokeWidth="6.9" strokeLinecap="round" />
  <line x1="60.8" y1="40.9" x2="63.8" y2="43.0" stroke="rgba(100, 160, 255, 0.26)" strokeWidth="6.5" strokeLinecap="round" />
  <line x1="63.8" y1="43.0" x2="66.3" y2="46.0" stroke="rgba(100, 160, 255, 0.24)" strokeWidth="6.1" strokeLinecap="round" />
  <line x1="66.3" y1="46.0" x2="68.2" y2="49.8" stroke="rgba(100, 160, 255, 0.23)" strokeWidth="5.8" strokeLinecap="round" />
  <line x1="68.2" y1="49.8" x2="69.1" y2="54.3" stroke="rgba(100, 160, 255, 0.21)" strokeWidth="5.4" strokeLinecap="round" />
  <line x1="69.1" y1="54.3" x2="68.9" y2="59.1" stroke="rgba(100, 160, 255, 0.20)" strokeWidth="5.0" strokeLinecap="round" />
  <line x1="68.9" y1="59.1" x2="67.4" y2="64.1" stroke="rgba(100, 160, 255, 0.18)" strokeWidth="4.7" strokeLinecap="round" />
  <line x1="67.4" y1="64.1" x2="64.6" y2="68.9" stroke="rgba(100, 160, 255, 0.17)" strokeWidth="4.3" strokeLinecap="round" />
  <line x1="64.6" y1="68.9" x2="60.6" y2="73.1" stroke="rgba(100, 160, 255, 0.15)" strokeWidth="3.9" strokeLinecap="round" />
  <line x1="60.6" y1="73.1" x2="55.3" y2="76.4" stroke="rgba(100, 160, 255, 0.13)" strokeWidth="3.6" strokeLinecap="round" />
  <line x1="55.3" y1="76.4" x2="49.1" y2="78.4" stroke="rgba(100, 160, 255, 0.11)" strokeWidth="3.2" strokeLinecap="round" />
  <line x1="49.1" y1="78.4" x2="42.2" y2="79.0" stroke="rgba(100, 160, 255, 0.10)" strokeWidth="2.8" strokeLinecap="round" />
  <line x1="42.2" y1="79.0" x2="35.1" y2="77.8" stroke="rgba(100, 160, 255, 0.08)" strokeWidth="2.5" strokeLinecap="round" />
  <line x1="35.1" y1="77.8" x2="28.1" y2="74.9" stroke="rgba(100, 160, 255, 0.06)" strokeWidth="2.1" strokeLinecap="round" />
  <line x1="28.1" y1="74.9" x2="21.7" y2="70.1" stroke="rgba(100, 160, 255, 0.04)" strokeWidth="1.7" strokeLinecap="round" />
  <line x1="21.7" y1="70.1" x2="16.3" y2="63.7" stroke="rgba(100, 160, 255, 0.02)" strokeWidth="1.4" strokeLinecap="round" />
  <line x1="50.0" y1="50.0" x2="49.8" y2="49.6" stroke="rgba(100, 160, 255, 0.40)" strokeWidth="11.6" strokeLinecap="round" />
  <line x1="49.8" y1="49.6" x2="49.6" y2="48.9" stroke="rgba(100, 160, 255, 0.39)" strokeWidth="11.3" strokeLinecap="round" />
  <line x1="49.6" y1="48.9" x2="49.8" y2="48.1" stroke="rgba(100, 160, 255, 0.39)" strokeWidth="10.9" strokeLinecap="round" />
  <line x1="49.8" y1="48.1" x2="50.4" y2="47.3" stroke="rgba(100, 160, 255, 0.38)" strokeWidth="10.5" strokeLinecap="round" />
  <line x1="50.4" y1="47.3" x2="51.3" y2="46.5" stroke="rgba(100, 160, 255, 0.37)" strokeWidth="10.2" strokeLinecap="round" />
  <line x1="51.3" y1="46.5" x2="52.6" y2="46.1" stroke="rgba(100, 160, 255, 0.36)" strokeWidth="9.8" strokeLinecap="round" />
  <line x1="52.6" y1="46.1" x2="54.2" y2="46.1" stroke="rgba(100, 160, 255, 0.35)" strokeWidth="9.4" strokeLinecap="round" />
  <line x1="54.2" y1="46.1" x2="55.9" y2="46.7" stroke="rgba(100, 160, 255, 0.34)" strokeWidth="9.1" strokeLinecap="round" />
  <line x1="55.9" y1="46.7" x2="57.6" y2="47.8" stroke="rgba(100, 160, 255, 0.33)" strokeWidth="8.7" strokeLinecap="round" />
  <line x1="57.6" y1="47.8" x2="59.1" y2="49.5" stroke="rgba(100, 160, 255, 0.32)" strokeWidth="8.3" strokeLinecap="round" />
  <line x1="59.1" y1="49.5" x2="60.1" y2="51.8" stroke="rgba(100, 160, 255, 0.31)" strokeWidth="8.0" strokeLinecap="round" />
  <line x1="60.1" y1="51.8" x2="60.6" y2="54.6" stroke="rgba(100, 160, 255, 0.30)" strokeWidth="7.6" strokeLinecap="round" />
  <line x1="60.6" y1="54.6" x2="60.3" y2="57.6" stroke="rgba(100, 160, 255, 0.29)" strokeWidth="7.2" strokeLinecap="round" />
  <line x1="60.3" y1="57.6" x2="59.1" y2="60.8" stroke="rgba(100, 160, 255, 0.27)" strokeWidth="6.9" strokeLinecap="round" />
  <line x1="59.1" y1="60.8" x2="57.0" y2="63.8" stroke="rgba(100, 160, 255, 0.26)" strokeWidth="6.5" strokeLinecap="round" />
  <line x1="57.0" y1="63.8" x2="54.0" y2="66.3" stroke="rgba(100, 160, 255, 0.24)" strokeWidth="6.1" strokeLinecap="round" />
  <line x1="54.0" y1="66.3" x2="50.2" y2="68.2" stroke="rgba(100, 160, 255, 0.23)" strokeWidth="5.8" strokeLinecap="round" />
  <line x1="50.2" y1="68.2" x2="45.7" y2="69.1" stroke="rgba(100, 160, 255, 0.21)" strokeWidth="5.4" strokeLinecap="round" />
  <line x1="45.7" y1="69.1" x2="40.9" y2="68.9" stroke="rgba(100, 160, 255, 0.20)" strokeWidth="5.0" strokeLinecap="round" />
  <line x1="40.9" y1="68.9" x2="35.9" y2="67.4" stroke="rgba(100, 160, 255, 0.18)" strokeWidth="4.7" strokeLinecap="round" />
  <line x1="35.9" y1="67.4" x2="31.1" y2="64.6" stroke="rgba(100, 160, 255, 0.17)" strokeWidth="4.3" strokeLinecap="round" />
  <line x1="31.1" y1="64.6" x2="26.9" y2="60.6" stroke="rgba(100, 160, 255, 0.15)" strokeWidth="3.9" strokeLinecap="round" />
  <line x1="26.9" y1="60.6" x2="23.6" y2="55.3" stroke="rgba(100, 160, 255, 0.13)" strokeWidth="3.6" strokeLinecap="round" />
  <line x1="23.6" y1="55.3" x2="21.6" y2="49.1" stroke="rgba(100, 160, 255, 0.11)" strokeWidth="3.2" strokeLinecap="round" />
  <line x1="21.6" y1="49.1" x2="21.0" y2="42.2" stroke="rgba(100, 160, 255, 0.10)" strokeWidth="2.8" strokeLinecap="round" />
  <line x1="21.0" y1="42.2" x2="22.2" y2="35.1" stroke="rgba(100, 160, 255, 0.08)" strokeWidth="2.5" strokeLinecap="round" />
  <line x1="22.2" y1="35.1" x2="25.1" y2="28.1" stroke="rgba(100, 160, 255, 0.06)" strokeWidth="2.1" strokeLinecap="round" />
  <line x1="25.1" y1="28.1" x2="29.9" y2="21.7" stroke="rgba(100, 160, 255, 0.04)" strokeWidth="1.7" strokeLinecap="round" />
  <line x1="29.9" y1="21.7" x2="36.3" y2="16.3" stroke="rgba(100, 160, 255, 0.02)" strokeWidth="1.4" strokeLinecap="round" />
  <line x1="50.0" y1="50.0" x2="50.4" y2="49.8" stroke="rgba(100, 160, 255, 0.40)" strokeWidth="11.6" strokeLinecap="round" />
  <line x1="50.4" y1="49.8" x2="51.1" y2="49.6" stroke="rgba(100, 160, 255, 0.39)" strokeWidth="11.3" strokeLinecap="round" />
  <line x1="51.1" y1="49.6" x2="51.9" y2="49.8" stroke="rgba(100, 160, 255, 0.39)" strokeWidth="10.9" strokeLinecap="round" />
  <line x1="51.9" y1="49.8" x2="52.7" y2="50.4" stroke="rgba(100, 160, 255, 0.38)" strokeWidth="10.5" strokeLinecap="round" />
  <line x1="52.7" y1="50.4" x2="53.5" y2="51.3" stroke="rgba(100, 160, 255, 0.37)" strokeWidth="10.2" strokeLinecap="round" />
  <line x1="53.5" y1="51.3" x2="53.9" y2="52.6" stroke="rgba(100, 160, 255, 0.36)" strokeWidth="9.8" strokeLinecap="round" />
  <line x1="53.9" y1="52.6" x2="53.9" y2="54.2" stroke="rgba(100, 160, 255, 0.35)" strokeWidth="9.4" strokeLinecap="round" />
  <line x1="53.9" y1="54.2" x2="53.3" y2="55.9" stroke="rgba(100, 160, 255, 0.34)" strokeWidth="9.1" strokeLinecap="round" />
  <line x1="53.3" y1="55.9" x2="52.2" y2="57.6" stroke="rgba(100, 160, 255, 0.33)" strokeWidth="8.7" strokeLinecap="round" />
  <line x1="52.2" y1="57.6" x2="50.5" y2="59.1" stroke="rgba(100, 160, 255, 0.32)" strokeWidth="8.3" strokeLinecap="round" />
  <line x1="50.5" y1="59.1" x2="48.2" y2="60.1" stroke="rgba(100, 160, 255, 0.31)" strokeWidth="8.0" strokeLinecap="round" />
  <line x1="48.2" y1="60.1" x2="45.4" y2="60.6" stroke="rgba(100, 160, 255, 0.30)" strokeWidth="7.6" strokeLinecap="round" />
  <line x1="45.4" y1="60.6" x2="42.4" y2="60.3" stroke="rgba(100, 160, 255, 0.29)" strokeWidth="7.2" strokeLinecap="round" />
  <line x1="42.4" y1="60.3" x2="39.2" y2="59.1" stroke="rgba(100, 160, 255, 0.27)" strokeWidth="6.9" strokeLinecap="round" />
  <line x1="39.2" y1="59.1" x2="36.2" y2="57.0" stroke="rgba(100, 160, 255, 0.26)" strokeWidth="6.5" strokeLinecap="round" />
  <line x1="36.2" y1="57.0" x2="33.7" y2="54.0" stroke="rgba(100, 160, 255, 0.24)" strokeWidth="6.1" strokeLinecap="round" />
  <line x1="33.7" y1="54.0" x2="31.8" y2="50.2" stroke="rgba(100, 160, 255, 0.23)" strokeWidth="5.8" strokeLinecap="round" />
  <line x1="31.8" y1="50.2" x2="30.9" y2="45.7" stroke="rgba(100, 160, 255, 0.21)" strokeWidth="5.4" strokeLinecap="round" />
  <line x1="30.9" y1="45.7" x2="31.1" y2="40.9" stroke="rgba(100, 160, 255, 0.20)" strokeWidth="5.0" strokeLinecap="round" />
  <line x1="31.1" y1="40.9" x2="32.6" y2="35.9" stroke="rgba(100, 160, 255, 0.18)" strokeWidth="4.7" strokeLinecap="round" />
  <line x1="32.6" y1="35.9" x2="35.4" y2="31.1" stroke="rgba(100, 160, 255, 0.17)" strokeWidth="4.3" strokeLinecap="round" />
  <line x1="35.4" y1="31.1" x2="39.4" y2="26.9" stroke="rgba(100, 160, 255, 0.15)" strokeWidth="3.9" strokeLinecap="round" />
  <line x1="39.4" y1="26.9" x2="44.7" y2="23.6" stroke="rgba(100, 160, 255, 0.13)" strokeWidth="3.6" strokeLinecap="round" />
  <line x1="44.7" y1="23.6" x2="50.9" y2="21.6" stroke="rgba(100, 160, 255, 0.11)" strokeWidth="3.2" strokeLinecap="round" />
  <line x1="50.9" y1="21.6" x2="57.8" y2="21.0" stroke="rgba(100, 160, 255, 0.10)" strokeWidth="2.8" strokeLinecap="round" />
  <line x1="57.8" y1="21.0" x2="64.9" y2="22.2" stroke="rgba(100, 160, 255, 0.08)" strokeWidth="2.5" strokeLinecap="round" />
  <line x1="64.9" y1="22.2" x2="71.9" y2="25.1" stroke="rgba(100, 160, 255, 0.06)" strokeWidth="2.1" strokeLinecap="round" />
  <line x1="71.9" y1="25.1" x2="78.3" y2="29.9" stroke="rgba(100, 160, 255, 0.04)" strokeWidth="1.7" strokeLinecap="round" />
  <line x1="78.3" y1="29.9" x2="83.7" y2="36.3" stroke="rgba(100, 160, 255, 0.02)" strokeWidth="1.4" strokeLinecap="round" />
</g>
<g filter="blur(1.5px)">
  <line x1="50.0" y1="50.0" x2="50.4" y2="50.0" stroke="rgba(255, 232, 31, 0.69)" strokeWidth="7.7" strokeLinecap="round" />
  <line x1="50.4" y1="50.0" x2="50.9" y2="50.2" stroke="rgba(255, 232, 31, 0.68)" strokeWidth="7.4" strokeLinecap="round" />
  <line x1="50.9" y1="50.2" x2="51.5" y2="50.6" stroke="rgba(255, 232, 31, 0.67)" strokeWidth="7.1" strokeLinecap="round" />
  <line x1="51.5" y1="50.6" x2="51.9" y2="51.3" stroke="rgba(255, 232, 31, 0.66)" strokeWidth="6.8" strokeLinecap="round" />
  <line x1="51.9" y1="51.3" x2="52.1" y2="52.2" stroke="rgba(255, 232, 31, 0.64)" strokeWidth="6.5" strokeLinecap="round" />
  <line x1="52.1" y1="52.2" x2="52.1" y2="53.3" stroke="rgba(255, 232, 31, 0.62)" strokeWidth="6.2" strokeLinecap="round" />
  <line x1="52.1" y1="53.3" x2="51.7" y2="54.5" stroke="rgba(255, 232, 31, 0.60)" strokeWidth="5.9" strokeLinecap="round" />
  <line x1="51.7" y1="54.5" x2="50.9" y2="55.6" stroke="rgba(255, 232, 31, 0.57)" strokeWidth="5.6" strokeLinecap="round" />
  <line x1="50.9" y1="55.6" x2="49.7" y2="56.6" stroke="rgba(255, 232, 31, 0.55)" strokeWidth="5.3" strokeLinecap="round" />
  <line x1="49.7" y1="56.6" x2="48.2" y2="57.4" stroke="rgba(255, 232, 31, 0.52)" strokeWidth="5.0" strokeLinecap="round" />
  <line x1="48.2" y1="57.4" x2="46.3" y2="57.8" stroke="rgba(255, 232, 31, 0.50)" strokeWidth="4.7" strokeLinecap="round" />
  <line x1="46.3" y1="57.8" x2="44.2" y2="57.7" stroke="rgba(255, 232, 31, 0.47)" strokeWidth="4.4" strokeLinecap="round" />
  <line x1="44.2" y1="57.7" x2="42.0" y2="57.1" stroke="rgba(255, 232, 31, 0.44)" strokeWidth="4.1" strokeLinecap="round" />
  <line x1="42.0" y1="57.1" x2="39.8" y2="55.9" stroke="rgba(255, 232, 31, 0.41)" strokeWidth="3.8" strokeLinecap="round" />
  <line x1="39.8" y1="55.9" x2="37.8" y2="54.1" stroke="rgba(255, 232, 31, 0.37)" strokeWidth="3.5" strokeLinecap="round" />
  <line x1="37.8" y1="54.1" x2="36.1" y2="51.7" stroke="rgba(255, 232, 31, 0.34)" strokeWidth="3.2" strokeLinecap="round" />
  <line x1="36.1" y1="51.7" x2="34.9" y2="48.8" stroke="rgba(255, 232, 31, 0.31)" strokeWidth="2.9" strokeLinecap="round" />
  <line x1="34.9" y1="48.8" x2="34.3" y2="45.5" stroke="rgba(255, 232, 31, 0.27)" strokeWidth="2.6" strokeLinecap="round" />
  <line x1="34.3" y1="45.5" x2="34.5" y2="41.9" stroke="rgba(255, 232, 31, 0.24)" strokeWidth="2.3" strokeLinecap="round" />
  <line x1="34.5" y1="41.9" x2="35.5" y2="38.2" stroke="rgba(255, 232, 31, 0.20)" strokeWidth="2.0" strokeLinecap="round" />
  <line x1="35.5" y1="38.2" x2="37.3" y2="34.6" stroke="rgba(255, 232, 31, 0.16)" strokeWidth="1.7" strokeLinecap="round" />
  <line x1="37.3" y1="34.6" x2="40.1" y2="31.3" stroke="rgba(255, 232, 31, 0.12)" strokeWidth="1.4" strokeLinecap="round" />
  <line x1="40.1" y1="31.3" x2="43.6" y2="28.5" stroke="rgba(255, 232, 31, 0.08)" strokeWidth="1.1" strokeLinecap="round" />
  <line x1="43.6" y1="28.5" x2="47.9" y2="26.4" stroke="rgba(255, 232, 31, 0.04)" strokeWidth="0.8" strokeLinecap="round" />
  <line x1="50.0" y1="50.0" x2="50.0" y2="50.4" stroke="rgba(255, 232, 31, 0.69)" strokeWidth="7.7" strokeLinecap="round" />
  <line x1="50.0" y1="50.4" x2="49.8" y2="50.9" stroke="rgba(255, 232, 31, 0.68)" strokeWidth="7.4" strokeLinecap="round" />
  <line x1="49.8" y1="50.9" x2="49.4" y2="51.5" stroke="rgba(255, 232, 31, 0.67)" strokeWidth="7.1" strokeLinecap="round" />
  <line x1="49.4" y1="51.5" x2="48.7" y2="51.9" stroke="rgba(255, 232, 31, 0.66)" strokeWidth="6.8" strokeLinecap="round" />
  <line x1="48.7" y1="51.9" x2="47.8" y2="52.1" stroke="rgba(255, 232, 31, 0.64)" strokeWidth="6.5" strokeLinecap="round" />
  <line x1="47.8" y1="52.1" x2="46.7" y2="52.1" stroke="rgba(255, 232, 31, 0.62)" strokeWidth="6.2" strokeLinecap="round" />
  <line x1="46.7" y1="52.1" x2="45.5" y2="51.7" stroke="rgba(255, 232, 31, 0.60)" strokeWidth="5.9" strokeLinecap="round" />
  <line x1="45.5" y1="51.7" x2="44.4" y2="50.9" stroke="rgba(255, 232, 31, 0.57)" strokeWidth="5.6" strokeLinecap="round" />
  <line x1="44.4" y1="50.9" x2="43.4" y2="49.7" stroke="rgba(255, 232, 31, 0.55)" strokeWidth="5.3" strokeLinecap="round" />
  <line x1="43.4" y1="49.7" x2="42.6" y2="48.2" stroke="rgba(255, 232, 31, 0.52)" strokeWidth="5.0" strokeLinecap="round" />
  <line x1="42.6" y1="48.2" x2="42.2" y2="46.3" stroke="rgba(255, 232, 31, 0.50)" strokeWidth="4.7" strokeLinecap="round" />
  <line x1="42.2" y1="46.3" x2="42.3" y2="44.2" stroke="rgba(255, 232, 31, 0.47)" strokeWidth="4.4" strokeLinecap="round" />
  <line x1="42.3" y1="44.2" x2="42.9" y2="42.0" stroke="rgba(255, 232, 31, 0.44)" strokeWidth="4.1" strokeLinecap="round" />
  <line x1="42.9" y1="42.0" x2="44.1" y2="39.8" stroke="rgba(255, 232, 31, 0.41)" strokeWidth="3.8" strokeLinecap="round" />
  <line x1="44.1" y1="39.8" x2="45.9" y2="37.8" stroke="rgba(255, 232, 31, 0.37)" strokeWidth="3.5" strokeLinecap="round" />
  <line x1="45.9" y1="37.8" x2="48.3" y2="36.1" stroke="rgba(255, 232, 31, 0.34)" strokeWidth="3.2" strokeLinecap="round" />
  <line x1="48.3" y1="36.1" x2="51.2" y2="34.9" stroke="rgba(255, 232, 31, 0.31)" strokeWidth="2.9" strokeLinecap="round" />
  <line x1="51.2" y1="34.9" x2="54.5" y2="34.3" stroke="rgba(255, 232, 31, 0.27)" strokeWidth="2.6" strokeLinecap="round" />
  <line x1="54.5" y1="34.3" x2="58.1" y2="34.5" stroke="rgba(255, 232, 31, 0.24)" strokeWidth="2.3" strokeLinecap="round" />
  <line x1="58.1" y1="34.5" x2="61.8" y2="35.5" stroke="rgba(255, 232, 31, 0.20)" strokeWidth="2.0" strokeLinecap="round" />
  <line x1="61.8" y1="35.5" x2="65.4" y2="37.3" stroke="rgba(255, 232, 31, 0.16)" strokeWidth="1.7" strokeLinecap="round" />
  <line x1="65.4" y1="37.3" x2="68.7" y2="40.1" stroke="rgba(255, 232, 31, 0.12)" strokeWidth="1.4" strokeLinecap="round" />
  <line x1="68.7" y1="40.1" x2="71.5" y2="43.6" stroke="rgba(255, 232, 31, 0.08)" strokeWidth="1.1" strokeLinecap="round" />
  <line x1="71.5" y1="43.6" x2="73.6" y2="47.9" stroke="rgba(255, 232, 31, 0.04)" strokeWidth="0.8" strokeLinecap="round" />
  <line x1="50.0" y1="50.0" x2="49.6" y2="50.0" stroke="rgba(255, 232, 31, 0.69)" strokeWidth="7.7" strokeLinecap="round" />
  <line x1="49.6" y1="50.0" x2="49.1" y2="49.8" stroke="rgba(255, 232, 31, 0.68)" strokeWidth="7.4" strokeLinecap="round" />
  <line x1="49.1" y1="49.8" x2="48.5" y2="49.4" stroke="rgba(255, 232, 31, 0.67)" strokeWidth="7.1" strokeLinecap="round" />
  <line x1="48.5" y1="49.4" x2="48.1" y2="48.7" stroke="rgba(255, 232, 31, 0.66)" strokeWidth="6.8" strokeLinecap="round" />
  <line x1="48.1" y1="48.7" x2="47.9" y2="47.8" stroke="rgba(255, 232, 31, 0.64)" strokeWidth="6.5" strokeLinecap="round" />
  <line x1="47.9" y1="47.8" x2="47.9" y2="46.7" stroke="rgba(255, 232, 31, 0.62)" strokeWidth="6.2" strokeLinecap="round" />
  <line x1="47.9" y1="46.7" x2="48.3" y2="45.5" stroke="rgba(255, 232, 31, 0.60)" strokeWidth="5.9" strokeLinecap="round" />
  <line x1="48.3" y1="45.5" x2="49.1" y2="44.4" stroke="rgba(255, 232, 31, 0.57)" strokeWidth="5.6" strokeLinecap="round" />
  <line x1="49.1" y1="44.4" x2="50.3" y2="43.4" stroke="rgba(255, 232, 31, 0.55)" strokeWidth="5.3" strokeLinecap="round" />
  <line x1="50.3" y1="43.4" x2="51.8" y2="42.6" stroke="rgba(255, 232, 31, 0.52)" strokeWidth="5.0" strokeLinecap="round" />
  <line x1="51.8" y1="42.6" x2="53.7" y2="42.2" stroke="rgba(255, 232, 31, 0.50)" strokeWidth="4.7" strokeLinecap="round" />
  <line x1="53.7" y1="42.2" x2="55.8" y2="42.3" stroke="rgba(255, 232, 31, 0.47)" strokeWidth="4.4" strokeLinecap="round" />
  <line x1="55.8" y1="42.3" x2="58.0" y2="42.9" stroke="rgba(255, 232, 31, 0.44)" strokeWidth="4.1" strokeLinecap="round" />
  <line x1="58.0" y1="42.9" x2="60.2" y2="44.1" stroke="rgba(255, 232, 31, 0.41)" strokeWidth="3.8" strokeLinecap="round" />
  <line x1="60.2" y1="44.1" x2="62.2" y2="45.9" stroke="rgba(255, 232, 31, 0.37)" strokeWidth="3.5" strokeLinecap="round" />
  <line x1="62.2" y1="45.9" x2="63.9" y2="48.3" stroke="rgba(255, 232, 31, 0.34)" strokeWidth="3.2" strokeLinecap="round" />
  <line x1="63.9" y1="48.3" x2="65.1" y2="51.2" stroke="rgba(255, 232, 31, 0.31)" strokeWidth="2.9" strokeLinecap="round" />
  <line x1="65.1" y1="51.2" x2="65.7" y2="54.5" stroke="rgba(255, 232, 31, 0.27)" strokeWidth="2.6" strokeLinecap="round" />
  <line x1="65.7" y1="54.5" x2="65.5" y2="58.1" stroke="rgba(255, 232, 31, 0.24)" strokeWidth="2.3" strokeLinecap="round" />
  <line x1="65.5" y1="58.1" x2="64.5" y2="61.8" stroke="rgba(255, 232, 31, 0.20)" strokeWidth="2.0" strokeLinecap="round" />
  <line x1="64.5" y1="61.8" x2="62.7" y2="65.4" stroke="rgba(255, 232, 31, 0.16)" strokeWidth="1.7" strokeLinecap="round" />
  <line x1="62.7" y1="65.4" x2="59.9" y2="68.7" stroke="rgba(255, 232, 31, 0.12)" strokeWidth="1.4" strokeLinecap="round" />
  <line x1="59.9" y1="68.7" x2="56.4" y2="71.5" stroke="rgba(255, 232, 31, 0.08)" strokeWidth="1.1" strokeLinecap="round" />
  <line x1="56.4" y1="71.5" x2="52.1" y2="73.6" stroke="rgba(255, 232, 31, 0.04)" strokeWidth="0.8" strokeLinecap="round" />
  <line x1="50.0" y1="50.0" x2="50.0" y2="49.6" stroke="rgba(255, 232, 31, 0.69)" strokeWidth="7.7" strokeLinecap="round" />
  <line x1="50.0" y1="49.6" x2="50.2" y2="49.1" stroke="rgba(255, 232, 31, 0.68)" strokeWidth="7.4" strokeLinecap="round" />
  <line x1="50.2" y1="49.1" x2="50.6" y2="48.5" stroke="rgba(255, 232, 31, 0.67)" strokeWidth="7.1" strokeLinecap="round" />
  <line x1="50.6" y1="48.5" x2="51.3" y2="48.1" stroke="rgba(255, 232, 31, 0.66)" strokeWidth="6.8" strokeLinecap="round" />
  <line x1="51.3" y1="48.1" x2="52.2" y2="47.9" stroke="rgba(255, 232, 31, 0.64)" strokeWidth="6.5" strokeLinecap="round" />
  <line x1="52.2" y1="47.9" x2="53.3" y2="47.9" stroke="rgba(255, 232, 31, 0.62)" strokeWidth="6.2" strokeLinecap="round" />
  <line x1="53.3" y1="47.9" x2="54.5" y2="48.3" stroke="rgba(255, 232, 31, 0.60)" strokeWidth="5.9" strokeLinecap="round" />
  <line x1="54.5" y1="48.3" x2="55.6" y2="49.1" stroke="rgba(255, 232, 31, 0.57)" strokeWidth="5.6" strokeLinecap="round" />
  <line x1="55.6" y1="49.1" x2="56.6" y2="50.3" stroke="rgba(255, 232, 31, 0.55)" strokeWidth="5.3" strokeLinecap="round" />
  <line x1="56.6" y1="50.3" x2="57.4" y2="51.8" stroke="rgba(255, 232, 31, 0.52)" strokeWidth="5.0" strokeLinecap="round" />
  <line x1="57.4" y1="51.8" x2="57.8" y2="53.7" stroke="rgba(255, 232, 31, 0.50)" strokeWidth="4.7" strokeLinecap="round" />
  <line x1="57.8" y1="53.7" x2="57.7" y2="55.8" stroke="rgba(255, 232, 31, 0.47)" strokeWidth="4.4" strokeLinecap="round" />
  <line x1="57.7" y1="55.8" x2="57.1" y2="58.0" stroke="rgba(255, 232, 31, 0.44)" strokeWidth="4.1" strokeLinecap="round" />
  <line x1="57.1" y1="58.0" x2="55.9" y2="60.2" stroke="rgba(255, 232, 31, 0.41)" strokeWidth="3.8" strokeLinecap="round" />
  <line x1="55.9" y1="60.2" x2="54.1" y2="62.2" stroke="rgba(255, 232, 31, 0.37)" strokeWidth="3.5" strokeLinecap="round" />
  <line x1="54.1" y1="62.2" x2="51.7" y2="63.9" stroke="rgba(255, 232, 31, 0.34)" strokeWidth="3.2" strokeLinecap="round" />
  <line x1="51.7" y1="63.9" x2="48.8" y2="65.1" stroke="rgba(255, 232, 31, 0.31)" strokeWidth="2.9" strokeLinecap="round" />
  <line x1="48.8" y1="65.1" x2="45.5" y2="65.7" stroke="rgba(255, 232, 31, 0.27)" strokeWidth="2.6" strokeLinecap="round" />
  <line x1="45.5" y1="65.7" x2="41.9" y2="65.5" stroke="rgba(255, 232, 31, 0.24)" strokeWidth="2.3" strokeLinecap="round" />
  <line x1="41.9" y1="65.5" x2="38.2" y2="64.5" stroke="rgba(255, 232, 31, 0.20)" strokeWidth="2.0" strokeLinecap="round" />
  <line x1="38.2" y1="64.5" x2="34.6" y2="62.7" stroke="rgba(255, 232, 31, 0.16)" strokeWidth="1.7" strokeLinecap="round" />
  <line x1="34.6" y1="62.7" x2="31.3" y2="59.9" stroke="rgba(255, 232, 31, 0.12)" strokeWidth="1.4" strokeLinecap="round" />
  <line x1="31.3" y1="59.9" x2="28.5" y2="56.4" stroke="rgba(255, 232, 31, 0.08)" strokeWidth="1.1" strokeLinecap="round" />
  <line x1="28.5" y1="56.4" x2="26.4" y2="52.1" stroke="rgba(255, 232, 31, 0.04)" strokeWidth="0.8" strokeLinecap="round" />
  <circle cx="58.6" cy="56.9" r="2.0" fill="rgba(255,255,255,0.70)" />
  <circle cx="27.2" cy="73.5" r="1.0" fill="rgba(255,255,255,0.30)" />
  <circle cx="51.5" cy="48.5" r="2.4" fill="rgba(255,255,255,0.79)" />
  <circle cx="89.3" cy="49.8" r="0.8" fill="rgba(255,255,255,0.15)" />
  <circle cx="71.9" cy="78.1" r="0.9" fill="rgba(255,255,255,0.24)" />
  <circle cx="22.7" cy="75.7" r="0.8" fill="rgba(255,255,255,0.19)" />
  <circle cx="48.4" cy="58.1" r="2.1" fill="rgba(255,255,255,0.74)" />
  <circle cx="32.6" cy="56.6" r="1.7" fill="rgba(255,255,255,0.59)" />
  <circle cx="48.4" cy="51.6" r="2.4" fill="rgba(255,255,255,0.79)" />
  <circle cx="33.1" cy="38.0" r="1.6" fill="rgba(255,255,255,0.55)" />
  <circle cx="51.1" cy="60.5" r="2.0" fill="rgba(255,255,255,0.71)" />
  <circle cx="29.7" cy="48.1" r="1.6" fill="rgba(255,255,255,0.56)" />
  <circle cx="61.1" cy="69.5" r="1.5" fill="rgba(255,255,255,0.52)" />
  <circle cx="53.5" cy="40.4" r="2.0" fill="rgba(255,255,255,0.71)" />
  <circle cx="55.6" cy="18.0" r="1.1" fill="rgba(255,255,255,0.31)" />
  <circle cx="62.2" cy="12.8" r="0.8" fill="rgba(255,255,255,0.15)" />
  <circle cx="44.2" cy="53.4" r="2.2" fill="rgba(255,255,255,0.75)" />
  <circle cx="64.9" cy="36.9" r="1.6" fill="rgba(255,255,255,0.57)" />
  <circle cx="59.8" cy="62.0" r="1.8" fill="rgba(255,255,255,0.64)" />
  <circle cx="49.2" cy="31.4" r="1.7" fill="rgba(255,255,255,0.59)" />
  <circle cx="70.3" cy="70.4" r="1.2" fill="rgba(255,255,255,0.39)" />
  <circle cx="19.6" cy="63.1" r="1.0" fill="rgba(255,255,255,0.29)" />
  <circle cx="47.7" cy="67.8" r="1.7" fill="rgba(255,255,255,0.60)" />
  <circle cx="22.6" cy="21.7" r="0.7" fill="rgba(255,255,255,0.14)" />
</g>

              </svg>
              </div>
            </div>

            {/* The perfectly spherical non-rotating core */}
            <div style={{
              position: 'absolute',
              width: '12px',
              height: '12px',
              background: '#fff',
              borderRadius: '50%',
              boxShadow: '0 0 10px 4px #fff, 0 0 20px 10px rgba(255, 232, 31, 0.8), 0 0 35px 15px rgba(130, 220, 255, 0.5)',
              zIndex: 2,
            }}></div>
            <style>{`
              @keyframes spin-slow {
                from { transform: rotate(0deg); }
                to { transform: rotate(-360deg); }
              }
            `}</style>
          </div>
        </div>
      )}

      {/* Hide UI elements while physically jumping into the map */}
      <div className={`ui-elements-container ${isMapTransitioning ? 'transitioning' : ''}`}>

        {/* Sliding Episode Guide Panel (from right) — pointer-events pass through to map */}
        {!isIntroMode && (
          <div style={{
            position: 'fixed',
            top: 0,
            right: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 9997,
            background: 'transparent',
            transform: showGuide ? 'translateX(0)' : 'translateX(100%)',
            transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
            overflowY: 'auto',
            paddingBottom: '80px',
            pointerEvents: 'none',
          }}>
            <TimelineCrawl 
              activeItemId={activeEpisodeId} 
              onSelect={(id) => { handleTimelineSelect(id); }}
              isFullscreen={isTimelineFullscreen}
              onToggleFullscreen={() => setIsTimelineFullscreen(!isTimelineFullscreen)}
              onEraChange={handleEraChange}
              onHistoricalEventSelect={handleEventMarkerSelect}
              onItemFocus={handleTimelineFocus}
              onJumpToHyperspace={jumpToHyperspace}
              watchedIds={watchedIds}
              onToggleWatched={toggleWatchedStatus}
              onResetWatched={resetWatchedHistory}
              onSyncHistory={syncHistoryUpTo}
              showLogCheckmarks={showLogCheckmarks}
              onToggleShowCheckmarks={() => setShowLogCheckmarks(!showLogCheckmarks)}
            />
          </div>
        )}

        {/* Intro mode: Simple start screen (old TimelineCrawl fullscreen is reversible — just replace this block) */}
        {isIntroMode && (
          <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            zIndex: 10,
            pointerEvents: 'none',
          }}>
            <div style={{
              position: 'absolute',
              top: 'clamp(15%, 20vh, 25%)',
              left: 0,
              right: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
              <div style={{ fontFamily: 'Orbitron, sans-serif', border: '1px solid rgba(56, 189, 248, 0.2)', padding: 'clamp(14px, 3vw, 24px) clamp(24px, 5vw, 40px)', background: 'rgba(10, 20, 40, 0.7)', borderRadius: '2px', position: 'relative', display: 'inline-block', backdropFilter: 'blur(4px)' }}>
                {/* Fake UI corners */}
                <div style={{ position: 'absolute', top: -1, left: -1, width: '12px', height: '12px', borderTop: '2px solid #38bdf8', borderLeft: '2px solid #38bdf8' }} />
                <div style={{ position: 'absolute', top: -1, right: -1, width: '12px', height: '12px', borderTop: '2px solid #38bdf8', borderRight: '2px solid #38bdf8' }} />
                <div style={{ position: 'absolute', bottom: -1, left: -1, width: '12px', height: '12px', borderBottom: '2px solid #38bdf8', borderLeft: '2px solid #38bdf8' }} />
                <div style={{ position: 'absolute', bottom: -1, right: -1, width: '12px', height: '12px', borderBottom: '2px solid #38bdf8', borderRight: '2px solid #38bdf8' }} />
                
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '8px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#38bdf8', boxShadow: '0 0 12px #38bdf8', animation: 'holo-flicker 2s infinite' }} />
                  <h1 style={{ margin: 0, fontSize: 'clamp(1.4rem, 5vw, 2.5rem)', letterSpacing: '6px', color: '#fff', textShadow: '0 0 15px rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>HOLONET TERMINAL</h1>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
                  <span style={{ fontSize: 'clamp(0.5rem, 1.5vw, 0.75rem)', color: '#38bdf8', opacity: 0.5, letterSpacing: '2px' }}>[SEC:4]</span>
                  <p style={{ margin: 0, fontSize: 'clamp(0.6rem, 2vw, 0.9rem)', color: '#38bdf8', letterSpacing: '3px', textTransform: 'uppercase' }}>Interactive Atlas & Historical Records</p>
                  <span style={{ fontSize: 'clamp(0.5rem, 1.5vw, 0.75rem)', color: '#38bdf8', opacity: 0.5, letterSpacing: '2px' }}>[V:2.4]</span>
                </div>
              </div>
            </div>

            <div style={{
              position: 'absolute',
              bottom: 'clamp(8%, 12vh, 20%)',
              left: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'center',
            }}>
            <button
              onClick={jumpToHyperspace}
              className="hologram-btn"
            >
              <svg className="holo-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
                <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="12" cy="12" r="2" fill="currentColor" />
                <path d="M12 2v4 M12 18v4 M2 12h4 M18 12h4" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
              </svg>
              <span className="holo-text">ENTER HYPERSPACE</span>
            </button>
            </div>
          </div>
        )}

        {/* Click-outside backdrop for LoreCard */}
        {loreMode && (
          <div 
            onClick={handleCloseLoreCard}
            style={{
              position: 'fixed',
              top: 0, left: 0, right: 0, bottom: 0,
              zIndex: 9998,
              background: 'transparent',
            }}
          />
        )}

        <LoreCard 
          activeItemId={activeEpisodeId}
          activePlanetId={activePlanetId}
          activeHistoricalEvent={activeHistoricalEvent}
          activeRoute={activeRoute}
          activeEra={activeEra}
          loreMode={loreMode}
          onSwitchMode={setLoreMode}
          onClose={handleCloseLoreCard}
          onNext={handleTimelineSelect}
          onPlanetSelect={handlePlanetSelect}
          onSyncHistory={syncHistoryUpTo}
          watchedIds={watchedIds}
          onToggleWatched={toggleWatchedStatus}
        />

        {/* 3 circular toggle buttons at bottom — all screen sizes */}
        {!isIntroMode && (
          <div style={{
            position: 'fixed',
            bottom: 'max(16px, env(safe-area-inset-bottom))',
            left: 0,
            right: 0,
            zIndex: 9998,
            display: 'flex',
            justifyContent: 'center',
            gap: '16px',
            pointerEvents: 'none',
          }}>
            {/* Legend button */}
            <button
              onClick={() => setShowLegend(!showLegend)}
              style={{
                pointerEvents: 'auto',
                width: '44px', height: '44px', borderRadius: '50%',
                border: `1px solid ${showLegend ? '#ffe81f' : 'rgba(255, 232, 31, 0.4)'}`,
                background: showLegend ? 'rgba(255, 232, 31, 0.2)' : 'rgba(10, 20, 40, 0.85)',
                color: showLegend ? '#ffe81f' : 'rgba(255, 232, 31, 0.6)',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backdropFilter: 'blur(8px)',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.6)',
                transition: 'all 0.3s ease',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="10" r="3"/><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z"/>
              </svg>
            </button>

            {/* Map button (center) — hides both panels */}
            <button
              onClick={() => { setShowLegend(false); setShowGuide(false); }}
              style={{
                pointerEvents: 'auto',
                width: '44px', height: '44px', borderRadius: '50%',
                border: `1px solid ${!showLegend && !showGuide ? '#ffe81f' : 'rgba(255, 232, 31, 0.4)'}`,
                background: !showLegend && !showGuide ? 'rgba(255, 232, 31, 0.2)' : 'rgba(10, 20, 40, 0.85)',
                color: !showLegend && !showGuide ? '#ffe81f' : 'rgba(255, 232, 31, 0.6)',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backdropFilter: 'blur(8px)',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.6)',
                transition: 'all 0.3s ease',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><ellipse cx="12" cy="12" rx="4" ry="10"/>
              </svg>
            </button>

            {/* Guide button */}
            <button
              onClick={() => setShowGuide(!showGuide)}
              style={{
                pointerEvents: 'auto',
                width: '44px', height: '44px', borderRadius: '50%',
                border: `1px solid ${showGuide ? '#ffe81f' : 'rgba(255, 232, 31, 0.4)'}`,
                background: showGuide ? 'rgba(255, 232, 31, 0.2)' : 'rgba(10, 20, 40, 0.85)',
                color: showGuide ? '#ffe81f' : 'rgba(255, 232, 31, 0.6)',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backdropFilter: 'blur(8px)',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.6)',
                transition: 'all 0.3s ease',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
              </svg>
            </button>
          </div>
        )}

        {/* Back Button (Map View Only) */}
        {!isIntroMode && (
          <button
            onClick={() => {
              setLoreMode(null);
              setIsJumping(true);
              setIsMapTransitioning(true);
              setTimeout(() => setIsJumping(false), 4000);
              setTimeout(() => setIsMapTransitioning(false), 4400);
              setIsIntroMode(true);
            }}
            style={{
              position: 'fixed',
              bottom: 'max(16px, env(safe-area-inset-bottom))',
              left: '16px',
              zIndex: 9998,
              background: 'rgba(10, 20, 40, 0.8)',
              border: '1px solid rgba(255, 232, 31, 0.4)',
              color: '#FFE81F',
              padding: '0',
              borderRadius: '50%',
              width: '44px',
              height: '44px',
              cursor: 'pointer',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
            title="Return to Archives"
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 232, 31, 0.15)';
              e.currentTarget.style.boxShadow = '0 0 15px rgba(255, 232, 31, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(10, 20, 40, 0.8)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.5)';
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFE81F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>
        )}

        {/* Snake Timeline Button (Map View Only) */}
        {!isIntroMode && (
          <button
            onClick={() => setIsSnakeTimelineOpen(true)}
            style={{
              position: 'fixed',
              bottom: 'max(16px, env(safe-area-inset-bottom))',
              right: '16px',
              zIndex: 9998,
              background: 'rgba(10, 20, 40, 0.8)',
              border: '1px solid rgba(255, 232, 31, 0.4)',
              color: '#FFE81F',
              padding: '0',
              borderRadius: '50%',
              width: '44px',
              height: '44px',
              cursor: 'pointer',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
            title="Open Full Timeline"
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 232, 31, 0.15)';
              e.currentTarget.style.boxShadow = '0 0 15px rgba(255, 232, 31, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(10, 20, 40, 0.8)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.5)';
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFE81F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4 L4 8 L20 8 L20 12 L4 12 L4 16 L20 16 L20 20" />
              <circle cx="4" cy="4" r="1.5" fill="#FFE81F" />
              <circle cx="20" cy="20" r="1.5" fill="#FFE81F" />
            </svg>
          </button>
        )}
      </div>

      <AnimatePresence>
        {isSnakeTimelineOpen && (
          <SnakeTimelineOverlay 
            onClose={() => setIsSnakeTimelineOpen(false)} 
          />
        )}
      </AnimatePresence>

      {/* GDPR Notice & Disclaimer Footer */}
      {showGdprNotice && (
        <div style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          background: 'rgba(5, 10, 20, 0.95)',
          backdropFilter: 'blur(8px)',
          borderTop: '1px solid rgba(255, 232, 31, 0.15)',
          padding: '10px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          fontSize: '0.7rem',
          color: 'rgba(200, 210, 220, 0.7)',
          letterSpacing: '0.5px'
        }}>
          <span style={{ flex: 1, maxWidth: '800px', lineHeight: '1.4' }}>
            This site uses your browser's local storage to save your viewing progress. No personal data is collected, transmitted, or shared.
            This is an independent fan project — not affiliated with, endorsed by, or sponsored by Disney or Lucasfilm.
          </span>
          <button 
            onClick={() => {
              setShowGdprNotice(false);
              try { localStorage.setItem('sw_gdpr_dismissed', 'true'); } catch {}
            }}
            style={{
              background: 'rgba(255, 232, 31, 0.15)',
              border: '1px solid rgba(255, 232, 31, 0.4)',
              color: '#ffe81f',
              padding: '5px 16px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.7rem',
              letterSpacing: '1px',
              flexShrink: 0,
              whiteSpace: 'nowrap'
            }}
          >
            UNDERSTOOD
          </button>
        </div>
      )}

    </div>
  );
}

export default App;
