import json

with open('./src/data/galacticData.js', 'r') as f:
    content = f.read()

# Extract just the allPlanets part
json_str = content.split('export const allPlanets = ')[1].strip()
if json_str.endswith(';'):
    json_str = json_str[:-1]

planets = json.loads(json_str)

# Let's get a random sampling of ~400 more planets
# To make it cool, let's grab planets that are well known
import random
random.seed(42)
sampled = random.sample([p['name'] for p in planets if len(p['name']) > 3 and not p['name'].startswith('Unknown')], 400)

with open('sampled_planets.json', 'w') as f:
    json.dump(sampled, f)
    
print("Sampled 400 planets")
