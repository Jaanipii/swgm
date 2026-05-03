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

      {/* The star background should only be visible during intro mode */}
      {isIntroMode && (
        <div className="map-container intro-stars" style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, pointerEvents: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
                    {/* Outer main arms */}
                    <path d="M 50 50 L 50.0 50.3 L 49.8 50.7 L 49.5 51.1 L 49.0 51.5 L 48.4 51.8 L 47.6 51.9 L 46.8 51.8 L 45.9 51.6 L 45.0 51.1 L 44.1 50.4 L 43.3 49.4 L 42.7 48.2 L 42.3 46.8 L 42.1 45.3 L 42.3 43.6 L 42.7 41.9 L 43.5 40.1 L 44.7 38.4 L 46.3 36.9 L 48.2 35.5 L 50.4 34.5 L 52.9 33.7 L 55.6 33.4 L 58.5 33.6 L 61.5 34.2 L 64.4 35.4 L 67.3 37.1 L 69.9 39.4 L 72.3 42.1 L 74.3 45.4 L 75.8 49.0 L 76.7 53.0 L 77.0 57.3 L 76.6 61.7 L 75.5 66.2 L 73.6 70.6 L 71.0 74.7 L 67.6 78.6 L 63.6 82.0 L 58.9 84.8 L 53.7 86.9 L 48.1 88.2 L 42.1 88.7 L 36.0 88.2 L 29.8 86.7 L 23.8 84.2 L 18.1 80.7 L 12.8 76.3 L 8.2 71.0 L 4.3 64.8" fill="none" stroke="rgba(130, 220, 255, 0.4)" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M 50 50 L 49.7 50.0 L 49.3 49.8 L 48.9 49.5 L 48.5 49.0 L 48.2 48.4 L 48.1 47.6 L 48.2 46.8 L 48.4 45.9 L 48.9 45.0 L 49.6 44.1 L 50.6 43.3 L 51.8 42.7 L 53.2 42.3 L 54.7 42.1 L 56.4 42.3 L 58.1 42.7 L 59.9 43.5 L 61.6 44.7 L 63.1 46.3 L 64.5 48.2 L 65.5 50.4 L 66.3 52.9 L 66.6 55.6 L 66.4 58.5 L 65.8 61.5 L 64.6 64.4 L 62.9 67.3 L 60.6 69.9 L 57.9 72.3 L 54.6 74.3 L 51.0 75.8 L 47.0 76.7 L 42.7 77.0 L 38.3 76.6 L 33.8 75.5 L 29.4 73.6 L 25.3 71.0 L 21.4 67.6 L 18.0 63.6 L 15.2 58.9 L 13.1 53.7 L 11.8 48.1 L 11.3 42.1 L 11.8 36.0 L 13.3 29.8 L 15.8 23.8 L 19.3 18.1 L 23.7 12.8 L 29.0 8.2 L 35.2 4.3" fill="none" stroke="rgba(130, 220, 255, 0.4)" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M 50 50 L 50.0 49.7 L 50.2 49.3 L 50.5 48.9 L 51.0 48.5 L 51.6 48.2 L 52.4 48.1 L 53.2 48.2 L 54.1 48.4 L 55.0 48.9 L 55.9 49.6 L 56.7 50.6 L 57.3 51.8 L 57.7 53.2 L 57.9 54.7 L 57.7 56.4 L 57.3 58.1 L 56.5 59.9 L 55.3 61.6 L 53.7 63.1 L 51.8 64.5 L 49.6 65.5 L 47.1 66.3 L 44.4 66.6 L 41.5 66.4 L 38.5 65.8 L 35.6 64.6 L 32.7 62.9 L 30.1 60.6 L 27.7 57.9 L 25.7 54.6 L 24.2 51.0 L 23.3 47.0 L 23.0 42.7 L 23.4 38.3 L 24.5 33.8 L 26.4 29.4 L 29.0 25.3 L 32.4 21.4 L 36.4 18.0 L 41.1 15.2 L 46.3 13.1 L 51.9 11.8 L 57.9 11.3 L 64.0 11.8 L 70.2 13.3 L 76.2 15.8 L 81.9 19.3 L 87.2 23.7 L 91.8 29.0 L 95.7 35.2" fill="none" stroke="rgba(130, 220, 255, 0.4)" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M 50 50 L 50.3 50.0 L 50.7 50.2 L 51.1 50.5 L 51.5 51.0 L 51.8 51.6 L 51.9 52.4 L 51.8 53.2 L 51.6 54.1 L 51.1 55.0 L 50.4 55.9 L 49.4 56.7 L 48.2 57.3 L 46.8 57.7 L 45.3 57.9 L 43.6 57.7 L 41.9 57.3 L 40.1 56.5 L 38.4 55.3 L 36.9 53.7 L 35.5 51.8 L 34.5 49.6 L 33.7 47.1 L 33.4 44.4 L 33.6 41.5 L 34.2 38.5 L 35.4 35.6 L 37.1 32.7 L 39.4 30.1 L 42.1 27.7 L 45.4 25.7 L 49.0 24.2 L 53.0 23.3 L 57.3 23.0 L 61.7 23.4 L 66.2 24.5 L 70.6 26.4 L 74.7 29.0 L 78.6 32.4 L 82.0 36.4 L 84.8 41.1 L 86.9 46.3 L 88.2 51.9 L 88.7 57.9 L 88.2 64.0 L 86.7 70.2 L 84.2 76.2 L 80.7 81.9 L 76.3 87.2 L 71.0 91.8 L 64.8 95.7" fill="none" stroke="rgba(130, 220, 255, 0.4)" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
                  </g>
                  
                  <g filter="blur(2px)">
                    {/* Secondary arms/spurs */}
                    <path d="M 50 50 L 50.2 50.3 L 50.3 50.7 L 50.3 51.3 L 50.2 51.9 L 49.8 52.5 L 49.2 53.1 L 48.4 53.6 L 47.4 53.9 L 46.2 53.9 L 44.9 53.7 L 43.6 53.1 L 42.4 52.2 L 41.2 51.0 L 40.3 49.4 L 39.7 47.5 L 39.4 45.4 L 39.6 43.1 L 40.2 40.8 L 41.3 38.5 L 43.0 36.2 L 45.2 34.3 L 47.8 32.7 L 50.9 31.5 L 54.3 30.9 L 57.9 30.9 L 61.6 31.7 L 65.3 33.1 L 68.9 35.4 L 72.1 38.3 L 74.9 41.9 L 77.0 46.2 L 78.4 50.9 L 79.0 56.0 L 78.6 61.3 L 77.2 66.7 L 74.9 71.9 L 71.5 76.8 L 67.1 81.2 L 61.9 84.8 L 55.9 87.5" fill="none" stroke="rgba(100, 160, 255, 0.5)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M 50 50 L 49.7 50.2 L 49.3 50.3 L 48.7 50.3 L 48.1 50.2 L 47.5 49.8 L 46.9 49.2 L 46.4 48.4 L 46.1 47.4 L 46.1 46.2 L 46.3 44.9 L 46.9 43.6 L 47.8 42.4 L 49.0 41.2 L 50.6 40.3 L 52.5 39.7 L 54.6 39.4 L 56.9 39.6 L 59.2 40.2 L 61.5 41.3 L 63.8 43.0 L 65.7 45.2 L 67.3 47.8 L 68.5 50.9 L 69.1 54.3 L 69.1 57.9 L 68.3 61.6 L 66.9 65.3 L 64.6 68.9 L 61.7 72.1 L 58.1 74.9 L 53.8 77.0 L 49.1 78.4 L 44.0 79.0 L 38.7 78.6 L 33.3 77.2 L 28.1 74.9 L 23.2 71.5 L 18.8 67.1 L 15.2 61.9 L 12.5 55.9" fill="none" stroke="rgba(100, 160, 255, 0.5)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M 50 50 L 49.8 49.7 L 49.7 49.3 L 49.7 48.7 L 49.8 48.1 L 50.2 47.5 L 50.8 46.9 L 51.6 46.4 L 52.6 46.1 L 53.8 46.1 L 55.1 46.3 L 56.4 46.9 L 57.6 47.8 L 58.8 49.0 L 59.7 50.6 L 60.3 52.5 L 60.6 54.6 L 60.4 56.9 L 59.8 59.2 L 58.7 61.5 L 57.0 63.8 L 54.8 65.7 L 52.2 67.3 L 49.1 68.5 L 45.7 69.1 L 42.1 69.1 L 38.4 68.3 L 34.7 66.9 L 31.1 64.6 L 27.9 61.7 L 25.1 58.1 L 23.0 53.8 L 21.6 49.1 L 21.0 44.0 L 21.4 38.7 L 22.8 33.3 L 25.1 28.1 L 28.5 23.2 L 32.9 18.8 L 38.1 15.2 L 44.1 12.5" fill="none" stroke="rgba(100, 160, 255, 0.5)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M 50 50 L 50.3 49.8 L 50.7 49.7 L 51.3 49.7 L 51.9 49.8 L 52.5 50.2 L 53.1 50.8 L 53.6 51.6 L 53.9 52.6 L 53.9 53.8 L 53.7 55.1 L 53.1 56.4 L 52.2 57.6 L 51.0 58.8 L 49.4 59.7 L 47.5 60.3 L 45.4 60.6 L 43.1 60.4 L 40.8 59.8 L 38.5 58.7 L 36.2 57.0 L 34.3 54.8 L 32.7 52.2 L 31.5 49.1 L 30.9 45.7 L 30.9 42.1 L 31.7 38.4 L 33.1 34.7 L 35.4 31.1 L 38.3 27.9 L 41.9 25.1 L 46.2 23.0 L 50.9 21.6 L 56.0 21.0 L 61.3 21.4 L 66.7 22.8 L 71.9 25.1 L 76.8 28.5 L 81.2 32.9 L 84.8 38.1 L 87.5 44.1" fill="none" stroke="rgba(100, 160, 255, 0.5)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                  </g>
                  
                  <g filter="blur(1.5px)">
                    {/* Inner dense golden arms */}
                    <path d="M 50 50 L 50.3 50.0 L 50.7 50.1 L 51.2 50.4 L 51.6 50.8 L 52.0 51.4 L 52.1 52.2 L 52.1 53.1 L 51.9 54.1 L 51.4 55.0 L 50.6 56.0 L 49.5 56.8 L 48.2 57.4 L 46.7 57.7 L 45.0 57.8 L 43.1 57.5 L 41.3 56.8 L 39.5 55.7 L 37.8 54.1 L 36.4 52.2 L 35.2 49.9 L 34.5 47.2 L 34.3 44.4 L 34.6 41.3 L 35.5 38.2 L 36.9 35.2 L 39.0 32.4 L 41.7 29.8 L 45.0 27.7 L 48.7 26.1 L 52.8 25.2" fill="none" stroke="rgba(255, 232, 31, 0.6)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M 50 50 L 50.0 50.3 L 49.9 50.7 L 49.6 51.2 L 49.2 51.6 L 48.6 52.0 L 47.8 52.1 L 46.9 52.1 L 45.9 51.9 L 45.0 51.4 L 44.0 50.6 L 43.2 49.5 L 42.6 48.2 L 42.3 46.7 L 42.2 45.0 L 42.5 43.1 L 43.2 41.3 L 44.3 39.5 L 45.9 37.8 L 47.8 36.4 L 50.1 35.2 L 52.8 34.5 L 55.6 34.3 L 58.7 34.6 L 61.8 35.5 L 64.8 36.9 L 67.6 39.0 L 70.2 41.7 L 72.3 45.0 L 73.9 48.7 L 74.8 52.8" fill="none" stroke="rgba(255, 232, 31, 0.6)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M 50 50 L 49.7 50.0 L 49.3 49.9 L 48.8 49.6 L 48.4 49.2 L 48.0 48.6 L 47.9 47.8 L 47.9 46.9 L 48.1 45.9 L 48.6 45.0 L 49.4 44.0 L 50.5 43.2 L 51.8 42.6 L 53.3 42.3 L 55.0 42.2 L 56.9 42.5 L 58.7 43.2 L 60.5 44.3 L 62.2 45.9 L 63.6 47.8 L 64.8 50.1 L 65.5 52.8 L 65.7 55.6 L 65.4 58.7 L 64.5 61.8 L 63.1 64.8 L 61.0 67.6 L 58.3 70.2 L 55.0 72.3 L 51.3 73.9 L 47.2 74.8" fill="none" stroke="rgba(255, 232, 31, 0.6)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M 50 50 L 50.0 49.7 L 50.1 49.3 L 50.4 48.8 L 50.8 48.4 L 51.4 48.0 L 52.2 47.9 L 53.1 47.9 L 54.1 48.1 L 55.0 48.6 L 56.0 49.4 L 56.8 50.5 L 57.4 51.8 L 57.7 53.3 L 57.8 55.0 L 57.5 56.9 L 56.8 58.7 L 55.7 60.5 L 54.1 62.2 L 52.2 63.6 L 49.9 64.8 L 47.2 65.5 L 44.4 65.7 L 41.3 65.4 L 38.2 64.5 L 35.2 63.1 L 32.4 61.0 L 29.8 58.3 L 27.7 55.0 L 26.1 51.3 L 25.2 47.2" fill="none" stroke="rgba(255, 232, 31, 0.6)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />

                    <circle cx="49.5" cy="50.5" r="2.7" fill="rgba(255,255,255,0.46)" />
                    <circle cx="38.2" cy="59.6" r="2.7" fill="rgba(255,255,255,0.69)" />
                    <circle cx="61.7" cy="34.2" r="2.7" fill="rgba(255,255,255,0.73)" />
                    <circle cx="7.6" cy="58.3" r="2.8" fill="rgba(255,255,255,0.44)" />
                    <circle cx="46.9" cy="62.3" r="1.6" fill="rgba(255,255,255,0.54)" />
                    <circle cx="49.3" cy="18.5" r="2.7" fill="rgba(255,255,255,0.65)" />
                    <circle cx="69.5" cy="13.9" r="2.5" fill="rgba(255,255,255,0.77)" />
                    <circle cx="49.8" cy="42.7" r="2.7" fill="rgba(255,255,255,0.55)" />
                    <circle cx="39.3" cy="56.5" r="2.0" fill="rgba(255,255,255,0.46)" />
                    <circle cx="14.6" cy="55.0" r="1.6" fill="rgba(255,255,255,0.51)" />
                    <circle cx="22.8" cy="50.6" r="2.1" fill="rgba(255,255,255,0.51)" />
                    <circle cx="48.8" cy="91.2" r="1.5" fill="rgba(255,255,255,0.42)" />
                    <circle cx="38.9" cy="77.7" r="1.2" fill="rgba(255,255,255,0.61)" />
                    <circle cx="21.8" cy="20.5" r="2.4" fill="rgba(255,255,255,0.45)" />
                    <circle cx="39.8" cy="72.2" r="1.5" fill="rgba(255,255,255,0.48)" />
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
              isFullscreen={false}
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

        {/* Intro mode: Timeline always visible (full crawl view) */}
        {isIntroMode && (
          <TimelineCrawl 
            activeItemId={activeEpisodeId} 
            onSelect={handleTimelineSelect} 
            isFullscreen={true}
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

        <button
          onClick={() => {
            if (!isIntroMode) {
              setLoreMode(null);
              setIsJumping(true);
              setIsMapTransitioning(true);
              setTimeout(() => setIsJumping(false), 4000);
              setTimeout(() => setIsMapTransitioning(false), 4400);
              setIsIntroMode(true);
            } else {
              setIsSnakeTimelineOpen(true);
            }
          }}
          style={{
            position: 'absolute',
            top: '20px',
            right: loreMode ? '420px' : '20px',
            zIndex: 100,
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
          title={!isIntroMode ? "Return to Archives" : "Open Full Timeline"}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 232, 31, 0.15)';
            e.currentTarget.style.boxShadow = '0 0 15px rgba(255, 232, 31, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(10, 20, 40, 0.8)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.5)';
          }}
        >
          {!isIntroMode ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFE81F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFE81F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4 L4 8 L20 8 L20 12 L4 12 L4 16 L20 16 L20 20" />
              <circle cx="4" cy="4" r="1.5" fill="#FFE81F" />
              <circle cx="20" cy="20" r="1.5" fill="#FFE81F" />
            </svg>
          )}
        </button>
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
