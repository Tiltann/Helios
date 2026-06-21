export type Category = 'resource' | 'prime' | 'warframe' | 'mod' | 'relic'

export interface Source {
  mission: string
  planet: string
  type: string
  note?: string
  rank: number
}

export interface Item {
  name: string
  category: Category
  image?: string
  imageName?: string
  ducats?: number
  sources: Source[]
  wikiSlug?: string
  spoiler?: boolean
}

export const PLANETS: Record<string, { color: string; abbr: string }> = {
  'Earth':            { color: '#4a8c3c', abbr: 'ETH' },
  'Venus':            { color: '#c4a23c', abbr: 'VEN' },
  'Mercury':          { color: '#8c7c5c', abbr: 'MER' },
  'Mars':             { color: '#c44c3c', abbr: 'MRS' },
  'Phobos':           { color: '#8c5c3c', abbr: 'PHB' },
  'Ceres':            { color: '#9c7c5c', abbr: 'CRS' },
  'Jupiter':          { color: '#c4943c', abbr: 'JUP' },
  'Europa':           { color: '#5c8ca4', abbr: 'EUR' },
  'Saturn':           { color: '#c4b45c', abbr: 'SAT' },
  'Uranus':           { color: '#5cc4b4', abbr: 'URA' },
  'Neptune':          { color: '#3c6cc4', abbr: 'NEP' },
  'Pluto':            { color: '#7c6c8c', abbr: 'PLU' },
  'Sedna':            { color: '#c43c5c', abbr: 'SED' },
  'Eris':             { color: '#8c3c6c', abbr: 'ERS' },
  'Lua':              { color: '#d4c4a0', abbr: 'LUA' },
  'Void':             { color: '#8c5cc4', abbr: 'VOD' },
  'Kuva Fortress':    { color: '#c43c3c', abbr: 'KUV' },
  'Deimos':           { color: '#9c5c3c', abbr: 'DMO' },
  'Derelict':         { color: '#5c6c4c', abbr: 'DER' },
  'Zariman Ten Zero': { color: '#a4a4d4', abbr: 'ZAR' },
  'Orb Vallis':       { color: '#c4a23c', abbr: 'OV'  },
  'Railjack':         { color: '#3c8cc4', abbr: 'RJK' },
}

