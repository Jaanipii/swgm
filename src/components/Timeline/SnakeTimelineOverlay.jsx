import React, { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { starWarsTimeline } from '../../data/timeline';
import { determineEra } from '../../utils/determineEra';
import { getDisneyPlusUrl } from '../../utils/disneyPlusLinks';
import { createPortal } from 'react-dom';

const ROW_HEIGHT = 120;
const ARC_RADIUS = ROW_HEIGHT / 2;
const PADDING_X = 100;

const getEraColor = (era) => {
  if (era.includes('Dawn')) return '#4B0082';
  if (era.includes('Old')) return '#8B0000';
  if (era.includes('High')) return '#DAA520';
  if (era.includes('Fall')) return '#4682B4';
  if (era.includes('Reign')) return '#808080';
  if (era.includes('Rebellion')) return '#B22222';
  if (era.includes('New Republic')) return '#008b8b';
  if (era.includes('First Order')) return '#ff4500';
  if (era.includes('New Jedi')) return '#32cd32';
  return '#FFE81F';
};

const getMediaIcon = (type) => {
  switch(type) {
    case 'movie': return (
      <svg width="55%" height="55%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
        <line x1="7" y1="2" x2="7" y2="22"></line>
        <line x1="17" y1="2" x2="17" y2="22"></line>
        <line x1="2" y1="12" x2="22" y2="12"></line>
        <line x1="2" y1="7" x2="7" y2="7"></line>
        <line x1="2" y1="17" x2="7" y2="17"></line>
        <line x1="17" y1="17" x2="22" y2="17"></line>
        <line x1="17" y1="7" x2="22" y2="7"></line>
      </svg>
    );
    case 'series': return (
      <svg width="55%" height="55%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect>
        <polyline points="17 2 12 7 7 2"></polyline>
      </svg>
    );
    case 'book': return (
      <svg width="55%" height="55%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
      </svg>
    );
    case 'comic': return (
      <svg width="55%" height="55%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
    );
    case 'game': return (
      <svg width="55%" height="55%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="6" y1="12" x2="10" y2="12"></line>
        <line x1="8" y1="10" x2="8" y2="14"></line>
        <line x1="15" y1="13" x2="15.01" y2="13"></line>
        <line x1="18" y1="11" x2="18.01" y2="11"></line>
        <rect x="2" y="6" width="20" height="12" rx="2" ry="2"></rect>
      </svg>
    );
    case 'audio-drama': return (
      <svg width="55%" height="55%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
      </svg>
    );
    case 'short-story': return (
      <svg width="55%" height="55%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
        <polyline points="10 9 9 9 8 9"></polyline>
      </svg>
    );
    default: return (
      <svg width="55%" height="55%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
      </svg>
    );
  }
};

const parseYearForSort = (yearStr) => {
   if (!yearStr || yearStr === 'Unknown') return 999999;
   const numStr = yearStr.toString().replace(/[^0-9]/g, '');
   if (!numStr) return 999999;
   let yearNum = parseInt(numStr, 10);
   if (yearStr.toString().includes("BBY")) return -yearNum;
   if (yearStr.toString().includes("ABY")) return yearNum;
   return 999999;
};

const HoverCard = ({ item, color }) => {
   return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 10 }}
        transition={{ duration: 0.2 }}
        style={{
           width: '320px',
           background: 'rgba(5, 15, 30, 0.95)',
           backdropFilter: 'blur(16px)',
           border: `1px solid ${color}80`,
           borderBottom: `4px solid ${color}`,
           borderRadius: '12px',
           padding: '20px',
           boxShadow: `0 15px 40px rgba(0,0,0,0.9), 0 0 20px ${color}30`,
           color: '#fff',
           display: 'flex',
           flexDirection: 'column',
           gap: '8px'
        }}
      >
         <div style={{ fontSize: '0.8rem', color: '#aaa', textTransform: 'uppercase', letterSpacing: '2px', display: 'flex', justifyContent: 'space-between' }}>
            <span>{item.type.replace('-', ' ')}</span>
            <span style={{ color }}>{item.year}</span>
         </div>
         <h3 style={{ margin: '5px 0', fontSize: '1.4rem', color: '#FFE81F', lineHeight: '1.1', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>{item.title}</h3>
         
         {item.writer && item.writer.length > 0 && (
            <div style={{ fontSize: '0.85rem', color: '#ccc' }}>
               <strong style={{ color: '#fff' }}>Writer:</strong> {Array.isArray(item.writer) ? item.writer.join(', ') : item.writer}
            </div>
         )}
         
         {item.director && item.director.length > 0 && (
            <div style={{ fontSize: '0.85rem', color: '#ccc' }}>
               <strong style={{ color: '#fff' }}>Dir/Art:</strong> {Array.isArray(item.director) ? item.director.join(', ') : item.director}
            </div>
         )}

         {item.runtime && (
            <div style={{ fontSize: '0.85rem', color: '#ccc' }}>
               <strong style={{ color: '#fff' }}>Length:</strong> {item.runtime}
            </div>
         )}
         
         {item.dateDetails && item.dateDetails !== 'Unknown' && (
            <div style={{ fontSize: '0.8rem', color: '#82dcff', fontStyle: 'italic', marginTop: '4px', letterSpacing: '0.5px' }}>
               {item.dateDetails}
            </div>
         )}
      </motion.div>
   );
};

