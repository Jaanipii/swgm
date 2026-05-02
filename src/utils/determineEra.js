/**
 * Determines the Star Wars era from a canonical year string like "19 BBY" or "5 ABY".
 */
export function determineEra(yearStr) {
  if (!yearStr) return "Unknown";
  const isBBY = yearStr.includes("BBY");
  const isABY = yearStr.includes("ABY");
  if (!isBBY && !isABY) return "Unknown";

  const numStr = yearStr.replace(/[^0-9]/g, '');
  if (!numStr) return "Unknown";
  let yearNum = parseInt(numStr, 10);
  if (isBBY) yearNum = -yearNum;
  
  if (yearNum < -100) return "The High Republic";
  if (yearNum >= -100 && yearNum < -19) return "Fall of the Jedi";
  if (yearNum >= -19 && yearNum < 0) return "Reign of the Empire";
  if (yearNum >= 0 && yearNum < 5) return "Age of Rebellion";
  if (yearNum >= 5 && yearNum < 34) return "The New Republic";
  if (yearNum >= 34) return "Rise of the First Order";
  return "Unknown";
}