export const ITEMS: Item[] = [
  // Resources
  {
    name: 'Polymer Bundle', category: 'resource', imageName: 'polymerBundle.png',
    sources: [
      { mission: 'Ophelia', planet: 'Uranus',  type: 'Survival', note: 'Dark sector node with 105% bonus resource drop rate', rank: 1 },
      { mission: 'Assur',   planet: 'Uranus',  type: 'Survival', rank: 2 },
      { mission: 'Kappa',   planet: 'Sedna',   type: 'Survival', rank: 3 },
    ],
  },
  {
    name: 'Plastids', category: 'resource', imageName: 'plastids.png',
    sources: [
      { mission: 'Ophelia',  planet: 'Uranus', type: 'Survival',             note: 'Dark sector node with 105% bonus drop rate', rank: 1 },
      { mission: 'Memphis',  planet: 'Phobos', type: 'Survival',             rank: 2 },
      { mission: 'Piscinas', planet: 'Saturn', type: 'Dark Sector Survival', rank: 3 },
    ],
  },
  {
    name: 'Nano Spores', category: 'resource', imageName: 'nanoSpores.png',
    sources: [
      { mission: 'Gabii',    planet: 'Ceres',  type: 'Dark Sector Survival', note: 'Dark sector node with 105% bonus drop rate', rank: 1 },
      { mission: 'Piscinas', planet: 'Saturn', type: 'Dark Sector Survival', rank: 2 },
      { mission: 'Akkad',    planet: 'Eris',   type: 'Dark Sector Defense',  rank: 3 },
    ],
  },
  {
    name: 'Alloy Plate', category: 'resource', imageName: 'alloyPlate.png',
    sources: [
      { mission: 'Romula',  planet: 'Venus',  type: 'Dark Sector Survival', note: 'Dark sector node with 105% bonus drop rate', rank: 1 },
      { mission: 'Kadesh',  planet: 'Mars',   type: 'Defense',              rank: 2 },
      { mission: 'Ophelia', planet: 'Uranus', type: 'Survival',             rank: 3 },
    ],
  },
  {
    name: 'Ferrite', category: 'resource', imageName: 'ferrite.png',
    sources: [
      { mission: 'Apollodorus',     planet: 'Mercury',  type: 'Survival',   rank: 1 },
      { mission: 'Tikal',           planet: 'Earth',    type: 'Excavation', rank: 2 },
      { mission: 'Orokin Derelict', planet: 'Derelict', type: 'Survival',   rank: 3 },
    ],
  },
  {
    name: 'Rubedo', category: 'resource', imageName: 'rubedo.png',
    sources: [
      { mission: 'Any mission', planet: 'Phobos', type: 'Any', note: 'Highest density planet for Rubedo', rank: 1 },
      { mission: 'Any mission', planet: 'Pluto',  type: 'Any', rank: 2 },
      { mission: 'Any mission', planet: 'Europa', type: 'Any', rank: 3 },
    ],
  },
  {
    name: 'Neurodes', category: 'resource', imageName: 'neurodes.png',
    sources: [
      { mission: 'Mot',   planet: 'Void', type: 'Survival',     rank: 1 },
      { mission: 'Viver', planet: 'Eris', type: 'Interception', rank: 2 },
      { mission: 'Any',   planet: 'Earth', type: 'Any',         rank: 3 },
    ],
  },
  {
    name: 'Orokin Cell', category: 'resource', imageName: 'orokinCell.png',
    sources: [
      { mission: 'Tethys', planet: 'Saturn', type: 'Survival',             note: 'Sargas Ruk sometimes drops one as a bonus', rank: 1 },
      { mission: 'Gabii',  planet: 'Ceres',  type: 'Dark Sector Survival', rank: 2 },
      { mission: 'Any',    planet: 'Saturn', type: 'Any',                  rank: 3 },
    ],
  },
  {
    name: 'Argon Crystal', category: 'resource', imageName: 'argonCrystal.png',
    sources: [
      { mission: 'Mot',      planet: 'Void', type: 'Survival',      note: 'Decays after 24 hours so only farm what you need right now', rank: 1 },
      { mission: 'Any node', planet: 'Void', type: 'Container Run', note: 'Equip Loot Detector so containers show on the minimap, then sweep the tileset opening everything. Limbo with max range Cataclysm keeps you safe in the rift while you do it, or use Xaku with max range for the same result. Argon comes from lockers and breakable crates, not enemy drops.', rank: 2 },
      { mission: 'Any node', planet: 'Void', type: 'Any',           rank: 3 },
    ],
  },
  {
    name: 'Control Module', category: 'resource', imageName: 'controlModule.png',
    sources: [
      { mission: 'Any', planet: 'Void',    type: 'Container Run', note: 'Same container run as Argon Crystal works here too. Void tilesets drop both from the same lockers and crates.', rank: 1 },
      { mission: 'Any', planet: 'Neptune', type: 'Any', rank: 2 },
      { mission: 'Any', planet: 'Europa',  type: 'Any', rank: 3 },
    ],
  },
  {
    name: 'Neural Sensors', category: 'resource', imageName: 'neuralSensors.png',
    sources: [
      { mission: 'Themisto', planet: 'Jupiter', type: 'Boss', note: 'Alad V boss fight', rank: 1 },
      { mission: 'Any',      planet: 'Jupiter', type: 'Any',  rank: 2 },
    ],
  },
  {
    name: 'Morphics', category: 'resource', imageName: 'morphics.png',
    sources: [
      { mission: 'Any', planet: 'Mars',    type: 'Any', rank: 1 },
      { mission: 'Any', planet: 'Mercury', type: 'Any', rank: 2 },
      { mission: 'Any', planet: 'Phobos',  type: 'Any', rank: 3 },
    ],
  },
  {
    name: 'Circuits', category: 'resource', imageName: 'circuits.png',
    sources: [
      { mission: 'Cholistan', planet: 'Venus', type: 'Dark Sector Excavation', note: 'Dark sector node with 105% bonus drop rate', rank: 1 },
      { mission: 'Hieracon',  planet: 'Pluto', type: 'Dark Sector Excavation', rank: 2 },
      { mission: 'Any',       planet: 'Venus', type: 'Any',                    rank: 3 },
    ],
  },
  {
    name: 'Salvage', category: 'resource', imageName: 'salvage.png',
    sources: [
      { mission: 'Malva', planet: 'Venus',   type: 'Dark Sector Defense', note: 'Dark sector node with 105% bonus drop rate', rank: 1 },
      { mission: 'Any',   planet: 'Jupiter', type: 'Any',                 rank: 2 },
      { mission: 'Any',   planet: 'Mars',    type: 'Any',                 rank: 3 },
    ],
  },
  {
    name: 'Oxium', category: 'resource', imageName: 'oxium.png',
    sources: [
      { mission: 'Galatea',    planet: 'Neptune', type: 'Mobile Defense', note: 'Kill Ospreys before they self-destruct or you lose the Oxium', rank: 1 },
      { mission: 'Cerberus',   planet: 'Pluto',   type: 'Defense',        rank: 2 },
      { mission: 'Any Corpus', planet: 'Any',     type: 'Any',            rank: 3 },
    ],
  },
  {
    name: 'Tellurium', category: 'resource', imageName: 'tellurium.png',
    sources: [
      { mission: 'Archwing missions', planet: 'Any',     type: 'Archwing',              note: 'Only drops in Archwing and Railjack missions', rank: 1 },
      { mission: 'Salacia',           planet: 'Neptune', type: 'Archwing Interception', rank: 2 },
    ],
  },
  {
    name: 'Cryotic', category: 'resource', imageName: 'cryotic.png',
    sources: [
      { mission: 'Tikal',    planet: 'Earth',  type: 'Excavation',             note: '100 Cryotic per completed excavator', rank: 1 },
      { mission: 'Hieracon', planet: 'Pluto',  type: 'Dark Sector Excavation', note: 'Dark sector bonus plus high enemy density makes this faster', rank: 2 },
      { mission: 'Carbice',  planet: 'Saturn', type: 'Excavation',             rank: 3 },
    ],
  },
  {
    name: 'Kuva', category: 'resource', imageName: 'kuva.png',
    sources: [
      { mission: 'Kuva Siphon / Flood', planet: 'Kuva Fortress', type: 'Special', note: 'Siphons give around 700 Kuva and Floods give around 1200. Check the alerts for active missions.', rank: 1 },
      { mission: 'Any node',            planet: 'Kuva Fortress', type: 'Any',     note: 'Any Kuva Fortress mission drops a small amount as a baseline', rank: 2 },
    ],
  },
  {
    name: 'Nitain Extract', category: 'resource', imageName: 'nitainExtract.png',
    sources: [
      { mission: 'Nightwave Store', planet: 'Any', type: 'Vendor',    note: 'Nightwave shop is the most reliable way to get it', rank: 1 },
      { mission: 'Resource Drones', planet: 'Any', type: 'Extractor', note: 'Deploy Extractors on any Grineer planet', rank: 2 },
    ],
  },
  {
    name: 'Vitus Essence', category: 'resource', imageName: 'vitusEssence.png',
    sources: [
      { mission: 'Arbitrations', planet: 'Any', type: 'Arbitration', note: 'Drops from Arbitration drones and as rotation rewards', rank: 1 },
    ],
  },
  {
    name: 'Endo', category: 'resource', imageName: 'endo.png',
    sources: [
      { mission: 'Arbitrations',      planet: 'Any',   type: 'Arbitration', note: 'Best Endo per hour in the game', rank: 1 },
      { mission: 'Vodyanoi',          planet: 'Sedna', type: 'Arena',       note: 'Rathuum arena, Executioner kills give a lot of Endo', rank: 2 },
      { mission: 'Ayatan Sculptures', planet: 'Any',   type: 'Decoration',  note: 'Fill them with stars and convert at Maroo\'s Bazaar for a big payout', rank: 3 },
    ],
  },

  // Warframes
  {
    name: 'Ash', category: 'warframe', imageName: 'ash.png',
    sources: [
      { mission: 'Uranus missions', planet: 'Uranus', type: 'Survival / Defense', note: 'Parts drop from Grineer Manics. Higher level missions have more of them.', rank: 1 },
    ],
  },
  {
    name: 'Baruuk', category: 'warframe', imageName: 'baruuk.png',
    sources: [
      { mission: 'Little Duck (Fortuna)', planet: 'Venus', type: 'Vendor', note: 'Needs Vox Solaris rep first, then buy the parts with standing', rank: 1 },
    ],
  },
  {
    name: 'Ember', category: 'warframe', imageName: 'ember.png',
    sources: [
      { mission: 'Tethys', planet: 'Saturn', type: 'Boss', note: 'General Sargas Ruk boss fight', rank: 1 },
    ],
  },
  {
    name: 'Equinox', category: 'warframe', imageName: 'equinox.png',
    sources: [
      { mission: 'Tyl Regor', planet: 'Uranus', type: 'Boss', note: '8 parts total split between Day and Night forms, 4 each', rank: 1 },
    ],
  },
  {
    name: 'Frost', category: 'warframe', imageName: 'frost.png',
    sources: [
      { mission: 'War',  planet: 'Mars',  type: 'Boss', note: 'Lt. Lech Kril, best done solo', rank: 1 },
      { mission: 'Exta', planet: 'Ceres', type: 'Boss', note: 'Lt. Lech Kril and Vor together, needs two players', rank: 2 },
    ],
  },
  {
    name: 'Gara', category: 'warframe', imageName: 'gara.png',
    sources: [
      { mission: "Saya's Vigil", planet: 'Earth / Plains', type: 'Quest + Bounties', note: 'Do the quest first, parts come from Cetus bounties after', rank: 1 },
    ],
  },
  {
    name: 'Garuda', category: 'warframe', imageName: 'garuda.png',
    sources: [
      { mission: 'Orb Vallis Bounties', planet: 'Venus', type: 'Bounty', note: 'Tier 3 to 5 bounties from Eudico in Fortuna', rank: 1 },
    ],
  },
  {
    name: 'Gauss', category: 'warframe', imageName: 'gauss.png',
    sources: [
      { mission: 'Kappa', planet: 'Sedna', type: 'Disruption', note: 'All parts come from rotation B and C', rank: 1 },
    ],
  },
  {
    name: 'Harrow', category: 'warframe', imageName: 'harrow.png', spoiler: true,
    sources: [
      { mission: 'Pago',         planet: 'Kuva Fortress', type: 'Defection',  note: 'Neuroptics drops from rotation C', rank: 1 },
      { mission: 'Spy missions', planet: 'Any',           type: 'Spy',        note: 'Systems come from Spy rotation C', rank: 2 },
      { mission: 'Any',          planet: 'Void',          type: 'Any',        note: 'Chassis drops from rare containers in Void missions', rank: 3 },
    ],
  },
  {
    name: 'Khora', category: 'warframe', imageName: 'khora.png',
    sources: [
      { mission: 'Sanctuary Onslaught', planet: 'Any', type: 'Special', note: 'Parts drop at zones 4, 6 and 8', rank: 1 },
    ],
  },
  {
    name: 'Lavos', category: 'warframe', imageName: 'lavos.png', spoiler: true,
    sources: [
      { mission: 'Son (Necralisk)', planet: 'Deimos', type: 'Vendor', note: 'Buy parts with Son Tokens', rank: 1 },
    ],
  },
  {
    name: 'Mag', category: 'warframe', imageName: 'mag.png',
    sources: [
      { mission: 'Iliad', planet: 'Phobos', type: 'Boss', note: 'The Sergeant boss fight', rank: 1 },
    ],
  },
  {
    name: 'Mesa', category: 'warframe', imageName: 'mesa.png',
    sources: [
      { mission: 'Mutalist Alad V', planet: 'Eris', type: 'Boss', note: 'Requires Mutalist Coordinates key to access', rank: 1 },
    ],
  },
  {
    name: 'Nekros', category: 'warframe', imageName: 'nekros.png',
    sources: [
      { mission: 'Orokin Derelict Assassination', planet: 'Derelict', type: 'Boss', note: 'Lephantis boss, needs a Derelict Assassination key to access', rank: 1 },
    ],
  },
  {
    name: 'Nidus', category: 'warframe', imageName: 'nidus.png', spoiler: true,
    sources: [
      { mission: 'Infested Salvage', planet: 'Eris', type: 'Rotation C', note: 'Complete The Glast Gambit quest first', rank: 1 },
    ],
  },
  {
    name: 'Nova', category: 'warframe', imageName: 'nova.png',
    sources: [
      { mission: 'Naamah', planet: 'Europa', type: 'Boss', note: 'The Raptor boss fight', rank: 1 },
    ],
  },
  {
    name: 'Octavia', category: 'warframe', imageName: 'octavia.png', spoiler: true,
    sources: [
      { mission: 'Lua Music Puzzle',  planet: 'Lua',      type: 'Cache / Puzzle', note: 'Chassis comes from the hidden music room puzzle in Orokin Moon', rank: 1 },
      { mission: 'Orokin Derelict',   planet: 'Derelict', type: 'Rotation C',     note: 'Systems drop from the rotation C cache', rank: 2 },
    ],
  },
  {
    name: 'Protea', category: 'warframe', imageName: 'protea.png', spoiler: true,
    sources: [
      { mission: 'Granum Void', planet: 'Neptune', type: 'Special', note: 'Psamathe node, bring a Granum Crown to enter', rank: 1 },
    ],
  },
  {
    name: 'Revenant', category: 'warframe', imageName: 'revenant.png', spoiler: true,
    sources: [
      { mission: 'Plains of Eidolon Bounties', planet: 'Earth', type: 'Bounty', note: 'Night-time bounties only, pick them up from Konzu in Cetus', rank: 1 },
    ],
  },
  {
    name: 'Rhino', category: 'warframe', imageName: 'rhino.png',
    sources: [
      { mission: 'Fossa', planet: 'Venus', type: 'Boss', note: 'Jackal boss, great starting point for new players', rank: 1 },
    ],
  },
  {
    name: 'Saryn', category: 'warframe', imageName: 'saryn.png',
    sources: [
      { mission: 'Merrow', planet: 'Sedna', type: 'Boss', note: 'Kela De Thaym, complete some Rathuum matches to unlock the fight', rank: 1 },
    ],
  },
  {
    name: 'Sevagoth', category: 'warframe', imageName: 'sevagoth.png',
    sources: [
      { mission: 'Void Storm', planet: 'Any (Railjack)', type: 'Railjack', note: 'All parts drop from Void Storm rotations', rank: 1 },
    ],
  },
  {
    name: 'Titania', category: 'warframe', imageName: 'titania.png', spoiler: true,
    sources: [
      { mission: 'A Man of Few Words', planet: 'Any', type: 'Quest', note: 'Some parts come from the quest itself, others from Orokin Derelict bounties', rank: 1 },
    ],
  },
  {
    name: 'Trinity', category: 'warframe', imageName: 'trinity.png',
    sources: [
      { mission: 'Hades', planet: 'Pluto', type: 'Boss', note: 'Ambulas boss, you need Animo Nav Beacons to trigger it', rank: 1 },
    ],
  },
  {
    name: 'Wisp', category: 'warframe', imageName: 'wisp.png', spoiler: true,
    sources: [
      { mission: 'The Ropalolyst', planet: 'Jupiter', type: 'Boss', note: 'Finish The Jovian Concord quest to unlock this boss', rank: 1 },
    ],
  },
  {
    name: 'Wukong', category: 'warframe', imageName: 'wukong.png', spoiler: true,
    sources: [
      { mission: 'Any (Lua)', planet: 'Lua', type: 'Any', note: 'Parts drop from any Orokin Moon rotation', rank: 1 },
    ],
  },
  {
    name: 'Xaku', category: 'warframe', imageName: 'xaku.png', spoiler: true,
    sources: [
      { mission: 'Cambion Drift Bounties', planet: 'Deimos',   type: 'Bounty',   note: 'Chassis drops from Mother bounties', rank: 1 },
      { mission: 'Void Storm',             planet: 'Railjack', type: 'Railjack', note: 'Neuroptics and Systems come from Void Storm', rank: 2 },
    ],
  },
  {
    name: 'Yareli', category: 'warframe', imageName: 'yareli.png', spoiler: true,
    sources: [
      { mission: 'Waverider Quest', planet: 'Orbiter', type: 'Quest', note: 'Start the Waverider quest from the Helminth room in your Orbiter', rank: 1 },
    ],
  },

  // Mods
  {
    name: 'Serration', category: 'mod', imageName: 'serration.png',
    sources: [
      { mission: 'Any', planet: 'Any (Grineer / Infested)', type: 'Enemy Drop', note: 'Check your collection first, you probably already have it', rank: 1 },
      { mission: 'Nightwave Store', planet: 'Any', type: 'Vendor', note: 'Shows up in the Nightwave shop sometimes', rank: 2 },
    ],
  },
  {
    name: 'Hornet Strike', category: 'mod', imageName: 'hornetStrike.png',
    sources: [
      { mission: 'Any', planet: 'Any (Corpus)', type: 'Enemy Drop', note: 'Common Corpus enemy drop', rank: 1 },
    ],
  },
  {
    name: 'Split Chamber', category: 'mod', imageName: 'splitChamber.png',
    sources: [
      { mission: 'Gabii',  planet: 'Ceres', type: 'Dark Sector Survival', note: 'Best spot for it, high enemy density means fast drops', rank: 1 },
      { mission: 'Any',    planet: 'Any',   type: 'Enemy Drop',           note: 'Uncommon drop from any faction', rank: 2 },
    ],
  },
  {
    name: 'Vitality', category: 'mod', imageName: 'vitality.png',
    sources: [
      { mission: 'Any / Tutorial', planet: 'Any', type: 'Enemy Drop', note: 'You almost certainly already have this', rank: 1 },
    ],
  },
  {
    name: 'Redirection', category: 'mod', imageName: 'redirection.png',
    sources: [
      { mission: 'Any', planet: 'Any (Corpus)', type: 'Enemy Drop', note: 'Very common Corpus drop', rank: 1 },
    ],
  },
  {
    name: 'Steel Fiber', category: 'mod', imageName: 'steelFiber.png',
    sources: [
      { mission: 'Any', planet: 'Any (Grineer)', type: 'Enemy Drop', note: 'Common Grineer drop', rank: 1 },
    ],
  },
  {
    name: 'Intensify', category: 'mod', imageName: 'intensify.png',
    sources: [
      { mission: 'Any', planet: 'Any', type: 'Enemy Drop', note: 'Common enemy drop from all factions', rank: 1 },
    ],
  },
  {
    name: 'Continuity', category: 'mod', imageName: 'continuity.png',
    sources: [
      { mission: 'Any', planet: 'Any', type: 'Enemy Drop', note: 'Common enemy drop', rank: 1 },
    ],
  },
  {
    name: 'Flow', category: 'mod', imageName: 'flow.png',
    sources: [
      { mission: 'Any', planet: 'Any', type: 'Enemy Drop', note: 'Common enemy drop', rank: 1 },
    ],
  },
  {
    name: 'Stretch', category: 'mod', imageName: 'stretch.png',
    sources: [
      { mission: 'Any', planet: 'Any', type: 'Enemy Drop', note: 'Common enemy drop', rank: 1 },
    ],
  },
  {
    name: 'Point Strike', category: 'mod', imageName: 'pointStrike.png',
    sources: [
      { mission: 'Any', planet: 'Any', type: 'Enemy Drop', note: 'Check your collection first', rank: 1 },
    ],
  },
  {
    name: 'Hunter Munitions', category: 'mod', imageName: 'hunterMunitions.png',
    sources: [
      { mission: 'Plains of Eidolon Bounties', planet: 'Earth', type: 'Bounty', note: 'Drops from any tier bounty rotation', rank: 1 },
    ],
  },
  {
    name: 'Blind Rage', category: 'mod', imageName: 'blindRage.png',
    sources: [
      { mission: 'Orokin Vault', planet: 'Derelict', type: 'Corrupted Vault', note: 'Bring a Dragon Key. Opening the vault gives a random corrupted mod each time.', rank: 1 },
    ],
  },
  {
    name: 'Narrow Minded', category: 'mod', imageName: 'narrowMinded.png',
    sources: [
      { mission: 'Orokin Vault', planet: 'Derelict', type: 'Corrupted Vault', note: 'Bring a Dragon Key. Opening the vault gives a random corrupted mod each time.', rank: 1 },
    ],
  },
  {
    name: 'Fleeting Expertise', category: 'mod', imageName: 'fleetingExpertise.png',
    sources: [
      { mission: 'Orokin Vault', planet: 'Derelict', type: 'Corrupted Vault', note: 'Bring a Dragon Key. Opening the vault gives a random corrupted mod each time.', rank: 1 },
    ],
  },
  {
    name: 'Transient Fortitude', category: 'mod', imageName: 'transientFortitude.png',
    sources: [
      { mission: 'Orokin Vault', planet: 'Derelict', type: 'Corrupted Vault', note: 'Bring a Dragon Key. Opening the vault gives a random corrupted mod each time.', rank: 1 },
    ],
  },
  {
    name: 'Overextended', category: 'mod', imageName: 'overextended.png',
    sources: [
      { mission: 'Orokin Vault', planet: 'Derelict', type: 'Corrupted Vault', note: 'Bring a Dragon Key. Opening the vault gives a random corrupted mod each time.', rank: 1 },
    ],
  },

  // Prime Parts
  {
    name: 'Rhino Prime', category: 'prime', ducats: 65, imageName: 'rhinoPrime.png',
    wikiSlug: 'Rhino/Prime',
    sources: [
      { mission: 'Axi A6, Lith R4, Meso C6, Neo R4', planet: 'Void', type: 'Void Fissure', note: 'Blueprint from Axi A6, Neuroptics from Lith R4, Chassis from Meso C6, Systems from Neo R4', rank: 1 },
      { mission: "Baro Ki'Teer", planet: 'Any Relay', type: 'Vendor', note: 'Sometimes available from Baro during Prime Resurgence', rank: 2 },
    ],
  },
  {
    name: 'Saryn Prime', category: 'prime', ducats: 100, imageName: 'sarynPrime.png',
    wikiSlug: 'Saryn/Prime',
    sources: [
      { mission: 'Axi S3, Lith S9, Meso S4, Neo S5', planet: 'Void', type: 'Void Fissure', note: 'Blueprint from Axi S3, Neuroptics from Meso S4, Chassis from Lith S9, Systems from Neo S5', rank: 1 },
      { mission: "Baro Ki'Teer", planet: 'Any Relay', type: 'Vendor', note: 'Sometimes available from Baro during Prime Resurgence', rank: 2 },
    ],
  },
  {
    name: 'Mesa Prime', category: 'prime', ducats: 100, imageName: 'mesaPrime.png',
    wikiSlug: 'Mesa/Prime',
    sources: [
      { mission: 'Axi M2, Lith M7, Meso M3, Neo M4', planet: 'Void', type: 'Void Fissure', note: 'Blueprint from Axi M2, Neuroptics from Lith M7, Chassis from Meso M3, Systems from Neo M4', rank: 1 },
    ],
  },
  {
    name: 'Nova Prime', category: 'prime', ducats: 65, imageName: 'novaPrime.png',
    wikiSlug: 'Nova/Prime',
    sources: [
      { mission: 'Axi N5, Lith N5, Meso N6, Neo N10', planet: 'Void', type: 'Void Fissure', note: 'May be vaulted, check the wiki for the current relic list', rank: 1 },
    ],
  },
  {
    name: 'Trinity Prime', category: 'prime', ducats: 65, imageName: 'trinityPrime.png',
    wikiSlug: 'Trinity/Prime',
    sources: [
      { mission: 'Void Fissure', planet: 'Void', type: 'Void Fissure', note: 'Likely vaulted, check the wiki or trade with other players', rank: 1 },
    ],
  },
  {
    name: 'Loki Prime', category: 'prime', ducats: 65, imageName: 'lokiPrime.png',
    wikiSlug: 'Loki/Prime',
    sources: [
      { mission: 'Void Fissure', planet: 'Void', type: 'Void Fissure', note: 'Likely vaulted, check the wiki or trade with other players', rank: 1 },
    ],
  },
  {
    name: 'Volt Prime', category: 'prime', ducats: 45, imageName: 'voltPrime.png',
    wikiSlug: 'Volt/Prime',
    sources: [
      { mission: 'Void Fissure', planet: 'Void', type: 'Void Fissure', note: 'Likely vaulted, check the wiki or trade with other players', rank: 1 },
    ],
  },

  // Relics
  // Best spots: Lith = Hepit (Void Capture), Meso = Io (Jupiter Defense),
  //             Neo = Hydron (Sedna Defense), Axi = Mot (Void Survival)

  // Rhino Prime relics
  {
    name: 'Axi A6 Relic', category: 'relic',
    sources: [{
      mission: 'Mot (Survival) / Xini (Interception)',
      planet: 'Void',
      type: 'Axi Fissure',
      note: 'Rare: Rhino Prime Blueprint. Uncommon: Nyx Prime Neuroptics, Ankyros Prime Gauntlet. Common: Soma Prime Barrel, Paris Prime Upper Limb, Boltor Prime Receiver',
      rank: 1,
    }],
  },
  {
    name: 'Lith R4 Relic', category: 'relic',
    sources: [{
      mission: 'Hepit (Capture)',
      planet: 'Void',
      type: 'Lith Fissure',
      note: 'Rare: Rhino Prime Neuroptics. Uncommon: Bronco Prime Receiver, Hikou Prime Pouch. Common: Ankyros Prime Guard, Paris Prime Lower Limb, Boar Prime Blueprint',
      rank: 1,
    }],
  },
  {
    name: 'Meso C6 Relic', category: 'relic',
    sources: [{
      mission: 'Io (Defense)',
      planet: 'Jupiter',
      type: 'Meso Fissure',
      note: 'Rare: Rhino Prime Chassis. Uncommon: Orthos Prime Handle, Fang Prime Handle. Common: Nyx Prime Chassis, Paris Prime Grip, Boar Prime Receiver',
      rank: 1,
    }],
  },
  {
    name: 'Neo R4 Relic', category: 'relic',
    sources: [{
      mission: 'Hydron (Defense)',
      planet: 'Sedna',
      type: 'Neo Fissure',
      note: 'Rare: Rhino Prime Systems. Uncommon: Soma Prime Stock, Braton Prime Receiver. Common: Ankyros Prime Guard, Boar Prime Receiver, Boltor Prime Receiver',
      rank: 1,
    }],
  },

  // Saryn Prime relics
  {
    name: 'Axi S3 Relic', category: 'relic',
    sources: [{
      mission: 'Mot (Survival) / Xini (Interception)',
      planet: 'Void',
      type: 'Axi Fissure',
      note: 'Rare: Saryn Prime Blueprint. Uncommon: Cernos Prime Grip, Nikana Prime Blade. Common: Kogake Prime Gauntlet, Spira Prime Pouch, Vectis Prime Barrel',
      rank: 1,
    }],
  },
  {
    name: 'Lith S9 Relic', category: 'relic',
    sources: [{
      mission: 'Hepit (Capture)',
      planet: 'Void',
      type: 'Lith Fissure',
      note: 'Rare: Saryn Prime Chassis. Uncommon: Cernos Prime Lower Limb, Nikana Prime Handle. Common: Kogake Prime Blueprint, Spira Prime Blueprint, Vectis Prime Stock',
      rank: 1,
    }],
  },
  {
    name: 'Meso S4 Relic', category: 'relic',
    sources: [{
      mission: 'Io (Defense)',
      planet: 'Jupiter',
      type: 'Meso Fissure',
      note: 'Rare: Saryn Prime Neuroptics. Uncommon: Nikana Prime Blueprint, Cernos Prime String. Common: Kogake Prime Guard, Spira Prime Pouch, Vectis Prime Receiver',
      rank: 1,
    }],
  },
  {
    name: 'Neo S5 Relic', category: 'relic',
    sources: [{
      mission: 'Hydron (Defense)',
      planet: 'Sedna',
      type: 'Neo Fissure',
      note: 'Rare: Saryn Prime Systems. Uncommon: Nikana Prime Handle, Cernos Prime Upper Limb. Common: Kogake Prime Gauntlet, Spira Prime Blade, Vectis Prime Barrel',
      rank: 1,
    }],
  },

  // Mesa Prime relics
  {
    name: 'Axi M2 Relic', category: 'relic',
    sources: [{
      mission: 'Mot (Survival) / Xini (Interception)',
      planet: 'Void',
      type: 'Axi Fissure',
      note: 'Rare: Mesa Prime Blueprint. Uncommon: Akjagara Prime Link, Redeemer Prime Blade. Common: Akjagara Prime Barrel, Redeemer Prime Handle, Akjagara Prime Blueprint',
      rank: 1,
    }],
  },
  {
    name: 'Lith M7 Relic', category: 'relic',
    sources: [{
      mission: 'Hepit (Capture)',
      planet: 'Void',
      type: 'Lith Fissure',
      note: 'Rare: Mesa Prime Neuroptics. Uncommon: Redeemer Prime Blueprint, Akjagara Prime Blueprint. Common: Akjagara Prime Barrel, Redeemer Prime Handle, Akjagara Prime Link',
      rank: 1,
    }],
  },
  {
    name: 'Meso M3 Relic', category: 'relic',
    sources: [{
      mission: 'Io (Defense)',
      planet: 'Jupiter',
      type: 'Meso Fissure',
      note: 'Rare: Mesa Prime Chassis. Uncommon: Akjagara Prime Link, Redeemer Prime Blade. Common: Akjagara Prime Barrel, Redeemer Prime Handle, Akjagara Prime Blueprint',
      rank: 1,
    }],
  },
  {
    name: 'Neo M4 Relic', category: 'relic',
    sources: [{
      mission: 'Hydron (Defense)',
      planet: 'Sedna',
      type: 'Neo Fissure',
      note: 'Rare: Mesa Prime Systems. Uncommon: Akjagara Prime Link, Redeemer Prime Blueprint. Common: Akjagara Prime Barrel, Redeemer Prime Handle, Redeemer Prime Blade',
      rank: 1,
    }],
  },

  // Ash Prime relics
  {
    name: 'Axi A4 Relic', category: 'relic',
    sources: [{
      mission: 'Mot (Survival) / Xini (Interception)',
      planet: 'Void',
      type: 'Axi Fissure',
      note: 'Rare: Ash Prime Blueprint. Uncommon: Paris Prime Upper Limb, Soma Prime Barrel. Common: Boltor Prime Stock, Braton Prime Barrel, Latron Prime Barrel',
      rank: 1,
    }],
  },
  {
    name: 'Neo A1 Relic', category: 'relic',
    sources: [{
      mission: 'Hydron (Defense)',
      planet: 'Sedna',
      type: 'Neo Fissure',
      note: 'Rare: Ash Prime Neuroptics. Uncommon: Vasto Prime Barrel, Orthos Prime Handle. Common: Braton Prime Blueprint, Latron Prime Receiver, Paris Prime Grip',
      rank: 1,
    }],
  },

  // Gauss Prime relics
  {
    name: 'Axi G5 Relic', category: 'relic',
    sources: [{
      mission: 'Mot (Survival) / Xini (Interception)',
      planet: 'Void',
      type: 'Axi Fissure',
      note: 'Rare: Gauss Prime Blueprint. Uncommon: Stahlta Prime Barrel, Acceltra Prime Barrel. Common: Stahlta Prime Stock, Acceltra Prime Blueprint, Stahlta Prime Blueprint',
      rank: 1,
    }],
  },
  {
    name: 'Meso G4 Relic', category: 'relic',
    sources: [{
      mission: 'Io (Defense)',
      planet: 'Jupiter',
      type: 'Meso Fissure',
      note: 'Rare: Gauss Prime Chassis. Uncommon: Acceltra Prime Receiver, Stahlta Prime Receiver. Common: Acceltra Prime Blueprint, Stahlta Prime Blueprint, Acceltra Prime Stock',
      rank: 1,
    }],
  },
  {
    name: 'Neo G3 Relic', category: 'relic',
    sources: [{
      mission: 'Hydron (Defense)',
      planet: 'Sedna',
      type: 'Neo Fissure',
      note: 'Rare: Gauss Prime Systems. Uncommon: Acceltra Prime Stock, Stahlta Prime Stock. Common: Acceltra Prime Receiver, Stahlta Prime Barrel, Acceltra Prime Barrel',
      rank: 1,
    }],
  },
  {
    name: 'Lith G6 Relic', category: 'relic',
    sources: [{
      mission: 'Hepit (Capture)',
      planet: 'Void',
      type: 'Lith Fissure',
      note: 'Rare: Gauss Prime Neuroptics. Uncommon: Stahlta Prime Receiver, Acceltra Prime Barrel. Common: Acceltra Prime Blueprint, Stahlta Prime Blueprint, Stahlta Prime Barrel',
      rank: 1,
    }],
  },
]
