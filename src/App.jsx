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
          onPlanetSelect={handlePlanetSelect} 
          onHistoricalEventSelect={handleEventMarkerSelect}
          onRouteSelect={handleRouteSelect}
          isMapTransitioning={isMapTransitioning}
          onPlanetHighlight={handlePlanetHighlight}
          panTrigger={panTrigger}
        />
      </motion.div>

      {/* The star background should only be visible during intro mode */}
      {isIntroMode && (
        <div className="map-container intro-stars" style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, pointerEvents: 'none' }}>
          <svg width="100%" height="100%">
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
        </div>
      )}

      {/* Hide UI elements while physically jumping into the map */}
      <div className={`ui-elements-container ${isMapTransitioning ? 'transitioning' : ''}`}>
        <TimelineCrawl 
          activeItemId={activeEpisodeId} 
          onSelect={handleTimelineSelect} 
          isFullscreen={isIntroMode}
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
            padding: !isIntroMode ? '0' : '10px 20px',
            borderRadius: !isIntroMode ? '50%' : '8px',
            width: !isIntroMode ? '44px' : 'auto',
            height: !isIntroMode ? '44px' : 'auto',
            fontSize: '0.9rem',
            letterSpacing: '2px',
            cursor: 'pointer',
            textTransform: 'uppercase',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
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
            "FULL TIMELINE"
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

    </div>
  );
}

export default App;
 
