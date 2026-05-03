import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { starWarsTimeline } from '../../data/timeline';
import { historicalEvents, getHistoricalEventForYear, parseYear } from '../../data/historicalEvents';
import { getRuntime, formatDuration } from '../../utils/calculateRuntime';
import { determineEra } from '../../utils/determineEra';
import { getShortSeriesName, getUniqueSeries, filterEras } from '../../utils/filterHelpers';

const ALL_TYPES = ['movie', 'series', 'book', 'comic', 'audio-drama', 'game', 'short-story'];

export default function TimelineCrawl({ activeItemId, onSelect, isFullscreen, onEraChange, onHistoricalEventSelect, onItemFocus, onJumpToHyperspace, watchedIds = [], onToggleWatched, onResetWatched, onSyncHistory, showLogCheckmarks, onToggleShowCheckmarks }) {
  const crawlRef = useRef(null);
  const timelineListRef = useRef(null);
  const [activeEvent, setActiveEvent] = useState(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef(null);
  const [hoveredGalacticEvent, setHoveredGalacticEvent] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [eventPositions, setEventPositions] = useState([]);


  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSyncSettingsOpen, setIsSyncSettingsOpen] = useState(false);
  const [globalSyncTypes, setGlobalSyncTypes] = useState(['movie', 'series']);
  const [selectedTypes, setSelectedTypes] = useState(['movie']);
  const [selectedEras, setSelectedEras] = useState(filterEras);
  const [selectedSeries, setSelectedSeries] = useState(() => getUniqueSeries());
  
  const uniqueSeriesList = useMemo(() => getUniqueSeries(), []);

  const toggleFilter = (type, value) => {
    switch (type) {
      case 'type':
        setSelectedTypes(prev => prev.includes(value) ? prev.filter(t => t !== value) : [...prev, value]);
        break;
      case 'era':
        setSelectedEras(prev => prev.includes(value) ? prev.filter(e => e !== value) : [...prev, value]);
        break;
      case 'series':
        setSelectedSeries(prev => prev.includes(value) ? prev.filter(s => s !== value) : [...prev, value]);
        break;
      default:
        break;
    }
  };

  const sortedTimeline = useMemo(() => {
    return [...starWarsTimeline]
      .filter(item => {
        // Hide unreleased movies (no runtime data)
        if (item.type === 'movie' && (!item.runtime || item.runtime === 'null')) return false;
        return true;
      })
      .sort((a, b) => parseYear(a.year) - parseYear(b.year));
  }, []);

  const filteredTimeline = useMemo(() => {
    let result = sortedTimeline;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(item => {
        const titleMatch = item.title && item.title.toLowerCase().includes(query);
        const planetMatch = item.primaryPlanet && item.primaryPlanet.toLowerCase().includes(query);
        const yearMatch = item.year && item.year.toLowerCase().includes(query);
        const era = determineEra(item.year);
        const eraMatch = era && era.toLowerCase().includes(query);
        return titleMatch || planetMatch || yearMatch || eraMatch;
      });
    }

    if (selectedTypes.length > 0) {
      result = result.filter(item => item.type && selectedTypes.includes(item.type.toLowerCase()));
    } else {
      // If nothing is explicitly selected for the 'Type' filter, show nothing
      result = [];
    }

    if (selectedEras.length === 0) {
      result = [];
    } else if (selectedEras.length < filterEras.length) {
      result = result.filter(item => {
        const era = determineEra(item.year);
        return selectedEras.includes(era);
      });
    }

    if (selectedSeries.length === 0) {
      result = result.filter(item => item.type && item.type.toLowerCase() !== 'series');
    } else if (selectedSeries.length < uniqueSeriesList.length) {
      result = result.filter(item => {
        if (item.type && item.type.toLowerCase() === 'series') {
          const shortName = getShortSeriesName(item.title);
          return selectedSeries.includes(shortName);
        }
        return true;
      });
    }

    return result;
  }, [searchQuery, sortedTimeline, selectedTypes, selectedEras, selectedSeries]);

  const { totalMins, watchedMins, scrollProgress } = useMemo(() => {
    let total = 0;
    let watched = 0;
    filteredTimeline.forEach(item => {
      const dur = getRuntime(item);
      total += dur;
      if (watchedIds?.map(String).includes(String(item.id))) {
        watched += dur;
      }
    });
    const progress = total > 0 ? (watched / total) * 100 : 0;
    return { totalMins: total, watchedMins: watched, scrollProgress: progress };
  }, [filteredTimeline, watchedIds]);

  const calculateEventPositions = useCallback(() => {
    if (!timelineListRef.current) return;
    const listEl = timelineListRef.current;
    
    // Query DOM to find exactly where cards rendered
    const items = Array.from(listEl.querySelectorAll('.timeline-item'));
    if (items.length === 0) return;

    const source = filteredTimeline;
    const sortedEvents = [...historicalEvents].sort((a, b) => parseYear(a.year) - parseYear(b.year));

    // Fast DOM physical lookup map for Episode IDs
    const episodeYMap = {};
    const yearPositions = [];
    
    items.forEach((el, idx) => {
      const id = el.getAttribute('data-id');
      const yCenter = el.offsetTop + el.offsetHeight / 2;
      
      if (id) {
         episodeYMap[id] = yCenter;
      }
        
      if (idx < source.length) {
        yearPositions.push({
          year: parseYear(source[idx].year),
          yCenter: yCenter
        });
      }
    });

    if (yearPositions.length === 0) return;

    // We can have multiple episodes in the same year. Average their Y coordinates.
    const yearGroups = {};
    yearPositions.forEach(p => {
      if (!yearGroups[p.year]) yearGroups[p.year] = [];
      yearGroups[p.year].push(p.yCenter);
    });

    const uniqueYearAnchors = Object.keys(yearGroups).map(yStr => {
      const yr = parseFloat(yStr);
      const yArr = yearGroups[yStr];
      const avgY = yArr.reduce((sum, val) => sum + val, 0) / yArr.length;
      return { year: yr, y: avgY };
    });

    // CRITICAL: Sort anchors chronologically so interpolation finds valid mathematical bounds
    uniqueYearAnchors.sort((a, b) => a.year - b.year);

    const positions = [];
    const gapBuckets = Array(uniqueYearAnchors.length - 1).fill().map(() => []);
    const exactBuckets = {};
    const exactEpisodeBuckets = {};

    // Map each event to a base yPos or group into gaps
    sortedEvents.forEach(evt => {
      // 1. Exact Episode Alignment (if mapped and on screen)
      if (evt.timelineEpisodeId && episodeYMap[evt.timelineEpisodeId]) {
         if (!exactEpisodeBuckets[evt.timelineEpisodeId]) {
            exactEpisodeBuckets[evt.timelineEpisodeId] = {
                yPos: episodeYMap[evt.timelineEpisodeId],
                events: []
            };
         }
         exactEpisodeBuckets[evt.timelineEpisodeId].events.push(evt);
         return;
      } 
      
      const evtYear = parseYear(evt.year);

      // 2. Mathematical Chronological Interpolation
      if (uniqueYearAnchors.length === 1) {
        positions.push({ evt, yPos: uniqueYearAnchors[0].y + (evtYear - uniqueYearAnchors[0].year) * 10, locked: false });
        return;
      } 
      if (evtYear < uniqueYearAnchors[0].year) {
        const slope = (uniqueYearAnchors[1].y - uniqueYearAnchors[0].y) / (uniqueYearAnchors[1].year - uniqueYearAnchors[0].year) || 10;
        positions.push({ evt, yPos: uniqueYearAnchors[0].y + slope * (evtYear - uniqueYearAnchors[0].year), locked: false });
        return;
      } 
      if (evtYear > uniqueYearAnchors[uniqueYearAnchors.length - 1].year) {
        const last = uniqueYearAnchors.length - 1;
        const slope = (uniqueYearAnchors[last].y - uniqueYearAnchors[last-1].y) / (uniqueYearAnchors[last].year - uniqueYearAnchors[last-1].year) || 10;
        positions.push({ evt, yPos: uniqueYearAnchors[last].y + slope * (evtYear - uniqueYearAnchors[last].year), locked: false });
        return;
      }
      
      // Exact Object Match against anchor year
      const exactAnchor = uniqueYearAnchors.find(a => a.year === evtYear);
      if (exactAnchor) {
         if (!exactBuckets[evtYear]) exactBuckets[evtYear] = [];
         exactBuckets[evtYear].push(evt);
         return;
      }
      
      // Falls in a mathematical gap between two physical anchors
      for (let i = 0; i < uniqueYearAnchors.length - 1; i++) {
        if (evtYear > uniqueYearAnchors[i].year && evtYear < uniqueYearAnchors[i+1].year) {
          gapBuckets[i].push(evt);
          break;
        }
      }
    });

    // Process exact episode matches BEFORE exact math matches
    Object.values(exactEpisodeBuckets).forEach(({ yPos, events }) => {
       const n = events.length;
       events.forEach((evt, idx) => {
          // evenly space multiple exact matches around the anchor visually to avoid messy collision loops
          const offset = (idx - (n - 1) / 2) * 26;
          const lockedY = yPos + offset;
          positions.push({ evt, yPos: lockedY, locked: true, minY: lockedY, maxY: lockedY }); 
       });
    });

    // Process exact math matches FIRST to establish boundaries
    Object.keys(exactBuckets).forEach(yStr => {
       const yr = parseFloat(yStr);
       const anchor = uniqueYearAnchors.find(a => a.year === yr);
       if (anchor) {
         const bucket = exactBuckets[yStr];
         const n = bucket.length;
         bucket.forEach((evt, idx) => {
            // evenly space multiple exact matches around the anchor visually to avoid messy collision loops later
            const offset = (idx - (n - 1) / 2) * 26;
            const lockedY = anchor.y + offset;
            positions.push({ evt, yPos: lockedY, locked: true, minY: lockedY, maxY: lockedY }); 
         });
       }
    });

    // Distribute gap buckets using a blended uniform/proportional approach 
    // bounded by the safe empty space between exact matches
    gapBuckets.forEach((bucket, i) => {
       if (bucket.length === 0) return;
       const y1 = uniqueYearAnchors[i].y;
       const y2 = uniqueYearAnchors[i+1].y;
       const yr1 = uniqueYearAnchors[i].year;
       const yr2 = uniqueYearAnchors[i+1].year;
       
       const numY1Events = exactBuckets[yr1] ? exactBuckets[yr1].length : 0;
       const numY2Events = exactBuckets[yr2] ? exactBuckets[yr2].length : 0;
       
       // Account for card half-height (~50px) + padding so we don't bleed into the visual card boundaries
       let y1Safe = y1 + Math.max(0, ((numY1Events - 1) / 2) * 26) + 65;
       let y2Safe = y2 - Math.max(0, ((numY2Events - 1) / 2) * 26) - 65;
       
       if (y2Safe - y1Safe < bucket.length * 15) {
         // physical gap is too small, fallback to raw anchor bounds and let them squish gracefully
         y1Safe = y1;
         y2Safe = y2;
       }
       
       bucket.forEach((evt, idx) => {
          const evtYear = parseYear(evt.year);
          const mathFrac = (evtYear - yr1) / (yr2 - yr1);
          // Distribute evenly to prevent dense visual clumping
          const uniformFrac = (idx + 1) / (bucket.length + 1);
          
          // Blend mathematical proportion with visual uniformity
          const frac = (mathFrac + uniformFrac) / 2;
          const initialY = y1Safe + frac * (y2Safe - y1Safe);
          positions.push({ evt, yPos: initialY, locked: false, minY: y1Safe, maxY: y2Safe });
       });
    });

    // Collision Avoidance Algorithm via Symmetric Relaxation
    for (let pass = 0; pass < 40; pass++) {
        let moved = false;
        positions.sort((a, b) => a.yPos - b.yPos); // critical: re-sort dynamically
        for (let i = 0; i < positions.length - 1; i++) {
            const p1 = positions[i];
            const p2 = positions[i+1];
            if (p2.yPos - p1.yPos < 26) {
                const overlap = 26 - (p2.yPos - p1.yPos);
                let shift1 = 0;
                let shift2 = 0;

                if (p1.locked && !p2.locked) {
                    shift2 = overlap;
                } else if (!p1.locked && p2.locked) {
                    shift1 = -overlap;
                } else if (!p1.locked && !p2.locked) {
                    shift1 = -overlap / 2;
                    shift2 = overlap / 2;
                } else {
                    // Both locked, do not move to preserve physical exact-match bounds
                    shift1 = 0;
                    shift2 = 0;
                }

                // Strictly enforce gap boundaries
                if (p1.yPos + shift1 < p1.minY) shift1 = p1.minY - p1.yPos;
                if (p2.yPos + shift2 > p2.maxY) shift2 = p2.maxY - p2.yPos;
                
                // If one element hit a wall, force the other to take the remaining overlap if safely possible
                const overlapResolved = shift2 - shift1;
                const remaining = overlap - overlapResolved;
                
                if (remaining > 0.1) {
                    if (!p1.locked && p1.yPos + shift1 - remaining >= p1.minY) {
                         shift1 -= remaining;
                    } else if (!p2.locked && p2.yPos + shift2 + remaining <= p2.maxY) {
                         shift2 += remaining;
                    }
                }

                if (Math.abs(shift1) > 0.1 || Math.abs(shift2) > 0.1) {
                   p1.yPos += shift1;
                   p2.yPos += shift2;
                   moved = true;
                }
            }
        }
        if (!moved) break;
    }

    setEventPositions(positions);
  }, [filteredTimeline, searchQuery]);

  // Robust calculation trigger handling animations and resizes natively
  useEffect(() => {
    // Initial runs with delay wait for Framer Motion entrance
    const timer1 = setTimeout(calculateEventPositions, 200);
    const timer2 = setTimeout(calculateEventPositions, 800);
    const timer3 = setTimeout(calculateEventPositions, 2000); 
    
    const listEl = timelineListRef.current;
    let resizeObserver;
    if (listEl) {
      resizeObserver = new ResizeObserver(() => {
        calculateEventPositions();
      });
      resizeObserver.observe(listEl);
    }
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      if (resizeObserver && listEl) resizeObserver.unobserve(listEl);
    };
  }, [calculateEventPositions]);

  useEffect(() => {
    const handleScroll = () => {
      if (!crawlRef.current) return;
      
      const items = crawlRef.current.querySelectorAll('.timeline-item');
      if (items.length === 0) return;

      const containerRect = crawlRef.current.getBoundingClientRect();
      const targetY = containerRect.top + containerRect.height / 3;

      let closestItem = null;
      let minDistance = Infinity;

      items.forEach(item => {
        const rect = item.getBoundingClientRect();
        const yCenter = rect.top + rect.height / 2;
        const dist = Math.abs(yCenter - targetY);

        if (dist < minDistance) {
          minDistance = dist;
          closestItem = item;
        }
      });

      if (closestItem) {
        const itemId = closestItem.getAttribute('data-id');
        const episode = filteredTimeline.find(i => i.id === itemId);
        if (episode) {
          const yearNum = parseYear(episode.year);
          const historyEvent = getHistoricalEventForYear(yearNum);
          
          setActiveEvent(prev => {
            if (prev?.id !== historyEvent?.id) return historyEvent;
            return prev;
          });

          if (onEraChange) {
            const era = determineEra(episode.year);
            onEraChange(era);
          }
          
          if (onItemFocus) {
            onItemFocus(itemId);
          }
        }
        
        const index = filteredTimeline.findIndex(i => i.id === itemId);
        if (index !== -1) {
          setFocusedIndex(index);
        }
      }
    };

    const container = crawlRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      setTimeout(handleScroll, 100);
    }
    return () => {
      if (container) container.removeEventListener('scroll', handleScroll);
    };
  }, [onEraChange, filteredTimeline]);


  const roundBtnStyle = { 
    background: 'rgba(10, 20, 40, 0.6)', 
    border: '1px solid rgba(255, 232, 31, 0.3)', 
    borderRadius: '50%',
    width: '44px',
    height: '44px',
    color: '#ffe81f',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backdropFilter: 'blur(5px)',
    flexShrink: 0
  };

  return (
    <>
      <div className={`crawl-container ${isFullscreen ? 'fullscreen' : ''}`}>

        <div className="crawl-title">
          <h1>GALACTIC ARCHIVES</h1>
          <p>Canon Timeline</p>
          {isFullscreen && (
            <>
              <style>{`
                @keyframes cta-glow {
                  0%, 100% { box-shadow: 0 0 15px rgba(255, 232, 31, 0.15), inset 0 0 15px rgba(255, 232, 31, 0.05); }
                  50% { box-shadow: 0 0 25px rgba(255, 232, 31, 0.3), inset 0 0 20px rgba(255, 232, 31, 0.08); }
                }
                @keyframes cta-shimmer {
                  0% { background-position: -200% center; }
                  100% { background-position: 200% center; }
                }
              `}</style>
              <button 
                className="hyperspace-jump-btn"
                onClick={onJumpToHyperspace}
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 232, 31, 0.06) 0%, rgba(255, 232, 31, 0.12) 50%, rgba(255, 232, 31, 0.06) 100%)',
                  border: '1px solid rgba(255, 232, 31, 0.4)',
                  color: '#ffe81f',
                  fontSize: '0.85rem',
                  letterSpacing: '6px',
                  fontFamily: 'Orbitron, sans-serif',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '14px',
                  margin: '24px auto 0 auto',
                  padding: '14px 36px',
                  borderRadius: '4px',
                  textShadow: '0 0 12px rgba(255, 232, 31, 0.5)',
                  backdropFilter: 'blur(8px)',
                  pointerEvents: 'auto',
                  animation: 'cta-glow 3s ease-in-out infinite',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 232, 31, 0.12) 0%, rgba(255, 232, 31, 0.2) 50%, rgba(255, 232, 31, 0.12) 100%)';
                  e.currentTarget.style.borderColor = '#ffe81f';
                  e.currentTarget.style.transform = 'scale(1.03)';
                  e.currentTarget.style.letterSpacing = '8px';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 232, 31, 0.06) 0%, rgba(255, 232, 31, 0.12) 50%, rgba(255, 232, 31, 0.06) 100%)';
                  e.currentTarget.style.borderColor = 'rgba(255, 232, 31, 0.4)';
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.letterSpacing = '6px';
                }}
              >
                {/* Hyperspace streaks icon */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                  <line x1="2" y1="12" x2="10" y2="12" stroke="#ffe81f" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
                  <line x1="6" y1="7" x2="14" y2="7" stroke="#ffe81f" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
                  <line x1="4" y1="17" x2="12" y2="17" stroke="#ffe81f" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
                  <polygon points="14,6 22,12 14,18" fill="#ffe81f" opacity="0.9" />
                </svg>
                ENTER THE GALAXY
              </button>
              <div style={{ margin: '16px auto 0 auto', maxWidth: '300px', pointerEvents: 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', letterSpacing: '1.5px', color: '#82dcff', marginBottom: '4px' }}>
                  <span>LOGGED: {formatDuration(watchedMins)}</span>
                  <span>REMAINING: {formatDuration(totalMins - watchedMins)}</span>
                </div>
                <div style={{ width: '100%', height: '3px', background: 'rgba(130, 220, 255, 0.15)', borderRadius: '2px' }}>
                  <div style={{ width: `${scrollProgress}%`, height: '100%', background: 'linear-gradient(to right, #82dcff, #ffe81f)', borderRadius: '2px', transition: 'width 0.5s ease' }} />
                </div>
              </div>

              {/* Icon buttons row — search, filter, sync */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', margin: '16px auto 0 auto', pointerEvents: 'auto', position: 'relative' }}>
                {/* Search */}
                <button 
                  onClick={() => {
                    setIsSearchOpen(!isSearchOpen);
                    if (!isSearchOpen) setTimeout(() => searchInputRef.current?.focus(), 100);
                  }}
                  style={{ ...roundBtnStyle }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </button>
                {/* Filter */}
                <button 
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  style={{ ...roundBtnStyle, background: isFilterOpen ? 'rgba(255, 232, 31, 0.2)' : 'rgba(10, 20, 40, 0.6)' }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                  </svg>
                </button>
                {/* Sync/Log Settings */}
                <button 
                  onClick={() => setIsSyncSettingsOpen(!isSyncSettingsOpen)}
                  style={{ ...roundBtnStyle, background: isSyncSettingsOpen ? 'rgba(255, 232, 31, 0.2)' : 'rgba(10, 20, 40, 0.6)' }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 11 12 14 22 4"></polyline>
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                  </svg>
                </button>
              </div>

              {/* Search input (expands below buttons) */}
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ overflow: 'hidden', display: 'flex', justifyContent: 'center', pointerEvents: 'auto' }}
                  >
                    <input
                      ref={searchInputRef}
                      type="text" 
                      className="timeline-search-input" 
                      placeholder="Search archives..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{ margin: '8px 0 0 0', width: '280px', maxWidth: '80vw' }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Filter panel (expands below buttons) */}
              <AnimatePresence>
                {isFilterOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ overflow: 'hidden', display: 'flex', justifyContent: 'center', pointerEvents: 'auto' }}
                  >
                    <div
                      className="timeline-filter-panel"
                      style={{
                        background: 'rgba(10, 20, 40, 0.9)',
                        border: '1px solid rgba(255, 232, 31, 0.3)',
                        borderRadius: '8px',
                        padding: '15px',
                        color: '#e0e0e0',
                        width: '320px',
                        maxWidth: '85vw',
                        backdropFilter: 'blur(10px)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '15px',
                        maxHeight: '50vh',
                        overflowY: 'auto',
                        marginTop: '8px'
                      }}
                    >
                      <div className="filter-group">
                        <h4 style={{ margin: '0 0 8px 0', color: '#ffe81f', fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Type</h4>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                          {ALL_TYPES.map(t => (
                            <button key={t} onClick={() => toggleFilter('type', t)} style={{ background: selectedTypes.includes(t) ? 'rgba(255,232,31,0.2)' : 'transparent', border: `1px solid ${selectedTypes.includes(t) ? '#ffe81f' : 'rgba(255,255,255,0.2)'}`, color: selectedTypes.includes(t) ? '#ffe81f' : '#ccc', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer', textTransform: 'capitalize', fontSize: '0.8rem' }}>{t}</button>
                          ))}
                        </div>
                        <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
                          <button onClick={() => setSelectedTypes(ALL_TYPES)} style={{ background: 'none', border: 'none', color: '#82dcff', cursor: 'pointer', fontSize: '0.75rem', textDecoration: 'underline', padding: 0 }}>Select All</button>
                          <button onClick={() => setSelectedTypes([])} style={{ background: 'none', border: 'none', color: '#82dcff', cursor: 'pointer', fontSize: '0.75rem', textDecoration: 'underline', padding: 0 }}>Deselect All</button>
                        </div>
                      </div>
                      <div className="filter-group">
                        <h4 style={{ margin: '0 0 8px 0', color: '#ffe81f', fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Eras</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          {filterEras.map(era => (
                            <label key={era} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', cursor: 'pointer' }}>
                              <input type="checkbox" className="filter-checkbox" checked={selectedEras.includes(era)} onChange={() => toggleFilter('era', era)} />{era}
                            </label>
                          ))}
                        </div>
                        <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
                          <button onClick={() => setSelectedEras(filterEras)} style={{ background: 'none', border: 'none', color: '#82dcff', cursor: 'pointer', fontSize: '0.75rem', textDecoration: 'underline', padding: 0 }}>Select All</button>
                          <button onClick={() => setSelectedEras([])} style={{ background: 'none', border: 'none', color: '#82dcff', cursor: 'pointer', fontSize: '0.75rem', textDecoration: 'underline', padding: 0 }}>Deselect All</button>
                        </div>
                      </div>
                      {uniqueSeriesList.length > 0 && (
                        <div className="filter-group">
                          <h4 style={{ margin: '0 0 8px 0', color: '#ffe81f', fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Series</h4>
                          <div className="filter-scroll-area" style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '150px', overflowY: 'auto', paddingRight: '10px' }}>
                            {uniqueSeriesList.map(series => (
                              <label key={series} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', cursor: 'pointer' }}>
                                <input type="checkbox" className="filter-checkbox" checked={selectedSeries.includes(series)} onChange={() => toggleFilter('series', series)} />{series}
                              </label>
                            ))}
                          </div>
                          <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
                            <button onClick={() => setSelectedSeries(uniqueSeriesList)} style={{ background: 'none', border: 'none', color: '#82dcff', cursor: 'pointer', fontSize: '0.75rem', textDecoration: 'underline', padding: 0 }}>Select All</button>
                            <button onClick={() => setSelectedSeries([])} style={{ background: 'none', border: 'none', color: '#82dcff', cursor: 'pointer', fontSize: '0.75rem', textDecoration: 'underline', padding: 0 }}>Deselect All</button>
                          </div>
                        </div>
                      )}
                      {(selectedTypes.length !== ALL_TYPES.length || selectedEras.length !== filterEras.length || selectedSeries.length !== uniqueSeriesList.length) && (
                        <button onClick={() => { setSelectedTypes(ALL_TYPES); setSelectedEras(filterEras); setSelectedSeries(uniqueSeriesList); }} style={{ background: 'transparent', border: 'none', color: 'rgba(255, 232, 31, 0.7)', textDecoration: 'underline', cursor: 'pointer', fontSize: '0.8rem', alignSelf: 'flex-start', padding: 0, marginTop: '5px' }}>Clear all filters</button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Sync settings panel (expands below buttons) */}
              <AnimatePresence>
                {isSyncSettingsOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ overflow: 'hidden', display: 'flex', justifyContent: 'center', pointerEvents: 'auto' }}
                  >
                    <div
                      className="timeline-filter-panel"
                      style={{
                        background: 'rgba(10, 20, 40, 0.9)',
                        border: '1px solid rgba(255, 232, 31, 0.3)',
                        borderRadius: '8px',
                        padding: '15px',
                        color: '#e0e0e0',
                        width: '320px',
                        maxWidth: '85vw',
                        backdropFilter: 'blur(10px)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '15px',
                        marginTop: '8px'
                      }}
                    >
                      <h4 style={{ margin: 0, color: '#ffe81f', fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Database Sync</h4>
                      <div className="filter-group">
                        <p style={{ margin: '0 0 8px 0', fontSize: '0.8rem', color: '#ccc' }}>
                          {activeItemId ? `Auto-Log canon preceding: ${filteredTimeline.find(i=>i.id===activeItemId)?.title || 'Selected Item'}` : 'Select a timeline item to enable bulk auto-logging.'}
                        </p>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', opacity: activeItemId ? 1 : 0.5, pointerEvents: activeItemId ? 'auto' : 'none' }}>
                          {['movie', 'series', 'book', 'comic', 'audio-drama', 'game'].map(type => (
                            <label key={type} style={{ fontSize: '0.75rem', color: '#ccc', display: 'flex', alignItems: 'center', cursor: 'pointer', background: 'rgba(255,255,255,0.05)', padding: '4px 8px', borderRadius: '4px' }}>
                              <input type="checkbox" checked={globalSyncTypes.includes(type)} onChange={(e) => { if (e.target.checked) setGlobalSyncTypes([...globalSyncTypes, type]); else setGlobalSyncTypes(globalSyncTypes.filter(t => t !== type)); }} style={{ marginRight: '6px' }} />{type.toUpperCase()}
                            </label>
                          ))}
                        </div>
                        {activeItemId && (
                          <button onClick={() => { if (onSyncHistory) onSyncHistory(activeItemId, globalSyncTypes); setIsSyncSettingsOpen(false); }} style={{ marginTop: '10px', width: '100%', background: 'rgba(255, 232, 31, 0.2)', border: '1px solid #ffe81f', color: '#ffe81f', padding: '8px', borderRadius: '4px', cursor: 'pointer', fontFamily: 'Orbitron, sans-serif' }}>SYNC HIGHLIGHTED</button>
                        )}
                      </div>
                      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '15px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem', color: '#ccc' }}>
                          <input type="checkbox" checked={showLogCheckmarks} onChange={onToggleShowCheckmarks} className="filter-checkbox" />Show Log Checkmarks on Cards
                        </label>
                        <button onClick={() => { if (window.confirm("Are you sure you want to completely erase your watched history?")) { if (onResetWatched) onResetWatched(); } }} style={{ width: '100%', background: 'rgba(255, 60, 60, 0.1)', border: '1px solid rgba(255, 60, 60, 0.4)', color: 'rgba(255, 60, 60, 0.8)', padding: '8px', borderRadius: '4px', cursor: 'pointer', fontFamily: 'Orbitron, sans-serif' }}>ERASE ALL LOGS</button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </div>

        <div className="crawl-perspective">
          <div 
            className="crawl-tilt" 
            ref={crawlRef}
          >
            <div className="crawl-content">
              {/* timeline-list needs enough padding-top so ancient extrapolated events don't fall off the top! */}
              <div className="timeline-list" ref={timelineListRef} style={{ paddingTop: '320px' }}>
                
                {/* Independent Absolutely-Positioned Event Overlay */}
                <div className="timeline-events-overlay">
                  {eventPositions.map(({ evt, yPos }, index) => (
                    <div
                      key={`evt-${evt.id}-${index}`}
                      className="timeline-event-marker"
                      style={{ top: `${yPos}px` }}
                      onClick={() => onHistoricalEventSelect && onHistoricalEventSelect(evt)}
                      onMouseEnter={() => setHoveredGalacticEvent(evt)}
                      onMouseLeave={() => setHoveredGalacticEvent(null)}
                      onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
                    >
                      <span className="event-marker-name">{evt.title}</span>
                      <span className="event-marker-dot" />
                    </div>
                  ))}
                </div>

                {filteredTimeline.length === 0 ? (
                  <div className="timeline-no-results">
                    <h3>No entries found in the Archives.</h3>
                    <p>Try adjusting your search query.</p>
                  </div>
                ) : (
                  filteredTimeline.map((item, index) => {
                    const isActive = item.id === activeItemId;
                    
                    // Predict and inject physical pixel space for dense clusters of historical events
                    let dynamicMarginTop = 0;
                    if (index > 0) {
                        const prevItem = filteredTimeline[index-1];
                        const yr1 = parseYear(prevItem.year);
                        const yr2 = parseYear(item.year);
                        if (yr1 !== yr2) {
                            let exactPrev = 0;
                            let exactCur = 0;
                            let gapItems = 0;
                            
                            historicalEvents.forEach(evt => {
                               const eYr = parseYear(evt.year);
                               if (eYr === yr1) exactPrev++;
                               else if (eYr === yr2) exactCur++;
                               else if (eYr > yr1 && eYr < yr2) gapItems++;
                            });
                            
                            // Each event needs ~26px of vertical reading space
                            const neededSpace = (gapItems + exactPrev/2 + exactCur/2) * 26;
                            // Natural timeline CSS gap gives us ~60px of free room
                            dynamicMarginTop = Math.max(0, neededSpace - 60);
                        }
                    }

                    const isFocused = index === focusedIndex;
                    const isWatched = watchedIds?.map(String).includes(String(item.id));

                    return (
                      <motion.div 
                        key={item.id}
                        data-id={item.id}
                        className={`timeline-item ${isActive ? 'active' : ''} ${isFocused ? 'focused' : ''}`}
                        onClick={() => onSelect(item.id)}
                        whileHover={{ scale: 1.05, color: '#fff' }}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: Math.min(index * 0.02, 1.5) }}
                        style={{ 
                          marginTop: dynamicMarginTop > 0 ? `${dynamicMarginTop}px` : undefined,
                          transform: isFocused ? 'scale(1.05)' : 'none',
                          boxShadow: isFocused ? '0 0 25px rgba(255, 232, 31, 0.4)' : 'none',
                          borderColor: isFocused ? 'rgba(255, 232, 31, 0.8)' : undefined,
                          zIndex: isFocused ? 10 : 1,
                          display: 'flex',
                          alignItems: 'flex-start',
                          paddingRight: '12px',
                          position: 'relative'
                        }}
                      >
                        <div style={{ flex: 1, display: 'flex' }}>
                          <div className="item-year" style={{ fontSize: item.year && (item.year.includes('BBY') || item.year.includes('ABY')) ? '2rem' : '1.2rem', opacity: item.year && (item.year.includes('BBY') || item.year.includes('ABY')) ? 1 : 0.5 }}>
                            {item.year && (item.year.includes('BBY') || item.year.includes('ABY')) ? item.year : 'DATE OBSCURED'}
                          </div>
                          <div className="item-details" style={{ flex: 1, paddingRight: '20px' }}>
                            <h3 className="item-title">{item.title}</h3>
                            <span className="item-era">{determineEra(item.year).toUpperCase()}</span>
                            <p className="item-planet">Location: {item.primaryPlanet === 'Unknown Spaces' ? 'Planet Unknown' : item.primaryPlanet}</p>
                          </div>
                        </div>
                        {showLogCheckmarks && (
                          <div 
                            className="watch-toggle-hitbox"
                            onPointerDown={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              onToggleWatched(item.id);
                            }}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                            }}
                            style={{
                              padding: '12px',
                              marginTop: '13px',
                              marginRight: '-12px',
                              cursor: 'pointer',
                              pointerEvents: 'auto',
                              zIndex: 50,
                              flexShrink: 0
                            }}
                            title={isWatched ? "Mark as unseen" : "Mark as watched"}
                          >
                            <div
                              className="watch-toggle"
                              style={{
                                width: '28px',
                                height: '28px',
                                borderRadius: '50%',
                                border: `2px solid ${isWatched ? '#ffe81f' : 'rgba(130, 220, 255, 0.4)'}`,
                                background: isWatched ? '#ffe81f' : 'transparent',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.2s ease',
                              }}
                            >
                              {isWatched && (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                              )}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    );
                  })
                )}

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hover Tooltip for event markers anchored directly to mouse pos in ROOT LAYER */}
      <AnimatePresence>
        {hoveredGalacticEvent && (
          <motion.div
            className="event-marker-tooltip"
            style={{
              position: 'fixed',
              left: mousePos.x + 15,
              top: mousePos.y + 15,
              zIndex: 99999,
              pointerEvents: 'none'
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
          >
            <h4>{hoveredGalacticEvent.title}</h4>
            <span>{hoveredGalacticEvent.year}</span>
            <p>{hoveredGalacticEvent.description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
