// Extracted and mapped from starwarstl.com API
const rawTimeline = [
  {
    "id": "2",
    "title": "Untitled Star Wars film (James Mangold)",
    "type": "movie",
    "era": "Unknown",
    "year": "25,000 BBY",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "59",
    "title": "Star Wars: Young Jedi Adventures - S1E1: The Young Jedi",
    "type": "series",
    "era": "Unknown",
    "year": "c. 233 BBY",
    "releaseDate": "2023-05-04",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "62",
    "title": "Star Wars: Young Jedi Adventures - S1E1: Yoda's Mission",
    "type": "series",
    "era": "Unknown",
    "year": "c. 233 BBY",
    "releaseDate": "2023-05-04",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "64",
    "title": "Star Wars: Young Jedi Adventures - S1E1: Meet the Young Jedi",
    "type": "series",
    "era": "Unknown",
    "year": "c. 233 BBY",
    "releaseDate": "2023-03-27",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "65",
    "title": "Star Wars: Young Jedi Adventures - S1E2: Lys' Creature Caper",
    "type": "series",
    "era": "Unknown",
    "year": "c. 233 BBY",
    "releaseDate": "2023-03-27",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "66",
    "title": "Star Wars: Young Jedi Adventures - S1E4: Nubs and the Flower Fiasco",
    "type": "series",
    "era": "Unknown",
    "year": "c. 233 BBY",
    "releaseDate": "2023-04-03",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "67",
    "title": "Star Wars: Young Jedi Adventures - S1E5: Nash's Firehawk Frenzy",
    "type": "series",
    "era": "Unknown",
    "year": "c. 233 BBY",
    "releaseDate": "2023-04-17",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "68",
    "title": "Star Wars: Young Jedi Adventures - S1E6: Taborr's Pirate Showdown",
    "type": "series",
    "era": "Unknown",
    "year": "c. 233 BBY",
    "releaseDate": "2023-04-24",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "69",
    "title": "Star Wars: Young Jedi Adventures - S1E2: Nash's Race Day",
    "type": "series",
    "era": "Unknown",
    "year": "c. 233 BBY",
    "releaseDate": "2023-05-04",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "71",
    "title": "Star Wars: Young Jedi Adventures - S1E3: Kai's Daring Droid Rescue",
    "type": "series",
    "era": "Unknown",
    "year": "c. 233 BBY",
    "releaseDate": "2023-03-27",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "72",
    "title": "Star Wars: Young Jedi Adventures - S1E2: The Lost Jedi Ship",
    "type": "series",
    "era": "Unknown",
    "year": "c. 233 BBY",
    "releaseDate": "2023-05-04",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "73",
    "title": "Star Wars: Young Jedi Adventures - S1E3: Get Well Nubs",
    "type": "series",
    "era": "Unknown",
    "year": "c. 233 BBY",
    "releaseDate": "2023-05-04",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "75",
    "title": "Star Wars: Young Jedi Adventures - S1E3: The Junk Giant",
    "type": "series",
    "era": "Unknown",
    "year": "c. 233 BBY",
    "releaseDate": "2023-05-04",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "76",
    "title": "Star Wars: Young Jedi Adventures - S1E4: Lys and the Snowy Mountain Rescue",
    "type": "series",
    "era": "Unknown",
    "year": "c. 233 BBY",
    "releaseDate": "2023-05-04",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "78",
    "title": "Star Wars: Young Jedi Adventures - S1E4: Attack of the Training Droids",
    "type": "series",
    "era": "Unknown",
    "year": "c. 233 BBY",
    "releaseDate": "2023-05-04",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "79",
    "title": "Star Wars: Young Jedi Adventures - S1E5: The Jellyfruit Pursuit",
    "type": "series",
    "era": "Unknown",
    "year": "c. 233 BBY",
    "releaseDate": "2023-05-04",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "81",
    "title": "Star Wars: Young Jedi Adventures - S1E5: Creature Safari",
    "type": "series",
    "era": "Unknown",
    "year": "c. 233 BBY",
    "releaseDate": "2023-05-04",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "82",
    "title": "Star Wars: Young Jedi Adventures - S1E6: Squadron (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "c. 233 BBY",
    "releaseDate": "2023-05-04",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "83",
    "title": "Star Wars: Young Jedi Adventures - S1E6: Forest Defenders",
    "type": "series",
    "era": "Unknown",
    "year": "c. 233 BBY",
    "releaseDate": "2023-05-04",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "84",
    "title": "Star Wars: Young Jedi Adventures - S1E7: The Jedi and the Thief",
    "type": "series",
    "era": "Unknown",
    "year": "c. 233 BBY",
    "releaseDate": "2023-05-04",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "86",
    "title": "Star Wars: Young Jedi Adventures - S1E7: The Missing Kibbin",
    "type": "series",
    "era": "Unknown",
    "year": "c. 233 BBY",
    "releaseDate": "2023-05-04",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "89",
    "title": "Star Wars: Young Jedi Adventures - S1E8: The Girl and Her Gargantua",
    "type": "series",
    "era": "Unknown",
    "year": "c. 233 BBY",
    "releaseDate": "2023-08-02",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "90",
    "title": "Star Wars: Young Jedi Adventures - S1E8: The Show Must Go On",
    "type": "series",
    "era": "Unknown",
    "year": "c. 233 BBY",
    "releaseDate": "2023-08-02",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "91",
    "title": "Star Wars: Young Jedi Adventures - S1E9: The Princess and the Jedi",
    "type": "series",
    "era": "Unknown",
    "year": "c. 233 BBY",
    "releaseDate": "2023-08-02",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "92",
    "title": "Star Wars: Young Jedi Adventures - S1E9: Kai's Bad Day",
    "type": "series",
    "era": "Unknown",
    "year": "c. 233 BBY",
    "releaseDate": "2023-08-02",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "93",
    "title": "Star Wars: Young Jedi Adventures - S1E10: Visitor's Day (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "c. 233 BBY",
    "releaseDate": "2023-08-02",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "94",
    "title": "Star Wars: Young Jedi Adventures - S1E10: The Growing Green Danger",
    "type": "series",
    "era": "Unknown",
    "year": "c. 233 BBY",
    "releaseDate": "2023-08-02",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "95",
    "title": "Star Wars: Young Jedi Adventures - S1E11: The Ganguls",
    "type": "series",
    "era": "Unknown",
    "year": "c. 233 BBY",
    "releaseDate": "2023-08-02",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "96",
    "title": "Star Wars: Young Jedi Adventures - S1E11: Bad Eggs",
    "type": "series",
    "era": "Unknown",
    "year": "c. 233 BBY",
    "releaseDate": "2023-08-02",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "97",
    "title": "Star Wars: Young Jedi Adventures - S1E12: Off the Rails (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "c. 233 BBY",
    "releaseDate": "2023-08-02",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "98",
    "title": "Star Wars: Young Jedi Adventures - S1E12: The Thieves of Tharnaka",
    "type": "series",
    "era": "Unknown",
    "year": "c. 233 BBY",
    "releaseDate": "2023-08-02",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "99",
    "title": "Star Wars: Young Jedi Adventures - S1E13: Tree Troubles",
    "type": "series",
    "era": "Unknown",
    "year": "c. 233 BBY",
    "releaseDate": "2023-08-02",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "100",
    "title": "Star Wars: Young Jedi Adventures - S1E13: Big Brother's Bounty",
    "type": "series",
    "era": "Unknown",
    "year": "c. 233 BBY",
    "releaseDate": "2023-08-02",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "101",
    "title": "Star Wars: Young Jedi Adventures - S1E14: Charhound Chase",
    "type": "series",
    "era": "Unknown",
    "year": "c. 233 BBY",
    "releaseDate": "2023-11-08",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "103",
    "title": "Star Wars: Young Jedi Adventures - S1E14: Creature Comforts",
    "type": "series",
    "era": "Unknown",
    "year": "c. 233 BBY",
    "releaseDate": "2023-11-08",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "104",
    "title": "Star Wars: Young Jedi Adventures - S1E15: An Adventure with Yoda",
    "type": "series",
    "era": "Unknown",
    "year": "c. 233 BBY",
    "releaseDate": "2023-11-08",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "105",
    "title": "Star Wars: Young Jedi Adventures - S1E15: The Talon Takeover",
    "type": "series",
    "era": "Unknown",
    "year": "c. 233 BBY",
    "releaseDate": "2023-11-08",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "106",
    "title": "Star Wars: Young Jedi Adventures - S1E16: Mystery of the Opal Cave",
    "type": "series",
    "era": "Unknown",
    "year": "c. 233 BBY",
    "releaseDate": "2023-11-08",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "107",
    "title": "Star Wars: Young Jedi Adventures - S1E16: Clash",
    "type": "series",
    "era": "Unknown",
    "year": "c. 233 BBY",
    "releaseDate": "2023-11-08",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "108",
    "title": "Star Wars: Young Jedi Adventures - S1E17: Stuck in the Muck",
    "type": "series",
    "era": "Unknown",
    "year": "c. 233 BBY",
    "releaseDate": "2023-11-08",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "109",
    "title": "Star Wars: Young Jedi Adventures - S1E17: Junkyard Sleepover",
    "type": "series",
    "era": "Unknown",
    "year": "c. 233 BBY",
    "releaseDate": "2023-11-08",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "110",
    "title": "Star Wars: Young Jedi Adventures - S1E18: The Great Leaf Glide",
    "type": "series",
    "era": "Unknown",
    "year": "c. 233 BBY",
    "releaseDate": "2023-11-08",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "111",
    "title": "Star Wars: Young Jedi Adventures - S1E18: The Harvest Feast",
    "type": "series",
    "era": "Unknown",
    "year": "c. 233 BBY",
    "releaseDate": "2023-11-08",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "113",
    "title": "Star Wars: Young Jedi Adventures - S1E19: Life Day (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "233 BBY",
    "releaseDate": "2023-11-08",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "114",
    "title": "Star Wars: Young Jedi Adventures - S1E19: Raxlo Strikes Back",
    "type": "series",
    "era": "Unknown",
    "year": "233–232 BBY",
    "releaseDate": "2023-11-08",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "121",
    "title": "Star Wars: Young Jedi Adventures - S1E20: Aftershock",
    "type": "series",
    "era": "Unknown",
    "year": "233–232 BBY",
    "releaseDate": "2024-02-14",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "122",
    "title": "Star Wars: Young Jedi Adventures - S1E20: Feather Frenzy",
    "type": "series",
    "era": "Unknown",
    "year": "233–232 BBY",
    "releaseDate": "2024-02-14",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "123",
    "title": "Star Wars: Young Jedi Adventures - S1E21: Best Friends",
    "type": "series",
    "era": "Unknown",
    "year": "233–232 BBY",
    "releaseDate": "2024-02-14",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "124",
    "title": "Star Wars: Young Jedi Adventures - S1E21: Happy Trails, Nubs",
    "type": "series",
    "era": "Unknown",
    "year": "233–232 BBY",
    "releaseDate": "2024-02-14",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "125",
    "title": "Star Wars: Young Jedi Adventures - S1E22: The Tale of Short Spire",
    "type": "series",
    "era": "Unknown",
    "year": "233–232 BBY",
    "releaseDate": "2024-02-14",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "126",
    "title": "Star Wars: Young Jedi Adventures - S1E22: The Team Up",
    "type": "series",
    "era": "Unknown",
    "year": "233–232 BBY",
    "releaseDate": "2024-02-14",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "127",
    "title": "Star Wars: Young Jedi Adventures - S1E23: The Caves of Batuu",
    "type": "series",
    "era": "Unknown",
    "year": "233–232 BBY",
    "releaseDate": "2024-03-01",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "128",
    "title": "Star Wars: Young Jedi Adventures - S1E23: Finders Keepers",
    "type": "series",
    "era": "Unknown",
    "year": "233–232 BBY",
    "releaseDate": "2024-03-01",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "129",
    "title": "Star Wars: Young Jedi Adventures - S1E24: The Starship Show",
    "type": "series",
    "era": "Unknown",
    "year": "233–232 BBY",
    "releaseDate": "2024-03-08",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "130",
    "title": "Star Wars: Young Jedi Adventures - S1E24: Nash's Super Busy Day",
    "type": "series",
    "era": "Unknown",
    "year": "233–232 BBY",
    "releaseDate": "2024-03-08",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "131",
    "title": "Star Wars: Young Jedi Adventures - S1E25: The Prince and the Pirate",
    "type": "series",
    "era": "Unknown",
    "year": "232 BBY",
    "releaseDate": "2024-03-15",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "146",
    "title": "Star Wars: Fun with Nubs - S1E1: Nubs Loses his Lightsaber",
    "type": "series",
    "era": "Unknown",
    "year": "c. 233 BBY–232 BBY",
    "releaseDate": "2024-06-14",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "147",
    "title": "Star Wars: Fun with Nubs - S1E2: RJ Repairs the Firehawk",
    "type": "series",
    "era": "Unknown",
    "year": "c. 233 BBY–232 BBY",
    "releaseDate": "2024-06-14",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "148",
    "title": "Star Wars: Fun with Nubs - S1E3: Nubs Cleans Up",
    "type": "series",
    "era": "Unknown",
    "year": "c. 233 BBY–232 BBY",
    "releaseDate": "2024-06-14",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "149",
    "title": "Star Wars: Fun with Nubs - S1E4: RJ Needs a Tool",
    "type": "series",
    "era": "Unknown",
    "year": "c. 233 BBY–232 BBY",
    "releaseDate": "2024-06-14",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "150",
    "title": "Star Wars: Fun with Nubs - S1E5: Nubs Tries to Meditate",
    "type": "series",
    "era": "Unknown",
    "year": "c. 233 BBY–232 BBY",
    "releaseDate": "2024-06-21",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "151",
    "title": "Star Wars: Fun with Nubs - S1E6: RJ Goes For A Swim",
    "type": "series",
    "era": "Unknown",
    "year": "c. 233 BBY–232 BBY",
    "releaseDate": "2024-06-28",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "152",
    "title": "Star Wars: Fun with Nubs - S1E7: Nubs Gardens",
    "type": "series",
    "era": "Unknown",
    "year": "c. 233 BBY–232 BBY",
    "releaseDate": "2024-07-05",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "153",
    "title": "Star Wars: Fun with Nubs - S1E8: RJ Fixes the Speeder",
    "type": "series",
    "era": "Unknown",
    "year": "c. 233 BBY–232 BBY",
    "releaseDate": "2024-07-12",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "154",
    "title": "Star Wars: Fun with Nubs - S1E9: Nubs and RJ Dance",
    "type": "series",
    "era": "Unknown",
    "year": "c. 233 BBY–232 BBY",
    "releaseDate": "2024-07-19",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "155",
    "title": "Star Wars: Fun with Nubs - S1E10: Nubs Can't Stop Sneezing",
    "type": "series",
    "era": "Unknown",
    "year": "c. 233 BBY–232 BBY",
    "releaseDate": "2024-07-26",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "156",
    "title": "Star Wars: Young Jedi Adventures - S2E1: Heroes and Hotshots",
    "type": "series",
    "era": "Unknown",
    "year": "c. 232 BBY",
    "releaseDate": "2024-08-14",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "157",
    "title": "Star Wars: Young Jedi Adventures - S2E1: Firehawk Rescue",
    "type": "series",
    "era": "Unknown",
    "year": "c. 232 BBY",
    "releaseDate": "2024-08-02",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "158",
    "title": "Star Wars: Young Jedi Adventures - S2E2: Skyring Soaring",
    "type": "series",
    "era": "Unknown",
    "year": "c. 232 BBY",
    "releaseDate": "2024-08-02",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "159",
    "title": "Star Wars: Young Jedi Adventures - S2E3: A Droid's Mission",
    "type": "series",
    "era": "Unknown",
    "year": "c. 232 BBY",
    "releaseDate": "2024-08-02",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "160",
    "title": "Star Wars: Young Jedi Adventures - S2E4: Younglings in the Wild",
    "type": "series",
    "era": "Unknown",
    "year": "c. 232 BBY",
    "releaseDate": "2024-08-02",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "161",
    "title": "Star Wars: Young Jedi Adventures - S2E5: Junkyard Joust",
    "type": "series",
    "era": "Unknown",
    "year": "c. 232 BBY",
    "releaseDate": "2024-08-02",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "162",
    "title": "Star Wars: Young Jedi Adventures - S2E6: Nubs-tacle Course",
    "type": "series",
    "era": "Unknown",
    "year": "c. 232 BBY",
    "releaseDate": "2024-08-02",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "163",
    "title": "Star Wars: Young Jedi Adventures - S2E1: A Jedi or a Pirate",
    "type": "series",
    "era": "Unknown",
    "year": "c. 232 BBY",
    "releaseDate": "2024-08-14",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "164",
    "title": "Star Wars: Young Jedi Adventures - S2E2: The Rustler Roundup",
    "type": "series",
    "era": "Unknown",
    "year": "c. 232 BBY",
    "releaseDate": "2024-08-14",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "165",
    "title": "Star Wars: Young Jedi Adventures - S2E2: A New Discovery",
    "type": "series",
    "era": "Unknown",
    "year": "c. 232 BBY",
    "releaseDate": "2024-08-14",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "166",
    "title": "Star Wars: Young Jedi Adventures - S2E3: A Pirate's Pet",
    "type": "series",
    "era": "Unknown",
    "year": "c. 232 BBY",
    "releaseDate": "2024-08-14",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "167",
    "title": "Star Wars: Young Jedi Adventures - S2E3: The Secret Ship",
    "type": "series",
    "era": "Unknown",
    "year": "c. 232 BBY",
    "releaseDate": "2024-08-14",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "168",
    "title": "Star Wars: Young Jedi Adventures - S2E4: Nubs's Big Mistake",
    "type": "series",
    "era": "Unknown",
    "year": "c. 232 BBY",
    "releaseDate": "2024-08-14",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "169",
    "title": "Star Wars: Young Jedi Adventures - S2E4: The Jedi Rescue",
    "type": "series",
    "era": "Unknown",
    "year": "c. 232 BBY",
    "releaseDate": "2024-08-14",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "170",
    "title": "Star Wars: Young Jedi Adventures - S2E5: The Terror of Tenoo",
    "type": "series",
    "era": "Unknown",
    "year": "c. 232 BBY",
    "releaseDate": "2024-08-14",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "171",
    "title": "Star Wars: Young Jedi Adventures - S2E5: The Prince of Masks",
    "type": "series",
    "era": "Unknown",
    "year": "c. 232 BBY",
    "releaseDate": "2024-08-14",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "172",
    "title": "Star Wars: Young Jedi Adventures - S2E6: Battle for the Band",
    "type": "series",
    "era": "Unknown",
    "year": "c. 232 BBY",
    "releaseDate": "2024-08-14",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "173",
    "title": "Star Wars: Young Jedi Adventures - S2E6: Uprooted",
    "type": "series",
    "era": "Unknown",
    "year": "c. 232 BBY",
    "releaseDate": "2024-08-14",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "174",
    "title": "Star Wars: Young Jedi Adventures - S2E7: Mine and Ours",
    "type": "series",
    "era": "Unknown",
    "year": "c. 232 BBY",
    "releaseDate": "2024-08-14",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "175",
    "title": "Star Wars: Young Jedi Adventures - S2E7: The Andraven Circuit",
    "type": "series",
    "era": "Unknown",
    "year": "c. 232 BBY",
    "releaseDate": "2024-08-14",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "176",
    "title": "Star Wars: Young Jedi Adventures - S2E8: The Great Gomgourd Quest",
    "type": "series",
    "era": "Unknown",
    "year": "c. 232 BBY",
    "releaseDate": "2024-08-14",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "177",
    "title": "Star Wars: Young Jedi Adventures - S2E8: A Sticky Situation",
    "type": "series",
    "era": "Unknown",
    "year": "c. 232 BBY",
    "releaseDate": "2024-08-14",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "178",
    "title": "Star Wars: Young Jedi Adventures - S2E9: The Missing Life Day Feast",
    "type": "series",
    "era": "Unknown",
    "year": "c. 232 BBY",
    "releaseDate": "2024-08-14",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "179",
    "title": "Star Wars: Young Jedi Adventures - S2E9: The Lost Treasure of Tenoo",
    "type": "series",
    "era": "Unknown",
    "year": "c. 232 BBY",
    "releaseDate": "2024-08-14",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "180",
    "title": "Star Wars: Young Jedi Adventures - S2E10: The Wild Aklyrr",
    "type": "series",
    "era": "Unknown",
    "year": "c. 232 BBY",
    "releaseDate": "2024-08-14",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "181",
    "title": "Star Wars: Young Jedi Adventures - S2E10: Lys' Lost Lightsaber",
    "type": "series",
    "era": "Unknown",
    "year": "c. 232 BBY",
    "releaseDate": "2024-08-14",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "182",
    "title": "Star Wars: Young Jedi Adventures - S2E11: Tower Run",
    "type": "series",
    "era": "Unknown",
    "year": "c. 232 BBY",
    "releaseDate": "2024-08-14",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "183",
    "title": "Star Wars: Young Jedi Adventures - S2E11: The Jumping Jetpack",
    "type": "series",
    "era": "Unknown",
    "year": "c. 232 BBY",
    "releaseDate": "2024-08-14",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "184",
    "title": "Star Wars: Fun with Nubs - S1E11: Nubs Gets Stuck",
    "type": "series",
    "era": "Unknown",
    "year": "c. 232 BBY",
    "releaseDate": "2025-02-01",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "185",
    "title": "Star Wars: Fun with Nubs - S1E12: RJ Makes a Friend",
    "type": "series",
    "era": "Unknown",
    "year": "c. 232 BBY",
    "releaseDate": "2025-02-08",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "186",
    "title": "Star Wars: Fun with Nubs - S1E13: Nubs Learns To Paint",
    "type": "series",
    "era": "Unknown",
    "year": "c. 232 BBY",
    "releaseDate": "2025-02-15",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "187",
    "title": "Star Wars: Fun with Nubs - S1E14: RJ Makes Music",
    "type": "series",
    "era": "Unknown",
    "year": "c. 232 BBY",
    "releaseDate": "2025-02-22",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "188",
    "title": "Star Wars: Fun with Nubs - S1E15: Nubs Tries To Sleep",
    "type": "series",
    "era": "Unknown",
    "year": "c. 232 BBY",
    "releaseDate": "2025-03-01",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "189",
    "title": "Star Wars: Fun with Nubs - S1E16: RJ Learns to Fly",
    "type": "series",
    "era": "Unknown",
    "year": "c. 232 BBY",
    "releaseDate": "2025-03-05",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "190",
    "title": "Star Wars: Fun with Nubs - S1E17: Nubs Gets A Tummy Ache",
    "type": "series",
    "era": "Unknown",
    "year": "c. 232 BBY",
    "releaseDate": "2025-03-08",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "191",
    "title": "Star Wars: Fun with Nubs - S1E18: RJ Makes a Speedy Delivery",
    "type": "series",
    "era": "Unknown",
    "year": "c. 232 BBY",
    "releaseDate": "2025-03-12",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "192",
    "title": "Star Wars: Fun with Nubs - S1E19: Nubs Faces a Bug",
    "type": "series",
    "era": "Unknown",
    "year": "c. 232 BBY",
    "releaseDate": "2025-03-15",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "193",
    "title": "Star Wars: Fun with Nubs - S1E20: Nubs and RJ Jam Out",
    "type": "series",
    "era": "Unknown",
    "year": "c. 232 BBY",
    "releaseDate": "2025-03-19",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "196",
    "title": "Star Wars: Young Jedi Adventures - S2E12: Unmasked",
    "type": "series",
    "era": "Unknown",
    "year": "232 BBY",
    "releaseDate": "2025-03-19",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "197",
    "title": "Star Wars: Young Jedi Adventures - S2E13: Just Like Wes",
    "type": "series",
    "era": "Unknown",
    "year": "232 BBY",
    "releaseDate": "2025-03-19",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "198",
    "title": "Star Wars: Young Jedi Adventures - S2E13: Raxlo to the Rescue",
    "type": "series",
    "era": "Unknown",
    "year": "232 BBY",
    "releaseDate": "2025-03-19",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "199",
    "title": "Star Wars: Young Jedi Adventures - S2E14: The Helpful Harvester",
    "type": "series",
    "era": "Unknown",
    "year": "232 BBY",
    "releaseDate": "2025-03-19",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "200",
    "title": "Star Wars: Young Jedi Adventures - S2E14: Little Lost Droid",
    "type": "series",
    "era": "Unknown",
    "year": "232 BBY",
    "releaseDate": "2025-03-19",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "201",
    "title": "Star Wars: Young Jedi Adventures - S2E15: Tenoo's Fastest",
    "type": "series",
    "era": "Unknown",
    "year": "232 BBY",
    "releaseDate": "2025-03-19",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "202",
    "title": "Star Wars: Young Jedi Adventures - S2E15: Home Sweet Temple",
    "type": "series",
    "era": "Unknown",
    "year": "232 BBY",
    "releaseDate": "2025-03-19",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "203",
    "title": "Star Wars: Young Jedi Adventures - S2E16: The Firehawk Feud",
    "type": "series",
    "era": "Unknown",
    "year": "232 BBY",
    "releaseDate": "2025-03-19",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "204",
    "title": "Star Wars: Young Jedi Adventures - S2E16: The Chop Shop Calamity",
    "type": "series",
    "era": "Unknown",
    "year": "232 BBY",
    "releaseDate": "2025-03-19",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "205",
    "title": "Star Wars: Young Jedi Adventures - S2E17: Big Pooba Problems",
    "type": "series",
    "era": "Unknown",
    "year": "232 BBY",
    "releaseDate": "2025-03-19",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "206",
    "title": "Star Wars: Young Jedi Adventures - S2E17: Best Bounty Buddies",
    "type": "series",
    "era": "Unknown",
    "year": "232 BBY",
    "releaseDate": "2025-03-19",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "207",
    "title": "Star Wars: Young Jedi Adventures - S2E18: The Rainy Day Beast",
    "type": "series",
    "era": "Unknown",
    "year": "232 BBY",
    "releaseDate": "2025-03-19",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "208",
    "title": "Star Wars: Young Jedi Adventures - S2E18: Upgraded",
    "type": "series",
    "era": "Unknown",
    "year": "232 BBY",
    "releaseDate": "2025-03-19",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "209",
    "title": "Star Wars: Young Jedi Adventures - S2E19: Journey to the Bracca Badlands",
    "type": "series",
    "era": "Unknown",
    "year": "232 BBY",
    "releaseDate": "2025-03-19",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "210",
    "title": "Star Wars: Young Jedi Adventures - S2E19: The Search for the Missing Dunnels",
    "type": "series",
    "era": "Unknown",
    "year": "232 BBY",
    "releaseDate": "2025-03-19",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "211",
    "title": "Star Wars: Young Jedi Adventures - S2E20: The Spaceport Setback",
    "type": "series",
    "era": "Unknown",
    "year": "232 BBY",
    "releaseDate": "2025-03-19",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "212",
    "title": "Star Wars: Young Jedi Adventures - S2E20: The Mission Mixup",
    "type": "series",
    "era": "Unknown",
    "year": "232 BBY",
    "releaseDate": "2025-03-19",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "216",
    "title": "Star Wars: Young Jedi Adventures - S2E21: Yoda Rescue",
    "type": "series",
    "era": "Unknown",
    "year": "232 BBY",
    "releaseDate": "2025-03-19",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "217",
    "title": "Star Wars: Young Jedi Adventures - S2E21: Fossil Hunt",
    "type": "series",
    "era": "Unknown",
    "year": "c. 232 BBY",
    "releaseDate": "2025-03-19",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "218",
    "title": "Star Wars: Young Jedi Adventures - S2E22: A Mission to Remember",
    "type": "series",
    "era": "Unknown",
    "year": "c. 232 BBY",
    "releaseDate": "2025-03-19",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "219",
    "title": "Star Wars: Young Jedi Adventures - S2E22: The Bounty Hunter and the Thief",
    "type": "series",
    "era": "Unknown",
    "year": "c. 232 BBY",
    "releaseDate": "2025-03-19",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "220",
    "title": "Star Wars: Young Jedi Adventures - S2E23: The Battle of Tenoo",
    "type": "series",
    "era": "Unknown",
    "year": "c. 232 BBY",
    "releaseDate": "2025-03-19",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "221",
    "title": "Star Wars: Young Jedi Adventures - S3E1: The New Droid Friends",
    "type": "series",
    "era": "Unknown",
    "year": "2025-12-08",
    "releaseDate": "2025-12-08",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "222",
    "title": "Star Wars: Young Jedi Adventures - S3E1: Batuu Bonanza",
    "type": "series",
    "era": "Unknown",
    "year": "2025-12-08",
    "releaseDate": "2025-12-08",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "223",
    "title": "Star Wars: Young Jedi Adventures - S3E2: Music Mayhem",
    "type": "series",
    "era": "Unknown",
    "year": "2025-12-08",
    "releaseDate": "2025-12-08",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "224",
    "title": "Star Wars: Young Jedi Adventures - S3E2: The Night Lights of Tenoo",
    "type": "series",
    "era": "Unknown",
    "year": "2025-12-08",
    "releaseDate": "2025-12-08",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "225",
    "title": "Star Wars: Young Jedi Adventures - S3E3: Journey to the Bottom of Naboo",
    "type": "series",
    "era": "Unknown",
    "year": "2025-12-08",
    "releaseDate": "2025-12-08",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "226",
    "title": "Star Wars: Young Jedi Adventures - S3E3: Speeder Surprise",
    "type": "series",
    "era": "Unknown",
    "year": "2025-12-08",
    "releaseDate": "2025-12-08",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "227",
    "title": "Star Wars: Young Jedi Adventures - S3E4: Scrapping for a Song",
    "type": "series",
    "era": "Unknown",
    "year": "2025-12-08",
    "releaseDate": "2025-12-08",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "228",
    "title": "Star Wars: Young Jedi Adventures - S3E4: Bell and the Band",
    "type": "series",
    "era": "Unknown",
    "year": "2025-12-08",
    "releaseDate": "2025-12-08",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "229",
    "title": "Star Wars: Young Jedi Adventures - S3E5: To Do Good",
    "type": "series",
    "era": "Unknown",
    "year": "2025-12-08",
    "releaseDate": "2025-12-08",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "230",
    "title": "Star Wars: Young Jedi Adventures - S3E5: Nubs and the Bumbling Bandits",
    "type": "series",
    "era": "Unknown",
    "year": "2025-12-08",
    "releaseDate": "2025-12-08",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "231",
    "title": "Star Wars: Young Jedi Adventures - S3E6: Apexx Awakens",
    "type": "series",
    "era": "Unknown",
    "year": "2025-12-08",
    "releaseDate": "2025-12-08",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "232",
    "title": "Star Wars: Young Jedi Adventures - S3E6: Harvester Madness",
    "type": "series",
    "era": "Unknown",
    "year": "2025-12-08",
    "releaseDate": "2025-12-08",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "233",
    "title": "Star Wars: Young Jedi Adventures - S3E7: Making Friends",
    "type": "series",
    "era": "Unknown",
    "year": "2025-12-08",
    "releaseDate": "2025-12-08",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "396",
    "title": "Star Wars: The Acolyte - S1E7: Choice",
    "type": "series",
    "era": "Unknown",
    "year": "148 BBY",
    "releaseDate": "2024-07-09",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "397",
    "title": "Star Wars: The Acolyte - S1E3: Destiny (The Acolyte)",
    "type": "series",
    "era": "Unknown",
    "year": "148 BBY",
    "releaseDate": "2024-06-11",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "400",
    "title": "Star Wars: The Acolyte - S1E1: Lost / Found",
    "type": "series",
    "era": "Unknown",
    "year": "132 BBY",
    "releaseDate": "2024-06-04",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "401",
    "title": "Star Wars: The Acolyte - S1E2: Revenge / Justice",
    "type": "series",
    "era": "Unknown",
    "year": "132 BBY",
    "releaseDate": "2024-06-04",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "402",
    "title": "Star Wars: The Acolyte - S1E4: Day (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "132 BBY",
    "releaseDate": "2024-06-18",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "403",
    "title": "Star Wars: The Acolyte - S1E5: Night",
    "type": "series",
    "era": "Unknown",
    "year": "132 BBY",
    "releaseDate": "2024-06-25",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "404",
    "title": "Star Wars: The Acolyte - S1E6: Teach / Corrupt",
    "type": "series",
    "era": "Unknown",
    "year": "132 BBY",
    "releaseDate": "2024-07-02",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "405",
    "title": "Star Wars: The Acolyte - S1E8: The Acolyte (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "132 BBY",
    "releaseDate": "2024-07-16",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "406",
    "title": "Star Wars: Tales of the Jedi (television series) - S1E2: Justice (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "Between c. 68–58 BBY",
    "releaseDate": "2022-10-26",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "407",
    "title": "Star Wars: Tales of the Underworld - S1E4: The Good Life",
    "type": "series",
    "era": "Unknown",
    "year": "Between c. 62 BBY‐33 BBY",
    "releaseDate": "2025-05-04",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "408",
    "title": "Star Wars: Tales of the Jedi (television series) - S1E3: Choices",
    "type": "series",
    "era": "Unknown",
    "year": "Between c. 50 BBY and 48 BBY",
    "releaseDate": "2022-10-26",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "418",
    "title": "Star Wars: Tales of the Underworld - S1E5: A Good Turn",
    "type": "series",
    "era": "Unknown",
    "year": "2025-05-04",
    "releaseDate": "2025-05-04",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "440",
    "title": "Star Wars: Tales of the Jedi (television series) - S1E1: Life and Death",
    "type": "series",
    "era": "Unknown",
    "year": "36–35 BBY",
    "releaseDate": "2022-05-28",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "443",
    "title": "Star Wars: Tales of the Underworld - S1E6: One Good Deed",
    "type": "series",
    "era": "Unknown",
    "year": "2025-05-04",
    "releaseDate": "2025-05-04",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "459",
    "title": "Star Wars: Episode I The Phantom Menace",
    "type": "movie",
    "era": "Unknown",
    "year": "32 BBY",
    "releaseDate": "1999-05-19",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "481",
    "title": "Star Wars Galaxy of Adventures - S1E34: Jedi vs. Sith - The Skywalker Saga",
    "type": "series",
    "era": "Unknown",
    "year": "32 BBY –34 ABY",
    "releaseDate": "2019-06-28",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "482",
    "title": "Star Wars Galaxy of Adventures - S1E43: Star Wars Droids (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "32 BBY –35 ABY",
    "releaseDate": "2020-04-10",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "487",
    "title": "Star Wars: Tales of the Jedi (television series) - S1E4: The Sith Lord",
    "type": "series",
    "era": "Unknown",
    "year": "32 BBY",
    "releaseDate": "2022-10-26",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "490",
    "title": "Star Wars Forces of Destiny - S2E10: Monster Misunderstanding",
    "type": "series",
    "era": "Unknown",
    "year": "2018-05-04",
    "releaseDate": "2018-05-04",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "508",
    "title": "Star Wars: Jedi Temple Challenge - S1E1: Episode 1 (Star Wars: Jedi Temple Challenge)",
    "type": "series",
    "era": "Unknown",
    "year": "2020-06-10",
    "releaseDate": "2020-06-10",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "509",
    "title": "Star Wars: Jedi Temple Challenge - S1E2: Episode 2 (Star Wars: Jedi Temple Challenge)",
    "type": "series",
    "era": "Unknown",
    "year": "2020-06-10",
    "releaseDate": "2020-06-10",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "510",
    "title": "Star Wars: Jedi Temple Challenge - S1E3: Episode 3 (Star Wars: Jedi Temple Challenge)",
    "type": "series",
    "era": "Unknown",
    "year": "2020-06-17",
    "releaseDate": "2020-06-17",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "511",
    "title": "Star Wars: Jedi Temple Challenge - S1E4: Episode 4 (Star Wars: Jedi Temple Challenge)",
    "type": "series",
    "era": "Unknown",
    "year": "2020-06-24",
    "releaseDate": "2020-06-24",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "512",
    "title": "Star Wars: Jedi Temple Challenge - S1E5: Episode 5 (Star Wars: Jedi Temple Challenge)",
    "type": "series",
    "era": "Unknown",
    "year": "2020-07-01",
    "releaseDate": "2020-07-01",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "513",
    "title": "Star Wars: Jedi Temple Challenge - S1E6: Episode 6 (Star Wars: Jedi Temple Challenge)",
    "type": "series",
    "era": "Unknown",
    "year": "2020-07-08",
    "releaseDate": "2020-07-08",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "514",
    "title": "Star Wars: Jedi Temple Challenge - S1E7: Episode 7 (Star Wars: Jedi Temple Challenge)",
    "type": "series",
    "era": "Unknown",
    "year": "2020-07-15",
    "releaseDate": "2020-07-15",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "515",
    "title": "Star Wars: Jedi Temple Challenge - S1E8: Episode 8 (Star Wars: Jedi Temple Challenge)",
    "type": "series",
    "era": "Unknown",
    "year": "2020-07-22",
    "releaseDate": "2020-07-22",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "516",
    "title": "Star Wars: Jedi Temple Challenge - S1E9: Episode 9 (Star Wars: Jedi Temple Challenge)",
    "type": "series",
    "era": "Unknown",
    "year": "2020-07-29",
    "releaseDate": "2020-07-29",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "517",
    "title": "Star Wars: Jedi Temple Challenge - S1E10: Episode 10 (Star Wars: Jedi Temple Challenge)",
    "type": "series",
    "era": "Unknown",
    "year": "2020-08-05",
    "releaseDate": "2020-08-05",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "520",
    "title": "Star Wars: Episode II Attack of the Clones",
    "type": "movie",
    "era": "Unknown",
    "year": "22 BBY",
    "releaseDate": "2002-05-16",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "538",
    "title": "Star Wars Galaxy of Adventures - S1E13: Yoda vs Count Dooku – Size Matters Not",
    "type": "series",
    "era": "Unknown",
    "year": "22 BBY",
    "releaseDate": "2019-01-30",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "565",
    "title": "Star Wars: The Clone Wars - S2E16: Cat and Mouse",
    "type": "series",
    "era": "Unknown",
    "year": "22 BBY",
    "releaseDate": "2010-03-20",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "566",
    "title": "Star Wars: The Clone Wars - S1E16: The Hidden Enemy",
    "type": "series",
    "era": "Unknown",
    "year": "22 BBY",
    "releaseDate": "2009-02-06",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "567",
    "title": "Star Wars: The Clone Wars (film)",
    "type": "movie",
    "era": "Unknown",
    "year": "22 BBY",
    "releaseDate": "2008-08-14",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "568",
    "title": "Star Wars: The Clone Wars - S3E1: Clone Cadets",
    "type": "series",
    "era": "Unknown",
    "year": "22 BBY",
    "releaseDate": "2010-09-17",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "569",
    "title": "Star Wars: Tales of the Jedi (television series) - S1E5: Practice Makes Perfect (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "2022-10-26",
    "releaseDate": "2022-10-26",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "570",
    "title": "Star Wars: The Clone Wars - S3E3: Supply Lines",
    "type": "series",
    "era": "Unknown",
    "year": "22 BBY",
    "releaseDate": "2010-09-24",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "571",
    "title": "Star Wars: The Clone Wars - S1E1: Ambush",
    "type": "series",
    "era": "Unknown",
    "year": "22 BBY",
    "releaseDate": "2008-10-03",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "573",
    "title": "Star Wars: The Clone Wars - S1E2: Rising Malevolence",
    "type": "series",
    "era": "Unknown",
    "year": "22 BBY",
    "releaseDate": "2008-10-03",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "574",
    "title": "Star Wars: The Clone Wars - S1E3: Shadow of Malevolence",
    "type": "series",
    "era": "Unknown",
    "year": "22 BBY",
    "releaseDate": "2008-10-10",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "575",
    "title": "Star Wars: The Clone Wars - S1E4: Destroy Malevolence",
    "type": "series",
    "era": "Unknown",
    "year": "22 BBY",
    "releaseDate": "2008-10-17",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "576",
    "title": "Star Wars: The Clone Wars - S1E5: Rookies (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "22 BBY",
    "releaseDate": "2008-10-24",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "577",
    "title": "Star Wars: The Clone Wars - S1E6: Downfall of a Droid",
    "type": "series",
    "era": "Unknown",
    "year": "22 BBY",
    "releaseDate": "2008-11-07",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "578",
    "title": "Star Wars: The Clone Wars - S1E7: Duel of the Droids",
    "type": "series",
    "era": "Unknown",
    "year": "22 BBY",
    "releaseDate": "2008-11-14",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "579",
    "title": "Star Wars: The Clone Wars - S1E8: Bombad Jedi",
    "type": "series",
    "era": "Unknown",
    "year": "22 BBY",
    "releaseDate": "2008-11-21",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "580",
    "title": "Star Wars: The Clone Wars - S1E9: Cloak of Darkness",
    "type": "series",
    "era": "Unknown",
    "year": "21 BBY",
    "releaseDate": "2008-12-05",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "581",
    "title": "Star Wars: The Clone Wars - S1E10: Lair of Grievous",
    "type": "series",
    "era": "Unknown",
    "year": "21 BBY",
    "releaseDate": "2008-12-12",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "582",
    "title": "Star Wars: The Clone Wars - S1E11: Dooku Captured",
    "type": "series",
    "era": "Unknown",
    "year": "21 BBY",
    "releaseDate": "2009-01-02",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "583",
    "title": "Star Wars: The Clone Wars - S1E12: The Gungan General",
    "type": "series",
    "era": "Unknown",
    "year": "21 BBY",
    "releaseDate": "2009-01-09",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "588",
    "title": "Star Wars: The Clone Wars - S1E13: Jedi Crash",
    "type": "series",
    "era": "Unknown",
    "year": "21 BBY",
    "releaseDate": "2009-01-16",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "589",
    "title": "Star Wars: The Clone Wars - S1E14: Defenders of Peace",
    "type": "series",
    "era": "Unknown",
    "year": "21 BBY",
    "releaseDate": "2009-01-23",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "590",
    "title": "Star Wars: The Clone Wars - S1E15: Trespass",
    "type": "series",
    "era": "Unknown",
    "year": "21 BBY",
    "releaseDate": "2009-01-30",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "591",
    "title": "Star Wars: The Clone Wars - S1E17: Blue Shadow Virus (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "21 BBY",
    "releaseDate": "2009-02-13",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "592",
    "title": "Star Wars: The Clone Wars - S1E18: Mystery of a Thousand Moons",
    "type": "series",
    "era": "Unknown",
    "year": "21 BBY",
    "releaseDate": "2009-02-13",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "593",
    "title": "Star Wars: The Clone Wars - S1E19: Storm Over Ryloth",
    "type": "series",
    "era": "Unknown",
    "year": "21 BBY",
    "releaseDate": "2009-02-27",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "594",
    "title": "Star Wars: The Clone Wars - S1E20: Innocents of Ryloth",
    "type": "series",
    "era": "Unknown",
    "year": "21 BBY",
    "releaseDate": "2009-03-06",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "595",
    "title": "Star Wars: The Clone Wars - S1E21: Liberty on Ryloth",
    "type": "series",
    "era": "Unknown",
    "year": "21 BBY",
    "releaseDate": "2009-03-13",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "596",
    "title": "Star Wars: The Clone Wars - S2E1: Holocron Heist",
    "type": "series",
    "era": "Unknown",
    "year": "21 BBY",
    "releaseDate": "2009-10-02",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "597",
    "title": "Star Wars: The Clone Wars - S2E2: Cargo of Doom",
    "type": "series",
    "era": "Unknown",
    "year": "21 BBY",
    "releaseDate": "2009-10-02",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "598",
    "title": "Star Wars: The Clone Wars - S2E3: Children of the Force",
    "type": "series",
    "era": "Unknown",
    "year": "21 BBY",
    "releaseDate": "2009-10-09",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "599",
    "title": "Star Wars: The Clone Wars - S2E17: Bounty Hunters (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "21 BBY",
    "releaseDate": "2010-03-27",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "600",
    "title": "Star Wars: The Clone Wars - S2E18: The Zillo Beast",
    "type": "series",
    "era": "Unknown",
    "year": "21 BBY",
    "releaseDate": "2010-04-03",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "601",
    "title": "Star Wars: The Clone Wars - S2E19: The Zillo Beast Strikes Back",
    "type": "series",
    "era": "Unknown",
    "year": "21 BBY",
    "releaseDate": "2010-04-10",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "602",
    "title": "Star Wars: The Clone Wars - S2E4: Senate Spy",
    "type": "series",
    "era": "Unknown",
    "year": "21 BBY",
    "releaseDate": "2009-10-16",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "604",
    "title": "Star Wars: The Clone Wars - S2E5: Landing at Point Rain",
    "type": "series",
    "era": "Unknown",
    "year": "21 BBY",
    "releaseDate": "2009-11-04",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "605",
    "title": "Star Wars: The Clone Wars - S2E6: Weapons Factory",
    "type": "series",
    "era": "Unknown",
    "year": "21 BBY",
    "releaseDate": "2009-11-13",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "606",
    "title": "Star Wars: The Clone Wars - S2E7: Legacy of Terror",
    "type": "series",
    "era": "Unknown",
    "year": "21 BBY",
    "releaseDate": "2009-11-20",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "607",
    "title": "Star Wars: The Clone Wars - S2E8: Brain Invaders",
    "type": "series",
    "era": "Unknown",
    "year": "21 BBY",
    "releaseDate": "2009-12-04",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "609",
    "title": "Star Wars: The Clone Wars - S2E9: Grievous Intrigue",
    "type": "series",
    "era": "Unknown",
    "year": "21 BBY",
    "releaseDate": "2010-01-01",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "610",
    "title": "Star Wars: The Clone Wars - S2E10: The Deserter",
    "type": "series",
    "era": "Unknown",
    "year": "21 BBY",
    "releaseDate": "2010-01-01",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "611",
    "title": "Star Wars: The Clone Wars - S2E11: Lightsaber Lost",
    "type": "series",
    "era": "Unknown",
    "year": "21 BBY",
    "releaseDate": "2010-01-22",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "612",
    "title": "Star Wars: The Clone Wars - S2E12: The Mandalore Plot",
    "type": "series",
    "era": "Unknown",
    "year": "21 BBY",
    "releaseDate": "2010-01-29",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "613",
    "title": "Star Wars: The Clone Wars - S2E13: Voyage of Temptation",
    "type": "series",
    "era": "Unknown",
    "year": "21 BBY",
    "releaseDate": "2010-02-05",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "614",
    "title": "Star Wars: The Clone Wars - S2E14: Duchess of Mandalore",
    "type": "series",
    "era": "Unknown",
    "year": "21 BBY",
    "releaseDate": "2010-02-12",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "616",
    "title": "Star Wars: The Clone Wars - S2E20: Death Trap",
    "type": "series",
    "era": "Unknown",
    "year": "21 BBY",
    "releaseDate": "2010-04-17",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "617",
    "title": "Star Wars: The Clone Wars - S2E21: R2 Come Home",
    "type": "series",
    "era": "Unknown",
    "year": "21 BBY",
    "releaseDate": "2010-04-24",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "618",
    "title": "Star Wars: The Clone Wars - S2E22: Lethal Trackdown",
    "type": "series",
    "era": "Unknown",
    "year": "21 BBY",
    "releaseDate": "2010-04-30",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "619",
    "title": "Star Wars: The Clone Wars - S3E5: Corruption (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "21 BBY",
    "releaseDate": "2010-10-08",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "620",
    "title": "Star Wars: The Clone Wars - S3E6: The Academy",
    "type": "series",
    "era": "Unknown",
    "year": "21 BBY",
    "releaseDate": "2010-10-15",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "621",
    "title": "Star Wars: The Clone Wars - S3E7: Assassin (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "21 BBY",
    "releaseDate": "2010-10-22",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "622",
    "title": "Star Wars: The Clone Wars - S3E2: ARC Troopers (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "21 BBY",
    "releaseDate": "2010-09-17",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "633",
    "title": "Star Wars: The Clone Wars - S3E4: Sphere of Influence",
    "type": "series",
    "era": "Unknown",
    "year": "21 BBY",
    "releaseDate": "2010-10-01",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "634",
    "title": "Star Wars: The Clone Wars - S3E8: Evil Plans",
    "type": "series",
    "era": "Unknown",
    "year": "21 BBY",
    "releaseDate": "2010-11-05",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "635",
    "title": "Star Wars: The Clone Wars - S1E22: Hostage Crisis",
    "type": "series",
    "era": "Unknown",
    "year": "21 BBY",
    "releaseDate": "2009-03-20",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "640",
    "title": "Star Wars: The Clone Wars - S3E9: Hunt for Ziro",
    "type": "series",
    "era": "Unknown",
    "year": "21 BBY",
    "releaseDate": "2010-11-12",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "641",
    "title": "Star Wars Forces of Destiny - S1E11: Teach You, I Will",
    "type": "series",
    "era": "Unknown",
    "year": "c. 21 BBY",
    "releaseDate": "2017-10-01",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "642",
    "title": "Star Wars Forces of Destiny - S2E2: Unexpected Company",
    "type": "series",
    "era": "Unknown",
    "year": "21 BBY",
    "releaseDate": "2018-03-19",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "643",
    "title": "Star Wars Forces of Destiny - S1E6: The Imposter Inside",
    "type": "series",
    "era": "Unknown",
    "year": "21 BBY",
    "releaseDate": "2017-07-08",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "648",
    "title": "Star Wars Forces of Destiny - S1E12: The Starfighter Stunt",
    "type": "series",
    "era": "Unknown",
    "year": "21 BBY",
    "releaseDate": "2017-10-01",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "649",
    "title": "Star Wars Forces of Destiny - S1E4: The Padawan Path",
    "type": "series",
    "era": "Unknown",
    "year": "21 BBY",
    "releaseDate": "2017-07-06",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "651",
    "title": "Star Wars: The Clone Wars - S3E10: Heroes on Both Sides",
    "type": "series",
    "era": "Unknown",
    "year": "21 BBY",
    "releaseDate": "2010-11-19",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "652",
    "title": "Star Wars: The Clone Wars - S3E11: Pursuit of Peace",
    "type": "series",
    "era": "Unknown",
    "year": "21 BBY",
    "releaseDate": "2010-12-03",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "654",
    "title": "Star Wars: The Clone Wars - S2E15: Senate Murders",
    "type": "series",
    "era": "Unknown",
    "year": "21 BBY",
    "releaseDate": "2010-03-12",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "655",
    "title": "Star Wars: The Clone Wars - S3E12: Nightsisters (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "20 BBY",
    "releaseDate": "2011-01-07",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "656",
    "title": "Star Wars: The Clone Wars - S3E13: Monster",
    "type": "series",
    "era": "Unknown",
    "year": "20 BBY",
    "releaseDate": "2011-01-14",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "657",
    "title": "Star Wars: The Clone Wars - S3E14: Witches of the Mist",
    "type": "series",
    "era": "Unknown",
    "year": "20 BBY",
    "releaseDate": "2011-01-21",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "658",
    "title": "Star Wars: The Clone Wars - S3E15: Overlords",
    "type": "series",
    "era": "Unknown",
    "year": "20 BBY",
    "releaseDate": "2011-01-28",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "659",
    "title": "Star Wars: The Clone Wars - S3E16: Altar of Mortis (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "20 BBY",
    "releaseDate": "2011-02-04",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "660",
    "title": "Star Wars: The Clone Wars - S3E17: Ghosts of Mortis",
    "type": "series",
    "era": "Unknown",
    "year": "20 BBY",
    "releaseDate": "2011-02-11",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "661",
    "title": "Star Wars: The Clone Wars - S3E18: The Citadel (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "20 BBY",
    "releaseDate": "2011-02-18",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "662",
    "title": "Star Wars: The Clone Wars - S3E19: Counterattack",
    "type": "series",
    "era": "Unknown",
    "year": "20 BBY",
    "releaseDate": "2011-03-04",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "663",
    "title": "Star Wars: The Clone Wars - S3E20: Citadel Rescue",
    "type": "series",
    "era": "Unknown",
    "year": "20 BBY",
    "releaseDate": "2011-03-11",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "664",
    "title": "Star Wars: The Clone Wars - S3E21: Padawan Lost",
    "type": "series",
    "era": "Unknown",
    "year": "20 BBY",
    "releaseDate": "2011-03-19",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "665",
    "title": "Star Wars: The Clone Wars - S3E22: Wookiee Hunt",
    "type": "series",
    "era": "Unknown",
    "year": "20 BBY",
    "releaseDate": "2011-03-26",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "666",
    "title": "Star Wars: The Clone Wars - S4E1: Water War",
    "type": "series",
    "era": "Unknown",
    "year": "20 BBY",
    "releaseDate": "2011-09-16",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "667",
    "title": "Star Wars: The Clone Wars - S4E2: Gungan Attack",
    "type": "series",
    "era": "Unknown",
    "year": "20 BBY",
    "releaseDate": "2011-09-16",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "668",
    "title": "Star Wars: The Clone Wars - S4E3: Prisoners",
    "type": "series",
    "era": "Unknown",
    "year": "20 BBY",
    "releaseDate": "2011-09-23",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "671",
    "title": "Star Wars: The Clone Wars - S4E4: Shadow Warrior",
    "type": "series",
    "era": "Unknown",
    "year": "20 BBY",
    "releaseDate": "2011-09-30",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "672",
    "title": "Star Wars: The Clone Wars - S4E5: Mercy Mission (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "20 BBY",
    "releaseDate": "2011-10-07",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "673",
    "title": "Star Wars: The Clone Wars - S4E6: Nomad Droids",
    "type": "series",
    "era": "Unknown",
    "year": "20 BBY",
    "releaseDate": "2011-10-14",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "674",
    "title": "Star Wars: The Clone Wars - S4E7: Darkness on Umbara",
    "type": "series",
    "era": "Unknown",
    "year": "20 BBY",
    "releaseDate": "2011-10-28",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "675",
    "title": "Star Wars: The Clone Wars - S4E8: The General (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "20 BBY",
    "releaseDate": "2011-11-04",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "676",
    "title": "Star Wars: The Clone Wars - S4E9: Plan of Dissent",
    "type": "series",
    "era": "Unknown",
    "year": "20 BBY",
    "releaseDate": "2011-11-11",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "677",
    "title": "Star Wars: The Clone Wars - S4E10: Carnage of Krell",
    "type": "series",
    "era": "Unknown",
    "year": "20 BBY",
    "releaseDate": "2011-11-18",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "683",
    "title": "Star Wars: The Clone Wars - S4E11: Kidnapped",
    "type": "series",
    "era": "Unknown",
    "year": "20 BBY",
    "releaseDate": "2011-11-25",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "684",
    "title": "Star Wars: The Clone Wars - S4E12: Slaves of the Republic",
    "type": "series",
    "era": "Unknown",
    "year": "20 BBY",
    "releaseDate": "2011-12-02",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "685",
    "title": "Star Wars: The Clone Wars - S4E13: Escape from Kadavo",
    "type": "series",
    "era": "Unknown",
    "year": "20 BBY",
    "releaseDate": "2012-01-06",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "686",
    "title": "Star Wars: The Clone Wars - S4E14: A Friend in Need",
    "type": "series",
    "era": "Unknown",
    "year": "20 BBY",
    "releaseDate": "2012-01-13",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "687",
    "title": "Star Wars: The Clone Wars - S4E15: Deception",
    "type": "series",
    "era": "Unknown",
    "year": "20 BBY",
    "releaseDate": "2012-01-20",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "688",
    "title": "Star Wars: The Clone Wars - S4E16: Friends and Enemies",
    "type": "series",
    "era": "Unknown",
    "year": "20 BBY",
    "releaseDate": "2012-01-27",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "689",
    "title": "Star Wars: The Clone Wars - S4E17: The Box",
    "type": "series",
    "era": "Unknown",
    "year": "20 BBY",
    "releaseDate": "2012-02-03",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "690",
    "title": "Star Wars: The Clone Wars - S4E18: Crisis on Naboo",
    "type": "series",
    "era": "Unknown",
    "year": "20 BBY",
    "releaseDate": "2012-02-10",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "692",
    "title": "Star Wars: The Clone Wars - S4E19: Massacre",
    "type": "series",
    "era": "Unknown",
    "year": "20 BBY",
    "releaseDate": "2012-02-24",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "693",
    "title": "Star Wars: Tales of the Empire - S1E1: The Path of Fear",
    "type": "series",
    "era": "Unknown",
    "year": "20 BBY",
    "releaseDate": "2024-05-04",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "694",
    "title": "Star Wars: The Clone Wars - S4E20: Bounty (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "20 BBY",
    "releaseDate": "2012-03-02",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "696",
    "title": "Star Wars: The Clone Wars - S4E21: Brothers (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "20 BBY",
    "releaseDate": "2012-03-09",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "697",
    "title": "Star Wars: The Clone Wars - S4E22: Revenge (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "20 BBY",
    "releaseDate": "2012-03-14",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "699",
    "title": "Star Wars: The Clone Wars - S5E2: A War on Two Fronts",
    "type": "series",
    "era": "Unknown",
    "year": "20 BBY",
    "releaseDate": "2012-09-21",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "700",
    "title": "Star Wars: The Clone Wars - S5E3: Front Runners",
    "type": "series",
    "era": "Unknown",
    "year": "20 BBY",
    "releaseDate": "2012-10-12",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "701",
    "title": "Star Wars: The Clone Wars - S5E4: The Soft War",
    "type": "series",
    "era": "Unknown",
    "year": "20 BBY",
    "releaseDate": "2012-10-19",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "702",
    "title": "Star Wars: The Clone Wars - S5E5: Tipping Points",
    "type": "series",
    "era": "Unknown",
    "year": "20 BBY",
    "releaseDate": "2012-10-27",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "703",
    "title": "Star Wars: The Clone Wars - S5E6: The Gathering (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "20 BBY",
    "releaseDate": "2012-11-02",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "704",
    "title": "Star Wars: The Clone Wars - S5E7: A Test of Strength",
    "type": "series",
    "era": "Unknown",
    "year": "20 BBY",
    "releaseDate": "2012-11-09",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "705",
    "title": "Star Wars: The Clone Wars - S5E8: Bound for Rescue",
    "type": "series",
    "era": "Unknown",
    "year": "20 BBY",
    "releaseDate": "2012-11-16",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "706",
    "title": "Star Wars: The Clone Wars - S5E9: A Necessary Bond",
    "type": "series",
    "era": "Unknown",
    "year": "20 BBY",
    "releaseDate": "2012-11-23",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "708",
    "title": "Star Wars: The Clone Wars - S5E10: Secret Weapons",
    "type": "series",
    "era": "Unknown",
    "year": "20 BBY",
    "releaseDate": "2012-11-30",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "709",
    "title": "Star Wars: The Clone Wars - S5E11: A Sunny Day in the Void",
    "type": "series",
    "era": "Unknown",
    "year": "20 BBY",
    "releaseDate": "2012-12-07",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "710",
    "title": "Star Wars: The Clone Wars - S5E12: Missing in Action",
    "type": "series",
    "era": "Unknown",
    "year": "20 BBY",
    "releaseDate": "2013-01-04",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "711",
    "title": "Star Wars: The Clone Wars - S5E13: Point of No Return (The Clone Wars)",
    "type": "series",
    "era": "Unknown",
    "year": "20 BBY",
    "releaseDate": "2013-01-11",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "714",
    "title": "Star Wars: The Clone Wars - S5E1: Revival (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "19 BBY",
    "releaseDate": "2012-08-24",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "715",
    "title": "Star Wars: The Clone Wars - S5E14: Eminence (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "19 BBY",
    "releaseDate": "2013-01-18",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "717",
    "title": "Star Wars: The Clone Wars - S5E15: Shades of Reason",
    "type": "series",
    "era": "Unknown",
    "year": "19 BBY",
    "releaseDate": "2013-01-25",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "718",
    "title": "Star Wars: The Clone Wars - S5E16: The Lawless",
    "type": "series",
    "era": "Unknown",
    "year": "19 BBY",
    "releaseDate": "2013-02-01",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "720",
    "title": "Star Wars: The Clone Wars - S5E17: Sabotage (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "19 BBY",
    "releaseDate": "2013-02-08",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "721",
    "title": "Star Wars: The Clone Wars - S5E18: The Jedi Who Knew Too Much",
    "type": "series",
    "era": "Unknown",
    "year": "19 BBY",
    "releaseDate": "2013-02-15",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "723",
    "title": "Star Wars: The Clone Wars - S5E19: To Catch a Jedi",
    "type": "series",
    "era": "Unknown",
    "year": "19 BBY",
    "releaseDate": "2013-02-22",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "724",
    "title": "Star Wars: The Clone Wars - S5E20: The Wrong Jedi",
    "type": "series",
    "era": "Unknown",
    "year": "19 BBY",
    "releaseDate": "2013-03-01",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "731",
    "title": "Star Wars: The Clone Wars - S6E1: The Unknown",
    "type": "series",
    "era": "Unknown",
    "year": "19 BBY",
    "releaseDate": "2014-02-15",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "732",
    "title": "Star Wars: The Clone Wars - S6E2: Conspiracy",
    "type": "series",
    "era": "Unknown",
    "year": "19 BBY",
    "releaseDate": "2014-02-15",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "733",
    "title": "Star Wars: The Clone Wars - S6E3: Fugitive",
    "type": "series",
    "era": "Unknown",
    "year": "19 BBY",
    "releaseDate": "2014-02-15",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "734",
    "title": "Star Wars: The Clone Wars - S6E4: Orders (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "19 BBY",
    "releaseDate": "2014-02-15",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "735",
    "title": "Star Wars: The Clone Wars - S6E5: An Old Friend",
    "type": "series",
    "era": "Unknown",
    "year": "19 BBY",
    "releaseDate": "2014-02-22",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "736",
    "title": "Star Wars: The Clone Wars - S6E6: The Rise of Clovis",
    "type": "series",
    "era": "Unknown",
    "year": "19 BBY",
    "releaseDate": "2014-02-22",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "737",
    "title": "Star Wars: The Clone Wars - S6E7: Crisis at the Heart",
    "type": "series",
    "era": "Unknown",
    "year": "19 BBY",
    "releaseDate": "2014-02-22",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "738",
    "title": "Star Wars: The Clone Wars - S6E8: The Disappeared, Part I",
    "type": "series",
    "era": "Unknown",
    "year": "19 BBY",
    "releaseDate": "2014-03-01",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "739",
    "title": "Star Wars: The Clone Wars - S6E9: The Disappeared, Part II",
    "type": "series",
    "era": "Unknown",
    "year": "19 BBY",
    "releaseDate": "2014-03-01",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "740",
    "title": "Star Wars: The Clone Wars - S6E10: The Lost One",
    "type": "series",
    "era": "Unknown",
    "year": "19 BBY",
    "releaseDate": "2014-03-01",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "742",
    "title": "Star Wars: The Clone Wars - S6E11: Voices",
    "type": "series",
    "era": "Unknown",
    "year": "19 BBY",
    "releaseDate": "2014-03-01",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "743",
    "title": "Star Wars: The Clone Wars - S6E12: Destiny (The Clone Wars)",
    "type": "series",
    "era": "Unknown",
    "year": "19 BBY",
    "releaseDate": "2014-03-07",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "744",
    "title": "Star Wars: The Clone Wars - S6E13: Sacrifice (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "19 BBY",
    "releaseDate": "2014-03-07",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "745",
    "title": "Star Wars: The Clone Wars - S1E1: A Death on Utapau",
    "type": "series",
    "era": "Unknown",
    "year": "19 BBY",
    "releaseDate": "2014-09-25",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "746",
    "title": "Star Wars: The Clone Wars - S1E1: In Search of the Crystal",
    "type": "series",
    "era": "Unknown",
    "year": "19 BBY",
    "releaseDate": "2014-09-25",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "747",
    "title": "Star Wars: The Clone Wars - S1E1: Crystal Crisis",
    "type": "series",
    "era": "Unknown",
    "year": "19 BBY",
    "releaseDate": "2014-09-25",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "748",
    "title": "Star Wars: The Clone Wars - S1E1: The Big Bang",
    "type": "series",
    "era": "Unknown",
    "year": "19 BBY",
    "releaseDate": "2014-09-25",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "756",
    "title": "Star Wars: The Clone Wars - S7E5: Gone with a Trace",
    "type": "series",
    "era": "Unknown",
    "year": "19 BBY",
    "releaseDate": "2020-03-20",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "757",
    "title": "Star Wars: The Clone Wars - S7E6: Deal No Deal",
    "type": "series",
    "era": "Unknown",
    "year": "19 BBY",
    "releaseDate": "2020-03-27",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "758",
    "title": "Star Wars: The Clone Wars - S7E7: Dangerous Debt",
    "type": "series",
    "era": "Unknown",
    "year": "19 BBY",
    "releaseDate": "2020-04-03",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "759",
    "title": "Star Wars: The Clone Wars - S7E8: Together Again",
    "type": "series",
    "era": "Unknown",
    "year": "19 BBY",
    "releaseDate": "2020-04-10",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "760",
    "title": "Star Wars: The Clone Wars - S7E1: The Bad Batch (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "19 BBY",
    "releaseDate": "2020-02-21",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "762",
    "title": "Star Wars: The Clone Wars - S7E2: A Distant Echo",
    "type": "series",
    "era": "Unknown",
    "year": "19 BBY",
    "releaseDate": "2020-02-28",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "763",
    "title": "Star Wars: The Clone Wars - S7E3: On the Wings of Keeradaks",
    "type": "series",
    "era": "Unknown",
    "year": "19 BBY",
    "releaseDate": "2020-03-06",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "764",
    "title": "Star Wars: The Clone Wars - S7E4: Unfinished Business (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "19 BBY",
    "releaseDate": "2020-03-13",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "766",
    "title": "Star Wars: The Clone Wars - S7E9: Old Friends Not Forgotten",
    "type": "series",
    "era": "Unknown",
    "year": "19 BBY",
    "releaseDate": "2020-04-17",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "768",
    "title": "Star Wars: Episode III Revenge of the Sith",
    "type": "movie",
    "era": "Unknown",
    "year": "19 BBY",
    "releaseDate": "2005-05-19",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "776",
    "title": "Star Wars: The Clone Wars - S7E10: The Phantom Apprentice",
    "type": "series",
    "era": "Unknown",
    "year": "19 BBY",
    "releaseDate": "2020-04-24",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "777",
    "title": "Star Wars: The Clone Wars - S7E11: Shattered",
    "type": "series",
    "era": "Unknown",
    "year": "19 BBY",
    "releaseDate": "2020-05-01",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "782",
    "title": "Star Wars: The Bad Batch - S1E1: Aftermath (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "19 BBY",
    "releaseDate": "2021-05-04",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "786",
    "title": "Star Wars: The Clone Wars - S7E12: Victory and Death",
    "type": "series",
    "era": "Unknown",
    "year": "19 BBY",
    "releaseDate": "2020-05-04",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "792",
    "title": "Star Wars: Tales of the Empire - S1E4: Devoted",
    "type": "series",
    "era": "Unknown",
    "year": "2024-05-04",
    "releaseDate": "2024-05-04",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "793",
    "title": "Star Wars: Tales of the Jedi (television series) - S1E6: Resolve (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "2022-10-26",
    "releaseDate": "2022-10-26",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "801",
    "title": "Star Wars: The Bad Batch - S1E2: Cut and Run",
    "type": "series",
    "era": "Unknown",
    "year": "19 BBY",
    "releaseDate": "2021-05-07",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "802",
    "title": "Star Wars: The Bad Batch - S1E3: Replacements",
    "type": "series",
    "era": "Unknown",
    "year": "19 BBY",
    "releaseDate": "2021-05-14",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "803",
    "title": "Star Wars: The Bad Batch - S1E4: Cornered",
    "type": "series",
    "era": "Unknown",
    "year": "19 BBY",
    "releaseDate": "2021-05-21",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "804",
    "title": "Star Wars: The Bad Batch - S1E5: Rampage (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "19 BBY",
    "releaseDate": "2021-05-28",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "805",
    "title": "Star Wars: The Bad Batch - S1E6: Decommissioned",
    "type": "series",
    "era": "Unknown",
    "year": "19 BBY",
    "releaseDate": "2021-06-04",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "813",
    "title": "Star Wars: The Bad Batch - S1E7: Battle Scars",
    "type": "series",
    "era": "Unknown",
    "year": "19 BBY",
    "releaseDate": "2021-06-11",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "814",
    "title": "Star Wars: The Bad Batch - S1E8: Reunion",
    "type": "series",
    "era": "Unknown",
    "year": "19 BBY",
    "releaseDate": "2021-06-18",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "815",
    "title": "Star Wars: The Bad Batch - S1E9: Bounty Lost",
    "type": "series",
    "era": "Unknown",
    "year": "19 BBY",
    "releaseDate": "2021-06-25",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "817",
    "title": "Star Wars: The Bad Batch - S1E10: Common Ground",
    "type": "series",
    "era": "Unknown",
    "year": "19 BBY",
    "releaseDate": "2021-07-02",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "818",
    "title": "Star Wars: The Bad Batch - S1E11: Devil's Deal",
    "type": "series",
    "era": "Unknown",
    "year": "19 BBY",
    "releaseDate": "2021-07-09",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "819",
    "title": "Star Wars: The Bad Batch - S1E12: Rescue on Ryloth (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "19 BBY",
    "releaseDate": "2021-07-16",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "820",
    "title": "Star Wars: The Bad Batch - S1E13: Infested",
    "type": "series",
    "era": "Unknown",
    "year": "19 BBY",
    "releaseDate": "2021-07-23",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "822",
    "title": "Star Wars: The Bad Batch - S1E14: War-Mantle",
    "type": "series",
    "era": "Unknown",
    "year": "19 BBY",
    "releaseDate": "2021-07-30",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "823",
    "title": "Star Wars: The Bad Batch - S1E15: Return to Kamino",
    "type": "series",
    "era": "Unknown",
    "year": "19 BBY",
    "releaseDate": "2021-08-06",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "824",
    "title": "Star Wars: The Bad Batch - S1E16: Kamino Lost",
    "type": "series",
    "era": "Unknown",
    "year": "19 BBY",
    "releaseDate": "2021-08-13",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "825",
    "title": "Star Wars: The Bad Batch - S2E1: Spoils of War",
    "type": "series",
    "era": "Unknown",
    "year": "19 BBY–18 BBY",
    "releaseDate": "2023-01-04",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "826",
    "title": "Star Wars: The Bad Batch - S2E2: Ruins of War",
    "type": "series",
    "era": "Unknown",
    "year": "19–18 BBY",
    "releaseDate": "2023-01-04",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "827",
    "title": "Star Wars: The Bad Batch - S2E3: The Solitary Clone",
    "type": "series",
    "era": "Unknown",
    "year": "19–18 BBY",
    "releaseDate": "2023-01-11",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "828",
    "title": "Star Wars: The Bad Batch - S2E4: Faster",
    "type": "series",
    "era": "Unknown",
    "year": "19–18 BBY",
    "releaseDate": "2023-01-18",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "829",
    "title": "Star Wars: The Bad Batch - S2E5: Entombed",
    "type": "series",
    "era": "Unknown",
    "year": "19–18 BBY",
    "releaseDate": "2023-01-25",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "830",
    "title": "Star Wars: The Bad Batch - S2E6: Tribe",
    "type": "series",
    "era": "Unknown",
    "year": "19–18 BBY",
    "releaseDate": "2023-02-01",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "831",
    "title": "Star Wars: The Bad Batch - S2E7: The Clone Conspiracy",
    "type": "series",
    "era": "Unknown",
    "year": "18 BBY",
    "releaseDate": "2023-02-08",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "832",
    "title": "Star Wars: The Bad Batch - S2E8: Truth and Consequences",
    "type": "series",
    "era": "Unknown",
    "year": "18 BBY",
    "releaseDate": "2023-02-08",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "833",
    "title": "Star Wars: Tales of the Underworld - S1E1: A Way Forward",
    "type": "series",
    "era": "Unknown",
    "year": "18 BBY-",
    "releaseDate": "2025-05-02",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "834",
    "title": "Star Wars: Tales of the Underworld - S1E2: Friends",
    "type": "series",
    "era": "Unknown",
    "year": "18 BBY-",
    "releaseDate": "2025-05-02",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "835",
    "title": "Star Wars: Tales of the Underworld - S1E3: One Warrior to Another",
    "type": "series",
    "era": "Unknown",
    "year": "18 BBY-",
    "releaseDate": "2025-05-04",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "836",
    "title": "Star Wars: The Bad Batch - S2E9: The Crossing",
    "type": "series",
    "era": "Unknown",
    "year": "18 BBY-",
    "releaseDate": "2023-02-15",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "837",
    "title": "Star Wars: The Bad Batch - S2E10: Retrieval (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "18 BBY-",
    "releaseDate": "2023-02-22",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "838",
    "title": "Star Wars: The Bad Batch - S2E11: Metamorphosis (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "18 BBY-",
    "releaseDate": "2023-03-01",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "839",
    "title": "Star Wars: The Bad Batch - S2E12: The Outpost",
    "type": "series",
    "era": "Unknown",
    "year": "18 BBY-",
    "releaseDate": "2023-03-08",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "840",
    "title": "Star Wars: The Bad Batch - S2E13: Pabu (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "18 BBY-",
    "releaseDate": "2023-03-15",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "842",
    "title": "Star Wars: The Bad Batch - S2E14: Tipping Point",
    "type": "series",
    "era": "Unknown",
    "year": "18 BBY-",
    "releaseDate": "2023-03-22",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "843",
    "title": "Star Wars: The Bad Batch - S2E15: The Summit",
    "type": "series",
    "era": "Unknown",
    "year": "18 BBY-",
    "releaseDate": "2023-03-29",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "844",
    "title": "Star Wars: The Bad Batch - S2E16: Plan 99 (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "18 BBY-",
    "releaseDate": "2023-03-29",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "845",
    "title": "Star Wars: The Bad Batch - S3E1: Confined",
    "type": "series",
    "era": "Unknown",
    "year": "2024-02-21",
    "releaseDate": "2024-02-21",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "846",
    "title": "Star Wars: The Bad Batch - S3E2: Paths Unknown",
    "type": "series",
    "era": "Unknown",
    "year": "2024-02-21",
    "releaseDate": "2024-02-21",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "847",
    "title": "Star Wars: The Bad Batch - S3E3: Shadows of Tantiss",
    "type": "series",
    "era": "Unknown",
    "year": "2024-02-21",
    "releaseDate": "2024-02-21",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "848",
    "title": "Star Wars: The Bad Batch - S3E4: A Different Approach",
    "type": "series",
    "era": "Unknown",
    "year": "2024-02-28",
    "releaseDate": "2024-02-28",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "849",
    "title": "Star Wars: The Bad Batch - S3E5: The Return",
    "type": "series",
    "era": "Unknown",
    "year": "2024-03-06",
    "releaseDate": "2024-03-06",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "850",
    "title": "Star Wars: The Bad Batch - S3E6: Infiltration (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "2024-03-13",
    "releaseDate": "2024-03-13",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "851",
    "title": "Star Wars: The Bad Batch - S3E7: Extraction",
    "type": "series",
    "era": "Unknown",
    "year": "2024-03-13",
    "releaseDate": "2024-03-13",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "852",
    "title": "Star Wars: The Bad Batch - S3E8: Bad Territory",
    "type": "series",
    "era": "Unknown",
    "year": "2024-03-20",
    "releaseDate": "2024-03-20",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "853",
    "title": "Star Wars: The Bad Batch - S3E9: The Harbinger",
    "type": "series",
    "era": "Unknown",
    "year": "2024-03-27",
    "releaseDate": "2024-03-27",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "854",
    "title": "Star Wars: The Bad Batch - S3E10: Identity Crisis",
    "type": "series",
    "era": "Unknown",
    "year": "2024-04-03",
    "releaseDate": "2024-04-03",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "855",
    "title": "Star Wars: The Bad Batch - S3E11: Point of No Return (The Bad Batch)",
    "type": "series",
    "era": "Unknown",
    "year": "2024-04-03",
    "releaseDate": "2024-04-03",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "856",
    "title": "Star Wars: The Bad Batch - S3E12: Juggernaut (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "2024-04-10",
    "releaseDate": "2024-04-10",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "857",
    "title": "Star Wars: The Bad Batch - S3E13: Into the Breach",
    "type": "series",
    "era": "Unknown",
    "year": "2024-04-17",
    "releaseDate": "2024-04-17",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "858",
    "title": "Star Wars: The Bad Batch - S3E14: Flash Strike",
    "type": "series",
    "era": "Unknown",
    "year": "2024-04-24",
    "releaseDate": "2024-04-24",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "859",
    "title": "Star Wars: The Bad Batch - S3E15: The Cavalry Has Arrived",
    "type": "series",
    "era": "Unknown",
    "year": "2024-05-01",
    "releaseDate": "2024-05-01",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "884",
    "title": "Star Wars: Tales of the Empire - S1E5: Realization",
    "type": "series",
    "era": "Unknown",
    "year": "2024-05-04",
    "releaseDate": "2024-05-04",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "891",
    "title": "Star Wars: Maul - Shadow Lord",
    "type": "series",
    "era": "Unknown",
    "year": "c. 18 BBY",
    "releaseDate": "2026-04-06",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "938",
    "title": "Star Wars Forces of Destiny - S2E16: Triplecross",
    "type": "series",
    "era": "Unknown",
    "year": "c. 11 BBY",
    "releaseDate": "2018-05-25",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "944",
    "title": "Solo: A Star Wars Story",
    "type": "movie",
    "era": "Unknown",
    "year": "10 BBY",
    "releaseDate": "2018-05-25",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "958",
    "title": "Star Wars Galaxy of Adventures - S1E36: Han and Chewie - A Lifelong Partnership",
    "type": "series",
    "era": "Unknown",
    "year": "10 BBY –4 ABY",
    "releaseDate": "2019-07-13",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "963",
    "title": "Star Wars Galaxy of Adventures - S1E29: Chewbacca - Wookiee Warrior",
    "type": "series",
    "era": "Unknown",
    "year": "10 BBY",
    "releaseDate": "2019-05-24",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "966",
    "title": "Star Wars Galaxy of Adventures - S1E32: Han Solo - From Smuggler to General",
    "type": "series",
    "era": "Unknown",
    "year": "10 BBY –4 ABY",
    "releaseDate": "2019-06-14",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "972",
    "title": "Star Wars: Tales of the Empire - S1E2: The Path of Anger",
    "type": "series",
    "era": "Unknown",
    "year": "c. 9 BBY to c. 2 BBY",
    "releaseDate": "2024-05-04",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "973",
    "title": "Star Wars: Obi-Wan Kenobi - S1E1: Part I",
    "type": "series",
    "era": "Unknown",
    "year": "9 BBY",
    "releaseDate": "2022-05-26",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "975",
    "title": "Star Wars: Obi-Wan Kenobi - S1E2: Part II",
    "type": "series",
    "era": "Unknown",
    "year": "9 BBY",
    "releaseDate": "2022-05-26",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "977",
    "title": "Star Wars: Obi-Wan Kenobi - S1E3: Part III",
    "type": "series",
    "era": "Unknown",
    "year": "9 BBY",
    "releaseDate": "2022-06-01",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "979",
    "title": "Star Wars: Obi-Wan Kenobi - S1E4: Part IV",
    "type": "series",
    "era": "Unknown",
    "year": "9 BBY",
    "releaseDate": "2022-06-08",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "981",
    "title": "Star Wars: Obi-Wan Kenobi - S1E5: Part V",
    "type": "series",
    "era": "Unknown",
    "year": "9 BBY",
    "releaseDate": "2022-06-15",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "983",
    "title": "Star Wars: Obi-Wan Kenobi - S1E6: Part VI",
    "type": "series",
    "era": "Unknown",
    "year": "9 BBY",
    "releaseDate": "2022-06-22",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1028",
    "title": "Star Wars: Andor - S1E1: Kassa (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "5 BBY",
    "releaseDate": "2022-09-21",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1029",
    "title": "Star Wars: Andor - S1E2: That Would Be Me",
    "type": "series",
    "era": "Unknown",
    "year": "5 BBY",
    "releaseDate": "2022-09-21",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1030",
    "title": "Star Wars: Andor - S1E3: Reckoning (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "5 BBY",
    "releaseDate": "2022-09-21",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1031",
    "title": "Star Wars: Andor - S1E4: Aldhani (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "5 BBY",
    "releaseDate": "2022-09-28",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1032",
    "title": "Star Wars: Andor - S1E5: The Axe Forgets",
    "type": "series",
    "era": "Unknown",
    "year": "5 BBY",
    "releaseDate": "2022-10-05",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1033",
    "title": "Star Wars: Andor - S1E6: The Eye",
    "type": "series",
    "era": "Unknown",
    "year": "5 BBY",
    "releaseDate": "2022-10-12",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1034",
    "title": "Star Wars: Andor - S1E7: Announcement",
    "type": "series",
    "era": "Unknown",
    "year": "5 BBY",
    "releaseDate": "2022-10-19",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1035",
    "title": "Star Wars: Andor - S1E8: Narkina 5 (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "5 BBY",
    "releaseDate": "2022-10-26",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1036",
    "title": "Star Wars: Andor - S1E9: Nobody's Listening!",
    "type": "series",
    "era": "Unknown",
    "year": "5 BBY",
    "releaseDate": "2022-11-02",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1037",
    "title": "Star Wars: Andor - S1E10: One Way Out",
    "type": "series",
    "era": "Unknown",
    "year": "5 BBY",
    "releaseDate": "2022-11-09",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1038",
    "title": "Star Wars: Andor - S1E11: Daughter of Ferrix",
    "type": "series",
    "era": "Unknown",
    "year": "5 BBY",
    "releaseDate": "2022-11-16",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1039",
    "title": "Star Wars: Andor - S1E12: Rix Road (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "5 BBY",
    "releaseDate": "2022-11-23",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1042",
    "title": "Star Wars Rebels - S1E1: The Machine in the Ghost",
    "type": "series",
    "era": "Unknown",
    "year": "5 BBY",
    "releaseDate": "2014-08-11",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1046",
    "title": "Star Wars Rebels - S1E2: Art Attack",
    "type": "series",
    "era": "Unknown",
    "year": "5 BBY",
    "releaseDate": "2014-08-18",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1050",
    "title": "Star Wars Rebels - S1E3: Entanglement",
    "type": "series",
    "era": "Unknown",
    "year": "5 BBY",
    "releaseDate": "2014-08-25",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1054",
    "title": "Star Wars Rebels - S1E4: Property of Ezra Bridger",
    "type": "series",
    "era": "Unknown",
    "year": "5 BBY",
    "releaseDate": "2014-09-01",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1057",
    "title": "Star Wars Rebels - S1E1–2: Spark of Rebellion",
    "type": "series",
    "era": "Unknown",
    "year": "5 BBY",
    "releaseDate": "2014-09-26",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1069",
    "title": "Star Wars Rebels - S1E3: Droids in Distress",
    "type": "series",
    "era": "Unknown",
    "year": "5 BBY",
    "releaseDate": "2014-10-03",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1070",
    "title": "Star Wars Rebels - S1E4: Fighter Flight",
    "type": "series",
    "era": "Unknown",
    "year": "5 BBY",
    "releaseDate": "2014-10-13",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1073",
    "title": "Star Wars Rebels - S1E5: Rise of the Old Masters",
    "type": "series",
    "era": "Unknown",
    "year": "5 BBY",
    "releaseDate": "2014-10-11",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1078",
    "title": "Star Wars Rebels - S1E6: Breaking Ranks",
    "type": "series",
    "era": "Unknown",
    "year": "5 BBY",
    "releaseDate": "2014-10-27",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1082",
    "title": "Star Wars Rebels - S1E7: Out of Darkness",
    "type": "series",
    "era": "Unknown",
    "year": "5 BBY",
    "releaseDate": "2014-11-03",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1087",
    "title": "Star Wars Rebels - S1E8: Empire Day (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "4 BBY",
    "releaseDate": "2014-11-10",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1090",
    "title": "Star Wars Rebels - S1E9: Gathering Forces",
    "type": "series",
    "era": "Unknown",
    "year": "4 BBY",
    "releaseDate": "2014-11-17",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1097",
    "title": "Star Wars Rebels - S1E10: Path of the Jedi",
    "type": "series",
    "era": "Unknown",
    "year": "4 BBY",
    "releaseDate": "2014-12-29",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1102",
    "title": "Star Wars Rebels - S1E11: Idiot's Array (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "4 BBY",
    "releaseDate": "2015-01-12",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1105",
    "title": "Star Wars Rebels - S1E12: Vision of Hope",
    "type": "series",
    "era": "Unknown",
    "year": "4 BBY",
    "releaseDate": "2015-01-26",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1111",
    "title": "Star Wars Rebels - S1E13: Call to Action",
    "type": "series",
    "era": "Unknown",
    "year": "4 BBY",
    "releaseDate": "2015-02-02",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1114",
    "title": "Star Wars Rebels - S1E14: Rebel Resolve",
    "type": "series",
    "era": "Unknown",
    "year": "4 BBY",
    "releaseDate": "2015-02-16",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1115",
    "title": "Star Wars Rebels - S1E15: Fire Across the Galaxy",
    "type": "series",
    "era": "Unknown",
    "year": "4 BBY",
    "releaseDate": "2015-03-02",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1120",
    "title": "Star Wars: Andor - S2E1: One Year Later",
    "type": "series",
    "era": "Unknown",
    "year": "4 BBY",
    "releaseDate": "2025-04-22",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1121",
    "title": "Star Wars: Andor - S2E2: Sagrona Teema",
    "type": "series",
    "era": "Unknown",
    "year": "4 BBY",
    "releaseDate": "2025-04-22",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1122",
    "title": "Star Wars: Andor - S2E3: Harvest",
    "type": "series",
    "era": "Unknown",
    "year": "4 BBY",
    "releaseDate": "2025-04-22",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1123",
    "title": "Star Wars Rebels - S2E1–2: The Siege of Lothal",
    "type": "series",
    "era": "Unknown",
    "year": "4 BBY",
    "releaseDate": "2015-04-18",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1126",
    "title": "Star Wars Galaxy of Adventures - S1E21: Darth Vader vs. the Rebel Fleet - Fearsome Fighter Pilot",
    "type": "series",
    "era": "Unknown",
    "year": "4 BBY",
    "releaseDate": "2019-03-29",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1127",
    "title": "Star Wars Rebels - S2E3: The Lost Commanders",
    "type": "series",
    "era": "Unknown",
    "year": "4 BBY",
    "releaseDate": "2015-10-08",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1129",
    "title": "Star Wars Rebels - S2E4: Relics of the Old Republic",
    "type": "series",
    "era": "Unknown",
    "year": "4 BBY",
    "releaseDate": "2015-10-08",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1131",
    "title": "Star Wars Rebels - S2E5: Always Two There Are",
    "type": "series",
    "era": "Unknown",
    "year": "4 BBY",
    "releaseDate": "2015-10-28",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1133",
    "title": "Star Wars Rebels - S2E6: Brothers of the Broken Horn",
    "type": "series",
    "era": "Unknown",
    "year": "4 BBY",
    "releaseDate": "2015-11-04",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1135",
    "title": "Star Wars Rebels - S2E7: Wings of the Master",
    "type": "series",
    "era": "Unknown",
    "year": "4 BBY",
    "releaseDate": "2015-11-11",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1138",
    "title": "Star Wars Rebels - S2E8: Blood Sisters",
    "type": "series",
    "era": "Unknown",
    "year": "4 BBY",
    "releaseDate": "2015-11-18",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1141",
    "title": "Star Wars Rebels - S2E9: Stealth Strike",
    "type": "series",
    "era": "Unknown",
    "year": "4 BBY",
    "releaseDate": "2015-11-25",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1142",
    "title": "Star Wars Forces of Destiny - S1E7: The Stranger (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "c. 4 BBY",
    "releaseDate": "2017-07-09",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1144",
    "title": "Star Wars Rebels - S2E10: The Future of the Force",
    "type": "series",
    "era": "Unknown",
    "year": "3 BBY",
    "releaseDate": "2015-12-02",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1146",
    "title": "Star Wars: Andor - S2E4: Ever Been to Ghorman?",
    "type": "series",
    "era": "Unknown",
    "year": "3 BBY",
    "releaseDate": "2025-04-29",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1147",
    "title": "Star Wars: Andor - S2E5: I Have Friends Everywhere",
    "type": "series",
    "era": "Unknown",
    "year": "3 BBY",
    "releaseDate": "2025-04-29",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1148",
    "title": "Star Wars: Andor - S2E6: What a Festive Evening",
    "type": "series",
    "era": "Unknown",
    "year": "3 BBY",
    "releaseDate": "2025-04-29",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1154",
    "title": "Star Wars Rebels - S2E11: Legacy (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "3 BBY",
    "releaseDate": "2015-12-09",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1156",
    "title": "Star Wars Rebels - S2E12: A Princess on Lothal",
    "type": "series",
    "era": "Unknown",
    "year": "3 BBY",
    "releaseDate": "2016-01-20",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1157",
    "title": "Star Wars Rebels - S2E13: The Protector of Concord Dawn",
    "type": "series",
    "era": "Unknown",
    "year": "3 BBY",
    "releaseDate": "2016-01-27",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1160",
    "title": "Star Wars Rebels - S2E14: Legends of the Lasat",
    "type": "series",
    "era": "Unknown",
    "year": "3 BBY",
    "releaseDate": "2016-02-03",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1162",
    "title": "Star Wars Rebels - S2E15: The Call",
    "type": "series",
    "era": "Unknown",
    "year": "3 BBY",
    "releaseDate": "2016-02-10",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1163",
    "title": "Star Wars Forces of Destiny - S1E8: Bounty of Trouble",
    "type": "series",
    "era": "Unknown",
    "year": "3 BBY",
    "releaseDate": "2017-07-09",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1168",
    "title": "Star Wars Rebels - S2E16: Homecoming",
    "type": "series",
    "era": "Unknown",
    "year": "3 BBY",
    "releaseDate": "2016-02-17",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1171",
    "title": "Star Wars Rebels - S2E17: The Honorable Ones",
    "type": "series",
    "era": "Unknown",
    "year": "3 BBY",
    "releaseDate": "2016-02-24",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1172",
    "title": "Star Wars Rebels - S2E18: Shroud of Darkness",
    "type": "series",
    "era": "Unknown",
    "year": "3 BBY",
    "releaseDate": "2016-03-02",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1175",
    "title": "Star Wars Rebels - S2E19: The Forgotten Droid",
    "type": "series",
    "era": "Unknown",
    "year": "3 BBY",
    "releaseDate": "2016-03-16",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1176",
    "title": "Star Wars Rebels - S2E20: The Mystery of Chopper Base",
    "type": "series",
    "era": "Unknown",
    "year": "3 BBY",
    "releaseDate": "2016-03-23",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1177",
    "title": "Star Wars Forces of Destiny - S2E15: A Disarming Lesson",
    "type": "series",
    "era": "Unknown",
    "year": "c. 4–3 BBY",
    "releaseDate": "2018-05-04",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1178",
    "title": "Star Wars Forces of Destiny - S1E9: Newest Recruit",
    "type": "series",
    "era": "Unknown",
    "year": "c. 3–2 BBY",
    "releaseDate": "2017-10-01",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1179",
    "title": "Star Wars Forces of Destiny - S1E16: Crash Course",
    "type": "series",
    "era": "Unknown",
    "year": "c. 3–2 BBY",
    "releaseDate": "2017-10-29",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1182",
    "title": "Star Wars Rebels - S2E21–22: Twilight of the Apprentice",
    "type": "series",
    "era": "Unknown",
    "year": "3 BBY",
    "releaseDate": "2016-03-30",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1184",
    "title": "Star Wars Forces of Destiny - S2E1: Hasty Departure",
    "type": "series",
    "era": "Unknown",
    "year": "2018-03-19",
    "releaseDate": "2018-03-19",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1185",
    "title": "Star Wars Forces of Destiny - S1E13: Accidental Allies",
    "type": "series",
    "era": "Unknown",
    "year": "c. 3–2 BBY",
    "releaseDate": "2017-10-29",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1193",
    "title": "Star Wars Rebels - S3E1–2: Steps Into Shadow",
    "type": "series",
    "era": "Unknown",
    "year": "2 BBY",
    "releaseDate": "2016-07-16",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1194",
    "title": "Star Wars Rebels - S3E3: The Holocrons of Fate",
    "type": "series",
    "era": "Unknown",
    "year": "2 BBY",
    "releaseDate": "2016-10-01",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1198",
    "title": "Star Wars Rebels - S3E4: The Antilles Extraction",
    "type": "series",
    "era": "Unknown",
    "year": "2 BBY",
    "releaseDate": "2016-10-08",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1199",
    "title": "Star Wars Rebels - S3E5: Hera's Heroes",
    "type": "series",
    "era": "Unknown",
    "year": "2 BBY",
    "releaseDate": "2016-10-15",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1201",
    "title": "Star Wars Rebels - S3E6: The Last Battle",
    "type": "series",
    "era": "Unknown",
    "year": "2 BBY",
    "releaseDate": "2016-10-22",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1202",
    "title": "Star Wars Rebels - S3E7: Imperial Supercommandos",
    "type": "series",
    "era": "Unknown",
    "year": "2 BBY",
    "releaseDate": "2016-11-05",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1206",
    "title": "Star Wars Rebels - S3E8: Iron Squadron (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "2 BBY",
    "releaseDate": "2016-11-19",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1207",
    "title": "Star Wars Rebels - S3E9: The Wynkahthu Job",
    "type": "series",
    "era": "Unknown",
    "year": "2 BBY",
    "releaseDate": "2016-11-26",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1208",
    "title": "Star Wars Rebels - S3E10: An Inside Man",
    "type": "series",
    "era": "Unknown",
    "year": "2 BBY",
    "releaseDate": "2016-12-03",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1211",
    "title": "Star Wars Rebels - S3E11: Visions and Voices",
    "type": "series",
    "era": "Unknown",
    "year": "2 BBY",
    "releaseDate": "2016-12-10",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1214",
    "title": "Star Wars Rebels - S3E12–13: Ghosts of Geonosis",
    "type": "series",
    "era": "Unknown",
    "year": "2 BBY",
    "releaseDate": "2017-01-07",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1215",
    "title": "Star Wars Rebels - S3E14: Warhead (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "2 BBY",
    "releaseDate": "2017-01-14",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1216",
    "title": "Star Wars Rebels - S3E15: Trials of the Darksaber",
    "type": "series",
    "era": "Unknown",
    "year": "2 BBY",
    "releaseDate": "2017-01-21",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1217",
    "title": "Star Wars Rebels - S3E16: Legacy of Mandalore",
    "type": "series",
    "era": "Unknown",
    "year": "2 BBY",
    "releaseDate": "2017-02-18",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1218",
    "title": "Star Wars Forces of Destiny - S2E11: Art History",
    "type": "series",
    "era": "Unknown",
    "year": "2 BBY",
    "releaseDate": "2018-05-04",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1219",
    "title": "Star Wars: Andor - S2E7: Messenger",
    "type": "series",
    "era": "Unknown",
    "year": "2 BBY",
    "releaseDate": "2025-05-06",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1220",
    "title": "Star Wars: Andor - S2E8: Who Are You?",
    "type": "series",
    "era": "Unknown",
    "year": "2 BBY",
    "releaseDate": "2025-05-06",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1221",
    "title": "Star Wars Rebels - S3E17: Through Imperial Eyes",
    "type": "series",
    "era": "Unknown",
    "year": "2 BBY",
    "releaseDate": "2017-02-25",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1222",
    "title": "Star Wars: Andor - S2E9: Welcome to the Rebellion",
    "type": "series",
    "era": "Unknown",
    "year": "2 BBY",
    "releaseDate": "2025-05-06",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1223",
    "title": "Star Wars Rebels - S3E18: Secret Cargo",
    "type": "series",
    "era": "Unknown",
    "year": "2 BBY",
    "releaseDate": "2017-03-04",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1225",
    "title": "Star Wars Rebels - S3E19: Double Agent Droid",
    "type": "series",
    "era": "Unknown",
    "year": "2 BBY",
    "releaseDate": "2017-03-11",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1226",
    "title": "Star Wars Rebels - S3E20: Twin Suns (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "2 BBY",
    "releaseDate": "2017-03-18",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1227",
    "title": "Star Wars Rebels - S3E21–22: Zero Hour",
    "type": "series",
    "era": "Unknown",
    "year": "2 BBY",
    "releaseDate": "2017-03-25",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1250",
    "title": "Star Wars Rebels - S4E1–2: Heroes of Mandalore",
    "type": "series",
    "era": "Unknown",
    "year": "1 BBY",
    "releaseDate": "2017-04-15",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1252",
    "title": "Star Wars Rebels - S4E3–4: In the Name of the Rebellion",
    "type": "series",
    "era": "Unknown",
    "year": "1 BBY",
    "releaseDate": "2017-10-23",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1254",
    "title": "Star Wars Rebels - S4E5: The Occupation",
    "type": "series",
    "era": "Unknown",
    "year": "1 BBY",
    "releaseDate": "2017-10-30",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1255",
    "title": "Star Wars Rebels - S4E6: Flight of the Defender",
    "type": "series",
    "era": "Unknown",
    "year": "1 BBY",
    "releaseDate": "2017-10-30",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1256",
    "title": "Star Wars Rebels - S4E7: Kindred",
    "type": "series",
    "era": "Unknown",
    "year": "1 BBY",
    "releaseDate": "2017-11-06",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1257",
    "title": "Star Wars Rebels - S4E8: Crawler Commandeers",
    "type": "series",
    "era": "Unknown",
    "year": "1 BBY",
    "releaseDate": "2017-11-06",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1260",
    "title": "Star Wars Rebels - S4E9: Rebel Assault",
    "type": "series",
    "era": "Unknown",
    "year": "1 BBY",
    "releaseDate": "2017-11-13",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1261",
    "title": "Star Wars Rebels - S4E10: Jedi Night",
    "type": "series",
    "era": "Unknown",
    "year": "1 BBY",
    "releaseDate": "2018-02-19",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1263",
    "title": "Star Wars Rebels - S4E11: DUME",
    "type": "series",
    "era": "Unknown",
    "year": "1 BBY",
    "releaseDate": "2018-02-19",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1267",
    "title": "Star Wars Rebels - S4E12: Wolves and a Door",
    "type": "series",
    "era": "Unknown",
    "year": "1 BBY",
    "releaseDate": "2018-02-26",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1268",
    "title": "Star Wars Rebels - S4E13: A World Between Worlds",
    "type": "series",
    "era": "Unknown",
    "year": "1 BBY",
    "releaseDate": "2018-02-26",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1269",
    "title": "Star Wars Rebels - S4E14: A Fool's Hope",
    "type": "series",
    "era": "Unknown",
    "year": "1 BBY",
    "releaseDate": "2018-03-05",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1270",
    "title": "Star Wars Rebels - S4E15: Family Reunion – and Farewell",
    "type": "series",
    "era": "Unknown",
    "year": "1 BBY",
    "releaseDate": "2018-03-05",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1272",
    "title": "Star Wars: Tales of the Empire - S1E6: The Way Out",
    "type": "series",
    "era": "Unknown",
    "year": "2024-05-04",
    "releaseDate": "2024-05-04",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1273",
    "title": "Star Wars Forces of Destiny - S2E4: Jyn's Trade",
    "type": "series",
    "era": "Unknown",
    "year": "2018-03-19",
    "releaseDate": "2018-03-19",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1279",
    "title": "Star Wars Galaxy of Adventures - S1E5: Chewbacca - The Trusty Co-Pilot",
    "type": "series",
    "era": "Unknown",
    "year": "2018-11-30",
    "releaseDate": "2018-11-30",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1317",
    "title": "Star Wars: Andor - S2E10: Make It Stop",
    "type": "series",
    "era": "Unknown",
    "year": "1 BBY",
    "releaseDate": "2025-05-13",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1318",
    "title": "Star Wars: Andor - S2E11: Who Else Knows?",
    "type": "series",
    "era": "Unknown",
    "year": "1 BBY",
    "releaseDate": "2025-05-13",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1319",
    "title": "Star Wars: Andor - S2E12: Jedha, Kyber, Erso",
    "type": "series",
    "era": "Unknown",
    "year": "1 BBY",
    "releaseDate": "2025-05-13",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1320",
    "title": "Rogue One: A Star Wars Story",
    "type": "movie",
    "era": "Unknown",
    "year": "1 BBY",
    "releaseDate": "2016-12-16",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1331",
    "title": "Star Wars Galaxy of Adventures - S1E15: Stormtroopers vs. Rebels – Soldiers of the Galactic Empire",
    "type": "series",
    "era": "Unknown",
    "year": "1 BBY",
    "releaseDate": "2019-02-15",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1333",
    "title": "Star Wars Galaxy of Adventures - S1E2: Darth Vader - Power of the Dark Side",
    "type": "series",
    "era": "Unknown",
    "year": "1 BBY",
    "releaseDate": "2018-11-30",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1338",
    "title": "Star Wars: Episode IV A New Hope",
    "type": "movie",
    "era": "Unknown",
    "year": "1 BBY –0 ABY",
    "releaseDate": "1977-05-25",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1377",
    "title": "Star Wars Galaxy of Adventures - S1E4: R2-D2 - A Loyal Droid",
    "type": "series",
    "era": "Unknown",
    "year": "1 BBY",
    "releaseDate": "2018-11-30",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1379",
    "title": "Star Wars Galaxy of Adventures - S1E7: Princess Leia vs. Darth Vader - A Fearless Leader",
    "type": "series",
    "era": "Unknown",
    "year": "1 BBY",
    "releaseDate": "2018-12-07",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1388",
    "title": "Star Wars Galaxy of Adventures - S1E1: Luke Skywalker - The Journey Begins",
    "type": "series",
    "era": "Unknown",
    "year": "1 BBY",
    "releaseDate": "2018-11-30",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1389",
    "title": "Star Wars Galaxy of Adventures - S1E54: Obi-Wan Kenobi (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "1 BBY",
    "releaseDate": "2020-10-02",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1403",
    "title": "Star Wars Galaxy of Adventures - S1E9: Han Solo - Galaxy's Best Smuggler",
    "type": "series",
    "era": "Unknown",
    "year": "1 BBY",
    "releaseDate": "2018-12-07",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1409",
    "title": "Star Wars Galaxy of Adventures - S1E10: Chewie vs. Holochess - Let the Wookiee Win",
    "type": "series",
    "era": "Unknown",
    "year": "1 BBY",
    "releaseDate": "2018-12-07",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1410",
    "title": "Star Wars Galaxy of Adventures - S1E16: Luke Skywalker – Lightsaber Training",
    "type": "series",
    "era": "Unknown",
    "year": "1 BBY",
    "releaseDate": "2019-02-22",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1417",
    "title": "Star Wars Galaxy of Adventures - S1E14: Princess Leia – The Rescue",
    "type": "series",
    "era": "Unknown",
    "year": "1 BBY",
    "releaseDate": "2019-02-08",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1419",
    "title": "Star Wars Galaxy of Adventures - S1E18: R2-D2 and C3PO – Trash Compactor Rescue",
    "type": "series",
    "era": "Unknown",
    "year": "1 BBY",
    "releaseDate": "2019-03-08",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1430",
    "title": "Star Wars Galaxy of Adventures - S1E17: Han Solo – Taking Flight for his Friends",
    "type": "series",
    "era": "Unknown",
    "year": "1 BBY",
    "releaseDate": "2019-03-01",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1431",
    "title": "Star Wars Galaxy of Adventures - S1E23: R2-D2 - A Pilot's Best Friend",
    "type": "series",
    "era": "Unknown",
    "year": "1 BBY",
    "releaseDate": "2019-04-12",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1433",
    "title": "Star Wars Galaxy of Adventures - S1E8: Luke vs. the Death Star - X-wing Assault",
    "type": "series",
    "era": "Unknown",
    "year": "1 BBY",
    "releaseDate": "2018-12-07",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1659",
    "title": "Star Wars Forces of Destiny - S1E5: Beasts of Echo Base",
    "type": "series",
    "era": "Unknown",
    "year": "3 ABY",
    "releaseDate": "2017-07-07",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1689",
    "title": "Star Wars: Episode V The Empire Strikes Back",
    "type": "movie",
    "era": "Unknown",
    "year": "3 ABY",
    "releaseDate": "1980-05-21",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1722",
    "title": "Star Wars Galaxy of Adventures - S1E3: Luke vs. the Wampa - Cavern Escape",
    "type": "series",
    "era": "Unknown",
    "year": "3 ABY",
    "releaseDate": "2018-11-30",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1725",
    "title": "Star Wars Galaxy of Adventures - S1E28: Darth Vader vs. Hoth Rebels - Crushing the Rebellion",
    "type": "series",
    "era": "Unknown",
    "year": "3 ABY",
    "releaseDate": "2019-05-17",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1727",
    "title": "Star Wars Galaxy of Adventures - S1E47: Battle of Hoth (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "3 ABY",
    "releaseDate": "2020-05-21",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1733",
    "title": "Star Wars Galaxy of Adventures - S1E20: Luke vs. Imperial Walkers - Commander on Hoth",
    "type": "series",
    "era": "Unknown",
    "year": "3 ABY",
    "releaseDate": "2019-03-22",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1743",
    "title": "Star Wars Galaxy of Adventures - S1E22: Han Solo vs. the Space Slug - The Escape Artist",
    "type": "series",
    "era": "Unknown",
    "year": "3 ABY",
    "releaseDate": "2019-04-05",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1748",
    "title": "Star Wars Galaxy of Adventures - S1E48: Luke Skywalker Trains with Master Yoda",
    "type": "series",
    "era": "Unknown",
    "year": "3 ABY",
    "releaseDate": "2020-05-28",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1751",
    "title": "Star Wars Galaxy of Adventures - S1E19: Yoda – The Jedi Master",
    "type": "series",
    "era": "Unknown",
    "year": "3 ABY",
    "releaseDate": "2019-03-16",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1755",
    "title": "Star Wars Forces of Destiny - S2E7: The Path Ahead",
    "type": "series",
    "era": "Unknown",
    "year": "3 ABY",
    "releaseDate": "2018-03-19",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1762",
    "title": "Star Wars Galaxy of Adventures - S1E33: Boba Fett - The Bounty Hunter",
    "type": "series",
    "era": "Unknown",
    "year": "3 ABY",
    "releaseDate": "2019-06-21",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1764",
    "title": "Star Wars Galaxy of Adventures - S1E49: Rendezvous at Bespin",
    "type": "series",
    "era": "Unknown",
    "year": "3 ABY",
    "releaseDate": "2020-06-11",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1776",
    "title": "Star Wars Galaxy of Adventures - S1E50: Clash on Cloud City",
    "type": "series",
    "era": "Unknown",
    "year": "3 ABY",
    "releaseDate": "2020-06-12",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "1777",
    "title": "Star Wars Galaxy of Adventures - S1E12: Luke Skywalker vs. Darth Vader – Join Me",
    "type": "series",
    "era": "Unknown",
    "year": "3 ABY",
    "releaseDate": "2019-01-18",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2005",
    "title": "Star Wars Galaxy of Adventures - S1E6: Darth Vader - Might of the Empire",
    "type": "series",
    "era": "Unknown",
    "year": "2018-11-30",
    "releaseDate": "2018-11-30",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2024",
    "title": "Star Wars Forces of Destiny - S2E6: Bounty Hunted",
    "type": "series",
    "era": "Unknown",
    "year": "4 ABY",
    "releaseDate": "2018-03-19",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2033",
    "title": "Star Wars: Episode VI Return of the Jedi",
    "type": "movie",
    "era": "Unknown",
    "year": "4 ABY",
    "releaseDate": "1983-05-25",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2048",
    "title": "Star Wars Galaxy of Adventures - S1E26: Jabba the Hutt - Galactic Gangster",
    "type": "series",
    "era": "Unknown",
    "year": "4 ABY",
    "releaseDate": "2019-05-03",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2051",
    "title": "Star Wars Galaxy of Adventures - S1E25: Leia and Han - The Han Rescue",
    "type": "series",
    "era": "Unknown",
    "year": "4 ABY",
    "releaseDate": "2019-04-26",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2054",
    "title": "Star Wars Galaxy of Adventures - S1E30: Luke vs. the Rancor - Wrath of the Rancor",
    "type": "series",
    "era": "Unknown",
    "year": "4 ABY",
    "releaseDate": "2019-05-31",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2060",
    "title": "Star Wars Galaxy of Adventures - S1E27: Luke vs. Jabba - Sail Barge Escape",
    "type": "series",
    "era": "Unknown",
    "year": "4 ABY",
    "releaseDate": "2019-05-10",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2098",
    "title": "Star Wars Galaxy of Adventures - S1E24: Princess Leia - An Unexpected Friend",
    "type": "series",
    "era": "Unknown",
    "year": "4 ABY",
    "releaseDate": "2019-04-19",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2100",
    "title": "Star Wars Forces of Destiny - S1E3: Ewok Escape",
    "type": "series",
    "era": "Unknown",
    "year": "4 ABY",
    "releaseDate": "2017-07-05",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2112",
    "title": "Star Wars Galaxy of Adventures - S1E11: Luke vs. Emperor Palpatine - Rise to Evil",
    "type": "series",
    "era": "Unknown",
    "year": "4 ABY",
    "releaseDate": "2018-12-07",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2113",
    "title": "Star Wars Galaxy of Adventures - S1E35: Ewoks vs. The Empire - Small but Mighty",
    "type": "series",
    "era": "Unknown",
    "year": "4 ABY",
    "releaseDate": "2019-07-05",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2117",
    "title": "Star Wars Galaxy of Adventures - S1E31: Chewie and Ewoks - Hijacking a Walker",
    "type": "series",
    "era": "Unknown",
    "year": "4 ABY",
    "releaseDate": "2019-06-07",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2128",
    "title": "Star Wars Forces of Destiny - S1E14: An Imperial Feast",
    "type": "series",
    "era": "Unknown",
    "year": "4 ABY",
    "releaseDate": "2017-10-29",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2130",
    "title": "Star Wars Forces of Destiny - S2E14: Traps and Tribulations",
    "type": "series",
    "era": "Unknown",
    "year": "4 ABY",
    "releaseDate": "2018-05-04",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2131",
    "title": "Star Wars Forces of Destiny - S2E9: Chopper and Friends",
    "type": "series",
    "era": "Unknown",
    "year": "4 ABY",
    "releaseDate": "2018-05-04",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2164",
    "title": "Hunted",
    "type": "series",
    "era": "Unknown",
    "year": "2020-09-14",
    "releaseDate": "2020-09-14",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2215",
    "title": "Star Wars: The Mandalorian - S1E1: Chapter 1: The Mandalorian",
    "type": "series",
    "era": "Unknown",
    "year": "9 ABY",
    "releaseDate": "2019-11-12",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2223",
    "title": "Star Wars: The Mandalorian - S1E2: Chapter 2: The Child",
    "type": "series",
    "era": "Unknown",
    "year": "9 ABY",
    "releaseDate": "2019-11-15",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2226",
    "title": "Star Wars: The Mandalorian - S1E3: Chapter 3: The Sin",
    "type": "series",
    "era": "Unknown",
    "year": "9 ABY",
    "releaseDate": "2019-11-22",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2228",
    "title": "Star Wars: The Mandalorian - S1E4: Chapter 4: Sanctuary",
    "type": "series",
    "era": "Unknown",
    "year": "9 ABY",
    "releaseDate": "2019-11-29",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2232",
    "title": "Star Wars: The Mandalorian - S1E5: Chapter 5: The Gunslinger",
    "type": "series",
    "era": "Unknown",
    "year": "9 ABY",
    "releaseDate": "2019-12-06",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2234",
    "title": "Star Wars: The Mandalorian - S1E6: Chapter 6: The Prisoner",
    "type": "series",
    "era": "Unknown",
    "year": "9 ABY",
    "releaseDate": "2019-12-13",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2238",
    "title": "Star Wars: The Mandalorian - S1E7: Chapter 7: The Reckoning",
    "type": "series",
    "era": "Unknown",
    "year": "9 ABY",
    "releaseDate": "2019-12-18",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2240",
    "title": "Star Wars: The Mandalorian - S1E8: Chapter 8: Redemption",
    "type": "series",
    "era": "Unknown",
    "year": "9 ABY",
    "releaseDate": "2019-12-27",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2244",
    "title": "Star Wars: The Mandalorian - S2E1: Chapter 9: The Marshal",
    "type": "series",
    "era": "Unknown",
    "year": "9 ABY",
    "releaseDate": "2020-10-30",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2251",
    "title": "Star Wars: The Mandalorian - S2E2: Chapter 10: The Passenger",
    "type": "series",
    "era": "Unknown",
    "year": "9 ABY",
    "releaseDate": "2020-11-06",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2253",
    "title": "Star Wars: Tales of the Empire - S1E3: The Path of Hate",
    "type": "series",
    "era": "Unknown",
    "year": "2024-05-04",
    "releaseDate": "2024-05-04",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2254",
    "title": "Star Wars: The Mandalorian - S2E3: Chapter 11: The Heiress",
    "type": "series",
    "era": "Unknown",
    "year": "9 ABY",
    "releaseDate": "2020-11-13",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2256",
    "title": "Star Wars: The Mandalorian - S2E4: Chapter 12: The Siege",
    "type": "series",
    "era": "Unknown",
    "year": "9 ABY",
    "releaseDate": "2020-11-20",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2258",
    "title": "Grogu Cutest In The Galaxy - S1E13: Episode 13 (Grogu Cutest In The Galaxy)",
    "type": "series",
    "era": "Unknown",
    "year": "9 ABY",
    "releaseDate": "2025-09-30",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2260",
    "title": "Star Wars: The Mandalorian - S2E5: Chapter 13: The Jedi",
    "type": "series",
    "era": "Unknown",
    "year": "9 ABY",
    "releaseDate": "2020-11-27",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2262",
    "title": "Star Wars: The Mandalorian - S2E6: Chapter 14: The Tragedy",
    "type": "series",
    "era": "Unknown",
    "year": "9 ABY",
    "releaseDate": "2020-12-04",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2265",
    "title": "Star Wars: The Mandalorian - S2E7: Chapter 15: The Believer",
    "type": "series",
    "era": "Unknown",
    "year": "9 ABY",
    "releaseDate": "2020-12-11",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2267",
    "title": "Star Wars: The Mandalorian - S2E8: Chapter 16: The Rescue",
    "type": "series",
    "era": "Unknown",
    "year": "9 ABY",
    "releaseDate": "2020-12-18",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2270",
    "title": "Star Wars: The Book of Boba Fett - S1E1: Chapter 1: Stranger in a Strange Land",
    "type": "series",
    "era": "Unknown",
    "year": "9 ABY",
    "releaseDate": "2021-12-29",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2272",
    "title": "Star Wars: The Book of Boba Fett - S1E2: Chapter 2: The Tribes of Tatooine",
    "type": "series",
    "era": "Unknown",
    "year": "9 ABY",
    "releaseDate": "2022-01-05",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2273",
    "title": "Star Wars: The Book of Boba Fett - S1E3: Chapter 3: The Streets of Mos Espa",
    "type": "series",
    "era": "Unknown",
    "year": "9 ABY",
    "releaseDate": "2022-01-12",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2274",
    "title": "Star Wars: The Book of Boba Fett - S1E4: Chapter 4: The Gathering Storm",
    "type": "series",
    "era": "Unknown",
    "year": "9 ABY",
    "releaseDate": "2022-01-19",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2275",
    "title": "Star Wars: The Book of Boba Fett - S1E5: Chapter 5: Return of the Mandalorian",
    "type": "series",
    "era": "Unknown",
    "year": "c. 9 ABY",
    "releaseDate": "2022-01-26",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2276",
    "title": "Star Wars: The Book of Boba Fett - S1E6: Chapter 6: From the Desert Comes a Stranger",
    "type": "series",
    "era": "Unknown",
    "year": "c. 9 ABY",
    "releaseDate": "2022-02-02",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2277",
    "title": "Star Wars: The Book of Boba Fett - S1E7: Chapter 7: In the Name of Honor",
    "type": "series",
    "era": "Unknown",
    "year": "c. 9 ABY",
    "releaseDate": "2022-02-09",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2278",
    "title": "Star Wars: The Mandalorian - S3E1: Chapter 17: The Apostate",
    "type": "series",
    "era": "Unknown",
    "year": "9 ABY",
    "releaseDate": "2023-03-01",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2280",
    "title": "Star Wars: The Mandalorian - S3E2: Chapter 18: The Mines of Mandalore",
    "type": "series",
    "era": "Unknown",
    "year": "9 ABY",
    "releaseDate": "2023-03-08",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2281",
    "title": "Star Wars: The Mandalorian - S3E3: Chapter 19: The Convert",
    "type": "series",
    "era": "Unknown",
    "year": "9 ABY",
    "releaseDate": "2023-03-15",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2282",
    "title": "Star Wars: The Mandalorian - S3E4: Chapter 20: The Foundling",
    "type": "series",
    "era": "Unknown",
    "year": "9 ABY",
    "releaseDate": "2023-03-22",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2283",
    "title": "Star Wars: The Mandalorian - S3E5: Chapter 21: The Pirate",
    "type": "series",
    "era": "Unknown",
    "year": "9 ABY",
    "releaseDate": "2023-03-29",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2284",
    "title": "Star Wars: The Mandalorian - S3E6: Chapter 22: Guns for Hire",
    "type": "series",
    "era": "Unknown",
    "year": "9 ABY",
    "releaseDate": "2023-04-05",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2285",
    "title": "Star Wars: The Mandalorian - S3E7: Chapter 23: The Spies",
    "type": "series",
    "era": "Unknown",
    "year": "9 ABY",
    "releaseDate": "2023-04-07",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2286",
    "title": "Grogu Cutest In The Galaxy - S1E1: Episode 1 (Grogu Cutest In The Galaxy)",
    "type": "series",
    "era": "Unknown",
    "year": "9 ABY",
    "releaseDate": "2024-12-06",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2287",
    "title": "Grogu Cutest In The Galaxy - S1E2: Episode 2 (Grogu Cutest In The Galaxy)",
    "type": "series",
    "era": "Unknown",
    "year": "9 ABY",
    "releaseDate": "2024-12-10",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2288",
    "title": "Grogu Cutest In The Galaxy - S1E3: Episode 3 (Grogu Cutest In The Galaxy)",
    "type": "series",
    "era": "Unknown",
    "year": "9 ABY",
    "releaseDate": "2024-12-24",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2289",
    "title": "Grogu Cutest In The Galaxy - S1E4: Episode 4 (Grogu Cutest In The Galaxy)",
    "type": "series",
    "era": "Unknown",
    "year": "9 ABY",
    "releaseDate": "2025-01-14",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2290",
    "title": "Grogu Cutest In The Galaxy - S1E5: Episode 5 (Grogu Cutest In The Galaxy)",
    "type": "series",
    "era": "Unknown",
    "year": "9 ABY",
    "releaseDate": "2025-01-21",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2291",
    "title": "Grogu Cutest In The Galaxy - S1E6: Episode 6 (Grogu Cutest In The Galaxy)",
    "type": "series",
    "era": "Unknown",
    "year": "9 ABY",
    "releaseDate": "2025-02-18",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2292",
    "title": "Grogu Cutest In The Galaxy - S1E7: Episode 7 (Grogu Cutest In The Galaxy)",
    "type": "series",
    "era": "Unknown",
    "year": "9 ABY",
    "releaseDate": "2025-03-04",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2293",
    "title": "Grogu Cutest In The Galaxy - S1E8: Episode 8 (Grogu Cutest In The Galaxy)",
    "type": "series",
    "era": "Unknown",
    "year": "9 ABY",
    "releaseDate": "2025-04-15",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2294",
    "title": "Grogu Cutest In The Galaxy - S1E9: Episode 9 (Grogu Cutest In The Galaxy)",
    "type": "series",
    "era": "Unknown",
    "year": "9 ABY",
    "releaseDate": "2025-05-20",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2295",
    "title": "Grogu Cutest In The Galaxy - S1E10: Episode 10 (Grogu Cutest In The Galaxy)",
    "type": "series",
    "era": "Unknown",
    "year": "9 ABY",
    "releaseDate": "2025-06-24",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2296",
    "title": "Grogu Cutest In The Galaxy - S1E11: Episode 11 (Grogu Cutest In The Galaxy)",
    "type": "series",
    "era": "Unknown",
    "year": "9 ABY",
    "releaseDate": "2025-07-08",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2297",
    "title": "Grogu Cutest In The Galaxy - S1E12: Episode 12 (Grogu Cutest In The Galaxy)",
    "type": "series",
    "era": "Unknown",
    "year": "9 ABY",
    "releaseDate": "2025-08-26",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2298",
    "title": "Grogu Cutest In The Galaxy - S1E14: Episode 14 (Grogu Cutest In The Galaxy)",
    "type": "series",
    "era": "Unknown",
    "year": "9 ABY",
    "releaseDate": "2025-10-28",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2299",
    "title": "Grogu Cutest In The Galaxy - S1E15: Episode 15 (Grogu Cutest In The Galaxy)",
    "type": "series",
    "era": "Unknown",
    "year": "9 ABY",
    "releaseDate": "2025-11-26",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2300",
    "title": "Star Wars: The Mandalorian - S3E8: Chapter 24: The Return",
    "type": "series",
    "era": "Unknown",
    "year": "9 ABY",
    "releaseDate": "2023-04-19",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2301",
    "title": "Star Wars: Ahsoka - S1E1: Part One: Master and Apprentice",
    "type": "series",
    "era": "Unknown",
    "year": "c. 9 ABY",
    "releaseDate": "2023-08-22",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2303",
    "title": "Star Wars: Ahsoka - S1E2: Part Two: Toil and Trouble",
    "type": "series",
    "era": "Unknown",
    "year": "c. 9 ABY",
    "releaseDate": "2023-08-22",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2305",
    "title": "Star Wars: Ahsoka - S1E3: Part Three: Time to Fly",
    "type": "series",
    "era": "Unknown",
    "year": "c. 9 ABY",
    "releaseDate": "2023-08-29",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2307",
    "title": "Star Wars: Ahsoka - S1E4: Part Four: Fallen Jedi",
    "type": "series",
    "era": "Unknown",
    "year": "c. 9 ABY",
    "releaseDate": "2023-09-06",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2309",
    "title": "Star Wars: Ahsoka - S1E5: Part Five: Shadow Warrior",
    "type": "series",
    "era": "Unknown",
    "year": "c. 9 ABY",
    "releaseDate": "2023-09-13",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2311",
    "title": "Star Wars: Ahsoka - S1E6: Part Six: Far, Far Away",
    "type": "series",
    "era": "Unknown",
    "year": "c. 9 ABY",
    "releaseDate": "2023-09-19",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2313",
    "title": "Star Wars: Ahsoka - S1E7: Part Seven: Dreams and Madness",
    "type": "series",
    "era": "Unknown",
    "year": "c. 9 ABY",
    "releaseDate": "2023-09-26",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2315",
    "title": "Star Wars: Ahsoka - S1E8: Part Eight: The Jedi, the Witch, and the Warlord",
    "type": "series",
    "era": "Unknown",
    "year": "c. 9 ABY",
    "releaseDate": "2023-10-03",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2317",
    "title": "Star Wars: Skeleton Crew - S1E1: This Could Be a Real Adventure",
    "type": "series",
    "era": "Unknown",
    "year": "c. 9 ABY",
    "releaseDate": "2024-12-02",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2318",
    "title": "Star Wars: Skeleton Crew - S1E2: Way, Way Out Past the Barrier",
    "type": "series",
    "era": "Unknown",
    "year": "c. 9 ABY",
    "releaseDate": "2024-12-02",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2319",
    "title": "Star Wars: Skeleton Crew - S1E3: Very Interesting, As an Astrogation Problem",
    "type": "series",
    "era": "Unknown",
    "year": "c. 9 ABY",
    "releaseDate": "2024-12-10",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2320",
    "title": "Star Wars: Skeleton Crew - S1E4: Can't Say I Remember No At Attin",
    "type": "series",
    "era": "Unknown",
    "year": "c. 9 ABY",
    "releaseDate": "2024-12-17",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2321",
    "title": "Star Wars: Skeleton Crew - S1E5: You Have a Lot to Learn About Pirates",
    "type": "series",
    "era": "Unknown",
    "year": "c. 9 ABY",
    "releaseDate": "2024-12-24",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2322",
    "title": "Star Wars: Skeleton Crew - S1E6: Zero Friends Again",
    "type": "series",
    "era": "Unknown",
    "year": "c. 9 ABY",
    "releaseDate": "2024-12-31",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2323",
    "title": "Star Wars: Skeleton Crew - S1E7: We're Gonna Be In So Much Trouble",
    "type": "series",
    "era": "Unknown",
    "year": "c. 9 ABY",
    "releaseDate": "2025-01-07",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2324",
    "title": "Star Wars: Skeleton Crew - S1E8: The Real Good Guys",
    "type": "series",
    "era": "Unknown",
    "year": "c. 9 ABY",
    "releaseDate": "2025-01-14",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2325",
    "title": "Star Wars: The Mandalorian and Grogu",
    "type": "movie",
    "era": "Unknown",
    "year": "2026-05-22",
    "releaseDate": "2026-05-22",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2327",
    "title": "Untitled Star Wars film (Dave Filoni)",
    "type": "movie",
    "era": "Unknown",
    "year": "Unknown",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2415",
    "title": "Star Wars Resistance - S1E1–2: The Recruit",
    "type": "series",
    "era": "Unknown",
    "year": "34 ABY",
    "releaseDate": "2018-10-07",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2420",
    "title": "Star Wars Resistance - S1E3: The Triple Dark",
    "type": "series",
    "era": "Unknown",
    "year": "34 ABY",
    "releaseDate": "2018-10-14",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2423",
    "title": "Star Wars Resistance - S1E4: Fuel for the Fire",
    "type": "series",
    "era": "Unknown",
    "year": "34 ABY",
    "releaseDate": "2018-10-21",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2426",
    "title": "Star Wars Resistance - S1E5: The High Tower",
    "type": "series",
    "era": "Unknown",
    "year": "34 ABY",
    "releaseDate": "2018-10-28",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2428",
    "title": "Star Wars Resistance - S1E6: The Children from Tehar",
    "type": "series",
    "era": "Unknown",
    "year": "34 ABY",
    "releaseDate": "2018-11-04",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2429",
    "title": "Star Wars Resistance - S1E7: Signal from Sector Six",
    "type": "series",
    "era": "Unknown",
    "year": "34 ABY",
    "releaseDate": "2018-11-11",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2431",
    "title": "Star Wars Resistance - S1E1: The Search for Kaz",
    "type": "series",
    "era": "Unknown",
    "year": "34 ABY",
    "releaseDate": "2018-12-10",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2432",
    "title": "Star Wars Resistance - S1E8: Synara's Score",
    "type": "series",
    "era": "Unknown",
    "year": "34 ABY",
    "releaseDate": "2018-11-18",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2433",
    "title": "Star Wars Resistance - S1E9: The Platform Classic",
    "type": "series",
    "era": "Unknown",
    "year": "34 ABY",
    "releaseDate": "2018-11-25",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2434",
    "title": "Star Wars Resistance - S1E10: Secrets and Holograms",
    "type": "series",
    "era": "Unknown",
    "year": "34 ABY",
    "releaseDate": "2018-12-02",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2435",
    "title": "Star Wars Resistance - S1E11: Station Theta Black (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "34 ABY",
    "releaseDate": "2018-12-09",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2437",
    "title": "Star Wars Resistance - S1E12: Bibo (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "34 ABY",
    "releaseDate": "2019-01-13",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2438",
    "title": "Star Wars Resistance - S1E13: Dangerous Business",
    "type": "series",
    "era": "Unknown",
    "year": "34 ABY",
    "releaseDate": "2019-01-20",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2439",
    "title": "Star Wars Resistance - S1E2: Dart and Cover",
    "type": "series",
    "era": "Unknown",
    "year": "34 ABY",
    "releaseDate": "2018-12-10",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2440",
    "title": "Star Wars Resistance - S1E3: Neeku's Reward",
    "type": "series",
    "era": "Unknown",
    "year": "34 ABY",
    "releaseDate": "2018-12-10",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2441",
    "title": "Star Wars Resistance - S1E7: Bucket's Quest",
    "type": "series",
    "era": "Unknown",
    "year": "34 ABY",
    "releaseDate": "2018-12-23",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2442",
    "title": "Star Wars Resistance - S1E4: When Thieves Drop By",
    "type": "series",
    "era": "Unknown",
    "year": "34 ABY",
    "releaseDate": "2018-12-17",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2443",
    "title": "Star Wars Resistance - S1E5: Treasure Chest",
    "type": "series",
    "era": "Unknown",
    "year": "34 ABY",
    "releaseDate": "2018-12-17",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2444",
    "title": "Star Wars Resistance - S1E6: G-LN (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "34 ABY",
    "releaseDate": "2018-12-17",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2445",
    "title": "Star Wars Resistance - S1E8: Unmotivated",
    "type": "series",
    "era": "Unknown",
    "year": "34 ABY",
    "releaseDate": "2018-12-24",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2446",
    "title": "Star Wars Resistance - S1E9: The Need for Speed",
    "type": "series",
    "era": "Unknown",
    "year": "34 ABY",
    "releaseDate": "2018-12-24",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2447",
    "title": "Star Wars Resistance - S1E12: The Rematch",
    "type": "series",
    "era": "Unknown",
    "year": "34 ABY",
    "releaseDate": "2018-12-31",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2448",
    "title": "Star Wars Resistance - S1E11: Sixty Seconds to Destruction",
    "type": "series",
    "era": "Unknown",
    "year": "34 ABY",
    "releaseDate": "2018-12-31",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2449",
    "title": "Star Wars Resistance - S1E10: Buggle's Day Out",
    "type": "series",
    "era": "Unknown",
    "year": "34 ABY",
    "releaseDate": "2018-12-31",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2450",
    "title": "Star Wars Resistance - S1E14: The Doza Dilemma",
    "type": "series",
    "era": "Unknown",
    "year": "34 ABY",
    "releaseDate": "2019-01-27",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2452",
    "title": "Star Wars Resistance - S1E15: The First Order Occupation",
    "type": "series",
    "era": "Unknown",
    "year": "34 ABY",
    "releaseDate": "2019-02-03",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2454",
    "title": "Star Wars Resistance - S1E16: The New Trooper",
    "type": "series",
    "era": "Unknown",
    "year": "34 ABY",
    "releaseDate": "2019-02-10",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2460",
    "title": "Star Wars Forces of Destiny - S1E15: The Happabore Hazard",
    "type": "series",
    "era": "Unknown",
    "year": "2017-10-29",
    "releaseDate": "2017-10-29",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2462",
    "title": "Star Wars Forces of Destiny - S2E5: Run Rey Run",
    "type": "series",
    "era": "Unknown",
    "year": "2018-03-19",
    "releaseDate": "2018-03-19",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2469",
    "title": "Star Wars Resistance - S1E17: The Core Problem",
    "type": "series",
    "era": "Unknown",
    "year": "34 ABY",
    "releaseDate": "2019-02-17",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2470",
    "title": "Star Wars Resistance - S1E18: The Disappeared",
    "type": "series",
    "era": "Unknown",
    "year": "34 ABY",
    "releaseDate": "2019-02-24",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2471",
    "title": "Star Wars Resistance - S1E19: Descent (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "34 ABY",
    "releaseDate": "2019-03-03",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2472",
    "title": "Star Wars: Episode VII The Force Awakens",
    "type": "movie",
    "era": "Unknown",
    "year": "34 ABY",
    "releaseDate": "2015-12-18",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2482",
    "title": "Star Wars Galaxy of Adventures - S1E39: The Force Calls to Rey",
    "type": "series",
    "era": "Unknown",
    "year": "34 ABY",
    "releaseDate": "2020-03-13",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2483",
    "title": "Star Wars Galaxy of Adventures - S1E45: An Unlikely Friendship (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "34 ABY",
    "releaseDate": "2020-04-24",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2484",
    "title": "Star Wars Galaxy of Adventures - S1E41: BB-8 - A Hero Rolls Out",
    "type": "series",
    "era": "Unknown",
    "year": "34 ABY",
    "releaseDate": "2020-03-27",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2485",
    "title": "Star Wars Galaxy of Adventures - S1E42: Rey and Finn vs. Kylo Ren",
    "type": "series",
    "era": "Unknown",
    "year": "34 ABY",
    "releaseDate": "2020-04-03",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2486",
    "title": "Star Wars Galaxy of Adventures - S1E46: The First Order vs. The Resistance",
    "type": "series",
    "era": "Unknown",
    "year": "34 ABY",
    "releaseDate": "2020-05-01",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2487",
    "title": "Star Wars Galaxy of Adventures - S1E40: Leia Organa - A Princess, A General, A Mentor",
    "type": "series",
    "era": "Unknown",
    "year": "34–35 ABY",
    "releaseDate": "2020-03-20",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2517",
    "title": "Star Wars Forces of Destiny - S1E1: Sands of Jakku",
    "type": "series",
    "era": "Unknown",
    "year": "34 ABY",
    "releaseDate": "2017-07-03",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2518",
    "title": "Star Wars Forces of Destiny - S1E2: BB-8 Bandits",
    "type": "series",
    "era": "Unknown",
    "year": "34 ABY",
    "releaseDate": "2017-04-14",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2521",
    "title": "Star Wars Forces of Destiny - S1E10: Tracker Trouble",
    "type": "series",
    "era": "Unknown",
    "year": "34 ABY",
    "releaseDate": "2017-10-01",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2524",
    "title": "Star Wars Resistance - S1E20: No Escape: Part 1",
    "type": "series",
    "era": "Unknown",
    "year": "34 ABY",
    "releaseDate": "2019-03-10",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2525",
    "title": "Star Wars Resistance - S1E21: No Escape: Part 2",
    "type": "series",
    "era": "Unknown",
    "year": "34 ABY",
    "releaseDate": "2019-03-17",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2526",
    "title": "Star Wars Resistance - S2E1: Into the Unknown",
    "type": "series",
    "era": "Unknown",
    "year": "34 ABY",
    "releaseDate": "2019-04-15",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2528",
    "title": "Star Wars Forces of Destiny - S2E13: Perilous Pursuit",
    "type": "series",
    "era": "Unknown",
    "year": "34 ABY",
    "releaseDate": "2018-05-04",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2543",
    "title": "Star Wars: Episode VIII The Last Jedi",
    "type": "movie",
    "era": "Unknown",
    "year": "34 ABY",
    "releaseDate": "2017-12-15",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2569",
    "title": "Star Wars Forces of Destiny - S2E8: Porg Problems",
    "type": "series",
    "era": "Unknown",
    "year": "34 ABY",
    "releaseDate": "2018-03-19",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2570",
    "title": "Star Wars Forces of Destiny - S2E12: Porgs!",
    "type": "series",
    "era": "Unknown",
    "year": "34 ABY",
    "releaseDate": "2018-05-04",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2572",
    "title": "Star Wars Forces of Destiny - S2E3: Shuttle Shock",
    "type": "series",
    "era": "Unknown",
    "year": "34 ABY",
    "releaseDate": "2018-03-19",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2586",
    "title": "Star Wars Resistance - S2E2: A Quick Salvage Run",
    "type": "series",
    "era": "Unknown",
    "year": "c. 34 ABY",
    "releaseDate": "2019-10-13",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2587",
    "title": "Star Wars Resistance - S2E3: Live Fire",
    "type": "series",
    "era": "Unknown",
    "year": "c. 34 ABY",
    "releaseDate": "2019-10-20",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2588",
    "title": "Star Wars Resistance - S2E4: Hunt on Celsor 3",
    "type": "series",
    "era": "Unknown",
    "year": "c. 34 ABY",
    "releaseDate": "2019-10-27",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2590",
    "title": "Star Wars Galaxy of Creatures - S1E12: Tauntaun (Galaxy of Creatures)",
    "type": "series",
    "era": "Unknown",
    "year": "c. 34 ABY",
    "releaseDate": "2021-11-18",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2591",
    "title": "Star Wars Galaxy of Creatures - S1E5: Wampa (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "c. 34 ABY",
    "releaseDate": "2021-10-28",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2592",
    "title": "Star Wars Galaxy of Creatures - S1E11: Rancor (Galaxy of Creatures)",
    "type": "series",
    "era": "Unknown",
    "year": "c. 34 ABY",
    "releaseDate": "2021-11-18",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2593",
    "title": "Star Wars Galaxy of Creatures - S1E2: Bantha (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "c. 34 ABY",
    "releaseDate": "2021-10-14",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2594",
    "title": "Star Wars Galaxy of Creatures - S1E3: Blurrg (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "c. 34 ABY",
    "releaseDate": "2021-10-21",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2595",
    "title": "Star Wars Galaxy of Creatures - S1E9: Nexu (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "c. 34 ABY",
    "releaseDate": "2021-11-11",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2596",
    "title": "Star Wars Galaxy of Creatures - S1E4: Voorpak (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "c. 34 ABY",
    "releaseDate": "2021-10-21",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2597",
    "title": "Star Wars Galaxy of Creatures - S1E6: Tooka (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "c. 34 ABY",
    "releaseDate": "2021-10-28",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2598",
    "title": "Star Wars Galaxy of Creatures - S1E10: Charhound (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "c. 34 ABY",
    "releaseDate": "2021-11-11",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2599",
    "title": "Star Wars Galaxy of Creatures - S1E8: Mynocks (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "c. 34 ABY",
    "releaseDate": "2021-11-04",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2600",
    "title": "Star Wars Galaxy of Creatures - S1E7: Kowakian Monkey-Lizards (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "c. 34 ABY",
    "releaseDate": "2021-11-04",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2601",
    "title": "Star Wars Galaxy of Creatures - S1E1: Porgs (Galaxy of Creatures)",
    "type": "series",
    "era": "Unknown",
    "year": "c. 34 ABY",
    "releaseDate": "2021-10-14",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2602",
    "title": "Star Wars Galactic Pals - S1E1: Wookiee (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "c. 34 ABY",
    "releaseDate": "2022-04-12",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2603",
    "title": "Star Wars Galactic Pals - S1E2: Ewok (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "c. 34 ABY",
    "releaseDate": "2022-04-12",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2604",
    "title": "Star Wars Galactic Pals - S1E3: Jawa (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "c. 34 ABY",
    "releaseDate": "2022-04-17",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2605",
    "title": "Star Wars Galactic Pals - S1E4: Rodian (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "c. 34 ABY",
    "releaseDate": "2022-04-17",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2606",
    "title": "Star Wars Galactic Pals - S1E5: Gamorrean (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "c. 34 ABY",
    "releaseDate": "2022-04-26",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2607",
    "title": "Star Wars Galactic Pals - S1E6: Huttlet (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "c. 34 ABY",
    "releaseDate": "2022-04-26",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2608",
    "title": "Star Wars Galactic Pals - S1E7: Tauntaun (Galactic Pals)",
    "type": "series",
    "era": "Unknown",
    "year": "c. 34 ABY",
    "releaseDate": "2022-10-18",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2609",
    "title": "Star Wars Galactic Pals - S1E8: Rancor (Galactic Pals)",
    "type": "series",
    "era": "Unknown",
    "year": "c. 34 ABY",
    "releaseDate": "2022-10-18",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2610",
    "title": "Star Wars Galactic Pals - S1E9: Porgs (Galactic Pals)",
    "type": "series",
    "era": "Unknown",
    "year": "c. 34 ABY",
    "releaseDate": "2022-10-25",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2611",
    "title": "Star Wars Galactic Pals - S1E10: Ortolan (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "c. 34 ABY",
    "releaseDate": "2022-10-25",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2612",
    "title": "Star Wars Galactic Pals - S1E11: Gungan (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "c. 34 ABY",
    "releaseDate": "2022-11-01",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2613",
    "title": "Star Wars Galactic Pals - S1E12: Loth-Cat (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "c. 34 ABY",
    "releaseDate": "2022-11-01",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2614",
    "title": "Star Wars Galaxy of Creatures - S1E13: Bogling (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "c. 34 ABY",
    "releaseDate": "2023-01-17",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2615",
    "title": "Star Wars Galaxy of Creatures - S1E14: Eopie (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "c. 34 ABY",
    "releaseDate": "2023-01-17",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2616",
    "title": "Star Wars Galaxy of Creatures - S1E15: Convor (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "c. 34 ABY",
    "releaseDate": "2023-01-24",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2617",
    "title": "Star Wars Galaxy of Creatures - S2E16: Gergilla (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "c. 34 ABY",
    "releaseDate": "2023-01-24",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2618",
    "title": "Star Wars Galaxy of Creatures - S2E18: Kybuck (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "c. 34 ABY",
    "releaseDate": "2023-01-31",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2619",
    "title": "Star Wars Galaxy of Creatures - S2E17: Kamoradon (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "c. 34 ABY",
    "releaseDate": "2023-01-31",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2620",
    "title": "Star Wars Galaxy of Creatures - S2E20: Dianoga (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "c. 34 ABY",
    "releaseDate": "2023-02-07",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2621",
    "title": "Star Wars Galaxy of Creatures - S2E19: Ice Spider (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "c. 34 ABY",
    "releaseDate": "2023-02-07",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2622",
    "title": "Star Wars Galaxy of Creatures - S2E22: Puffer Pig (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "c. 34 ABY",
    "releaseDate": "2023-02-14",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2623",
    "title": "Star Wars Galaxy of Creatures - S2E21: Gundark (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "c. 34 ABY",
    "releaseDate": "2023-02-14",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2624",
    "title": "Star Wars Galaxy of Creatures - S2E24: Gorgs (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "c. 34 ABY",
    "releaseDate": "2023-02-21",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2625",
    "title": "Star Wars Galaxy of Creatures - S2E23: Ordo Moon Dragon (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "c. 34 ABY",
    "releaseDate": "2023-02-21",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2626",
    "title": "Star Wars Resistance - S2E5: The Engineer",
    "type": "series",
    "era": "Unknown",
    "year": "c. 34 ABY",
    "releaseDate": "2019-11-03",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2627",
    "title": "Star Wars Resistance - S2E6: From Beneath",
    "type": "series",
    "era": "Unknown",
    "year": "c. 34 ABY",
    "releaseDate": "2019-11-10",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2628",
    "title": "Star Wars Resistance - S2E7: The Relic Raiders",
    "type": "series",
    "era": "Unknown",
    "year": "c. 34 ABY",
    "releaseDate": "2019-11-17",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2629",
    "title": "Star Wars Resistance - S2E8: Rendezvous Point (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "c. 34 ABY",
    "releaseDate": "2019-11-24",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2630",
    "title": "Star Wars Resistance - S2E9: The Voxx Vortex 5000",
    "type": "series",
    "era": "Unknown",
    "year": "c. 34 ABY",
    "releaseDate": "2019-12-01",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2631",
    "title": "Star Wars Resistance - S2E10: Kaz's Curse",
    "type": "series",
    "era": "Unknown",
    "year": "c. 34 ABY",
    "releaseDate": "2019-12-08",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2641",
    "title": "Star Wars Resistance - S2E11: Station to Station",
    "type": "series",
    "era": "Unknown",
    "year": "c. 34 ABY",
    "releaseDate": "2019-12-15",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2642",
    "title": "Star Wars Resistance - S2E12: The Missing Agent",
    "type": "series",
    "era": "Unknown",
    "year": "c. 34 ABY and 35 ABY",
    "releaseDate": "2019-12-22",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2643",
    "title": "Star Wars Resistance - S2E13: Breakout",
    "type": "series",
    "era": "Unknown",
    "year": "c. 34 ABY and 35 ABY",
    "releaseDate": "2019-12-29",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2644",
    "title": "Star Wars Resistance - S2E14: The Mutiny",
    "type": "series",
    "era": "Unknown",
    "year": "c. 34 ABY",
    "releaseDate": "2020-01-05",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2645",
    "title": "Star Wars Resistance - S2E15: The New World",
    "type": "series",
    "era": "Unknown",
    "year": "c. 34 ABY",
    "releaseDate": "2020-01-12",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2646",
    "title": "Star Wars Resistance - S2E16: No Place Safe",
    "type": "series",
    "era": "Unknown",
    "year": "c. 34 ABY",
    "releaseDate": "2020-01-12",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2647",
    "title": "Star Wars Resistance - S2E17: Rebuilding the Resistance",
    "type": "series",
    "era": "Unknown",
    "year": "c. 34 ABY",
    "releaseDate": "2020-01-19",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2683",
    "title": "Star Wars Galaxy of Adventures - S1E52: Black Spire Outpost (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "34 ABY",
    "releaseDate": "2020-08-27",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2684",
    "title": "Star Wars Galaxy of Adventures - S1E51: Millennium Falcon - Smugglers Run",
    "type": "series",
    "era": "Unknown",
    "year": "34 ABY",
    "releaseDate": "2020-08-27",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2685",
    "title": "Star Wars Galaxy of Adventures - S1E53: Rise of the Resistance",
    "type": "series",
    "era": "Unknown",
    "year": "34 ABY",
    "releaseDate": "2020-08-27",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2708",
    "title": "Star Wars Forces of Destiny - S1E1: Star Wars Forces of Destiny: Volume 1",
    "type": "series",
    "era": "Unknown",
    "year": "2017-10-01",
    "releaseDate": "2017-10-01",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2709",
    "title": "Star Wars Forces of Destiny - S1E1: Star Wars Forces of Destiny: Volume 2",
    "type": "series",
    "era": "Unknown",
    "year": "2017-10-29",
    "releaseDate": "2017-10-29",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2710",
    "title": "Star Wars Forces of Destiny - S2E1: Star Wars Forces of Destiny: Volume 3",
    "type": "series",
    "era": "Unknown",
    "year": "2018-03-25",
    "releaseDate": "2018-03-25",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2711",
    "title": "Star Wars Forces of Destiny - S2E1: Star Wars Forces of Destiny: Volume 4",
    "type": "series",
    "era": "Unknown",
    "year": "2018-05-25",
    "releaseDate": "2018-05-25",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2737",
    "title": "Star Wars Resistance - S2E18–19: The Escape (episode)",
    "type": "series",
    "era": "Unknown",
    "year": "35 ABY",
    "releaseDate": "2020-01-26",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2738",
    "title": "Star Wars: Episode IX The Rise of Skywalker",
    "type": "movie",
    "era": "Unknown",
    "year": "35 ABY",
    "releaseDate": "2019-12-20",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2748",
    "title": "Star Wars Galaxy of Adventures - S1E44: Kylo Ren vs. Resistance Rebels",
    "type": "series",
    "era": "Unknown",
    "year": "35 ABY",
    "releaseDate": "2020-04-17",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2755",
    "title": "Star Wars Galaxy of Adventures - S1E37: Rey and Friends vs. The First Order",
    "type": "series",
    "era": "Unknown",
    "year": "2020-03-13",
    "releaseDate": "2020-03-13",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2756",
    "title": "Star Wars Galaxy of Adventures - S1E38: Kylo Ren and Darth Vader - A Legacy of Power",
    "type": "series",
    "era": "Unknown",
    "year": "2020-03-13",
    "releaseDate": "2020-03-13",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2759",
    "title": "Star Wars: Droid Diaries - S1E1: R2-D2 and BB-8's Messy Mission!",
    "type": "series",
    "era": "Unknown",
    "year": "2025-09-05",
    "releaseDate": "2025-09-05",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2760",
    "title": "Star Wars: Droid Diaries - S1E5: Who's Making That Noise in The Millennium Falcon?!",
    "type": "series",
    "era": "Unknown",
    "year": "2025-10-17",
    "releaseDate": "2025-10-17",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2761",
    "title": "Star Wars: Droid Diaries - S1E2: Babu Frik's Repair Shop Malfunction",
    "type": "series",
    "era": "Unknown",
    "year": "2025-09-12",
    "releaseDate": "2025-09-12",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2762",
    "title": "Star Wars: Droid Diaries - S1E3: Rey's Lightsaber On The Loose",
    "type": "series",
    "era": "Unknown",
    "year": "2025-09-18",
    "releaseDate": "2025-09-18",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2763",
    "title": "Star Wars: Droid Diaries - S1E4: Helping Chewbacca Save The Millennium Falcon!",
    "type": "series",
    "era": "Unknown",
    "year": "2025-09-26",
    "releaseDate": "2025-09-26",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2764",
    "title": "Star Wars: Droid Diaries - S1E6: BB-8 and R2-D2 Go Undercover!",
    "type": "series",
    "era": "Unknown",
    "year": "2025-10-24",
    "releaseDate": "2025-10-24",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2765",
    "title": "Star Wars: Droid Diaries - S1E7: R2-D2 and BB-8's Super Snowy Shenanigans",
    "type": "series",
    "era": "Unknown",
    "year": "2025-10-31",
    "releaseDate": "2025-10-31",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2766",
    "title": "Star Wars: Droid Diaries - S1E8: R2-D2 and BB-8 Chased By A Bounty Hunter?!",
    "type": "series",
    "era": "Unknown",
    "year": "2025-11-07",
    "releaseDate": "2025-11-07",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2767",
    "title": "Star Wars: Starfighter",
    "type": "movie",
    "era": "Unknown",
    "year": "40 ABY",
    "releaseDate": "2027-05-27",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2768",
    "title": "Untitled Star Wars film (Sharmeen Obaid-Chinoy)",
    "type": "movie",
    "era": "Unknown",
    "year": "50 ABY",
    "primaryPlanet": "Unknown Spaces"
  },
  {
    "id": "2769",
    "title": "Untitled Star Wars trilogy (Simon Kinberg)",
    "type": "movie",
    "era": "Unknown",
    "year": "After 35 ABY",
    "primaryPlanet": "Unknown Spaces"
  }
];

