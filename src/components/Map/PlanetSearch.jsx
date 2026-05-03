import React, { useState, useEffect, useRef } from 'react';
import { timelinePlanets } from '../../data/galacticData';
import { motion, AnimatePresence } from 'framer-motion';

export default function PlanetSearch({ allPlanets, onSelect, onHighlight, onResultsChange }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const searchRef = useRef(null);

  useEffect(() => {
    if (query.trim().length > 1) {
      const lowerQuery = query.toLowerCase();
      // Safe fallback if allPlanets missing initially
      const dataset = allPlanets || [];
      
      // Inject the highly-curated canonical injections (like Tenoo) directly into the search engine
      const extraPlanets = Object.keys(timelinePlanets).map(name => ({ name, region: 'Lore Location' }));
      const combinedDataset = [...dataset, ...extraPlanets];
      
      // Deduplicate using a Map
      const uniqueDatasetMap = new Map();
      combinedDataset.forEach(p => uniqueDatasetMap.set(p.name.toLowerCase(), p));
      const uniqueDataset = Array.from(uniqueDatasetMap.values());

      const matches = uniqueDataset
        .filter(p => p.name.toLowerCase().includes(lowerQuery))
        .slice(0, 50); // limit to top 50 to keep DOM lightning fast
      setResults(matches);
      if (onResultsChange) onResultsChange(matches);
      setHighlightedIndex(-1);
    } else {
      setResults([]);
      if (onResultsChange) onResultsChange([]);
      setHighlightedIndex(-1);
    }
  }, [query, allPlanets]);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e) => {
    if (!isOpen || results.length === 0) return;
    
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex(prev => {
        const next = prev < results.length - 1 ? prev + 1 : 0;
        if (onHighlight) onHighlight(results[next].name);
        return next;
      });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex(prev => {
        const next = prev > 0 ? prev - 1 : results.length - 1;
        if (onHighlight) onHighlight(results[next].name);
        return next;
      });
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightedIndex >= 0 && highlightedIndex < results.length) {
        onSelect(results[highlightedIndex].name);
        setQuery('');
        setIsOpen(false);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div ref={searchRef} style={{ position: 'relative', display: 'flex', flexDirection: 'column', zIndex: 200 }}>
      {/* Search Input Box */}
      <div style={{ 
        display: 'flex', alignItems: 'center', background: 'rgba(10, 20, 40, 0.8)', 
        border: '1px solid rgba(130, 220, 255, 0.4)', borderRadius: '4px', padding: '6px 12px',
        boxShadow: isOpen ? '0 0 8px rgba(130, 220, 255, 0.3)' : 'none',
        transition: 'box-shadow 0.3s ease'
      }}>
        {/* Minimal inline SVG search icon */}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#82dcff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px', minWidth: '14px' }}>
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input
          type="text"
          placeholder="Search 2,000+ canon planets..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          style={{ 
            background: 'transparent', border: 'none', color: '#fff', outline: 'none', width: '100%',
            fontFamily: 'Inter, Roboto, sans-serif', fontSize: '0.85rem'
          }}
          onKeyDown={handleKeyDown}
        />
        {/* Clear Button */}
        {query && (
          <button 
            onClick={() => { setQuery(''); setResults([]); if (onResultsChange) onResultsChange([]); setIsOpen(false); }}
            style={{ 
               background: 'transparent', border: 'none', color: '#888', cursor: 'pointer', 
               padding: '0 4px', fontSize: '1rem', display: 'flex', alignItems: 'center' 
            }}
          >
            ×
          </button>
        )}
      </div>
      
      {/* Autocomplete Dropdown */}
      <AnimatePresence>
        {isOpen && query.trim().length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute', top: '100%', left: 0, right: 0, marginTop: '4px',
              background: 'rgba(10, 15, 30, 0.95)', border: '1px solid rgba(130, 220, 255, 0.3)',
              borderRadius: '4px', maxHeight: '250px', overflowY: 'auto', backdropFilter: 'blur(12px)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)'
            }}
          >
            {results.length > 0 ? (
              results.map((p, i) => (
                <div
                  key={`search-${p.name}-${i}`}
                  onClick={() => {
                    onSelect(p.name);
                    setQuery('');
                    setIsOpen(false);
                  }}
                  style={{
                    padding: '8px 12px', borderBottom: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer',
                    display: 'flex', flexDirection: 'column',
                    transition: 'background 0.2s ease',
                    background: highlightedIndex === i ? 'rgba(130, 220, 255, 0.25)' : 'transparent'
                  }}
                  onMouseEnter={() => {
                    setHighlightedIndex(i);
                    if (onHighlight) onHighlight(p.name);
                  }}
                  onMouseLeave={() => setHighlightedIndex(-1)}
                >
                   <span style={{ color: '#ffe81f', fontSize: '0.85rem', fontWeight: 'bold' }}>{p.name}</span>
                   <span style={{ color: '#82dcff', fontSize: '0.7rem' }}>{p.region || 'Unknown Region'}</span>
                </div>
              ))
            ) : (
              <div style={{ padding: '12px', color: '#888', fontSize: '0.8rem', textAlign: 'center', fontStyle: 'italic' }}>
                No systems found in archival records.
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
