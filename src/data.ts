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
}

const CDN = 'https://cdn.warframestat.us/img'

export const ITEMS: Item[] = [
  // ── Resources ──────────────────────────────────────────────────────────
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
      { mission: 'Ophelia',  planet: 'Uranus',  type: 'Survival',             note: 'Dark sector +105% drop', rank: 1 },
      { mission: 'Memphis',  planet: 'Phobos',  type: 'Survival',             rank: 2 },
      { mission: 'Piscinas', planet: 'Saturn',  type: 'Dark Sector Survival', rank: 3 },
    ],
  },
  {
    name: 'Nano Spores', category: 'resource', image: `${CDN}/nanoSpores.png`,
    sources: [
      { mission: 'Gabii',   planet: 'Ceres',  type: 'Dark Sector Survival', note: 'Dark sector +105% drop', rank: 1 },
      { mission: 'Piscinas',planet: 'Saturn', type: 'Dark Sector Survival', rank: 2 },
      { mission: 'Akkad',   planet: 'Eris',   type: 'Dark Sector Defense',  rank: 3 },
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
      { mission: 'Apollodorus', planet: 'Mercury',  type: 'Survival',    rank: 1 },
      { mission: 'Tikal',       planet: 'Earth',    type: 'Excavation',  rank: 2 },
      { mission: 'Orokin Derelict', planet: 'Derelict', type: 'Survival', rank: 3 },
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
      { mission: 'Mot',   planet: 'Void',  type: 'Survival',       rank: 1 },
      { mission: 'Viver', planet: 'Eris',  type: 'Interception',   rank: 2 },
      { mission: 'Any',   planet: 'Earth', type: 'Any',            rank: 3 },
    ],
  },
  {
    name: 'Orokin Cell', category: 'resource', image: `${CDN}/orokinCell.png`,
    sources: [
      { mission: 'Tethys', planet: 'Saturn', type: 'Survival', note: 'Sargas Ruk boss also drops it', rank: 1 },
      { mission: 'Gabii',  planet: 'Ceres',  type: 'Dark Sector Survival', rank: 2 },
      { mission: 'Any',    planet: 'Saturn', type: 'Any', rank: 3 },
    ],
  },
  {
    name: 'Argon Crystal', category: 'resource', image: `${CDN}/argonCrystal.png`,
    sources: [
      { mission: 'Mot',      planet: 'Void', type: 'Survival',   note: 'Decays after 24 h — farm only when needed', rank: 1 },
      { mission: 'Any node', planet: 'Void', type: 'Any',        rank: 2 },
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
      { mission: 'Any',       planet: 'Venus', type: 'Any', rank: 3 },
    ],
  },
  {
    name: 'Salvage', category: 'resource', image: `${CDN}/salvage.png`,
    sources: [
      { mission: 'Malva', planet: 'Venus',   type: 'Dark Sector Defense', note: 'Dark sector +105% drop', rank: 1 },
      { mission: 'Any',   planet: 'Jupiter', type: 'Any', rank: 2 },
      { mission: 'Any',   planet: 'Mars',    type: 'Any', rank: 3 },
    ],
  },
  {
    name: 'Oxium', category: 'resource', image: `${CDN}/oxium.png`,
    sources: [
      { mission: 'Galatea',    planet: 'Neptune', type: 'Mobile Defense', note: 'Kill Oxium Ospreys before they explode', rank: 1 },
      { mission: 'Cerberus',   planet: 'Pluto',   type: 'Defense', rank: 2 },
      { mission: 'Any Corpus', planet: 'Any',     type: 'Any',     rank: 3 },
    ],
  },
  {
    name: 'Tellurium', category: 'resource', image: `${CDN}/tellurium.png`,
    sources: [
      { mission: 'Archwing missions', planet: 'Any',    type: 'Archwing', note: 'Exclusive to Archwing / Railjack', rank: 1 },
      { mission: 'Salacia',           planet: 'Neptune',type: 'Archwing Interception', rank: 2 },
    ],
  },

  // ── Warframes ───────────────────────────────────────────────────────────
  {
    name: 'Khora', category: 'warframe',
    sources: [
      { mission: 'Sanctuary Onslaught', planet: 'Any', type: 'Special', note: 'All parts drop at Zone 4 / 6 / 8', rank: 1 },
    ],
  },
  {
    name: 'Nidus', category: 'warframe',
    sources: [
      { mission: 'Infested Salvage', planet: 'Eris', type: 'Rotation C', note: 'Complete The Glast Gambit quest first', rank: 1 },
    ],
  },
  {
    name: 'Mesa', category: 'warframe',
    sources: [
      { mission: 'Mutalist Alad V', planet: 'Eris', type: 'Boss', note: 'Requires Mutalist Coordinates key', rank: 1 },
    ],
  },
  {
    name: 'Wisp', category: 'warframe',
    sources: [
      { mission: 'The Ropalolyst', planet: 'Jupiter', type: 'Boss', note: 'Complete The Jovian Concord quest first', rank: 1 },
    ],
  },
  {
    name: 'Octavia', category: 'warframe',
    sources: [
      { mission: 'Lua Music Puzzle', planet: 'Lua', type: 'Cache / Puzzle', note: 'Chassis from Orokin Moon cache rooms', rank: 1 },
      { mission: 'Orokin Derelict', planet: 'Derelict', type: 'Rotation C', note: 'Systems', rank: 2 },
    ],
  },
  {
    name: 'Equinox', category: 'warframe',
    sources: [
      { mission: 'Tyl Regor', planet: 'Uranus', type: 'Boss', note: '8 parts total — Day & Night forms each have 4', rank: 1 },
    ],
  },
  {
    name: 'Gara', category: 'warframe',
    sources: [
      { mission: 'Saya\'s Vigil', planet: 'Earth / Plains of Eidolon', type: 'Quest + Bounties', note: 'Parts from Cetus bounties after quest', rank: 1 },
    ],
  },
  {
    name: 'Garuda', category: 'warframe',
    sources: [
      { mission: 'Orb Vallis Bounties', planet: 'Venus', type: 'Bounty', note: 'Tier 3–5 bounties from Fortuna', rank: 1 },
    ],
  },
  {
    name: 'Lavos', category: 'warframe',
    sources: [
      { mission: 'Son (Necralisk)', planet: 'Deimos', type: 'Vendor', note: 'Buy parts with Son Tokens', rank: 1 },
    ],
  },
  {
    name: 'Protea', category: 'warframe',
    sources: [
      { mission: 'Granum Void', planet: 'Neptune', type: 'Special', note: 'Requires Granum Crown — Psamathe node', rank: 1 },
    ],
  },
  {
    name: 'Revenant', category: 'warframe',
    sources: [
      { mission: 'Plains of Eidolon Bounties', planet: 'Earth', type: 'Bounty', note: 'Night-time bounties from Konzu', rank: 1 },
    ],
  },
  {
    name: 'Sevagoth', category: 'warframe',
    sources: [
      { mission: 'Void Storm Missions', planet: 'Any (Railjack)', type: 'Railjack', note: 'All parts from Void Storm runs', rank: 1 },
    ],
  },
  {
    name: 'Titania', category: 'warframe',
    sources: [
      { mission: 'A Man of Few Words', planet: 'Any', type: 'Quest', note: 'Parts from quest & Orokin Derelict bounties', rank: 1 },
    ],
  },
]