// Filter out Young Jedi Adventures and its spin-offs to ensure purely canonical data
export const starWarsTimeline = rawTimeline.filter(item => {
  const title = item.title || "";
  if (title.includes("Young Jedi Adventures") || title.includes("Fun with Nubs")) {
    return false;
  }
  return true;
});

export const planets = {
  'Coruscant': { x: 499, y: 497, description: 'Capital of the Republic and Empire.' },
  'Naboo': { x: 616, y: 853, description: 'A peaceful world with beautiful architecture.' },
  'Geonosis': { x: 769, y: 823, description: 'Rocky, bug-infested world; birthplace of the Clone Wars.' },
  'Mandalore': { x: 632, y: 365, description: 'Home to the fearsome Mandalorian warriors.' },
  'Mustafar': { x: 457, y: 990, description: 'Volcanic planet where Darth Vader was born.' },
  'Kamino': { x: 817, y: 798, description: 'Ocean planet where the clone army was created.' },
  'Corellia': { x: 527, y: 593, description: 'Industrial world famous for shipyards.' },
  'Tatooine': { x: 766, y: 838, description: 'A harsh desert world orbiting twin suns.' },
  'Lothal': { x: 486, y: 743, description: 'Outer Rim world that birthed a rebellion cell.' },
  'Ferrix': { x: 710, y: 625, description: 'Blue-collar industrial world with strong community.' },
  'Scarif': { x: 803, y: 780, description: 'Tropical paradise used for Imperial data archives.' },
  'Hoth': { x: 403, y: 932, description: 'Frigid ice planet that housed Echo Base.' },
  'Endor': { x: 267, y: 802, description: 'The forest moon, home to the Ewoks.' },
  'Nevarro': { x: 825, y: 910, description: 'Volcanic world turned prosperous trade hub.' },
  'Peridea': { x: 1250, y: -250, description: 'A distant world in another galaxy.' },
  'Unknown Spaces': { x: 250, y: 750, description: 'Uncharted regions of the galaxy.' },
  'Castilon': { x: 900, y: 225, description: 'Ocean planet in the Outer Rim.' },
  'Jakku': { x: 325, y: 682, description: 'Desert planet littered with wreckage.' },
  'Crait': { x: 695, y: 808, description: 'Mineral world with a red surface beneath salt.' },
  'Exegol': { x: 155, y: 925, description: 'Hidden world of the Sith in the Unknown Regions.' }
};
