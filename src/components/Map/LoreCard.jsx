import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchWikiData } from '../../utils/wikiApi';
import { getDisneyPlusUrl } from '../../utils/disneyPlusLinks';
import { starWarsTimeline, planets } from '../../data/timeline';
import { planetLore } from '../../data/planetLore';
import { allPlanets } from '../../data/galacticData';
import { planetSpecies } from '../../data/planetSpecies';
import { historicalEvents } from '../../data/historicalEvents';
import { cwNarrations } from '../../data/cwNarrations';
import { disambiguationMap } from '../../utils/disambiguationMap';

export default function LoreCard({ activeItemId, activePlanetId, activeHistoricalEvent, activeRoute, activeEra, loreMode, onSwitchMode, onClose, onNext, onPlanetSelect, onSyncHistory, watchedIds, onToggleWatched }) {
  const [wikiData, setWikiData] = useState(null);
  const [isWikiLoading, setIsWikiLoading] = useState(false);
  const [showSyncModal, setShowSyncModal] = useState(false);
  const [syncTypes, setSyncTypes] = useState(['movie', 'series']);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1023 && window.innerHeight > window.innerWidth);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1023 && window.innerHeight > window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let isMounted = true;
    
    const loadWikiData = async () => {
      if (!loreMode) return;
      
      setWikiData(null);
      setIsWikiLoading(true);
      
      let queryText = null;
      if (loreMode === 'planet' && activePlanetId) {
        queryText = activePlanetId;
      } else if (loreMode === 'event' && activeItemId) {
        const item = starWarsTimeline.find(i => i.id === activeItemId);
        if (item) queryText = item.title;
      } else if (loreMode === 'history' && activeHistoricalEvent) {
        queryText = activeHistoricalEvent.title;
      } else if (loreMode === 'route' && activeRoute) {
        queryText = activeRoute;
      }
      
      if (queryText) {
        const data = await fetchWikiData(queryText);
        if (isMounted) setWikiData(data);
      }
      
      if (isMounted) setIsWikiLoading(false);
    };

    loadWikiData();
    return () => { isMounted = false; };
  }, [activeItemId, activePlanetId, activeHistoricalEvent, activeRoute, loreMode]);

  // Drag handle for mobile swipe-down-to-dismiss
  const dragHandle = isMobile ? (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0 4px 0', cursor: 'grab' }}>
      <div style={{ width: '40px', height: '4px', borderRadius: '2px', background: 'rgba(255, 255, 255, 0.3)' }} />
    </div>
  ) : null;

  const dragProps = isMobile ? {
    drag: 'y',
    dragConstraints: { top: 0, bottom: 0 },
    dragElastic: { top: 0, bottom: 0.6 },
    onDragEnd: (_, info) => { if (info.offset.y > 100) onClose(); },
  } : {};

  if (!loreMode) return null;

  if (loreMode === 'history' && activeHistoricalEvent) {
    return (
      <AnimatePresence>
        <motion.div 
          className="lore-card"
          initial={isMobile ? { y: '100%', opacity: 0 } : { x: 400, opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: 1 }}
          exit={isMobile ? { y: '100%', opacity: 0 } : { x: 400, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          {...dragProps}
        >
          {dragHandle}
          <div className="lore-card-header">
            <h2>{activeHistoricalEvent.title}</h2>
            <div className="lore-meta">
              <span className="lore-tag era-tag">{activeHistoricalEvent.year}</span>
              <span className="lore-tag type-tag">{activeHistoricalEvent.type.toUpperCase()}</span>
            </div>
            <div className="lore-date">LOCATION: {activeHistoricalEvent.planetId.toUpperCase()}</div>
          </div>
          
          <div className="lore-card-body">
             {wikiData?.thumbnail ? (
               <div className="lore-cover" style={{ backgroundImage: `url(${wikiData.thumbnail})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
             ) : (
               <div className="lore-cover placeholder-logo" style={{ height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                   {isWikiLoading ? <div className="loading-spinner" style={{fontSize: '0.8rem', color: '#666'}}>ARCHIVING...</div> : <div style={{ fontSize: '0.7rem', color: '#444', letterSpacing: '4px' }}>NO VISUAL ARCHIVE</div>}
               </div>
             )}
             
             <div className="lore-section" style={{ lineHeight: '1.6', fontSize: '0.95rem' }}>
               <h3>HISTORICAL RECORD</h3>
               <p className="sub-text">
                 {(wikiData?.extract || activeHistoricalEvent.description)
                   .replace(/planet([A-Z])/g, 'planet $1')
                   .replace(/object([A-Z])/g, 'object $1')
                   .replace(/body([A-Z])/g, 'body $1')}
               </p>
             </div>
          </div>

          <div className="lore-card-footer">
            {wikiData?.url && (
              <button className="next-btn" onClick={() => window.open(wikiData.url, '_blank')} style={{ borderBottom: '1px solid rgba(130, 220, 255, 0.2)', marginBottom: '8px', color: '#82dcff' }}>
                 READ MORE ON WOOKIEEPEDIA <span>↗</span>
              </button>
            )}
            <button className="next-btn" onClick={() => onPlanetSelect(activeHistoricalEvent.planetId)}>
               VIEW ASSOCIATED PLANET <span>→</span>
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  if (loreMode === 'route' && activeRoute) {
    return (
      <AnimatePresence>
        <motion.div 
          className="lore-card"
          initial={isMobile ? { y: '100%', opacity: 0 } : { x: 400, opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: 1 }}
          exit={isMobile ? { y: '100%', opacity: 0 } : { x: 400, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          {...dragProps}
        >
          {dragHandle}
          <div className="lore-card-header">
            <h2>{activeRoute.toUpperCase()}</h2>
            <div className="lore-meta">
              <span className="lore-tag era-tag">TRADE ROUTE</span>
            </div>
            <div className="lore-date">HYPERLANE NAVIGATIONAL DATA</div>
          </div>
          
          <div className="lore-card-body">
             {wikiData?.thumbnail ? (
               <div className="lore-cover" style={{ backgroundImage: `url(${wikiData.thumbnail})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
             ) : (
               <div className="lore-cover placeholder-logo" style={{ height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                   {isWikiLoading ? <div className="loading-spinner" style={{fontSize: '0.8rem', color: '#666'}}>ARCHIVING...</div> : <div style={{ fontSize: '0.7rem', color: '#444', letterSpacing: '4px' }}>NO VISUAL ARCHIVE</div>}
               </div>
             )}
             
             <div className="lore-section" style={{ lineHeight: '1.6', fontSize: '0.95rem' }}>
               <h3>ASTROMETRIC RECORD</h3>
               {isWikiLoading ? (
                 <p className="sub-text">Decrypting Old Republic navigational charts...</p>
               ) : (
                 <p className="sub-text">
                   {(wikiData?.extract || "A highly trafficked canonical trade route connecting major systems across the galaxy.")
                     .replace(/planet([A-Z])/g, 'planet $1')
                     .replace(/object([A-Z])/g, 'object $1')
                     .replace(/body([A-Z])/g, 'body $1')}
                 </p>
               )}
             </div>
          </div>

          <div className="lore-card-footer">
            {wikiData?.url && (
              <button className="next-btn" onClick={() => window.open(wikiData.url, '_blank')} style={{ borderBottom: '1px solid rgba(130, 220, 255, 0.2)', marginBottom: '8px', color: '#82dcff' }}>
                 READ MORE ON WOOKIEEPEDIA <span>↗</span>
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  if (loreMode === 'planet' && activePlanetId) {
    const swapiInfo = planetLore[activePlanetId] || {};
    let localInfo = planets[activePlanetId] || {};
    
    // If not a major planet, search background planets for region data
    if (!localInfo.description) {
      const bgPlanet = allPlanets.find(p => p.name.toLowerCase().includes(activePlanetId.toLowerCase()) || activePlanetId.toLowerCase().includes(p.name.toLowerCase()));
      if (bgPlanet) {
         localInfo = { description: `A star system located in the ${bgPlanet.region}.` };
      }
    }
    
    const planetEvents = historicalEvents.filter(e => e.planetId === activePlanetId);
    
    return (
      <AnimatePresence>
        <motion.div 
          className="lore-card"
          initial={isMobile ? { y: '100%', opacity: 0 } : { x: '100%', opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: 1 }}
          exit={isMobile ? { y: '100%', opacity: 0 } : { x: '100%', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          {...dragProps}
        >
          {dragHandle}
          <div className="lore-card-header">
            <h2>{activePlanetId.toUpperCase()}</h2>
            <div className="lore-meta">
              <span className="lore-tag era-tag">PLANETARY RECORD</span>
            </div>
          </div>
          
          <div className="lore-card-body">
             {wikiData?.thumbnail ? (
               <div className="lore-cover" style={{ backgroundImage: `url(${wikiData.thumbnail})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
             ) : (
               <div className="lore-cover placeholder-logo" style={{ height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                   {isWikiLoading ? <div className="loading-spinner" style={{fontSize: '0.8rem', color: '#666'}}>ARCHIVING...</div> : <div style={{ fontSize: '0.7rem', color: '#444', letterSpacing: '4px' }}>NO VISUAL ARCHIVE</div>}
               </div>
             )}
             
             <div className="lore-section" style={{ lineHeight: '1.6', fontSize: '0.95rem' }}>
               <h3>ASTROGRAPHIC DATA</h3>
               <p className="sub-text">
                 {(wikiData?.extract || localInfo.description || "A planetary system from the canonical archive.")
                   .replace(/planet([A-Z])/g, 'planet $1')
                   .replace(/object([A-Z])/g, 'object $1')
                   .replace(/body([A-Z])/g, 'body $1')}
               </p>
             </div>
             
             {swapiInfo.name ? (
               <div className="lore-section">
                 <h3>PLANETARY CONDITIONS</h3>
                 <p className="sub-text"><span className="label" style={{color: '#666'}}>Climate:</span> <span style={{color: '#fff'}}>{swapiInfo.climate}</span></p>
                 <p className="sub-text"><span className="label" style={{color: '#666'}}>Terrain:</span> <span style={{color: '#fff'}}>{swapiInfo.terrain}</span></p>
                 <p className="sub-text"><span className="label" style={{color: '#666'}}>Population:</span> <span style={{color: '#fff'}}>{swapiInfo.population}</span></p>
                 <p className="sub-text"><span className="label" style={{color: '#666'}}>Diameter:</span> <span style={{color: '#fff'}}>{swapiInfo.diameter} km</span></p>
               </div>
             ) : (
                <div className="lore-section">
                 <h3>PLANETARY CONDITIONS</h3>
                 <p className="sub-text"><span className="label" style={{color: '#666'}}>Database Status:</span> <span style={{color: '#fff'}}>Encrypted or Unknown</span></p>
               </div>
             )}

             {/* Known Species */}
             {planetSpecies[activePlanetId] && planetSpecies[activePlanetId].length > 0 && (
               <div className="lore-section">
                 <h3>KNOWN SPECIES</h3>
                 <div className="pill-container">
                   {planetSpecies[activePlanetId].map((species, idx) => {
                     const canonicalName = disambiguationMap[species] || species;
                     return (
                       <span 
                         key={idx} 
                         className="character-pill"
                         onClick={() => window.open(`https://starwars.fandom.com/wiki/${encodeURIComponent(canonicalName.replace(/ /g, '_'))}`, '_blank')}
                         style={{ cursor: 'pointer' }}
                         title={`Read about ${species} on Wookieepedia`}
                       >
                         {species}
                       </span>
                     );
                   })}
                 </div>
               </div>
             )}

             {/* Planetary History */}
             {planetEvents.length > 0 && (
               <div className="lore-section">
                 <h3>PLANETARY HISTORY</h3>
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                   {planetEvents.map(evt => (
                     <div key={evt.id} style={{ borderLeft: '2px solid rgba(255, 100, 100, 0.5)', paddingLeft: '8px' }}>
                       <span style={{ fontSize: '0.8rem', color: '#ff6666', fontWeight: 'bold' }}>{evt.year} - {evt.title}</span><br/>
                       <span className="sub-text" style={{ fontSize: '0.85rem' }}>{evt.description}</span>
                     </div>
                   ))}
                 </div>
               </div>
             )}
          </div>

          <div className="lore-card-footer">
            {wikiData?.url && (
              <button className="next-btn" onClick={() => window.open(wikiData.url, '_blank')} style={{ borderBottom: '1px solid rgba(130, 220, 255, 0.2)', marginBottom: '8px', color: '#82dcff' }}>
                 READ MORE ON WOOKIEEPEDIA <span>↗</span>
              </button>
            )}
            {activeItemId ? (
              <button className="next-btn" onClick={() => onSwitchMode('event')}>
                VIEW ASSOCIATED EVENT <span>→</span>
              </button>
            ) : (
              <button className="next-btn disabled">NO ARCHIVED EVENTS</button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  // Fallback to purely activeItemId processing for 'event' mode
  if (!activeItemId) return null;

  const activeIndex = starWarsTimeline.findIndex(item => item.id === activeItemId);
  const activeItem = activeIndex !== -1 ? starWarsTimeline[activeIndex] : null;
  const nextItem = activeIndex !== -1 && activeIndex < starWarsTimeline.length - 1 
    ? starWarsTimeline[activeIndex + 1] 
    : null;
  const prevItem = activeIndex > 0 ? starWarsTimeline[activeIndex - 1] : null;

  if (!activeItem) return null;

  const planetInfo = planets[activeItem.primaryPlanet] || { description: 'Sector data unavailable.' };
  
  // If the item has a text-only location from the API that isn't plottable on our current map
  const displayLocation = activeItem.primaryPlanet !== 'Unknown Spaces' 
      ? activeItem.primaryPlanet 
      : (activeItem.infoCardLocation || 'Unknown Spaces');

  return (
    <AnimatePresence>
      <motion.div 
        className="lore-card"
        initial={isMobile ? { y: '100%', opacity: 0 } : { x: '100%', opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        exit={isMobile ? { y: '100%', opacity: 0 } : { x: '100%', opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        {...dragProps}
      >
        {dragHandle}
        <div className="lore-card-header">
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
            <h2 style={{ flex: 1 }}>{activeItem.title}</h2>
            {onToggleWatched && (
              <div
                onClick={(e) => { e.stopPropagation(); onToggleWatched(activeItem.id); }}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  border: `2px solid ${watchedIds?.map(String).includes(String(activeItem.id)) ? '#ffe81f' : 'rgba(130, 220, 255, 0.4)'}`,
                  background: watchedIds?.map(String).includes(String(activeItem.id)) ? '#ffe81f' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  flexShrink: 0,
                  marginTop: '4px'
                }}
                title={watchedIds?.map(String).includes(String(activeItem.id)) ? 'Mark as unseen' : 'Mark as watched'}
              >
                {watchedIds?.map(String).includes(String(activeItem.id)) && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                )}
              </div>
            )}
          </div>
          <div className="lore-meta">
            <span className="lore-tag era-tag">{(activeEra && activeEra !== 'Unknown') ? activeEra : (activeItem.era && activeItem.era !== 'Unknown' ? activeItem.era : 'UNKNOWN ERA')}</span>
            <span className="lore-tag type-tag">{activeItem.type.toUpperCase()}</span>
          </div>
          <div className="lore-date">
            <span className="label">TEMPORAL COORDINATES:</span> 
            <span className="value">{activeItem.dateDetails}</span>
          </div>
        </div>

        <div className="lore-card-body">
          {wikiData?.thumbnail ? (
             <div className="lore-cover" style={{ backgroundImage: `url(${wikiData.thumbnail})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
          ) : (
             <div className="lore-cover placeholder-logo" style={{ height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                 {isWikiLoading ? <div className="loading-spinner" style={{fontSize: '0.8rem', color: '#666'}}>ARCHIVING...</div> : <div style={{ fontSize: '0.7rem', color: '#444', letterSpacing: '4px' }}>NO VISUAL ARCHIVE</div>}
             </div>
          )}

          <div className="lore-section">
            <h3>LOCATION DATA</h3>
            <p className="highlight-text">{displayLocation.toUpperCase()}</p>
            {activeItem.primaryPlanet !== 'Unknown Spaces' && (
              <p className="sub-text">{planetInfo.description}</p>
            )}
            {activeItem.primaryPlanet === 'Unknown Spaces' && activeItem.infoCardLocation && (
              <p className="sub-text">Coordinate data missing from canonical map records.</p>
            )}
            {activeItem.primaryPlanet === 'Unknown Spaces' && !activeItem.infoCardLocation && (
              <p className="sub-text">Uncharted regions of the galaxy.</p>
            )}
          </div>

          {(() => {
             const customNarration = (loreMode === 'event' && activeItem && cwNarrations[activeItem.title]) 
               ? cwNarrations[activeItem.title] 
               : null;
               
             if (customNarration) {
               return (
                 <div className="lore-section" style={{ lineHeight: '1.6', fontSize: '0.95rem' }}>
                   <h3 style={{ color: '#ffe81f' }}>OPENING NARRATION</h3>
                   <p className="sub-text" style={{ fontStyle: 'italic', opacity: 0.9, color: '#f0f0f0' }}>
                     "{customNarration}"
                   </p>
                 </div>
               );
             } else if (wikiData?.extract) {
               return (
                 <div className="lore-section" style={{ lineHeight: '1.6', fontSize: '0.95rem' }}>
                   <h3>ARCHIVAL EXTRACT</h3>
                   <p className="sub-text" style={{ fontStyle: 'italic', opacity: 0.9 }}>
                     {wikiData.extract
                       .replace(/planet([A-Z])/g, 'planet $1')
                       .replace(/object([A-Z])/g, 'object $1')
                       .replace(/body([A-Z])/g, 'body $1')}
                   </p>
                 </div>
               );
             }
             return null;
          })()}

          {activeItem.starring && activeItem.starring.length > 0 && (
            <div className="lore-section">
              <h3>NOTABLE FIGURES</h3>
              <div className="pill-container">
                {activeItem.starring.map((star, idx) => {
                  const canonicalName = disambiguationMap[star] || star;
                  return (
                    <span 
                      key={idx} 
                      className="character-pill"
                      onClick={() => window.open(`https://starwars.fandom.com/wiki/${encodeURIComponent(canonicalName.replace(/ /g, '_'))}`, '_blank')}
                      style={{ cursor: 'pointer' }}
                      title={`Read about ${star} on Wookieepedia`}
                    >
                      {star}
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {activeItem.timelineNotes && (
            <div className="lore-section expanded">
              <h3>ARCHIVAL CHRONICLES</h3>
              <div className="terminal-text">
                {activeItem.timelineNotes}
              </div>
            </div>
          )}


        </div>

        <div className="lore-card-footer">
          {wikiData?.url && (
            <button className="next-btn" onClick={() => window.open(wikiData.url, '_blank')} style={{ borderBottom: '1px solid rgba(130, 220, 255, 0.2)', marginBottom: '8px', color: '#82dcff' }}>
               READ MORE ON WOOKIEEPEDIA <span>↗</span>
            </button>
          )}
          {(() => {
            const dpUrl = getDisneyPlusUrl(activeItem);
            return dpUrl ? (
              <button 
                className="next-btn" 
                onClick={() => window.open(dpUrl, '_blank')} 
                style={{ 
                  borderBottom: '1px solid rgba(130, 220, 255, 0.2)', 
                  marginBottom: '8px', 
                  background: 'rgba(0, 99, 229, 0.15)', 
                  borderColor: 'rgba(0, 99, 229, 0.4)',
                  color: '#4af' 
                }}
              >
                WATCH ON DISNEY+ <span>↗</span>
              </button>
            ) : null;
          })()}
          {activeItem.primaryPlanet !== 'Unknown Spaces' ? (
            <button className="next-btn" onClick={() => onSwitchMode('planet')} style={{ borderBottom: '1px solid rgba(130, 220, 255, 0.2)', marginBottom: '8px' }}>
               VIEW PLANET LORE
            </button>
          ) : (
             <button className="next-btn disabled" style={{ borderBottom: '1px solid rgba(130, 220, 255, 0.2)', marginBottom: '8px' }}>
               ASTROGRAPHIC DATA UNAVAILABLE
            </button>
          )}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', width: '100%', margin: '4px 0 12px 0' }}>
            <button 
              className={`nav-arrow ${!prevItem ? 'disabled' : ''}`} 
              onClick={() => prevItem && onNext(prevItem.id)}
              title="Previous Chronological Event"
              style={{ 
                background: 'rgba(130, 220, 255, 0.05)', 
                border: '1px solid rgba(130, 220, 255, 0.2)', 
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: prevItem ? '#82dcff' : '#444', 
                fontSize: '1.2rem', 
                cursor: prevItem ? 'pointer' : 'default', 
                transition: 'all 0.2s',
                opacity: prevItem ? 1 : 0.4
              }}
            >
              ←
            </button>
            <button 
              className={`nav-arrow ${!nextItem ? 'disabled' : ''}`} 
              onClick={() => nextItem && onNext(nextItem.id)}
              title="Next Chronological Event"
              style={{ 
                background: 'rgba(130, 220, 255, 0.05)', 
                border: '1px solid rgba(130, 220, 255, 0.2)', 
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: nextItem ? '#82dcff' : '#444', 
                fontSize: '1.2rem', 
                cursor: nextItem ? 'pointer' : 'default', 
                transition: 'all 0.2s',
                opacity: nextItem ? 1 : 0.4
              }}
            >
              →
            </button>
          </div>
          <div style={{ height: 'calc(20px + env(safe-area-inset-bottom, 0px))' }} />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
