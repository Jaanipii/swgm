export const historicalEvents = [
  // === DAWN OF THE JEDI / HIGH REPUBLIC ===
  {
    id: "evt-force-discovered",
    title: "Discovery of the Force",
    planetId: "Ahch-To",
    year: "25,000 BBY",
    description: "The earliest Force-sensitive beings discover the mystical energy field that connects all living things, eventually founding the Jedi Order.",
    type: "force",
    era: "The High Republic",
    category: "force"
  },
  {
    id: "evt-republic-founded",
    title: "Founding of the Galactic Republic",
    planetId: "Coruscant",
    year: "25,000 BBY",
    description: "The Galactic Republic is established on Coruscant, uniting thousands of star systems under a democratic government that will endure for millennia.",
    type: "government",
    era: "The High Republic",
    category: "government"
  },
  {
    id: "evt-hyperspace-discovery",
    title: "Hyperspace Travel Pioneered",
    planetId: "Coruscant",
    year: "25,000 BBY",
    description: "The development of hyperdrive technology enables faster-than-light travel, opening up the galaxy to exploration and trade.",
    type: "discovery",
    era: "The High Republic",
    category: "discovery"
  },
  {
    id: "evt-great-hyperspace-disaster",
    title: "The Great Hyperspace Disaster",
    planetId: "Hetzal Prime",
    year: "232 BBY",
    description: "The starship Legacy Run is destroyed in hyperspace, scattering lethal debris across an entire sector and threatening billions of lives. The Jedi and Republic rally to respond.",
    type: "battle",
    era: "The High Republic",
    category: "discovery"
  },
  {
    id: "evt-nihil-conflict",
    title: "Rise of the Nihil",
    planetId: "Unknown Spaces",
    year: "232 BBY",
    description: "The marauder organization known as the Nihil, led by Marchion Ro, wages a brutal campaign against the Republic and the Jedi Order during the High Republic era.",
    type: "battle",
    era: "The High Republic",
    category: "battle"
  },
  {
    id: "evt-sith-wars",
    title: "The Old Sith Wars",
    planetId: "Korriban",
    year: "5,000 BBY",
    description: "The ancient Sith Empire wages devastating wars against the Galactic Republic and the Jedi Order, establishing an eternal conflict between the light and dark sides of the Force.",
    type: "battle",
    era: "The High Republic",
    category: "battle"
  },
  {
    id: "evt-rule-of-two",
    title: "Darth Bane's Rule of Two",
    planetId: "Korriban",
    year: "1,000 BBY",
    description: "After the Sith destroy themselves through infighting, Darth Bane establishes the Rule of Two: one master, one apprentice. The Sith go into hiding for a millennium.",
    type: "force",
    era: "The High Republic",
    category: "force"
  },

  // === FALL OF THE JEDI ===
  {
    id: "evt-naboo-blockade",
    title: "Invasion of Naboo",
    planetId: "Naboo",
    year: "32 BBY",
    description: "The Trade Federation blockades and invades Naboo, sparking the crisis that leads to the election of Chancellor Palpatine.",
    type: "battle",
    era: "Fall of the Jedi",
    category: "battle",
    timelineEpisodeId: "459" // Star Wars: Episode I The Phantom Menace
  },
  {
    id: "evt-anakin-discovered",
    title: "Anakin Skywalker Discovered",
    planetId: "Tatooine",
    year: "32 BBY",
    description: "Jedi Master Qui-Gon Jinn discovers Anakin Skywalker, a young slave with an unprecedented midi-chlorian count, believed to be the Chosen One of prophecy.",
    type: "force",
    era: "Fall of the Jedi",
    category: "force"
  },
  {
    id: "evt-separatist-crisis",
    title: "Separatist Crisis",
    planetId: "Coruscant",
    year: "24 BBY",
    description: "Thousands of star systems secede from the Republic under Count Dooku, forming the Confederacy of Independent Systems and pushing the galaxy toward civil war.",
    type: "government",
    era: "Fall of the Jedi",
    category: "government"
  },
  {
    id: "evt-geonosis",
    title: "Battle of Geonosis",
    planetId: "Geonosis",
    year: "22 BBY",
    description: "The first major conflict of the Clone Wars, pitting the newly discovered Republic Grand Army against the Separatist Droid Army.",
    type: "battle",
    era: "Fall of the Jedi",
    category: "battle",
    timelineEpisodeId: "520" // Star Wars: Episode II Attack of the Clones
  },
  {
    id: "evt-clone-wars",
    title: "Clone Wars Begin",
    planetId: "Coruscant",
    year: "22 BBY",
    description: "The galaxy-spanning Clone Wars erupt between the Galactic Republic and the Confederacy of Independent Systems, secretly orchestrated by Darth Sidious on both sides.",
    type: "battle",
    era: "Fall of the Jedi",
    category: "battle",
    timelineEpisodeId: "520" // Star Wars: Episode II Attack of the Clones
  },
  {
    id: "evt-siege-mandalore",
    title: "Siege of Mandalore",
    planetId: "Mandalore",
    year: "19 BBY",
    description: "Ahsoka Tano leads the siege to liberate Mandalore from Maul's Shadow Collective. The battle coincides with the execution of Order 66.",
    type: "battle",
    era: "Fall of the Jedi",
    category: "battle",
    timelineEpisodeId: "647" // S7E10: The Phantom Apprentice
  },
  {
    id: "evt-coruscant",
    title: "Battle of Coruscant",
    planetId: "Coruscant",
    year: "19 BBY",
    description: "A daring Separatist strike on the capital resulting in the kidnapping of Chancellor Palpatine.",
    type: "battle",
    era: "Fall of the Jedi",
    category: "battle",
    timelineEpisodeId: "777" // Star Wars: Episode III Revenge of the Sith
  },
  {
    id: "evt-order-66",
    title: "Order 66 / Fall of the Jedi",
    planetId: "Coruscant",
    year: "19 BBY",
    description: "Chancellor Palpatine executes Order 66, commanding clone troopers across the galaxy to turn on and slaughter their Jedi commanders. The Jedi Order is virtually annihilated.",
    type: "force",
    era: "Fall of the Jedi",
    category: "force",
    timelineEpisodeId: "777" // Star Wars: Episode III Revenge of the Sith
  },

  // === REIGN OF THE EMPIRE ===
  {
    id: "evt-empire-declared",
    title: "Galactic Empire Declared",
    planetId: "Coruscant",
    year: "19 BBY",
    description: "Palpatine reorganizes the Republic into the first Galactic Empire, declaring himself Emperor to thunderous applause in the Senate.",
    type: "government",
    era: "Reign of the Empire",
    category: "government",
    timelineEpisodeId: "777" // Star Wars: Episode III Revenge of the Sith
  },
  {
    id: "evt-jedi-purge",
    title: "The Great Jedi Purge",
    planetId: "Coruscant",
    year: "19 BBY",
    description: "The Empire's Inquisitors hunt down surviving Jedi across the galaxy. Vader personally leads the campaign to extinguish what remains of the Jedi Order.",
    type: "force",
    era: "Reign of the Empire",
    category: "force",
    timelineEpisodeId: "777" // Star Wars: Episode III Revenge of the Sith
  },
  {
    id: "evt-rebellion-formed",
    title: "Rebel Alliance Formed",
    planetId: "Unknown Spaces",
    year: "2 BBY",
    description: "Senator Mon Mothma publicly denounces the Empire and formally establishes the Alliance to Restore the Republic, uniting scattered resistance cells into a cohesive military force.",
    type: "government",
    era: "Reign of the Empire",
    category: "government"
  },
  {
    id: "evt-death-star-plans",
    title: "Death Star Plans Stolen",
    planetId: "Scarif",
    year: "0 BBY",
    description: "Jyn Erso and Rogue One sacrifice their lives to steal the Death Star plans from the Imperial facility on Scarif, transmitting them to the Rebel fleet.",
    type: "battle",
    era: "Reign of the Empire",
    category: "battle",
    timelineEpisodeId: "1483" // Rogue One: A Star Wars Story
  },

  // === AGE OF REBELLION ===
  {
    id: "evt-yavin",
    title: "Battle of Yavin",
    planetId: "Yavin Prime",
    year: "0 BBY",
    description: "The Rebel Alliance successfully destroys the first Death Star. This marks the epoch (0 BBY/ABY) of the galactic calendar.",
    type: "battle",
    era: "Age of Rebellion",
    category: "battle",
    timelineEpisodeId: "11" // Star Wars: Episode IV A New Hope
  },
  {
    id: "evt-hoth",
    title: "Battle of Hoth",
    planetId: "Hoth",
    year: "3 ABY",
    description: "The Galactic Empire launches a massive ground assault on Echo Base, scattering the Rebel fleet.",
    type: "battle",
    era: "Age of Rebellion",
    category: "battle",
    timelineEpisodeId: "12" // Star Wars: Episode V The Empire Strikes Back
  },
  {
    id: "evt-endor",
    title: "Battle of Endor",
    planetId: "Endor",
    year: "4 ABY",
    description: "The Rebels destroy the second Death Star and the Emperor is seemingly killed, splintering the Galactic Empire.",
    type: "battle",
    era: "Age of Rebellion",
    category: "battle",
    timelineEpisodeId: "13" // Star Wars: Episode VI Return of the Jedi
  },
  {
    id: "evt-jakku",
    title: "Battle of Jakku",
    planetId: "Jakku",
    year: "5 ABY",
    description: "The final major stand of the Galactic Empire against the New Republic, ending the Galactic Civil War.",
    type: "battle",
    era: "Age of Rebellion",
    category: "battle"
  },

  // === THE NEW REPUBLIC ===
  {
    id: "evt-galactic-concordance",
    title: "Galactic Concordance",
    planetId: "Coruscant",
    year: "5 ABY",
    description: "The peace treaty that formally ends the Galactic Civil War. The Empire surrenders and agrees to severe disarmament and reparations.",
    type: "treaty",
    era: "The New Republic",
    category: "treaty"
  },
  {
    id: "evt-new-republic-senate",
    title: "New Republic Senate Established",
    planetId: "Chandrila",
    year: "5 ABY",
    description: "Mon Mothma establishes the New Republic Senate on Chandrila, rotating the capital to prevent concentration of power. A new era of democracy begins.",
    type: "government",
    era: "The New Republic",
    category: "government"
  },
  {
    id: "evt-luke-academy",
    title: "Luke's Jedi Academy",
    planetId: "Unknown Spaces",
    year: "15 ABY",
    description: "Luke Skywalker establishes a new Jedi training temple, hoping to rebuild the Jedi Order with a new generation of Force-sensitive students, including his nephew Ben Solo.",
    type: "force",
    era: "The New Republic",
    category: "force"
  },
  {
    id: "evt-mandalore-reclaimed",
    title: "Mandalore Reclaimed",
    planetId: "Mandalore",
    year: "9 ABY",
    description: "Din Djarin and Bo-Katan Kryze rally the Mandalorian clans to retake their ancestral homeworld from Imperial Remnant forces, beginning the rebirth of Mandalorian civilization.",
    type: "battle",
    era: "The New Republic",
    category: "battle"
  },
  {
    id: "evt-ben-solo-falls",
    title: "Destruction of Luke's Temple",
    planetId: "Unknown Spaces",
    year: "28 ABY",
    description: "Ben Solo is seduced by the dark side and destroys Luke Skywalker's Jedi temple, killing most of his fellow students and taking the name Kylo Ren.",
    type: "force",
    era: "The New Republic",
    category: "force"
  },
  {
    id: "evt-first-order-rises",
    title: "Rise of the First Order",
    planetId: "Unknown Spaces",
    year: "29 ABY",
    description: "From the ashes of the Imperial Remnant in the Unknown Regions, the First Order emerges as a powerful military junta, secretly building a massive fleet to reconquer the galaxy.",
    type: "government",
    era: "Rise of the First Order",
    category: "government"
  },

  // === RISE OF THE FIRST ORDER ===
  {
    id: "evt-starkiller",
    title: "Destruction of Hosnian Prime",
    planetId: "Hosnian Prime",
    year: "34 ABY",
    description: "The First Order uses Starkiller Base to obliterate the New Republic capital system, plunging the galaxy into war.",
    type: "battle",
    era: "Rise of the First Order",
    category: "battle",
    timelineEpisodeId: "14" // Star Wars: Episode VII The Force Awakens
  },
  {
    id: "evt-crait",
    title: "Battle of Crait",
    planetId: "Crait",
    year: "34 ABY",
    description: "The remnants of the Resistance make a desperate last stand against the First Order. Luke Skywalker projects himself across the galaxy to confront Kylo Ren, sacrificing himself to save the survivors.",
    type: "battle",
    era: "Rise of the First Order",
    category: "battle",
    timelineEpisodeId: "15" // Star Wars: Episode VIII The Last Jedi
  },
  {
    id: "evt-exegol",
    title: "Battle of Exegol",
    planetId: "Exegol",
    year: "35 ABY",
    description: "A massive citizen's fleet confronts the Sith Eternal and the Final Order fleet, resulting in the final defeat of Palpatine.",
    type: "battle",
    era: "Rise of the First Order",
    category: "battle",
    timelineEpisodeId: "16" // Star Wars: Episode IX The Rise of Skywalker
  }
];

export function parseYear(yearStr) {
  if (!yearStr) return 0;
  const isBBY = yearStr.includes('BBY');
  const normalizedStr = yearStr.replace(/,/g, '');
  const match = normalizedStr.match(/\d+/);
  if (!match) return 0;
  const num = parseInt(match[0], 10);
  return isBBY ? -num : num;
}

export function getHistoricalEventForYear(yearNum) {
  let bestMatch = null;
  let minDiff = Infinity;
  historicalEvents.forEach(event => {
    const eventYear = parseYear(event.year);
    if (eventYear <= yearNum) {
      const diff = yearNum - eventYear;
      if (diff < minDiff) { minDiff = diff; bestMatch = event; }
    }
  });
  return bestMatch;
}
