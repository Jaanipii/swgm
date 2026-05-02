import re
import json

lines = []
with open('pdf_extracted.txt', 'r') as f:
    for line in f:
        line = line.strip()
        # Fix the header smushed into the first line
        if line.startswith("SYSTEM SECTOR REGION GRID"):
            line = line.replace("SYSTEM SECTOR REGION GRID", "").strip()
        lines.append(line)

# Known regions exactly as they appear in the text
regions = [
    "Deep Core",
    "Core Worlds",
    "Colonies",
    "Inner Rim",
    "Expansion Region",
    "Mid Rim",
    "Hutt Space",
    "Outer Rim Territories",
    "Wild Space",
    "Unknown Regions",
    "Extragalactic"
]
region_pattern = "(" + "|".join(regions) + ")"

regex = re.compile(r"^(.*?)\s+" + region_pattern + r"\s+([A-Z]-?\d{1,2})$")

# Coordinate Mapping logic
# We know Coruscant is M-10 -> X: 1200, Y: 1200
# and Tatooine is R-16 -> X: 1844, Y: 1873
# This is a roughly linear grid. 
# M is the 13th letter. R is the 18th letter.
# grid_X = ord(letter) - 64 -> M=13, R=18
# grid_Y = number -> 10, 16
# M(13, 10): x=1200, y=1200
# R(18, 16): x=1844, y=1873
# dx = 1844 - 1200 = 644 over 5 units of grid (18-13) -> 644/5 = 128.8 per letter.
# dy = 1873 - 1200 = 673 over 6 units of grid (16-10) -> 673/6 = 112.16 per number.
# Let's verify with another planet if we had one, but we'll use:
# X = 1200 + (grid_x - 13) * 128.8
# Y = 1200 + (grid_y - 10) * 112.16

parsed_systems = {}

for line in lines:
    match = regex.search(line)
    if match:
        prefix = match.group(1).strip()
        region = match.group(2)
        grid = match.group(3)
        
        # Grid could be like 'P-18' or 'M-5' or 'P-7' or sometimes it's like 'L-13'
        grid_match = re.search(r"([A-Z])-?(\d+)", grid)
        if not grid_match:
            continue
            
        letter = grid_match.group(1)
        number = int(grid_match.group(2))
        
        grid_x = ord(letter) - 64
        grid_y = number
        
        # Calculate X, Y
        pixel_x = int(1200 + (grid_x - 13) * 128.8)
        pixel_y = int(1200 + (grid_y - 10) * 112.16)
        
        # The prefix contains System Name and Sector Name. 
        # e.g "Alderaan Alderaan" -> We could just keep the whole prefix, or take the first word.
        # Actually, let's just make the key the entire prefix, and in JS we can do a fuzzy search.
        # But wait, sometimes it's "Batuu Trilon" - we could clean it up if System == Sector.
        parts = prefix.split()
        sys_name = prefix
        if len(parts) >= 2:
            # If the first part is equal to the second part (e.g. "Alderaan Alderaan")
            if parts[0] == parts[1]:
                sys_name = parts[0]
            elif parts[1] == "Sector":
                sys_name = parts[0]
            # Just keep the first word as the primary key as a fallback, but store the full string.
            
        parsed_systems[prefix] = {
            "name_prefix": prefix,
            "system": sys_name,
            "region": region,
            "grid": grid,
            "x": pixel_x,
            "y": pixel_y
        }

with open("parsed_systems.json", "w") as f:
    json.dump(parsed_systems, f, indent=2)

print(f"Parsed {len(parsed_systems)} systems.")
