import requests
import json
import time

# A highly curated list of the most important planets across all eras
PLANETS = [
    # Timeline Main Planets
    "Coruscant", "Naboo", "Geonosis", "Mandalore", "Mustafar", "Kamino", "Corellia", 
    "Tatooine", "Lothal", "Ferrix", "Scarif", "Hoth", "Endor", "Nevarro", "Peridea", 
    "Castilon", "Jakku", "Crait", "Exegol",
    # Core / Deep Core
    "Alderaan", "Kuat", "Fondor", "Hosnian Prime", "Chandrila", "Byss", "Tython", "Ilum",
    # Inner Rim / Colonies
    "Cato Neimoidia", "Onderon", "Devaron", "Thyferra", "Taris",
    # Mid Rim
    "Kashyyyk", "Naboo", "Malastare", "Toydaria", "Rodia", "Bothawui", "Ord Mantell",
    "Takodana", "Kijimi", "Ithor",
    # Outer Rim Sectors
    "Yavin 4", "Bespin", "Dagobah", "Sullust", "Mon Cala", "Ryloth", "Eriadu",
    "Christophsis", "Dathomir", "Jedha", "Cantonica", "Pasaana", "Ajan Kloss", 
    "Korriban", "Malachor", "Raxus Secundus", "Serenno", "Skako Minor", "Concord Dawn",
    "Florrum", "Zygerria", "Umbara", "Pantora", "Abafar", "Lola Sayu", "Saleucami",
    "Bacara", "Mygeeto", "Felucia", "Utapau",
    # Hutt Space / Syndicate
    "Nal Hutta", "Nar Shaddaa", "Kessel", "Oba Diah"
]

# Ensure uniqueness
PLANETS = list(set(PLANETS))

def get_planet_wikitext(planet_name):
    print(f"Fetching {planet_name}...")
    url = "https://starwars.fandom.com/api.php"
    params = {
        "action": "query",
        "prop": "revisions",
        "rvprop": "content",
        "rvslots": "main",
        "titles": planet_name,
        "format": "json",
        "redirects": 1
    }
    headers = {"User-Agent": "StarWarsMapBot/1.0 (local dev)"}
    
    try:
        response = requests.get(url, params=params, headers=headers)
        data = response.json()
        pages = data['query']['pages']
        for page_id, page_info in pages.items():
            if page_id == "-1":
                return ""
            return page_info['revisions'][0]['slots']['main']['*']
    except Exception as e:
        print(f"Error fetching {planet_name}: {e}")
        return ""
    return ""

def parse_affiliations(content):
    if not content:
        return ""
    lines = content.split('\n')
    affiliation_lines = []
    capturing = False
    for line in lines:
        if line.strip().startswith('|affiliation'):
            capturing = True
            if '=' in line:
                affiliation_lines.append(line.split('=', 1)[1].strip())
        elif capturing:
            if line.strip().startswith('|') or line.strip() == '}}':
                capturing = False
            else:
                affiliation_lines.append(line.strip())
    return " ".join(affiliation_lines).lower()

def map_factions(affiliation_text):
    factions = {
        "Republic": False,
        "CIS": False,
        "Empire": False,
        "Rebellion": False,
        "New Republic": False,
        "First Order": False,
        "Hutt/Syndicate": False,
        "Mandalorian": False,
        "Jedi": False,
        "Sith": False
    }
    
    if not affiliation_text:
        return factions
        
    text = affiliation_text

    # Republic
    if "galactic republic" in text or "high republic" in text or "old republic" in text:
        factions["Republic"] = True
        
    # CIS
    if "confederacy of independent systems" in text or "separatist" in text or "techno union" in text or "trade federation" in text or "banking clan" in text:
        factions["CIS"] = True
        
    # Empire
    if "galactic empire" in text or "sith empire" in text or "imperial remnant" in text:
        factions["Empire"] = True
        
    # Rebellion
    if "alliance to restore" in text or "rebellion" in text or "rebel alliance" in text or "partisans" in text or "phoenix cell" in text:
        factions["Rebellion"] = True
        
    # New Republic
    if "new republic" in text:
        factions["New Republic"] = True
        
    # First Order / Resistance
    if "first order" in text or "final order" in text:
        factions["First Order"] = True
    if "resistance" in text:
        factions["New Republic"] = True # Map Resistance presence conceptually similarly
        
    # Syndicates
    if "hutt" in text or "pyke" in text or "crimson dawn" in text or "black sun" in text or "syndicate" in text or "criminal empire" in text or "cartel" in text:
        factions["Hutt/Syndicate"] = True
        
    # Mandos
    if "mandalore" in text or "mandalorian" in text or "death watch" in text or "children of the watch" in text:
        factions["Mandalorian"] = True
        
    # Force Users
    if "jedi order" in text:
        factions["Jedi"] = True
    if "sith" in text:
        factions["Sith"] = True

    return factions

def main():
    results = {}
    for planet in PLANETS:
        wikitext = get_planet_wikitext(planet)
        raw_affiliations = parse_affiliations(wikitext)
        mapped = map_factions(raw_affiliations)
        results[planet] = mapped
        time.sleep(0.5) # Be nice to API
        
    # Also handle the timeline exact name "Endor" which probably redirects to "Endor (planet)"
    # We will rely on MW API redirects, but ensure the key matches our app
        
    with open('../src/data/planetFactions.json', 'w') as f:
        json.dump(results, f, indent=2)
    print("Done! Saved to src/data/planetFactions.json")

if __name__ == "__main__":
    main()