const InfoModal = ({ item, color, onClose }) => {
   return (
     <div 
       style={{ position: 'fixed', inset: 0, zIndex: 1000000, background: 'rgba(0,0,0,0.85)', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }} 
       onClick={onClose}
     >
        <motion.div
           initial={{ opacity: 0, scale: 0.95, y: 10 }}
           animate={{ opacity: 1, scale: 1, y: 0 }}
           exit={{ opacity: 0, scale: 0.95, y: 10 }}
           transition={{ duration: 0.2 }}
           onClick={(e) => e.stopPropagation()}
           style={{
              width: '100%',
              maxWidth: '800px',
              maxHeight: '90vh',
              overflowY: 'auto',
              background: 'rgba(5, 15, 30, 0.98)',
              backdropFilter: 'blur(20px)',
              border: `1px solid ${color}60`,
              borderTop: `4px solid ${color}`,
              borderRadius: '16px',
              padding: '30px',
              boxShadow: `0 25px 60px rgba(0,0,0,0.9), 0 0 40px ${color}30`,
              color: '#fff',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
           }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '20px' }}>
             <div>
                <div style={{ fontSize: '0.9rem', color: '#aaa', textTransform: 'uppercase', letterSpacing: '2px', display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                   <span>{item.type.replace('-', ' ')}</span>
                   <span style={{ color }}>{item.year === '999999' ? 'Unknown' : item.year}</span>
                   {item.canon_state && <span style={{ color: item.canon_state === 'Canon' ? '#32cd32' : '#ff4500' }}>{item.canon_state}</span>}
                </div>
                <h2 style={{ margin: '10px 0', fontSize: '2.5rem', color: '#FFE81F', lineHeight: '1.2', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>{item.title}</h2>
             </div>
             <button 
                onClick={onClose} 
                style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', transition: 'background 0.2s', flexShrink: 0 }}
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,100,100,0.3)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
             >
                ✕
             </button>
          </div>
          
          {item.abstract && (
             <div style={{ fontSize: '1.15rem', lineHeight: '1.6', color: '#eee', paddingBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                {item.abstract}
             </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
             {item.director && item.director.length > 0 && (
                <div>
                   <strong style={{ color: '#FFE81F', display: 'block', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '4px', letterSpacing: '1px' }}>Director / Artist</strong>
                   <span style={{ color: '#ccc', fontSize: '1rem', lineHeight: '1.4', display: 'block' }}>{Array.isArray(item.director) ? item.director.join(', ') : item.director}</span>
                </div>
             )}
             {item.writer && item.writer.length > 0 && (
                <div>
                   <strong style={{ color: '#FFE81F', display: 'block', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '4px', letterSpacing: '1px' }}>Writer</strong>
                   <span style={{ color: '#ccc', fontSize: '1rem', lineHeight: '1.4', display: 'block' }}>{Array.isArray(item.writer) ? item.writer.join(', ') : item.writer}</span>
                </div>
             )}
             {item.starring && item.starring.length > 0 && (
                <div style={{ gridColumn: '1 / -1' }}>
                   <strong style={{ color: '#FFE81F', display: 'block', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '4px', letterSpacing: '1px' }}>Starring</strong>
                   <span style={{ color: '#ccc', fontSize: '1rem', lineHeight: '1.4', display: 'block' }}>{Array.isArray(item.starring) ? item.starring.join(', ') : item.starring}</span>
                </div>
             )}
             {item.key_characters && item.key_characters.length > 0 && (
                <div style={{ gridColumn: '1 / -1' }}>
                   <strong style={{ color: '#FFE81F', display: 'block', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '4px', letterSpacing: '1px' }}>Key Characters</strong>
                   <span style={{ color: '#ccc', fontSize: '1rem', lineHeight: '1.4', display: 'block' }}>{Array.isArray(item.key_characters) ? item.key_characters.join(', ') : item.key_characters}</span>
                </div>
             )}
             {item.primaryPlanet && (
                <div>
                   <strong style={{ color: '#FFE81F', display: 'block', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '4px', letterSpacing: '1px' }}>Primary Planet</strong>
                   <span style={{ color: '#ccc', fontSize: '1rem', lineHeight: '1.4', display: 'block' }}>{item.primaryPlanet}</span>
                </div>
             )}
             {item.releaseDate && (
                <div>
                   <strong style={{ color: '#FFE81F', display: 'block', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '4px', letterSpacing: '1px' }}>Release Date</strong>
                   <span style={{ color: '#ccc', fontSize: '1rem', lineHeight: '1.4', display: 'block' }}>{item.releaseDate}</span>
                </div>
             )}
             {item.runtime && (
                <div>
                   <strong style={{ color: '#FFE81F', display: 'block', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '4px', letterSpacing: '1px' }}>Runtime / Length</strong>
                   <span style={{ color: '#ccc', fontSize: '1rem', lineHeight: '1.4', display: 'block' }}>{item.runtime}</span>
                </div>
             )}
          </div>

          <div style={{ marginTop: '10px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
             <a 
                href={`https://starwars.fandom.com/wiki/Special:Search?query=${encodeURIComponent(item.title.replace(/ \(.+\)$/, ''))}`} 
                target="_blank" 
                rel="noreferrer"
                style={{
                   background: 'rgba(255, 232, 31, 0.1)',
                   border: '1px solid #FFE81F',
                   color: '#FFE81F',
                   padding: '12px 28px',
                   borderRadius: '30px',
                   textDecoration: 'none',
                   fontSize: '1rem',
                   fontWeight: 'bold',
                   textTransform: 'uppercase',
                   letterSpacing: '1.5px',
                   display: 'inline-flex',
                   alignItems: 'center',
                   gap: '10px',
                   transition: 'all 0.2s',
                   boxShadow: `0 0 15px rgba(255, 232, 31, 0.2)`
                }}
                onMouseOver={(e) => { 
                   e.currentTarget.style.background = 'rgba(255, 232, 31, 0.25)';
                   e.currentTarget.style.boxShadow = `0 0 25px rgba(255, 232, 31, 0.4)`;
                }}
                onMouseOut={(e) => { 
                   e.currentTarget.style.background = 'rgba(255, 232, 31, 0.1)';
                   e.currentTarget.style.boxShadow = `0 0 15px rgba(255, 232, 31, 0.2)`;
                }}
             >
                Search on Wookieepedia
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                   <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                   <polyline points="15 3 21 3 21 9"></polyline>
                   <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
             </a>

             {['movie', 'series', 'short-story'].includes(item.type?.toLowerCase()) && getDisneyPlusUrl(item) && (
                <a 
                   href={getDisneyPlusUrl(item)} 
                   target="_blank" 
                   rel="noreferrer"
                   style={{
                      background: 'rgba(54, 113, 255, 0.1)',
                      border: '1px solid #3671ff',
                      color: '#6aa1ff',
                      padding: '12px 28px',
                      borderRadius: '30px',
                      textDecoration: 'none',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      letterSpacing: '1.5px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '10px',
                      transition: 'all 0.2s',
                      boxShadow: `0 0 15px rgba(54, 113, 255, 0.2)`
                   }}
                   onMouseOver={(e) => { 
                      e.currentTarget.style.background = 'rgba(54, 113, 255, 0.25)';
                      e.currentTarget.style.boxShadow = `0 0 25px rgba(54, 113, 255, 0.4)`;
                      e.currentTarget.style.color = '#aaccff';
                   }}
                   onMouseOut={(e) => { 
                      e.currentTarget.style.background = 'rgba(54, 113, 255, 0.1)';
                      e.currentTarget.style.boxShadow = `0 0 15px rgba(54, 113, 255, 0.2)`;
                      e.currentTarget.style.color = '#6aa1ff';
                   }}
                >
                   Watch on Disney+
                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                   </svg>
                </a>
             )}
          </div>
        </motion.div>
     </div>
   );
};

const SnakeTimelineOverlay = ({ onClose }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedTypes, setSelectedTypes] = useState(['movie']); // Empty means ALL

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleFilter = (type) => {
    setSelectedTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const containerWidth = Math.min(windowWidth, 1600); // Respect the 1600px maxWidth of the parent constraints
  const COLS = Math.max(1, Math.floor((containerWidth - PADDING_X * 2) / 200));
  const COL_WIDTH = COLS > 1 ? (containerWidth - PADDING_X * 2) / (COLS - 1) : 0;

  const layout = useMemo(() => {
    let baseTimeline = [...starWarsTimeline];
    if (selectedTypes.length > 0) {
       baseTimeline = baseTimeline.filter(item => selectedTypes.includes(item.type));
    }
    
    const sortedTimeline = baseTimeline.sort((a, b) => parseYearForSort(a.year) - parseYearForSort(b.year));
    
    const points = [];
    const headers = [];
    const pathSegments = [];
    
    let currentEra = null;
    let col = 0;
    let currentMovingRight = true;
    let y = 100; // Start with top padding
    
    sortedTimeline.forEach((item, index) => {
      const eraName = determineEra(item.year);
      const eraColor = getEraColor(eraName);
      
      // Inject Era Header Gap
      if (eraName !== currentEra) {
         currentEra = eraName;
         
         if (index > 0) {
            y += ROW_HEIGHT * 0.7; 
            headers.push({ name: eraName, y: y, color: eraColor });
            y += ROW_HEIGHT * 0.7; // Create physical gap for header text
         } else {
            headers.push({ name: eraName, y: y * 0.5, color: eraColor });
         }
      }
      
      const x = PADDING_X + col * COL_WIDTH;
      points.push({ x, y, item, color: '#FFE81F', movingRight: currentMovingRight });
      
      if (index > 0) {
         const prevPoint = points[index - 1];
         let segmentD = `M ${prevPoint.x} ${prevPoint.y}`;
         
         if (prevPoint.y === y) {
             segmentD += ` L ${x} ${y}`;
         } else if (prevPoint.x === x && Math.abs(y - prevPoint.y) <= ROW_HEIGHT) {
             // Normal Edge drop: draw semi-circle loop using Cubic Bezier
             const isRightEdge = prevPoint.movingRight;
             // Ensure bulgeX doesn't wildly extend outside the SVG boundary
             let bulgeX = isRightEdge ? x + ARC_RADIUS * 2 : x - ARC_RADIUS * 2;
             if (isRightEdge && bulgeX > containerWidth) bulgeX = containerWidth;
             if (!isRightEdge && bulgeX < 0) bulgeX = 0;
             
             segmentD += ` C ${bulgeX} ${prevPoint.y}, ${bulgeX} ${y}, ${x} ${y}`;
         } else {
             // Era Drop (straight vertical or diagonal S-curve bridging the gap)
             const yMid = prevPoint.y + Math.abs(y - prevPoint.y) / 2;
             segmentD += ` C ${prevPoint.x} ${yMid}, ${x} ${yMid}, ${x} ${y}`;
         }
         pathSegments.push(segmentD);
      }

      if (currentMovingRight) {
         if (col < COLS - 1) col++;
         else { currentMovingRight = false; y += ROW_HEIGHT; }
      } else {
         if (col > 0) col--;
         else { currentMovingRight = true; y += ROW_HEIGHT; }
      }
    });

    return {
       points,
       headers,
       pathSegments,
       totalHeight: y + ROW_HEIGHT + 100
    };
  }, [windowWidth, COLS, COL_WIDTH, selectedTypes]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1000,
        background: 'rgba(5, 10, 20, 0.85)',
        backdropFilter: 'blur(25px)',
        WebkitBackdropFilter: 'blur(25px)',
        overflowY: 'auto',
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '0 0 100px 0'
      }}
    >
      <button 
        onClick={onClose}
        style={{
          position: 'fixed',
          top: '30px',
          right: '30px',
          background: 'rgba(255, 232, 31, 0.1)',
          border: '1px solid rgba(255, 232, 31, 0.3)',
          color: '#FFE81F',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          fontSize: '1.5rem',
          cursor: 'pointer',
          zIndex: 1010,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transition: 'all 0.3s ease'
        }}
      >
        ×
      </button>

      <div style={{ padding: '60px 0 40px 0', textAlign: 'center' }}>
        <h1 style={{ color: '#FFE81F', fontSize: '3.5rem', letterSpacing: '6px', margin: 0, fontFamily: "'Pathway Gothic One', sans-serif" }}>
          JEDI ARCHIVES
        </h1>
        <p style={{ color: '#aaa', fontSize: '1.2rem', margin: '10px 0 30px 0', textTransform: 'uppercase', letterSpacing: '2px' }}>
          Complete Astronomical & Historical Records
        </p>
        
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {['movie', 'series', 'book', 'comic', 'game', 'audio-drama', 'short-story'].map(type => (
            <button
              key={type}
              onClick={() => toggleFilter(type)}
              style={{
                background: selectedTypes.includes(type) ? 'rgba(255, 232, 31, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                border: `1px solid ${selectedTypes.includes(type) ? '#FFE81F' : 'rgba(255, 255, 255, 0.2)'}`,
                color: selectedTypes.includes(type) ? '#FFE81F' : '#ccc',
                padding: '8px 16px',
                borderRadius: '20px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
               transition: 'all 0.2s',
               textTransform: 'capitalize'
              }}
            >
              <span style={{ display: 'flex', width: '20px', height: '20px', justifyContent: 'center', alignItems: 'center' }}>{getMediaIcon(type)}</span>
              {type.replace('-', ' ')}
            </button>
          ))}
          {selectedTypes.length > 0 && (
             <button
               onClick={() => setSelectedTypes([])}
               style={{ background: 'transparent', border: 'none', color: '#ff4a4a', textDecoration: 'underline', cursor: 'pointer', fontSize: '0.9rem', padding: '8px' }}
             >
                Clear Filters
             </button>
          )}
        </div>
      </div>

      <div style={{ width: '100%', maxWidth: '1600px', height: layout.totalHeight, position: 'relative' }}>
        <svg style={{ position: 'absolute', top: 0, left: 0, width: '10px', height: '10px', overflow: 'visible', pointerEvents: 'none', zIndex: 0 }}>
          {/* Fake glow using thick semi-transparent stroke (Bypasses Chromium CSS filter clipping bug on large paths) */}
          {layout.pathSegments.map((segmentD, i) => (
             <path 
               key={`glow-${i}`}
               d={segmentD} 
               fill="none" 
               stroke="#FFE81F" 
               strokeWidth="16" 
               strokeOpacity="0.1"
               strokeLinecap="round"
             />
          ))}
           {/* Core timeline line */}
          {layout.pathSegments.map((segmentD, i) => (
             <path 
               key={`core-${i}`}
               d={segmentD} 
               fill="none" 
               stroke="#FFE81F" 
               strokeWidth="4" 
               strokeOpacity="0.5"
               strokeLinecap="round"
             />
          ))}
        </svg>

        {layout.headers.map((hdr, i) => (
           <div key={`hdr-${i}`} style={{
              position: 'absolute',
              top: hdr.y,
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'rgba(5, 10, 20, 0.95)',
               padding: '8px 24px',
              border: `2px solid ${hdr.color}`,
              borderRadius: '20px',
              color: hdr.color,
               fontSize: '1rem',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              zIndex: 1,
              boxShadow: `0 0 20px rgba(0,0,0,0.8), 0 0 10px ${hdr.color}40`
           }}>
              {hdr.name}
           </div>
        ))}

        {layout.points.map((pt, i) => (
          <div 
            key={pt.item.id || `pt-${i}`}
            style={{
               position: 'absolute',
               left: pt.x,
               top: pt.y,
               transform: 'translate(-50%, -50%)',
               width: '36px',
               height: '36px',
               background: 'rgba(10, 20, 40, 0.9)',
               border: `2px solid #FFE81F`,
               color: '#FFE81F',
               borderRadius: '50%',
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center',
               fontSize: '16px',
               cursor: 'pointer',
               boxShadow: `0 0 15px rgba(255, 232, 31, 0.5)`,
               zIndex: 10,
               transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            }}
            onMouseEnter={(e) => {
               const rect = e.currentTarget.getBoundingClientRect();
               e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.3)';
               setHoveredNode({
                  item: pt.item,
                  x: rect.left + rect.width / 2,
                  y: rect.top - 10,
                  color: pt.color
               });
            }}
            onMouseLeave={(e) => {
               e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)';
               setHoveredNode(null);
            }}
            onClick={(e) => {
               e.stopPropagation();
               setSelectedNode({
                  item: pt.item,
                  color: pt.color
               });
               setHoveredNode(null); // Optional: hide hover node when clicked
            }}
          >
             {getMediaIcon(pt.item.type)}
          </div>
        ))}
      </div>

      {/* Top-Level Portal for Hover Card Context Escape */}
      {createPortal(
         <div 
           style={{
              position: 'fixed',
              top: hoveredNode ? hoveredNode.y : 0,
              left: hoveredNode ? hoveredNode.x : 0,
              transform: 'translate(-50%, -100%)',
              pointerEvents: 'none',
              zIndex: 999999
           }}
         >
           <AnimatePresence>
              {hoveredNode && !selectedNode && (
                <HoverCard key="hover-card" item={hoveredNode.item} color={hoveredNode.color} />
              )}
            </AnimatePresence>
         </div>,
         document.body
      )}

      {/* Top-Level Portal for Info Modal */}
      {createPortal(
         <AnimatePresence>
           {selectedNode && (
             <InfoModal 
               key="info-modal" 
               item={selectedNode.item} 
               color={selectedNode.color} 
               onClose={() => setSelectedNode(null)}
             />
           )}
         </AnimatePresence>,
         document.body
      )}

    </motion.div>
  );
};

export default SnakeTimelineOverlay;
