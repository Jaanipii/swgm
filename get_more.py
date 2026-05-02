import json

with open('./src/data/galacticData.js', 'r') as f:
    content = f.read()

json_str = content.split('export const allPlanets = ')[1].strip()
if json_str.endswith(';'): json_str = json_str[:-1]

planets = json.loads(json_str)

import random
random.seed(84)
# Sample 1000 more
sampled = random.sample([p['name'] for p in planets if len(p['name']) > 3 and not p['name'].startswith('Unknown')], 1000)

with open('sampled_planets.json', 'w') as f:
    json.dump(sampled, f)
    
print("Sampled 1000 planets")
