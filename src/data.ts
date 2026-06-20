export type Category = 'resource' | 'prime' | 'warframe' | 'mod'

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
  ducats?: number
  sources: Source[]
  wikiSlug?: string
}

const CDN = 'https://cdn.warframestat.us/img'

export const ITEMS: Item[] = [
  // ── Resources ─────────────────────────────────────────────────────────────
  {
    name: 'Polymer Bundle', category: 'resource', image: `${CDN}/polymerBundle.png`,
    sources: [
      { mission: 'Ophelia', planet: 'Uranus',  type: 'Survival', note: 'Dark sector +105% resource drop', rank: 1 },
      { mission: 'Assur',   planet: 'Uranus',  type: 'Survival', rank: 2 },
      { mission: 'Kappa',   planet: 'Sedna',   type: 'Survival', rank: 3 },
    ],
  },
  {
    name: 'Plastids', category: 'resource', image: `${CDN}/plastids.png`,
    sources: [
      { mission: 'Ophelia',  planet: 'Uranus', type: 'Survival',             note: 'Dark sector +105% drop', rank: 1 },
      { mission: 'Memphis',  planet: 'Phobos', type: 'Survival',             rank: 2 },
      { mission: 'Piscinas', planet: 'Saturn', type: 'Dark Sector Survival', rank: 3 },
    ],
  },
  {
    name: 'Nano Spores', category: 'resource', image: `${CDN}/nanoSpores.png`,
    sources: [
      { mission: 'Gabii',    planet: 'Ceres',  type: 'Dark Sector Survival', note: 'Dark sector +105% drop', rank: 1 },
      { mission: 'Piscinas', planet: 'Saturn', type: 'Dark Sector Survival', rank: 2 },
      { mission: 'Akkad',    planet: 'Eris',   type: 'Dark Sector Defense',  rank: 3 },
    ],
  },
  {
    name: 'Alloy Plate', category: 'resource', image: `${CDN}/alloyPlate.png`,
    sources: [
      { mission: 'Romula',  planet: 'Venus',  type: 'Dark Sector Survival', note: 'Dark sector +105% drop', rank: 1 },
      { mission: 'Kadesh',  planet: 'Mars',   type: 'Defense',              rank: 2 },
      { mission: 'Ophelia', planet: 'Uranus', type: 'Survival',             rank: 3 },
    ],
  },
  {
    name: 'Ferrite', category: 'resource', image: `${CDN}/ferrite.png`,
    sources: [
      { mission: 'Apollodorus',    planet: 'Mercury',  type: 'Survival',   rank: 1 },
      { mission: 'Tikal',          planet: 'Earth',    type: 'Excavation', rank: 2 },
      { mission: 'Orokin Derelict',planet: 'Derelict', type: 'Survival',   rank: 3 },
    ],
  },
  {
    name: 'Rubedo', category: 'resource', image: `${CDN}/rubedo.png`,
    sources: [
      { mission: 'Any mission', planet: 'Phobos', type: 'Any', note: 'Highest density planet', rank: 1 },
      { mission: 'Any mission', planet: 'Pluto',  type: 'Any', rank: 2 },
      { mission: 'Any mission', planet: 'Europa', type: 'Any', rank: 3 },
    ],
  },
  {
    name: 'Neurodes', category: 'resource', image: `${CDN}/neurodes.png`,
    sources: [
      { mission: 'Mot',   planet: 'Void', type: 'Survival',     rank: 1 },
      { mission: 'Viver', planet: 'Eris', type: 'Interception', rank: 2 },
      { mission: 'Any',   planet: 'Earth',type: 'Any',          rank: 3 },
    ],
  },
  {
    name: 'Orokin Cell', category: 'resource', image: `${CDN}/orokinCell.png`,
    sources: [
      { mission: 'Tethys', planet: 'Saturn', type: 'Survival',             note: 'Sargas Ruk boss also drops it', rank: 1 },
      { mission: 'Gabii',  planet: 'Ceres',  type: 'Dark Sector Survival', rank: 2 },
      { mission: 'Any',    planet: 'Saturn', type: 'Any',                  rank: 3 },
    ],
  },
  {
    name: 'Argon Crystal', category: 'resource', image: `${CDN}/argonCrystal.png`,
    sources: [
      { mission: 'Mot',      planet: 'Void', type: 'Survival', note: 'Decays after 24 h — farm only when needed', rank: 1 },
      { mission: 'Any node', planet: 'Void', type: 'Any',      rank: 2 },
    ],
  },
  {
    name: 'Control Module', category: 'resource', image: `${CDN}/controlModule.png`,
    sources: [
      { mission: 'Any', planet: 'Void',    type: 'Any', rank: 1 },
      { mission: 'Any', planet: 'Neptune', type: 'Any', rank: 2 },
      { mission: 'Any', planet: 'Europa',  type: 'Any', rank: 3 },
    ],
  },
  {
    name: 'Neural Sensors', category: 'resource', image: `${CDN}/neuralSensors.png`,
    sources: [
      { mission: 'Themisto', planet: 'Jupiter', type: 'Boss', note: 'Alad V boss fight', rank: 1 },
      { mission: 'Any',      planet: 'Jupiter', type: 'Any',  rank: 2 },
    ],
  },
  {
    name: 'Morphics', category: 'resource', image: `${CDN}/morphics.png`,
    sources: [
      { mission: 'Any', planet: 'Mars',    type: 'Any', rank: 1 },
      { mission: 'Any', planet: 'Mercury', type: 'Any', rank: 2 },
      { mission: 'Any', planet: 'Phobos',  type: 'Any', rank: 3 },
    ],
  },
  {
    name: 'Circuits', category: 'resource', image: `${CDN}/circuits.png`,
    sources: [
      { mission: 'Cholistan', planet: 'Venus', type: 'Dark Sector Excavation', note: 'Dark sector +105% drop', rank: 1 },
      { mission: 'Hieracon',  planet: 'Pluto', type: 'Dark Sector Excavation', rank: 2 },
      { mission: 'Any',       planet: 'Venus', type: 'Any',                    rank: 3 },
    ],
  },
  {
    name: 'Salvage', category: 'resource', image: `${CDN}/salvage.png`,
    sources: [
      { mission: 'Malva', planet: 'Venus',   type: 'Dark Sector Defense', note: 'Dark sector +105% drop', rank: 1 },
      { mission: 'Any',   planet: 'Jupiter', type: 'Any',                 rank: 2 },
      { mission: 'Any',   planet: 'Mars',    type: 'Any',                 rank: 3 },
    ],
  },
  {
    name: 'Oxium', category: 'resource', image: `${CDN}/oxium.png`,
    sources: [
      { mission: 'Galatea',    planet: 'Neptune', type: 'Mobile Defense', note: 'Kill Oxium Ospreys before they explode', rank: 1 },
      { mission: 'Cerberus',   planet: 'Pluto',   type: 'Defense',        rank: 2 },
      { mission: 'Any Corpus', planet: 'Any',     type: 'Any',            rank: 3 },
    ],
  },
  {
    name: 'Tellurium', category: 'resource', image: `${CDN}/tellurium.png`,
    sources: [
      { mission: 'Archwing missions', planet: 'Any',     type: 'Archwing',              note: 'Exclusive to Archwing / Railjack', rank: 1 },
      { mission: 'Salacia',           planet: 'Neptune', type: 'Archwing Interception', rank: 2 },
    ],
  },
  {
    name: 'Cryotic', category: 'resource', image: `${CDN}/cryotic.png`,
    sources: [
      { mission: 'Tikal',     planet: 'Earth', type: 'Excavation',             note: '100 Cryotic per completed excavator', rank: 1 },
      { mission: 'Hieracon',  planet: 'Pluto', type: 'Dark Sector Excavation', note: 'Dark sector bonus + high enemy density', rank: 2 },
      { mission: 'Carbice',   planet: 'Saturn',type: 'Excavation',             rank: 3 },
    ],
  },
  {
    name: 'Kuva', category: 'resource', image: `${CDN}/kuva.png`,
    sources: [
      { mission: 'Kuva Siphon / Flood', planet: 'Kuva Fortress', type: 'Special', note: 'Siphon ~700 Kuva, Flood ~1200 Kuva. Check alerts.', rank: 1 },
      { mission: 'Any node',            planet: 'Kuva Fortress', type: 'Any',     note: 'Baseline from all Kuva Fortress missions', rank: 2 },
    ],
  },
  {
    name: 'Nitain Extract', category: 'resource', image: `${CDN}/nitainExtract.png`,
    sources: [
      { mission: 'Nightwave Store', planet: 'Any', type: 'Vendor',    note: 'Buy with Nightwave Credits — most reliable source', rank: 1 },
      { mission: 'Resource Drones', planet: 'Any', type: 'Extractor', note: 'Deploy Extractors on Grineer planets', rank: 2 },
    ],
  },
  {
    name: 'Vitus Essence', category: 'resource', image: `${CDN}/vitusEssence.png`,
    sources: [
      { mission: 'Arbitrations', planet: 'Any', type: 'Arbitration', note: 'Drops from Arbitration drones and rotation rewards', rank: 1 },
    ],
  },
  {
    name: 'Endo', category: 'resource', image: `${CDN}/endo.png`,
    sources: [
      { mission: 'Arbitrations', planet: 'Any',   type: 'Arbitration', note: 'Best Endo-per-hour source', rank: 1 },
      { mission: 'Vodyanoi',     planet: 'Sedna', type: 'Arena',       note: 'Rathuum arena — high Endo from Executioner kills', rank: 2 },
      { mission: 'Ayatan Sculptures', planet: 'Any', type: 'Decoration', note: 'Fill sculptures with stars, convert at Maroo\'s Bazaar', rank: 3 },
    ],
  },

  // ── Warframes ─────────────────────────────────────────────────────────────
  {
    name: 'Ash', category: 'warframe',
    sources: [
      { mission: 'Uranus missions', planet: 'Uranus', type: 'Survival / Defense', note: 'Parts drop from Grineer Manic spawns — higher level = more spawns', rank: 1 },
    ],
  },
  {
    name: 'Baruuk', category: 'warframe',
    sources: [
      { mission: 'Little Duck (Fortuna)', planet: 'Venus', type: 'Vendor', note: 'Requires Vox Solaris rank — buy parts with standing', rank: 1 },
    ],
  },
  {
    name: 'Ember', category: 'warframe',
    sources: [
      { mission: 'Tethys', planet: 'Saturn', type: 'Boss', note: 'General Sargas Ruk boss fight', rank: 1 },
    ],
  },
  {
    name: 'Equinox', category: 'warframe',
    sources: [
      { mission: 'Tyl Regor', planet: 'Uranus', type: 'Boss', note: '8 parts total — Day & Night forms each drop 4', rank: 1 },
    ],
  },
  {
    name: 'Frost', category: 'warframe',
    sources: [
      { mission: 'War',  planet: 'Mars',  type: 'Boss', note: 'Lt. Lech Kril — recommended solo', rank: 1 },
      { mission: 'Exta', planet: 'Ceres', type: 'Boss', note: 'Lt. Lech Kril & Vor co-op (requires two players)', rank: 2 },
    ],
  },
  {
    name: 'Gara', category: 'warframe',
    sources: [
      { mission: "Saya's Vigil", planet: 'Earth / Plains', type: 'Quest + Bounties', note: 'Parts from Cetus bounties after quest completion', rank: 1 },
    ],
  },
  {
    name: 'Garuda', category: 'warframe',
    sources: [
      { mission: 'Orb Vallis Bounties', planet: 'Venus', type: 'Bounty', note: 'Tier 3–5 bounties from Eudico in Fortuna', rank: 1 },
    ],
  },
  {
    name: 'Gauss', category: 'warframe',
    sources: [
      { mission: 'Kappa', planet: 'Sedna', type: 'Disruption', note: 'All parts from Disruption rotation B & C', rank: 1 },
    ],
  },
  {
    name: 'Harrow', category: 'warframe',
    sources: [
      { mission: 'Pago',         planet: 'Kuva Fortress', type: 'Defection',  note: 'Neuroptics from Rotation C', rank: 1 },
      { mission: 'Spy missions', planet: 'Any',           type: 'Spy',        note: 'Systems from Spy Rotation C', rank: 2 },
      { mission: 'Any',          planet: 'Void',          type: 'Any',        note: 'Chassis from Void rare containers', rank: 3 },
    ],
  },
  {
    name: 'Khora', category: 'warframe',
    sources: [
      { mission: 'Sanctuary Onslaught', planet: 'Any', type: 'Special', note: 'All parts drop at Zone 4 / 6 / 8', rank: 1 },
    ],
  },
  {
    name: 'Lavos', category: 'warframe',
    sources: [
      { mission: 'Son (Necralisk)', planet: 'Deimos', type: 'Vendor', note: 'Buy parts with Son Tokens', rank: 1 },
    ],
  },
  {
    name: 'Mag', category: 'warframe',
    sources: [
      { mission: 'Iliad', planet: 'Phobos', type: 'Boss', note: 'The Sergeant boss fight', rank: 1 },
    ],
  },
  {
    name: 'Mesa', category: 'warframe',
    sources: [
      { mission: 'Mutalist Alad V', planet: 'Eris', type: 'Boss', note: 'Requires Mutalist Coordinates key', rank: 1 },
    ],
  },
  {
    name: 'Nekros', category: 'warframe',
    sources: [
      { mission: 'Orokin Derelict Assassination', planet: 'Derelict', type: 'Boss', note: 'Lephantis — requires Derelict Assassination key', rank: 1 },
    ],
  },
  {
    name: 'Nidus', category: 'warframe',
    sources: [
      { mission: 'Infested Salvage', planet: 'Eris', type: 'Rotation C', note: 'Complete The Glast Gambit quest first', rank: 1 },
    ],
  },
  {
    name: 'Nova', category: 'warframe',
    sources: [
      { mission: 'Naamah', planet: 'Europa', type: 'Boss', note: 'The Raptor boss fight', rank: 1 },
    ],
  },
  {
    name: 'Octavia', category: 'warframe',
    sources: [
      { mission: 'Lua Music Puzzle',  planet: 'Lua',      type: 'Cache / Puzzle', note: 'Chassis — hidden music room in Orokin Moon', rank: 1 },
      { mission: 'Orokin Derelict',   planet: 'Derelict', type: 'Rotation C',     note: 'Systems from Rotation C cache', rank: 2 },
    ],
  },
  {
    name: 'Protea', category: 'warframe',
    sources: [
      { mission: 'Granum Void', planet: 'Neptune', type: 'Special', note: 'Psamathe node — requires Granum Crown', rank: 1 },
    ],
  },
  {
    name: 'Revenant', category: 'warframe',
    sources: [
      { mission: 'Plains of Eidolon Bounties', planet: 'Earth', type: 'Bounty', note: 'Night-time bounties from Konzu in Cetus', rank: 1 },
    ],
  },
  {
    name: 'Rhino', category: 'warframe',
    sources: [
      { mission: 'Fossa', planet: 'Venus', type: 'Boss', note: 'Jackal boss — good early-game farm', rank: 1 },
    ],
  },
  {
    name: 'Saryn', category: 'warframe',
    sources: [
      { mission: 'Merrow', planet: 'Sedna', type: 'Boss', note: 'Kela De Thaym — complete Rathuum matches to unlock', rank: 1 },
    ],
  },
  {
    name: 'Sevagoth', category: 'warframe',
    sources: [
      { mission: 'Void Storm', planet: 'Any (Railjack)', type: 'Railjack', note: 'All parts from Void Storm mission rotations', rank: 1 },
    ],
  },
  {
    name: 'Titania', category: 'warframe',
    sources: [
      { mission: 'A Man of Few Words', planet: 'Any', type: 'Quest', note: 'Parts from quest + Orokin Derelict bounties', rank: 1 },
    ],
  },
  {
    name: 'Trinity', category: 'warframe',
    sources: [
      { mission: 'Hades', planet: 'Pluto', type: 'Boss', note: 'Ambulas boss — requires Animo Nav Beacons', rank: 1 },
    ],
  },
  {
    name: 'Wisp', category: 'warframe',
    sources: [
      { mission: 'The Ropalolyst', planet: 'Jupiter', type: 'Boss', note: 'Complete The Jovian Concord quest first', rank: 1 },
    ],
  },
  {
    name: 'Wukong', category: 'warframe',
    sources: [
      { mission: 'Any (Lua)', planet: 'Lua', type: 'Any', note: 'Parts drop from Orokin Moon mission rotations', rank: 1 },
    ],
  },
  {
    name: 'Xaku', category: 'warframe',
    sources: [
      { mission: 'Cambion Drift Bounties', planet: 'Deimos',   type: 'Bounty',   note: 'Chassis from Mother bounties', rank: 1 },
      { mission: 'Void Storm',             planet: 'Railjack', type: 'Railjack', note: 'Neuroptics & Systems from Void Storm', rank: 2 },
    ],
  },
  {
    name: 'Yareli', category: 'warframe',
    sources: [
      { mission: 'Waverider Quest', planet: 'Orbiter', type: 'Quest', note: 'Complete the Waverider quest in the Helminth room', rank: 1 },
    ],
  },

  // ── Mods ──────────────────────────────────────────────────────────────────
  {
    name: 'Serration', category: 'mod', image: `${CDN}/serration.png`,
    sources: [
      { mission: 'Any', planet: 'Any (Grineer / Infested)', type: 'Enemy Drop', note: 'Common drop — check your collection before farming', rank: 1 },
      { mission: 'Nightwave Store', planet: 'Any', type: 'Vendor', note: 'Occasionally available for Nightwave Credits', rank: 2 },
    ],
  },
  {
    name: 'Hornet Strike', category: 'mod', image: `${CDN}/hornetStrike.png`,
    sources: [
      { mission: 'Any', planet: 'Any (Corpus)', type: 'Enemy Drop', note: 'Common Corpus enemy drop', rank: 1 },
    ],
  },
  {
    name: 'Split Chamber', category: 'mod', image: `${CDN}/splitChamber.png`,
    sources: [
      { mission: 'Gabii',  planet: 'Ceres', type: 'Dark Sector Survival', note: 'Best place — high run volume = fast drops', rank: 1 },
      { mission: 'Any',    planet: 'Any',   type: 'Enemy Drop',           note: 'Uncommon enemy drop from any faction', rank: 2 },
    ],
  },
  {
    name: 'Vitality', category: 'mod', image: `${CDN}/vitality.png`,
    sources: [
      { mission: 'Any / Tutorial', planet: 'Any', type: 'Enemy Drop', note: 'Very common — almost certainly already in your collection', rank: 1 },
    ],
  },
  {
    name: 'Redirection', category: 'mod', image: `${CDN}/redirection.png`,
    sources: [
      { mission: 'Any', planet: 'Any (Corpus)', type: 'Enemy Drop', note: 'Very common Corpus drop', rank: 1 },
    ],
  },
  {
    name: 'Steel Fiber', category: 'mod', image: `${CDN}/steelFiber.png`,
    sources: [
      { mission: 'Any', planet: 'Any (Grineer)', type: 'Enemy Drop', note: 'Common Grineer drop', rank: 1 },
    ],
  },
  {
    name: 'Intensify', category: 'mod', image: `${CDN}/intensify.png`,
    sources: [
      { mission: 'Any', planet: 'Any', type: 'Enemy Drop', note: 'Common enemy drop from all factions', rank: 1 },
    ],
  },
  {
    name: 'Continuity', category: 'mod', image: `${CDN}/continuity.png`,
    sources: [
      { mission: 'Any', planet: 'Any', type: 'Enemy Drop', note: 'Common enemy drop', rank: 1 },
    ],
  },
  {
    name: 'Flow', category: 'mod', image: `${CDN}/flow.png`,
    sources: [
      { mission: 'Any', planet: 'Any', type: 'Enemy Drop', note: 'Common enemy drop', rank: 1 },
    ],
  },
  {
    name: 'Stretch', category: 'mod', image: `${CDN}/stretch.png`,
    sources: [
      { mission: 'Any', planet: 'Any', type: 'Enemy Drop', note: 'Common enemy drop', rank: 1 },
    ],
  },
  {
    name: 'Point Strike', category: 'mod', image: `${CDN}/pointStrike.png`,
    sources: [
      { mission: 'Any', planet: 'Any', type: 'Enemy Drop', note: 'Common drop — check collection first', rank: 1 },
    ],
  },
  {
    name: 'Hunter Munitions', category: 'mod', image: `${CDN}/hunterMunitions.png`,
    sources: [
      { mission: 'Plains of Eidolon Bounties', planet: 'Earth', type: 'Bounty', note: 'Any tier bounty rotation', rank: 1 },
    ],
  },
  {
    name: 'Blind Rage', category: 'mod', image: `${CDN}/blindRage.png`,
    sources: [
      { mission: 'Orokin Vault', planet: 'Derelict', type: 'Corrupted Vault', note: 'Bring a Dragon Key — random corrupted mod on open', rank: 1 },
    ],
  },
  {
    name: 'Narrow Minded', category: 'mod', image: `${CDN}/narrowMinded.png`,
    sources: [
      { mission: 'Orokin Vault', planet: 'Derelict', type: 'Corrupted Vault', note: 'Bring a Dragon Key — random corrupted mod on open', rank: 1 },
    ],
  },
  {
    name: 'Fleeting Expertise', category: 'mod', image: `${CDN}/fleetingExpertise.png`,
    sources: [
      { mission: 'Orokin Vault', planet: 'Derelict', type: 'Corrupted Vault', note: 'Bring a Dragon Key — random corrupted mod on open', rank: 1 },
    ],
  },
  {
    name: 'Transient Fortitude', category: 'mod', image: `${CDN}/transientFortitude.png`,
    sources: [
      { mission: 'Orokin Vault', planet: 'Derelict', type: 'Corrupted Vault', note: 'Bring a Dragon Key — random corrupted mod on open', rank: 1 },
    ],
  },
  {
    name: 'Overextended', category: 'mod', image: `${CDN}/overextended.png`,
    sources: [
      { mission: 'Orokin Vault', planet: 'Derelict', type: 'Corrupted Vault', note: 'Bring a Dragon Key — random corrupted mod on open', rank: 1 },
    ],
  },

  // ── Prime Parts ───────────────────────────────────────────────────────────
  {
    name: 'Rhino Prime', category: 'prime', ducats: 65,
    wikiSlug: 'Rhino/Prime',
    sources: [
      { mission: 'Void Fissure', planet: 'Any', type: 'Void Fissure', note: 'Check wiki for current relics — may require Axi or Neo tier', rank: 1 },
      { mission: "Baro Ki'Teer", planet: 'Any Relay', type: 'Vendor', note: 'Sold during Prime Resurgence events', rank: 2 },
    ],
  },
  {
    name: 'Saryn Prime', category: 'prime', ducats: 100,
    wikiSlug: 'Saryn/Prime',
    sources: [
      { mission: 'Void Fissure', planet: 'Any', type: 'Void Fissure', note: 'Check wiki for current relics — may require Axi or Neo tier', rank: 1 },
      { mission: "Baro Ki'Teer", planet: 'Any Relay', type: 'Vendor', note: 'Sold during Prime Resurgence events', rank: 2 },
    ],
  },
  {
    name: 'Mesa Prime', category: 'prime', ducats: 100,
    wikiSlug: 'Mesa/Prime',
    sources: [
      { mission: 'Void Fissure', planet: 'Any', type: 'Void Fissure', note: 'Check wiki for current relics — Axi/Neo tier typically', rank: 1 },
    ],
  },
  {
    name: 'Nova Prime', category: 'prime', ducats: 65,
    wikiSlug: 'Nova/Prime',
    sources: [
      { mission: 'Void Fissure', planet: 'Any', type: 'Void Fissure', note: 'Check wiki for current relic list', rank: 1 },
    ],
  },
  {
    name: 'Trinity Prime', category: 'prime', ducats: 65,
    wikiSlug: 'Trinity/Prime',
    sources: [
      { mission: 'Void Fissure', planet: 'Any', type: 'Void Fissure', note: 'Check wiki — may be vaulted; tradeable from other players', rank: 1 },
    ],
  },
  {
    name: 'Loki Prime', category: 'prime', ducats: 65,
    wikiSlug: 'Loki/Prime',
    sources: [
      { mission: 'Void Fissure', planet: 'Any', type: 'Void Fissure', note: 'Check wiki — may be vaulted; tradeable from other players', rank: 1 },
    ],
  },
  {
    name: 'Volt Prime', category: 'prime', ducats: 45,
    wikiSlug: 'Volt/Prime',
    sources: [
      { mission: 'Void Fissure', planet: 'Any', type: 'Void Fissure', note: 'Check wiki — may be vaulted; tradeable from other players', rank: 1 },
    ],
  },
]
