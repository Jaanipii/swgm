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
                    <path d="M 50 50 L 50.3 50.1 L 50.8 50.2 L 51.2 50.6 L 51.6 51.0 L 51.8 51.6 L 51.9 52.3 L 51.9 53.1 L 51.7 53.9 L 51.2 54.8 L 50.6 55.6 L 49.7 56.3 L 48.7 56.8 L 47.5 57.2 L 46.1 57.4 L 44.7 57.4 L 43.1 57.0 L 41.6 56.4 L 40.1 55.5 L 38.7 54.2 L 37.4 52.7 L 36.4 50.9 L 35.7 48.8 L 35.2 46.5 L 35.1 44.1 L 35.5 41.6 L 36.2 39.1 L 37.4 36.6 L 39.0 34.2 L 41.1 32.0 L 43.5 30.1 L 46.4 28.6 L 49.5 27.4 L 52.9 26.8 L 56.5 26.6 L 60.2 27.0 L 63.9 28.0 L 67.6 29.7 L 71.0 31.9 L 74.2 34.7 L 77.0 38.0 L 79.3 41.8 L 81.0 46.1 L 82.2 50.7 L 82.6 55.5 L 82.3 60.5 L 81.3 65.5 L 79.4 70.4 L 76.8 75.1 L 73.4 79.5 L 69.3 83.4 L 64.5 86.7 L 59.2 89.4 L 53.5 91.2 L 47.3 92.2 L 41.0 92.3 L 34.6 91.4 L 28.3 89.6 L 22.1 86.7 L 16.4 82.9 L 11.2 78.2" fill="none" stroke="rgba(130, 220, 255, 0.5)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M 50 50 L 49.7 49.9 L 49.2 49.8 L 48.8 49.4 L 48.4 49.0 L 48.2 48.4 L 48.1 47.7 L 48.1 46.9 L 48.3 46.1 L 48.8 45.2 L 49.4 44.4 L 50.3 43.7 L 51.3 43.2 L 52.5 42.8 L 53.9 42.6 L 55.3 42.6 L 56.9 43.0 L 58.4 43.6 L 59.9 44.5 L 61.3 45.8 L 62.6 47.3 L 63.6 49.1 L 64.3 51.2 L 64.8 53.5 L 64.9 55.9 L 64.5 58.4 L 63.8 60.9 L 62.6 63.4 L 61.0 65.8 L 58.9 68.0 L 56.5 69.9 L 53.6 71.4 L 50.5 72.6 L 47.1 73.2 L 43.5 73.4 L 39.8 73.0 L 36.1 72.0 L 32.4 70.3 L 29.0 68.1 L 25.8 65.3 L 23.0 62.0 L 20.7 58.2 L 19.0 53.9 L 17.8 49.3 L 17.4 44.5 L 17.7 39.5 L 18.7 34.5 L 20.6 29.6 L 23.2 24.9 L 26.6 20.5 L 30.7 16.6 L 35.5 13.3 L 40.8 10.6 L 46.5 8.8 L 52.7 7.8 L 59.0 7.7 L 65.4 8.6 L 71.7 10.4 L 77.9 13.3 L 83.6 17.1 L 88.8 21.8" fill="none" stroke="rgba(130, 220, 255, 0.5)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                    
                    {/* Perpendicular dense arms */}
                    <path d="M 50 50 L 50.0 50.3 L 49.8 50.6 L 49.5 51.0 L 49.1 51.3 L 48.6 51.5 L 48.1 51.6 L 47.4 51.6 L 46.7 51.4 L 46.0 51.0 L 45.4 50.5 L 44.8 49.8 L 44.3 48.9 L 44.0 47.9 L 43.8 46.8 L 43.9 45.5 L 44.1 44.3 L 44.7 43.0 L 45.5 41.7 L 46.5 40.6 L 47.8 39.5 L 49.3 38.7 L 51.0 38.0 L 52.9 37.7 L 54.9 37.6 L 57.0 37.9 L 59.1 38.5 L 61.2 39.5 L 63.2 40.9 L 65.0 42.6 L 66.6 44.6 L 67.9 47.0 L 68.8 49.6 L 69.4 52.4 L 69.5 55.4 L 69.1 58.5 L 68.3 61.6 L 67.0 64.6 L 65.1 67.5 L 62.8 70.1 L 60.0 72.5 L 56.8 74.4 L 53.3 75.9 L 49.4 76.8 L 45.4 77.2 L 41.2 76.9 L 37.1 76.0 L 33.0 74.5 L 29.1 72.3 L 25.4 69.5 L 22.2 66.1 L 19.4 62.1 L 17.2 57.7 L 15.7 52.9 L 14.8 47.8 L 14.8 42.5 L 15.5 37.2 L 17.0 31.9 L 19.4 26.8 L 22.6 22.0 L 26.5 17.6" fill="none" stroke="rgba(100, 150, 255, 0.4)" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M 50 50 L 50.0 49.7 L 50.2 49.4 L 50.5 49.0 L 50.9 48.7 L 51.4 48.5 L 51.9 48.4 L 52.6 48.4 L 53.3 48.6 L 54.0 49.0 L 54.6 49.5 L 55.2 50.2 L 55.7 51.1 L 56.0 52.1 L 56.2 53.2 L 56.1 54.5 L 55.9 55.7 L 55.3 57.0 L 54.5 58.3 L 53.5 59.4 L 52.2 60.5 L 50.7 61.3 L 49.0 62.0 L 47.1 62.3 L 45.1 62.4 L 43.0 62.1 L 40.9 61.5 L 38.8 60.5 L 36.8 59.1 L 35.0 57.4 L 33.4 55.4 L 32.1 53.0 L 31.2 50.4 L 30.6 47.6 L 30.5 44.6 L 30.9 41.5 L 31.7 38.4 L 33.0 35.4 L 34.9 32.5 L 37.2 29.9 L 40.0 27.5 L 43.2 25.6 L 46.7 24.1 L 50.6 23.2 L 54.6 22.8 L 58.8 23.1 L 62.9 24.0 L 67.0 25.5 L 70.9 27.7 L 74.6 30.5 L 77.8 33.9 L 80.6 37.9 L 82.8 42.3 L 84.3 47.1 L 85.2 52.2 L 85.2 57.5 L 84.5 62.8 L 83.0 68.1 L 80.6 73.2 L 77.4 78.0 L 73.5 82.4" fill="none" stroke="rgba(100, 150, 255, 0.4)" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
                  </g>

                  <g filter="blur(1.5px)">
                    {/* Inner dense golden arms */}
                    <path d="M 50 50 L 50.4 50.0 L 51.0 50.1 L 51.5 50.5 L 52.0 51.0 L 52.3 51.7 L 52.5 52.6 L 52.5 53.6 L 52.1 54.7 L 51.5 55.7 L 50.6 56.7 L 49.5 57.5 L 48.0 58.1 L 46.4 58.4 L 44.6 58.4 L 42.6 58.0 L 40.7 57.2 L 38.9 56.0 L 37.2 54.3 L 35.7 52.3 L 34.6 49.9 L 34.0 47.1 L 33.8 44.2 L 34.2 41.1 L 35.1 38.0 L 36.7 34.9 L 38.9 32.1 L 41.7 29.6 L 45.0 27.5 L 48.7 26.0 L 52.8 25.2" fill="none" stroke="rgba(255, 232, 31, 0.7)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M 50 50 L 49.6 50.0 L 49.0 49.9 L 48.5 49.5 L 48.0 49.0 L 47.7 48.3 L 47.5 47.4 L 47.5 46.4 L 47.9 45.3 L 48.5 44.3 L 49.4 43.3 L 50.5 42.5 L 52.0 41.9 L 53.6 41.6 L 55.4 41.6 L 57.4 42.0 L 59.3 42.8 L 61.1 44.0 L 62.8 45.7 L 64.3 47.7 L 65.4 50.1 L 66.0 52.9 L 66.2 55.8 L 65.8 58.9 L 64.9 62.0 L 63.3 65.1 L 61.1 67.9 L 58.3 70.4 L 55.0 72.5 L 51.3 74.0 L 47.2 74.8" fill="none" stroke="rgba(255, 232, 31, 0.7)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
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
