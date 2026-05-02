import requests
import json
import time

with open('./sampled_planets.json', 'r') as f:
    PLANETS = json.load(f)

with open('./src/data/planetFactions.json', 'r') as f:
    existing_factions = json.load(f)

def get_planet_wikitext(planet_name):
    url = "https://starwars.fandom.com/api.php"
    params = {
        "action": "query",
        "prop": "revisions",
        "rvprop": "content",
        "rvslots": "main",
        "titles": planet_name,
        "format": "json",
    }
    headers = {"User-Agent": "StarWarsMapBot/1.0 (local dev)"}
    try:
        response = requests.get(url, params=params, headers=headers, timeout=5)
        data = response.json()
        pages = data['query']['pages']
        for page_id, page_info in pages.items():
            if page_id == "-1": return ""
            return page_info['revisions'][0]['slots']['main']['*']
    except Exception:
        return ""
    return ""

def parse_affiliations(content):
    if not content: return ""
    lines = content.split('\n')
    affiliation_lines = []
    capturing = False
    for line in lines:
        if line.strip().startswith('|affiliation'):
            capturing = True
            if '=' in line: affiliation_lines.append(line.split('=', 1)[1].strip())
        elif capturing:
            if line.strip().startswith('|') or line.strip() == '}}': capturing = False
            else: affiliation_lines.append(line.strip())
    return " ".join(affiliation_lines).lower()

def map_factions(text):
    if not text: return None
    
    factions = {
        "Republic": False, "CIS": False, "Empire": False, 
        "Rebellion": False, "New Republic": False, "First Order": False,
        "Hutt/Syndicate": False, "Mandalorian": False, "Jedi": False, "Sith": False
    }

    if "galactic republic" in text or "high republic" in text or "old republic" in text: factions["Republic"] = True
    if "confederacy of independent systems" in text or "separatist" in text: factions["CIS"] = True
    if "empire" in text or "imperial" in text: factions["Empire"] = True
    if "rebellion" in text or "rebel alliance" in text or "alliance to restore" in text: factions["Rebellion"] = True
    if "new republic" in text: factions["New Republic"] = True
    if "first order" in text or "final order" in text: factions["First Order"] = True
    if "resistance" in text: factions["New Republic"] = True
    if "hutt" in text or "syndicate" in text or "crimson dawn" in text or "black sun" in text or "pyke" in text: factions["Hutt/Syndicate"] = True
    if "mandalore" in text or "mandalorian" in text or "death watch" in text: factions["Mandalorian"] = True
    if "jedi order" in text: factions["Jedi"] = True
    if "sith" in text: factions["Sith"] = True

    if not any(factions.values()): return None
    return factions

def main():
    to_process = [p for p in PLANETS if p not in existing_factions]
    print(f"Fetching data for next batch of 50 out of {len(to_process)}...")
    
    added = 0
    # Process just 50 more sequentially to avoid huge waits
    to_process_slice = to_process[:50]
    for i, planet in enumerate(to_process_slice):
        wikitext = get_planet_wikitext(planet)
        raw_affiliations = parse_affiliations(wikitext)
        mapped = map_factions(raw_affiliations)
        
        if mapped:
            existing_factions[planet] = mapped
            added += 1
        
        # Save every single one so we don't lose progress on timeout
        with open('./src/data/planetFactions.json', 'w') as f:
            json.dump(existing_factions, f, indent=2)
            
        time.sleep(0.5) # Gentle on the API
        
    print(f"Found {added} new planet affiliations in this batch.")
    print(f"Finished. Total planets with faction data: {len(existing_factions)}")

if __name__ == "__main__":
    main()
