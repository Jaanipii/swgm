import requests
import json

def get_planet_affiliations(planet_name):
    # Use MediaWiki API to get the wikitext of the page
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
    
    headers = {
        "User-Agent": "StarWarsMapBot/1.0 (Contact: local development)"
    }
    
    response = requests.get(url, params=params, headers=headers)
    data = response.json()
    
    pages = data['query']['pages']
    for page_id, page_info in pages.items():
        if page_id == "-1":
            return None
        
        # Get the wikitext content
        try:
            content = page_info['revisions'][0]['slots']['main']['*']
            
            # Simple parsing for affiliation field
            # Look for |affiliation= or |affiliation = 
            lines = content.split('\n')
            affiliation_lines = []
            capturing = False
            for line in lines:
                if line.strip().startswith('|affiliation'):
                    capturing = True
                    affiliation_lines.append(line.split('=', 1)[1].strip())
                elif capturing:
                    if line.strip().startswith('|') or line.strip() == '}}':
                        capturing = False
                    else:
                        affiliation_lines.append(line.strip())
            
            return " ".join(affiliation_lines)
            
        except KeyError:
            return None
            
print("Tatooine:", get_planet_affiliations("Tatooine"))
print("Geonosis:", get_planet_affiliations("Geonosis"))
print("Coruscant:", get_planet_affiliations("Coruscant"))
