export function parseRuntime(runtimeItem) {
  if (!runtimeItem) return 0;
  
  let rtStr = '';
  if (Array.isArray(runtimeItem)) {
    rtStr = String(runtimeItem[0].text || runtimeItem[0]);
  } else if (typeof runtimeItem === 'object') {
    rtStr = String(runtimeItem.text || '');
  } else {
    rtStr = String(runtimeItem);
  }

  rtStr = rtStr.toLowerCase().trim();

  if (rtStr.includes('hour') || rtStr.includes('min')) {
    const parenMatch = rtStr.match(/\((\d+)\s*min/);
    if (parenMatch) {
      return parseInt(parenMatch[1], 10);
    }
    
    let hours = 0;
    let minutes = 0;
    
    const hMatch = rtStr.match(/(\d+)\s*hour/);
    if (hMatch) hours = parseInt(hMatch[1], 10);
    
    const mMatch = rtStr.match(/(\d+)\s*min/);
    if (mMatch) minutes = parseInt(mMatch[1], 10);
    
    return (hours * 60) + minutes;
  }
  
  if (rtStr.includes(':')) {
    const parts = rtStr.split(':').map(n => parseInt(n, 10));
    if (parts.length === 2) {
      if (parts[0] < 10) {
        // H:MM
        return (parts[0] * 60) + parts[1];
      } else {
        // MM:SS
        return parts[0] + (parts[1] >= 30 ? 1 : 0);
      }
    }
    if (parts.length === 3) {
      return (parts[0] * 60) + parts[1] + (parts[2] >= 30 ? 1 : 0);
    }
  }
  
  const num = parseInt(rtStr, 10);
  if (!isNaN(num)) return num;

  return 0;
}

export function getRuntime(episode) {
  const parsed = parseRuntime(episode.runtime);
  if (parsed > 0) return parsed;
  
  if (episode.type === 'movie') return 135;
  const title = (episode.title || '').toLowerCase();
  
  const animated = ['clone wars', 'rebels', 'bad batch', 'tales of', 'resistance', 'visions', 'forces of destiny', 'galaxy of adventures', 'young jedi', 'fun with nubs'];
  if (animated.some(k => title.includes(k))) return 25;
  
  return 45;
}

export function formatDuration(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = Math.floor(totalMinutes % 60);
  return `${hours}h ${minutes}m`;
}
