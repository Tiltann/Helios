export type Category =
  | "resource"
  | "prime"
  | "warframe"
  | "mod"
  | "relic"
  | "weapon"
  | "companion";

export interface Source {
  mission: string;
  planet: string;
  type: string;
  note?: string;
  rank: number;
  mr?: number;
}

export interface Item {
  name: string;
  category: Category;
  image?: string;
  imageName?: string;
  ducats?: number;
  sources: Source[];
  wikiSlug?: string;
  spoiler?: boolean;
  spoilerFor?: string;
  vaulted?: boolean;
}

export const PLANETS: Record<
  string,
  { color: string; abbr: string; img?: string }
> = {
  Earth: {
    color: "#4a8c3c",
    abbr: "ETH",
    img: "NavigationFeatureItemEarth.png",
  },
  Venus: {
    color: "#c4a23c",
    abbr: "VEN",
    img: "NavigationFeatureItemVenus.png",
  },
  Mercury: {
    color: "#8c7c5c",
    abbr: "MER",
    img: "NavigationFeatureItemMercury.png",
  },
  Mars: { color: "#c44c3c", abbr: "MRS", img: "NavigationFeatureItemMars.png" },
  Phobos: {
    color: "#8c5c3c",
    abbr: "PHB",
    img: "NavigationFeatureItemPhobos.png",
  },
  Ceres: {
    color: "#9c7c5c",
    abbr: "CRS",
    img: "NavigationFeatureItemCeres.png",
  },
  Jupiter: {
    color: "#c4943c",
    abbr: "JUP",
    img: "NavigationFeatureItemJupiter.png",
  },
  Europa: {
    color: "#5c8ca4",
    abbr: "EUR",
    img: "NavigationFeatureItemEuropa.png",
  },
  Saturn: {
    color: "#c4b45c",
    abbr: "SAT",
    img: "NavigationFeatureItemSaturn.png",
  },
  Uranus: {
    color: "#5cc4b4",
    abbr: "URA",
    img: "NavigationFeatureItemUranus.png",
  },
  Neptune: {
    color: "#3c6cc4",
    abbr: "NEP",
    img: "NavigationFeatureItemNeptune.png",
  },
  Pluto: {
    color: "#7c6c8c",
    abbr: "PLU",
    img: "NavigationFeatureItemPluto.png",
  },
  Sedna: {
    color: "#c43c5c",
    abbr: "SED",
    img: "NavigationFeatureItemSedna.png",
  },
  Eris: { color: "#8c3c6c", abbr: "ERS", img: "NavigationFeatureItemEris.png" },
  Lua: { color: "#d4c4a0", abbr: "LUA", img: "FocusLens4Rank.png" },
  Void: { color: "#8c5cc4", abbr: "VOD", img: "ArgonCrystal.png" },
  "Kuva Fortress": { color: "#c43c3c", abbr: "KUV", img: "Kuva.png" },
  Deimos: {
    color: "#9c5c3c",
    abbr: "DMO",
    img: "EntratiFragmentUncommonA.png",
  },
  "Zariman Ten Zero": {
    color: "#a4a4d4",
    abbr: "ZAR",
    img: "ZarimanDogTagBounty.png",
  },
  "Orb Vallis": {
    color: "#c4a23c",
    abbr: "OV",
    img: "CrpArachnoidPowerCoreHunger.png",
  },
  Railjack: { color: "#3c8cc4", abbr: "RJK", img: "Tellurium.png" },
  Duviri: { color: "#9c7cd4", abbr: "DUV", img: "DuviriWyrmsoul.png" },
  Höllvania: { color: "#d4b44c", abbr: "HVN" },
};

const KUVA_SRC: Source[] = [
  {
    mission: "Kuva Lich",
    planet: "Any",
    type: "Vanquish",
    rank: 1,
    note: "Spawn by mercy-killing a Larvling in any level 20+ Grineer mission. Each Lich carries a random Kuva weapon; complete Murmur missions to find the Requiem sequence, then vanquish (or convert) to claim it. Trade exact weapons on warframe.market.",
  },
];
const TENET_SRC: Source[] = [
  {
    mission: "Sister of Parvos",
    planet: "Any",
    type: "Vanquish",
    rank: 1,
    note: "Spawn by mercy-killing a Candidate in any Corpus Railjack Proxima mission. Each Sister carries a random Tenet weapon; progress through Murmur missions, then vanquish or convert. Trade on warframe.market for a specific one.",
  },
];
const CODA_SRC: Source[] = [
  {
    mission: "Coda Adversary",
    planet: "Any",
    type: "Vanquish",
    rank: 1,
    note: "Infested adversary system from the Warframe: 1999 era. Spawn a Coda adversary in Infested missions, progress through Murmur-like nodes, then vanquish or convert to claim the weapon.",
  },
];

export const ITEMS: Item[] = [
  // Resources
  {
    name: "Polymer Bundle",
    category: "resource",
    imageName: "polymerBundle.png",
    sources: [
      {
        mission: "Ophelia",
        planet: "Uranus",
        type: "Survival",
        note: "Dark sector node with 105% bonus resource drop rate",
        rank: 1,
      },
      { mission: "Assur", planet: "Uranus", type: "Survival", rank: 2 },
      { mission: "Kappa", planet: "Sedna", type: "Survival", rank: 3 },
    ],
  },
  {
    name: "Plastids",
    category: "resource",
    imageName: "plastids.png",
    sources: [
      {
        mission: "Ophelia",
        planet: "Uranus",
        type: "Survival",
        note: "Dark sector node with 105% bonus drop rate",
        rank: 1,
      },
      { mission: "Memphis", planet: "Phobos", type: "Survival", rank: 2 },
      {
        mission: "Piscinas",
        planet: "Saturn",
        type: "Dark Sector Survival",
        rank: 3,
      },
    ],
  },
  {
    name: "Nano Spores",
    category: "resource",
    imageName: "nanoSpores.png",
    sources: [
      {
        mission: "Gabii",
        planet: "Ceres",
        type: "Dark Sector Survival",
        note: "Dark sector node with 105% bonus drop rate",
        rank: 1,
      },
      {
        mission: "Piscinas",
        planet: "Saturn",
        type: "Dark Sector Survival",
        rank: 2,
      },
      {
        mission: "Akkad",
        planet: "Eris",
        type: "Dark Sector Defense",
        rank: 3,
      },
    ],
  },
  {
    name: "Alloy Plate",
    category: "resource",
    imageName: "alloyPlate.png",
    sources: [
      {
        mission: "Romula",
        planet: "Venus",
        type: "Dark Sector Survival",
        note: "Dark sector node with 105% bonus drop rate",
        rank: 1,
      },
      { mission: "Kadesh", planet: "Mars", type: "Defense", rank: 2 },
      { mission: "Ophelia", planet: "Uranus", type: "Survival", rank: 3 },
    ],
  },
  {
    name: "Ferrite",
    category: "resource",
    imageName: "ferrite.png",
    sources: [
      { mission: "Apollodorus", planet: "Mercury", type: "Survival", rank: 1 },
      { mission: "Tikal", planet: "Earth", type: "Excavation", rank: 2 },
    ],
  },
  {
    name: "Rubedo",
    category: "resource",
    imageName: "rubedo.png",
    sources: [
      {
        mission: "Any mission",
        planet: "Phobos",
        type: "Any",
        note: "Highest density planet for Rubedo",
        rank: 1,
      },
      { mission: "Any mission", planet: "Pluto", type: "Any", rank: 2 },
      { mission: "Any mission", planet: "Europa", type: "Any", rank: 3 },
    ],
  },
  {
    name: "Neurodes",
    category: "resource",
    imageName: "neurodes.png",
    sources: [
      { mission: "Mot", planet: "Void", type: "Survival", rank: 1 },
      { mission: "Viver", planet: "Eris", type: "Interception", rank: 2 },
      { mission: "Any", planet: "Earth", type: "Any", rank: 3 },
    ],
  },
  {
    name: "Orokin Cell",
    category: "resource",
    imageName: "orokinCell.png",
    sources: [
      {
        mission: "Tethys",
        planet: "Saturn",
        type: "Survival",
        note: "Sargas Ruk sometimes drops one as a bonus",
        rank: 1,
      },
      {
        mission: "Gabii",
        planet: "Ceres",
        type: "Dark Sector Survival",
        rank: 2,
      },
      { mission: "Any", planet: "Saturn", type: "Any", rank: 3 },
    ],
  },
  {
    name: "Argon Crystal",
    category: "resource",
    imageName: "argonCrystal.png",
    sources: [
      {
        mission: "Mot",
        planet: "Void",
        type: "Survival",
        note: "Decays after 24 hours so only farm what you need right now",
        rank: 1,
      },
      {
        mission: "Capture",
        planet: "Void",
        type: "Container Run",
        note: "Capture is the fastest mission type for container runs: complete the objective in seconds, then sweep the whole tileset at your own pace. Equip Loot Detector so containers show on the minimap. Argon comes from lockers and breakable crates, not enemy drops.",
        rank: 2,
      },
      { mission: "Any node", planet: "Void", type: "Any", rank: 3 },
    ],
  },
  {
    name: "Control Module",
    category: "resource",
    imageName: "controlModule.png",
    sources: [
      {
        mission: "Capture",
        planet: "Void",
        type: "Container Run",
        note: "Same Capture + container run as Argon Crystal. Void tilesets drop both from the same lockers and crates — one run farms both at once.",
        rank: 1,
      },
      { mission: "Any", planet: "Neptune", type: "Any", rank: 2 },
      { mission: "Any", planet: "Europa", type: "Any", rank: 3 },
    ],
  },
  {
    name: "Neural Sensors",
    category: "resource",
    imageName: "neuralSensors.png",
    sources: [
      {
        mission: "Themisto",
        planet: "Jupiter",
        type: "Boss",
        note: "Alad V boss fight",
        rank: 1,
      },
      { mission: "Any", planet: "Jupiter", type: "Any", rank: 2 },
    ],
  },
  {
    name: "Morphics",
    category: "resource",
    imageName: "morphics.png",
    sources: [
      { mission: "Any", planet: "Mars", type: "Any", rank: 1 },
      { mission: "Any", planet: "Mercury", type: "Any", rank: 2 },
      { mission: "Any", planet: "Phobos", type: "Any", rank: 3 },
    ],
  },
  {
    name: "Circuits",
    category: "resource",
    imageName: "circuits.png",
    sources: [
      {
        mission: "Cholistan",
        planet: "Venus",
        type: "Dark Sector Excavation",
        note: "Dark sector node with 105% bonus drop rate",
        rank: 1,
      },
      {
        mission: "Hieracon",
        planet: "Pluto",
        type: "Dark Sector Excavation",
        rank: 2,
      },
      { mission: "Any", planet: "Venus", type: "Any", rank: 3 },
    ],
  },
  {
    name: "Salvage",
    category: "resource",
    imageName: "salvage.png",
    sources: [
      {
        mission: "Malva",
        planet: "Venus",
        type: "Dark Sector Defense",
        note: "Dark sector node with 105% bonus drop rate",
        rank: 1,
      },
      { mission: "Any", planet: "Jupiter", type: "Any", rank: 2 },
      { mission: "Any", planet: "Mars", type: "Any", rank: 3 },
    ],
  },
  {
    name: "Oxium",
    category: "resource",
    imageName: "oxium.png",
    sources: [
      {
        mission: "Galatea",
        planet: "Neptune",
        type: "Mobile Defense",
        note: "Kill Ospreys before they self-destruct or you lose the Oxium",
        rank: 1,
      },
      { mission: "Cerberus", planet: "Pluto", type: "Defense", rank: 2 },
      { mission: "Any Corpus", planet: "Any", type: "Any", rank: 3 },
    ],
  },
  {
    name: "Tellurium",
    category: "resource",
    imageName: "tellurium.png",
    sources: [
      {
        mission: "Archwing missions",
        planet: "Any",
        type: "Archwing",
        note: "Only drops in Archwing and Railjack missions",
        rank: 1,
      },
      {
        mission: "Salacia",
        planet: "Neptune",
        type: "Archwing Interception",
        rank: 2,
      },
    ],
  },
  {
    name: "Cryotic",
    category: "resource",
    imageName: "cryotic.png",
    sources: [
      {
        mission: "Tikal",
        planet: "Earth",
        type: "Excavation",
        note: "100 Cryotic per completed excavator",
        rank: 1,
      },
      {
        mission: "Hieracon",
        planet: "Pluto",
        type: "Dark Sector Excavation",
        note: "Dark sector bonus plus high enemy density makes this faster",
        rank: 2,
      },
      { mission: "Carbice", planet: "Saturn", type: "Excavation", rank: 3 },
    ],
  },
  {
    name: "Kuva",
    category: "resource",
    imageName: "kuva.png",
    sources: [
      {
        mission: "Kuva Siphon / Flood",
        planet: "Kuva Fortress",
        type: "Special",
        note: "Siphons give around 700 Kuva and Floods give around 1200. Check the alerts for active missions.",
        rank: 1,
      },
      {
        mission: "Any node",
        planet: "Kuva Fortress",
        type: "Any",
        note: "Any Kuva Fortress mission drops a small amount as a baseline",
        rank: 2,
      },
    ],
  },
  {
    name: "Nitain Extract",
    category: "resource",
    imageName: "nitainExtract.png",
    sources: [
      {
        mission: "Nightwave Store",
        planet: "Any",
        type: "Vendor",
        note: "Always available in the Nightwave Offerings for 15 Nightwave Cred per 5 — the most reliable source. Resource Extractors do NOT drop Nitain.",
        rank: 1,
      },
      {
        mission: "Reactor Sabotage / Exterminate",
        planet: "Any",
        type: "Resource Cache",
        note: "0.67–2% drop chance from finding all three hidden caches in Reactor Sabotage and certain Exterminate missions. Very low rate — use only when Nightwave Cred is exhausted.",
        rank: 2,
      },
      {
        mission: "Predasite Assassination (Hyf)",
        planet: "Deimos",
        type: "Boss",
        note: "Small chance from the Predasite boss on Deimos. Also rarely from Ghoul Purge bounties on Ceres when that event is active.",
        rank: 3,
      },
    ],
  },
  {
    name: "Vitus Essence",
    category: "resource",
    imageName: "vitusEssence.png",
    sources: [
      {
        mission: "Arbitrations",
        planet: "Any",
        type: "Arbitration",
        note: "Drops from Arbitration drones and as rotation rewards",
        rank: 1,
      },
    ],
  },
  {
    name: "Endo",
    category: "resource",
    imageName: "endo.png",
    sources: [
      {
        mission: "Arbitrations",
        planet: "Any",
        type: "Arbitration",
        note: "Best Endo per hour in the game",
        rank: 1,
      },
      {
        mission: "Vodyanoi",
        planet: "Sedna",
        type: "Arena",
        note: "Rathuum arena, Executioner kills give a lot of Endo",
        rank: 2,
      },
      {
        mission: "Ayatan Sculptures",
        planet: "Any",
        type: "Decoration",
        note: "Fill them with stars and convert at Maroo's Bazaar for a big payout",
        rank: 3,
      },
    ],
  },
  {
    name: "Credits",
    category: "resource",
    sources: [
      {
        mission: "The Index",
        planet: "Neptune",
        type: "Special",
        note: "Best credits per hour in the game. Bring a strong warframe and bet medium or high stakes.",
        rank: 1,
      },
      {
        mission: "Profit-Taker",
        planet: "Venus",
        type: "Bounty",
        note: "Orb Vallis phase 4 fight. Each run takes about 5 minutes and pays out a lot.",
        rank: 2,
      },
      {
        mission: "Sanctuary Onslaught",
        planet: "Any",
        type: "Special",
        note: "Decent credits and also good for other drops at the same time.",
        rank: 3,
      },
    ],
  },

  // Warframes alphabetical
  {
    name: "Ash",
    category: "warframe",
    imageName: "ash.png",
    sources: [
      {
        mission: "Neptune Proxima / Pluto Proxima / Venus Proxima",
        planet: "Railjack",
        type: "Railjack",
        note: "Neuroptics from Neptune Proxima Defense/Survival (Rotation A, 12.5%). Chassis from Pluto Proxima Defense/Survival (Rotation A, 13.33%). Systems from Venus Proxima Defense/Survival (Rotation A, 13.33%). The old Grineer Manic drop method was removed in Update 29.10. Also earnable through The Circuit after completing The Duviri Paradox.",
        rank: 1,
      },
    ],
  },
  {
    name: "Atlas",
    category: "warframe",
    imageName: "atlas.png",
    sources: [
      {
        mission: "Jordas Golem Assassination",
        planet: "Eris",
        type: "Assassination",
        note: "Complete the Jordas Precept quest first to unlock the node.",
        rank: 1,
      },
    ],
  },
  {
    name: "Banshee",
    category: "warframe",
    imageName: "banshee.png",
    sources: [
      {
        mission: "Tenno Lab",
        planet: "Orbiter",
        type: "Dojo Research",
        note: "Research in your Clan Dojo Tenno Lab, then buy the blueprint for credits.",
        rank: 1,
      },
    ],
  },
  {
    name: "Baruuk",
    category: "warframe",
    imageName: "baruuk.png",
    sources: [
      {
        mission: "Little Duck (Fortuna)",
        planet: "Venus",
        type: "Vendor",
        note: "Needs Vox Solaris standing first, then buy the parts with standing.",
        rank: 1,
      },
    ],
  },
  {
    name: "Caliban",
    category: "warframe",
    imageName: "caliban.png",
    sources: [
      {
        mission: "Archon Hunt",
        planet: "Any",
        type: "Weekly",
        note: "Parts drop from the weekly Archon Hunt reward pool. One hunt per week.",
        rank: 1,
      },
    ],
  },
  {
    name: "Chroma",
    category: "warframe",
    imageName: "chroma.png",
    sources: [
      {
        mission: "The New Strange Quest + Junctions",
        planet: "Any",
        type: "Quest",
        note: "Main blueprint from completing The New Strange quest. Neuroptics from the Uranus Junction reward, Chassis from the Neptune Junction, Systems from the Pluto Junction. Alternatively buy all blueprints from Cephalon Simaris for Standing (25,000 per component, 50,000 for main). Also earnable through The Circuit after completing The Duviri Paradox.",
        rank: 1,
      },
    ],
  },
  {
    name: "Citrine",
    category: "warframe",
    imageName: "citrine.png",
    sources: [
      {
        mission: "Tyana Pass",
        planet: "Mars",
        type: "Mirror Defense",
        note: "All parts drop from Rotation C. Blueprint ~9% drop rate, components ~6% each. Requires Heart of Deimos quest.",
        rank: 1,
      },
      {
        mission: "Otak (Necralisk)",
        planet: "Deimos",
        type: "Vendor",
        note: "Buy parts with Belric and Rania Crystal Fragments earned in Mirror Defense.",
        rank: 2,
      },
    ],
  },
  {
    name: "Cyte-09",
    category: "warframe",
    imageName: "cyte09.png",
    spoiler: true,
    spoilerFor: "The Hex",
    sources: [
      {
        mission: "Höllvania Bounties",
        planet: "Höllvania",
        type: "Bounty",
        note: "Blueprint from completing The Hex quest. Components drop from Central Mall bounties at levels 65-90.",
        rank: 1,
      },
      {
        mission: "Amir (The Hex)",
        planet: "Höllvania",
        type: "Vendor",
        note: "Buy parts with Hex Syndicate standing.",
        rank: 2,
      },
    ],
  },
  {
    name: "Dagath",
    category: "warframe",
    imageName: "dagath.png",
    sources: [
      {
        mission: "Dagath's Hollow (Dojo)",
        planet: "Orbiter",
        type: "Dojo Research",
        note: "Blueprints from the Clan Dojo. Components require Vainthorns from the Abyssal Zone on Ceres (buy entry beacons from any Syndicate).",
        rank: 1,
      },
    ],
  },
  {
    name: "Dante",
    category: "warframe",
    imageName: "dante.png",
    sources: [
      {
        mission: "Armatus",
        planet: "Deimos",
        type: "Disruption",
        note: "All parts drop from Rotation C. Requires The Deadlock Protocol and Whispers in the Walls quests.",
        rank: 1,
      },
      {
        mission: "Loid (Sanctum Anatomica)",
        planet: "Deimos",
        type: "Vendor",
        note: "Buy with Vessel Capillaries dropped by Demolishers.",
        rank: 2,
      },
    ],
  },
  {
    name: "Ember",
    category: "warframe",
    imageName: "ember.png",
    sources: [
      {
        mission: "Tethys",
        planet: "Saturn",
        type: "Boss",
        note: "General Sargas Ruk boss fight.",
        rank: 1,
      },
    ],
  },
  {
    name: "Equinox",
    category: "warframe",
    imageName: "equinox.png",
    sources: [
      {
        mission: "Tyl Regor",
        planet: "Uranus",
        type: "Boss",
        note: "8 parts total split between Day and Night forms, 4 each.",
        rank: 1,
      },
    ],
  },
  {
    name: "Excalibur",
    category: "warframe",
    imageName: "excalibur.png",
    sources: [
      {
        mission: "Ambulas (Hades)",
        planet: "Pluto",
        type: "Assassination",
        note: "Parts drop from the Ambulas boss. Requires Animo Nav Beacons to trigger.",
        rank: 1,
      },
    ],
  },
  {
    name: "Follie",
    category: "warframe",
    imageName: "follie.png",
    spoiler: true,
    spoilerFor: "Chains of Harrow",
    sources: [
      {
        mission: "Follie's Hunt (Vesper Relay)",
        planet: "Venus",
        type: "Special",
        note: "All parts drop from Rotation A. Requires completing Chains of Harrow.",
        rank: 1,
      },
      {
        mission: "Aspirant Zorba",
        planet: "Venus",
        type: "Vendor",
        note: "Buy with Atramentum currency from Follie's Hunt.",
        rank: 2,
      },
    ],
  },
  {
    name: "Frost",
    category: "warframe",
    imageName: "frost.png",
    sources: [
      {
        mission: "War",
        planet: "Mars",
        type: "Boss",
        note: "Lt. Lech Kril boss fight.",
        rank: 1,
      },
      {
        mission: "Exta",
        planet: "Ceres",
        type: "Boss",
        note: "Lt. Lech Kril and Vor together, both are required at the same time.",
        rank: 2,
      },
    ],
  },
  {
    name: "Gara",
    category: "warframe",
    imageName: "gara.png",
    sources: [
      {
        mission: "Saya's Vigil",
        planet: "Earth",
        type: "Quest + Bounties",
        note: "Do the quest first, parts come from Plains of Eidolon bounties after.",
        rank: 1,
      },
    ],
  },
  {
    name: "Garuda",
    category: "warframe",
    imageName: "garuda.png",
    sources: [
      {
        mission: "Orb Vallis Bounties",
        planet: "Venus",
        type: "Bounty",
        note: "Tier 3 to 5 bounties from Eudico in Fortuna.",
        rank: 1,
      },
    ],
  },
  {
    name: "Gauss",
    category: "warframe",
    imageName: "gauss.png",
    sources: [
      {
        mission: "Kappa",
        planet: "Sedna",
        type: "Disruption",
        note: "All three component blueprints drop from Rotation A at 7.84% each per round. Run multiple rounds before extracting — expect ~12 A-rotations on average per component.",
        rank: 1,
      },
    ],
  },
  {
    name: "Grendel",
    category: "warframe",
    imageName: "grendel.png",
    sources: [
      {
        mission: "Orb Vallis secret missions",
        planet: "Venus",
        type: "Special",
        note: "Buy Beacon keys from Vox Solaris (standing rank 3+). Three separate missions each hold one encrypted node. No abilities or mods allowed inside.",
        rank: 1,
      },
    ],
  },
  {
    name: "Gyre",
    category: "warframe",
    imageName: "gyre.png",
    sources: [
      {
        mission: "Zariman Bounties",
        planet: "Zariman Ten Zero",
        type: "Bounty",
        note: "Parts drop from bounties at levels 50-95. Requires Angels of the Zariman quest.",
        rank: 1,
      },
    ],
  },
  {
    name: "Harrow",
    category: "warframe",
    imageName: "harrow.png",
    spoiler: true,
    spoilerFor: "Chains of Harrow",
    sources: [
      {
        mission: "Pago",
        planet: "Kuva Fortress",
        type: "Defection",
        note: "Neuroptics drops from rotation C.",
        rank: 1,
      },
      {
        mission: "Spy missions",
        planet: "Any",
        type: "Spy",
        note: "Systems come from Spy rotation C on any faction.",
        rank: 2,
      },
      {
        mission: "Any",
        planet: "Void",
        type: "Any",
        note: "Chassis drops from rare containers in Void missions.",
        rank: 3,
      },
    ],
  },
  {
    name: "Hildryn",
    category: "warframe",
    imageName: "hildryn.png",
    sources: [
      {
        mission: "Fortuna Bounties",
        planet: "Venus",
        type: "Bounty",
        note: "High-tier Orb Vallis bounties from Eudico. Also drops from the Exploiter Orb boss fight.",
        rank: 1,
      },
    ],
  },
  {
    name: "Hydroid",
    category: "warframe",
    imageName: "hydroid.png",
    sources: [
      {
        mission: "Oro",
        planet: "Earth",
        type: "Assassination",
        note: "Councilor Vay Hek boss fight. Requires Oro node unlocked.",
        rank: 1,
        mr: 5,
      },
    ],
  },
  {
    name: "Inaros",
    category: "warframe",
    imageName: "inaros.png",
    sources: [
      {
        mission: "Sands of Inaros Quest",
        planet: "Any",
        type: "Quest",
        note: "Buy the Sands of Inaros quest from Baro Ki'Teer for 100 Ducats and 25,000 Credits. Blueprint and parts come from the quest itself.",
        rank: 1,
      },
    ],
  },
  {
    name: "Ivara",
    category: "warframe",
    imageName: "ivara.png",
    sources: [
      {
        mission: "Spy Missions",
        planet: "Any",
        type: "Spy",
        note: "Drops from Spy rotation C. Mid-to-high level Spy missions work best. Corpus Spy tends to be the easiest vaults.",
        rank: 1,
      },
    ],
  },
  {
    name: "Jade",
    category: "warframe",
    imageName: "Jade.png",
    spoiler: true,
    spoilerFor: "Jade Shadows",
    sources: [
      {
        mission: "Jade Shadows Quest",
        planet: "Any",
        type: "Quest",
        note: "Main blueprint from completing Jade Shadows. Component blueprints drop from Ascension missions on Brutus (Uranus) at ~5% per rotation.",
        rank: 1,
      },
      {
        mission: "Ordis",
        planet: "Orbiter",
        type: "Vendor",
        note: "Buy blueprints with 900 Vestigial Motes total if you prefer not to farm.",
        rank: 2,
      },
    ],
  },
  {
    name: "Khora",
    category: "warframe",
    imageName: "khora.png",
    sources: [
      {
        mission: "Sanctuary Onslaught",
        planet: "Any",
        type: "Special",
        note: "Parts drop at zones 4, 6 and 8.",
        rank: 1,
      },
    ],
  },
  {
    name: "Koumei",
    category: "warframe",
    imageName: "koumei.png",
    spoiler: true,
    spoilerFor: "Once Awake",
    sources: [
      {
        mission: "Saya's Visions (Shrine Defense)",
        planet: "Earth",
        type: "Defense",
        note: "Requires completing Saya's Vigil and Once Awake. Parts drop from Rotation A at ~4% each. Also drop from the Infested Oni boss.",
        rank: 1,
      },
      {
        mission: "Koumei's Shrine (Cetus)",
        planet: "Earth",
        type: "Vendor",
        note: "Buy with Fate Pearls dropped by the Oni boss.",
        rank: 2,
      },
    ],
  },
  {
    name: "Kullervo",
    category: "warframe",
    imageName: "kullervo.png",
    sources: [
      {
        mission: "Kullervo's Hold (Duviri)",
        planet: "Duviri",
        type: "Boss",
        note: "Defeat the Kullervo boss during Anger, Sorrow, or Fear Spirals to earn Kullervo's Bane. Buy blueprints from Acrithis in the Dormizone (42 Banes total).",
        rank: 1,
      },
    ],
  },
  {
    name: "Lavos",
    category: "warframe",
    imageName: "lavos.png",
    spoiler: true,
    spoilerFor: "Heart of Deimos",
    sources: [
      {
        mission: "Son (Necralisk)",
        planet: "Deimos",
        type: "Vendor",
        note: "Buy parts with Son Tokens earned from Deimos bounties.",
        rank: 1,
      },
    ],
  },
  {
    name: "Limbo",
    category: "warframe",
    imageName: "limbo.png",
    sources: [
      {
        mission: "Limbo Theorem Quest",
        planet: "Any",
        type: "Quest",
        note: "Unlocked automatically from the Saturn Junction. Blueprint and all parts come from solving the quest puzzles.",
        rank: 1,
      },
    ],
  },
  {
    name: "Loki",
    category: "warframe",
    imageName: "loki.png",
    sources: [
      {
        mission: "Psamathe",
        planet: "Neptune",
        type: "Assassination",
        note: "Hyena Pack boss fight. One of the easier assassinations.",
        rank: 1,
      },
    ],
  },
  {
    name: "Mag",
    category: "warframe",
    imageName: "mag.png",
    sources: [
      {
        mission: "Iliad",
        planet: "Phobos",
        type: "Assassination",
        note: "The Sergeant boss fight.",
        rank: 1,
      },
    ],
  },
  {
    name: "Mesa",
    category: "warframe",
    imageName: "mesa.png",
    sources: [
      {
        mission: "Mutalist Alad V",
        planet: "Eris",
        type: "Assassination",
        note: "Craft a Mutalist Alad V Assassinate Key from 10 Nav Coordinates (see the Mutalist Alad V Nav Coordinate resource entry). Nav Coordinates drop from Hyf Defense on Deimos (Rotation B) and Terrorem Survival (Rotation B). The key lets you fight Mutalist Alad V on Eris.",
        rank: 1,
      },
    ],
  },
  {
    name: "Mirage",
    category: "warframe",
    imageName: "mirage.png",
    sources: [
      {
        mission: "Hidden Messages Quest",
        planet: "Any",
        type: "Quest",
        note: "Solve the riddles in the quest to get all four blueprints. The riddles each point to a real game location.",
        rank: 1,
      },
    ],
  },
  {
    name: "Nekros",
    category: "warframe",
    imageName: "nekros.png",
    sources: [
      {
        mission: "Magnacidium",
        planet: "Deimos",
        type: "Assassination",
        note: "Lephantis boss. The Orokin Derelict no longer exists as a separate planet — Lephantis is now accessed via Magnacidium on Deimos. All three component blueprints drop at 33.33% each. Also earnable through The Circuit after completing The Duviri Paradox.",
        rank: 1,
      },
    ],
  },
  {
    name: "Nezha",
    category: "warframe",
    imageName: "nezha.png",
    sources: [
      {
        mission: "Tenno Lab",
        planet: "Orbiter",
        type: "Dojo Research",
        note: "Research in your Clan Dojo Tenno Lab, then buy the blueprint for credits.",
        rank: 1,
      },
    ],
  },
  {
    name: "Nidus",
    category: "warframe",
    imageName: "nidus.png",
    spoiler: true,
    spoilerFor: "The Glast Gambit",
    sources: [
      {
        mission: "Oestrus",
        planet: "Eris",
        type: "Infested Salvage",
        note: "Parts drop from Rotation C of Infested Salvage. Complete The Glast Gambit quest first to unlock the mission type. Blueprint (11.28%), Neuroptics (11.28%), Chassis (11.28%), Systems (7.52%) — all from Rotation C.",
        rank: 1,
      },
    ],
  },
  {
    name: "Nokko",
    category: "warframe",
    imageName: "nokko.png",
    spoiler: true,
    spoilerFor: "The New War",
    sources: [
      {
        mission: "Deepmines Bounties",
        planet: "Venus",
        type: "Bounty",
        note: "Requires The New War. Parts drop from specific bounty missions. Blueprint drops from all three bounty types.",
        rank: 1,
      },
      {
        mission: "Nightcap (Fortuna)",
        planet: "Venus",
        type: "Vendor",
        note: "Buy with Fergolyte. Requires Gardener rank with Nightcap.",
        rank: 2,
      },
    ],
  },
  {
    name: "Nova",
    category: "warframe",
    imageName: "nova.png",
    sources: [
      {
        mission: "Naamah",
        planet: "Europa",
        type: "Assassination",
        note: "The Raptor boss fight.",
        rank: 1,
      },
    ],
  },
  {
    name: "Nyx",
    category: "warframe",
    imageName: "nyx.png",
    sources: [
      {
        mission: "Phorid Assassination",
        planet: "Any",
        type: "Invasion",
        note: "Phorid only spawns during Infested Invasions — there is no permanent assassination node. Check the Alerts/Invasions tab for active nodes. All three component blueprints drop from him.",
        rank: 1,
      },
    ],
  },
  {
    name: "Oberon",
    category: "warframe",
    imageName: "oberon.png",
    sources: [
      {
        mission: "Earth Proxima / Saturn Proxima",
        planet: "Railjack",
        type: "Railjack",
        note: "Neuroptics and Systems from Earth Proxima Points of Interest (10% each). Chassis from Saturn Proxima Points of Interest (10%). Points of Interest are side objectives inside derelict ships during Proxima missions. The old Eximus enemy drop method was removed in Update 29.10. Also earnable through The Circuit.",
        rank: 1,
      },
    ],
  },
  {
    name: "Octavia",
    category: "warframe",
    imageName: "octavia.png",
    spoiler: true,
    spoilerFor: "The Second Dream",
    sources: [
      {
        mission: "Lua Music Puzzle",
        planet: "Lua",
        type: "Cache / Puzzle",
        note: "Chassis from the hidden music room on Lua — find the secret room, interact with all the instruments in the correct order. Lua unlocks after The Second Dream.",
        rank: 1,
      },
      {
        mission: "Terrorem",
        planet: "Deimos",
        type: "Survival",
        note: "Neuroptics Blueprint drops from Rotation C at 22.56%. Stay until 20 minutes.",
        rank: 2,
      },
      {
        mission: "Plato",
        planet: "Lua",
        type: "Exterminate",
        note: "Systems Blueprint drops from resource cache Rotation A at 22.56%. Search all three caches in the mission.",
        rank: 3,
      },
    ],
  },
  {
    name: "Oraxia",
    category: "warframe",
    imageName: "oraxia.png",
    spoiler: true,
    spoilerFor: "The Hex",
    sources: [
      {
        mission: "Isleweaver (Duviri)",
        planet: "Duviri",
        type: "Boss",
        note: "Defeat the Isleweaver boss in Duviri. Requires completing The Hex.",
        rank: 1,
      },
      {
        mission: "Acrithis (Dormizone)",
        planet: "Duviri",
        type: "Vendor",
        note: "Buy with Scuttler Husks (120 total for the full set).",
        rank: 2,
      },
    ],
  },
  {
    name: "Protea",
    category: "warframe",
    imageName: "protea.png",
    spoiler: true,
    spoilerFor: "The Deadlock Protocol",
    sources: [
      {
        mission: "Granum Void",
        planet: "Neptune",
        type: "Special",
        note: "Psamathe node. Bring a Granum Crown to enter. Requires completing The Deadlock Protocol quest.",
        rank: 1,
      },
    ],
  },
  {
    name: "Qorvex",
    category: "warframe",
    imageName: "qorvex.png",
    spoiler: true,
    spoilerFor: "Whispers in the Walls",
    sources: [
      {
        mission: "Sanctum Anatomica Bounties",
        planet: "Deimos",
        type: "Bounty",
        note: "Blueprint from completing Whispers in the Walls. Components drop from bounties at levels 55-80 (~12% each).",
        rank: 1,
      },
      {
        mission: "Bird 3 (Cavia)",
        planet: "Deimos",
        type: "Vendor",
        note: "Buy with standing. Requires Rank 2 (Researcher) for components, Rank 4 (Scholar) for main blueprint.",
        rank: 2,
      },
    ],
  },
  {
    name: "Revenant",
    category: "warframe",
    imageName: "revenant.png",
    spoiler: true,
    spoilerFor: "Plains of Eidolon",
    sources: [
      {
        mission: "Plains of Eidolon Bounties",
        planet: "Earth",
        type: "Bounty",
        note: "Night-time bounties only. Pick them up from Konzu in Cetus.",
        rank: 1,
      },
    ],
  },
  {
    name: "Rhino",
    category: "warframe",
    imageName: "rhino.png",
    sources: [
      {
        mission: "Fossa",
        planet: "Venus",
        type: "Assassination",
        note: "Jackal boss. One of the first bosses new players encounter.",
        rank: 1,
      },
    ],
  },
  {
    name: "Saryn",
    category: "warframe",
    imageName: "saryn.png",
    sources: [
      {
        mission: "Merrow",
        planet: "Sedna",
        type: "Assassination",
        note: "Kela De Thaym. Complete some Rathuum matches to unlock the fight.",
        rank: 1,
      },
    ],
  },
  {
    name: "Sevagoth",
    category: "warframe",
    imageName: "sevagoth.png",
    sources: [
      {
        mission: "Void Storm",
        planet: "Railjack",
        type: "Railjack",
        note: "All parts drop from Void Storm rotations in Railjack missions.",
        rank: 1,
      },
    ],
  },
  {
    name: "Sirius & Orion",
    category: "warframe",
    spoiler: true,
    spoilerFor: "Jade Shadows: Constellations",
    sources: [
      {
        mission: "Jade Shadows: Constellations Quest",
        planet: "Any",
        type: "Quest",
        note: "Main blueprint from completing the quest. Component blueprints from Scoria's Angel or The Kuva Wytch on Uranus Proxima (Railjack).",
        rank: 1,
      },
      {
        mission: "Hunhow (Pontis Tower)",
        planet: "Any",
        type: "Vendor",
        note: "Buy blueprints with 545 Emerald or Crimson Talents.",
        rank: 2,
      },
    ],
  },
  {
    name: "Styanax",
    category: "warframe",
    imageName: "styanax.png",
    sources: [
      {
        mission: "Chipper (Kahl's Garrison)",
        planet: "Any",
        type: "Vendor",
        note: "Buy with Stock earned from weekly Break Narmer missions. Requires Veilbreaker quest. Total 270 Stock for the full set.",
        rank: 1,
      },
    ],
  },
  {
    name: "Temple",
    category: "warframe",
    spoiler: true,
    spoilerFor: "The Hex",
    sources: [
      {
        mission: "Solstice Square (Höllvania)",
        planet: "Höllvania",
        type: "Stage Defense",
        note: "All parts drop from Stage Defense rotations. Requires completing The Hex and Rank 4 with The Hex Syndicate.",
        rank: 1,
      },
      {
        mission: "Flare (The Hex Syndicate)",
        planet: "Höllvania",
        type: "Vendor",
        note: "Buy with Beating Heartstrings (390 total).",
        rank: 2,
      },
    ],
  },
  {
    name: "Titania",
    category: "warframe",
    imageName: "titania.png",
    spoiler: true,
    spoilerFor: "The Silver Grove",
    sources: [
      {
        mission: "The Silver Grove Quest",
        planet: "Any",
        type: "Quest",
        note: "Main blueprint and all component blueprints come directly from completing The Silver Grove quest — no Orokin Derelict required. Alternatively buy from Cephalon Simaris (25,000 Standing per component, 50,000 for main), or earn through The Circuit.",
        rank: 1,
      },
    ],
  },
  {
    name: "Trinity",
    category: "warframe",
    imageName: "trinity.png",
    sources: [
      {
        mission: "Hades",
        planet: "Pluto",
        type: "Assassination",
        note: "Ambulas boss. You need Animo Nav Beacons to trigger it.",
        rank: 1,
      },
    ],
  },
  {
    name: "Uriel",
    category: "warframe",
    spoiler: true,
    spoilerFor: "The Old Peace",
    sources: [
      {
        mission: "The Old Peace Quest",
        planet: "Any",
        type: "Quest",
        note: "Blueprint from completing The Old Peace quest.",
        rank: 1,
      },
      {
        mission: "Roathe's Oblivion (The Descendia)",
        planet: "Any",
        type: "Assassination",
        note: "Component blueprints drop at 12.5% each. Also purchaseable from Roathe in La Cathédrale with Maphica currency.",
        rank: 2,
      },
    ],
  },
  {
    name: "Vauban",
    category: "warframe",
    imageName: "vauban.png",
    sources: [
      {
        mission: "Nightwave Store",
        planet: "Any",
        type: "Vendor",
        note: "Parts available in the Nightwave rewards store for Nightwave creds.",
        rank: 1,
      },
    ],
  },
  {
    name: "Valkyr",
    category: "warframe",
    imageName: "valkyr.png",
    sources: [
      {
        mission: "Themisto",
        planet: "Jupiter",
        type: "Assassination",
        note: "Alad V boss fight. All three component blueprints drop from Alad V at 38.72% each (Neuroptics, Chassis, Systems). The main blueprint comes from completing the mission. Alad V is also the source of Neural Sensors.",
        rank: 1,
      },
    ],
  },
  {
    name: "Volt",
    category: "warframe",
    imageName: "volt.png",
    sources: [
      {
        mission: "Tenno Lab",
        planet: "Orbiter",
        type: "Dojo Research",
        note: "Research in your Clan Dojo Tenno Lab, then buy the blueprint for credits.",
        rank: 1,
      },
    ],
  },
  {
    name: "Voruna",
    category: "warframe",
    imageName: "voruna.png",
    sources: [
      {
        mission: "Yuvarium / Circulus",
        planet: "Lua",
        type: "Conjunction Survival",
        note: "Parts drop from Rotation C. Requires The War Within quest to access Lua.",
        rank: 1,
      },
      {
        mission: "Archimedean Yonta (Chrysalith)",
        planet: "Zariman Ten Zero",
        type: "Vendor",
        note: "Buy blueprints with Lua Thrax Plasm: 75 per component, 125 for main blueprint (350 total). Lua Thrax Plasm drops from Hollow/Eclipse Thrax enemies in Conjunction Survival and from rotation rewards.",
        rank: 2,
      },
    ],
  },
  {
    name: "Wisp",
    category: "warframe",
    imageName: "wisp.png",
    spoiler: true,
    spoilerFor: "The Jovian Concord",
    sources: [
      {
        mission: "The Ropalolyst",
        planet: "Jupiter",
        type: "Assassination",
        note: "Finish The Jovian Concord quest to unlock this boss fight.",
        rank: 1,
      },
    ],
  },
  {
    name: "Wukong",
    category: "warframe",
    imageName: "wukong.png",
    spoiler: true,
    spoilerFor: "The Second Dream",
    sources: [
      {
        mission: "Any (Lua)",
        planet: "Lua",
        type: "Any",
        note: "Parts drop from any Orokin Moon mission rotation. Lua is unlocked after The Second Dream.",
        rank: 1,
      },
    ],
  },
  {
    name: "Xaku",
    category: "warframe",
    imageName: "xaku.png",
    spoiler: true,
    spoilerFor: "Heart of Deimos",
    sources: [
      {
        mission: "Cambion Drift Bounties",
        planet: "Deimos",
        type: "Bounty",
        note: "Chassis from Mother bounties. Requires Heart of Deimos quest.",
        rank: 1,
      },
      {
        mission: "Void Storm",
        planet: "Railjack",
        type: "Railjack",
        note: "Neuroptics and Systems from Void Storm rotations.",
        rank: 2,
      },
    ],
  },
  {
    name: "Yareli",
    category: "warframe",
    imageName: "yareli.png",
    spoiler: true,
    spoilerFor: "The Waverider",
    sources: [
      {
        mission: "The Waverider Quest",
        planet: "Orbiter",
        type: "Quest",
        note: "Start the Waverider quest from the Helminth room in your Orbiter. All parts come from the quest.",
        rank: 1,
      },
    ],
  },
  {
    name: "Zephyr",
    category: "warframe",
    imageName: "zephyr.png",
    sources: [
      {
        mission: "Tenno Lab",
        planet: "Orbiter",
        type: "Dojo Research",
        note: "Research in your Clan Dojo Tenno Lab, then buy the blueprint for credits.",
        rank: 1,
      },
    ],
  },

  // Mods
  {
    name: "Serration",
    category: "mod",
    imageName: "serration.png",
    sources: [
      {
        mission: "Any",
        planet: "Any (Grineer / Infested)",
        type: "Enemy Drop",
        note: "Check your collection first, you probably already have it",
        rank: 1,
      },
      {
        mission: "Nightwave Store",
        planet: "Any",
        type: "Vendor",
        note: "Shows up in the Nightwave shop sometimes",
        rank: 2,
      },
    ],
  },
  {
    name: "Hornet Strike",
    category: "mod",
    imageName: "hornetStrike.png",
    sources: [
      {
        mission: "Any",
        planet: "Any (Corpus)",
        type: "Enemy Drop",
        note: "Common Corpus enemy drop",
        rank: 1,
      },
    ],
  },
  {
    name: "Split Chamber",
    category: "mod",
    imageName: "splitChamber.png",
    sources: [
      {
        mission: "Gabii",
        planet: "Ceres",
        type: "Dark Sector Survival",
        note: "Best spot for it, high enemy density means fast drops",
        rank: 1,
      },
      {
        mission: "Any",
        planet: "Any",
        type: "Enemy Drop",
        note: "Uncommon drop from any faction",
        rank: 2,
      },
    ],
  },
  {
    name: "Vitality",
    category: "mod",
    imageName: "vitality.png",
    sources: [
      {
        mission: "Any / Tutorial",
        planet: "Any",
        type: "Enemy Drop",
        note: "You almost certainly already have this",
        rank: 1,
      },
    ],
  },
  {
    name: "Redirection",
    category: "mod",
    imageName: "redirection.png",
    sources: [
      {
        mission: "Any",
        planet: "Any (Corpus)",
        type: "Enemy Drop",
        note: "Very common Corpus drop",
        rank: 1,
      },
    ],
  },
  {
    name: "Steel Fiber",
    category: "mod",
    imageName: "steelFiber.png",
    sources: [
      {
        mission: "Any",
        planet: "Any (Grineer)",
        type: "Enemy Drop",
        note: "Common Grineer drop",
        rank: 1,
      },
    ],
  },
  {
    name: "Intensify",
    category: "mod",
    imageName: "intensify.png",
    sources: [
      {
        mission: "Any",
        planet: "Any",
        type: "Enemy Drop",
        note: "Common enemy drop from all factions",
        rank: 1,
      },
    ],
  },
  {
    name: "Continuity",
    category: "mod",
    imageName: "continuity.png",
    sources: [
      {
        mission: "Any",
        planet: "Any",
        type: "Enemy Drop",
        note: "Common enemy drop",
        rank: 1,
      },
    ],
  },
  {
    name: "Flow",
    category: "mod",
    imageName: "flow.png",
    sources: [
      {
        mission: "Any",
        planet: "Any",
        type: "Enemy Drop",
        note: "Common enemy drop",
        rank: 1,
      },
    ],
  },
  {
    name: "Stretch",
    category: "mod",
    imageName: "stretch.png",
    sources: [
      {
        mission: "Any",
        planet: "Any",
        type: "Enemy Drop",
        note: "Common enemy drop",
        rank: 1,
      },
    ],
  },
  {
    name: "Point Strike",
    category: "mod",
    imageName: "pointStrike.png",
    sources: [
      {
        mission: "Any",
        planet: "Any",
        type: "Enemy Drop",
        note: "Check your collection first",
        rank: 1,
      },
    ],
  },
  {
    name: "Hunter Munitions",
    category: "mod",
    imageName: "hunterMunitions.png",
    sources: [
      {
        mission: "Plains of Eidolon Bounties",
        planet: "Earth",
        type: "Bounty",
        note: "Drops from any tier bounty rotation",
        rank: 1,
      },
    ],
  },
  {
    name: "Blind Rage",
    category: "mod",
    imageName: "blindRage.png",
    sources: [
      {
        mission: "Orokin Vault",
        planet: "Deimos",
        type: "Corrupted Vault",
        note: "Bring a Dragon Key (build in Foundry). Orokin Vaults appear in all Deimos missions that use the Orokin Derelict tileset (any mission except Defense, Assassination, and open-world Landscape). One vault per mission. Opening it drops a random corrupted mod.",
        rank: 1,
      },
    ],
  },
  {
    name: "Narrow Minded",
    category: "mod",
    imageName: "narrowMinded.png",
    sources: [
      {
        mission: "Orokin Vault",
        planet: "Deimos",
        type: "Corrupted Vault",
        note: "Bring a Dragon Key. One vault per Deimos mission (Orokin Derelict tileset). Opening gives a random corrupted mod — there are 16 total, so target farming a specific one will take many runs.",
        rank: 1,
      },
    ],
  },
  {
    name: "Fleeting Expertise",
    category: "mod",
    imageName: "fleetingExpertise.png",
    sources: [
      {
        mission: "Orokin Vault",
        planet: "Deimos",
        type: "Corrupted Vault",
        note: "Bring a Dragon Key. One vault per Deimos mission (Orokin Derelict tileset). Opening gives a random corrupted mod.",
        rank: 1,
      },
    ],
  },
  {
    name: "Transient Fortitude",
    category: "mod",
    imageName: "transientFortitude.png",
    sources: [
      {
        mission: "Orokin Vault",
        planet: "Deimos",
        type: "Corrupted Vault",
        note: "Bring a Dragon Key. One vault per Deimos mission (Orokin Derelict tileset). Opening gives a random corrupted mod.",
        rank: 1,
      },
    ],
  },
  {
    name: "Overextended",
    category: "mod",
    imageName: "overextended.png",
    sources: [
      {
        mission: "Orokin Vault",
        planet: "Deimos",
        type: "Corrupted Vault",
        note: "Bring a Dragon Key. One vault per Deimos mission (Orokin Derelict tileset). Opening gives a random corrupted mod.",
        rank: 1,
      },
    ],
  },

  // Prime Parts
  {
    name: "Rhino Prime",
    category: "prime",
    ducats: 65,
    imageName: "rhinoPrime.png",
    wikiSlug: "Rhino/Prime",
    sources: [
      {
        mission: "Axi A6, Lith R4, Meso C6, Neo R4",
        planet: "Void",
        type: "Void Fissure",
        note: "Blueprint: Axi A6 (rare). Neuroptics: Lith R4 (rare). Chassis: Meso C6 (rare). Systems: Neo R4 (rare).",
        rank: 1,
      },
      {
        mission: "Baro Ki'Teer",
        planet: "Any Relay",
        type: "Vendor",
        note: "Sometimes available during Prime Resurgence",
        rank: 2,
      },
    ],
  },
  {
    name: "Saryn Prime",
    category: "prime",
    ducats: 100,
    imageName: "sarynPrime.png",
    wikiSlug: "Saryn/Prime",
    sources: [
      {
        mission: "Axi S3, Lith S9, Meso S4, Neo S5",
        planet: "Void",
        type: "Void Fissure",
        note: "Blueprint: Axi S3 (rare). Neuroptics: Meso S4 (rare). Chassis: Lith S9 (rare). Systems: Neo S5 (rare).",
        rank: 1,
      },
      {
        mission: "Baro Ki'Teer",
        planet: "Any Relay",
        type: "Vendor",
        note: "Sometimes available during Prime Resurgence",
        rank: 2,
      },
    ],
  },
  {
    name: "Mesa Prime",
    category: "prime",
    ducats: 100,
    imageName: "mesaPrime.png",
    wikiSlug: "Mesa/Prime",
    sources: [
      {
        mission: "Axi M2, Lith M7, Meso M3, Neo M4",
        planet: "Void",
        type: "Void Fissure",
        note: "Blueprint: Axi M2 (rare). Neuroptics: Lith M7 (rare). Chassis: Meso M3 (rare). Systems: Neo M4 (rare).",
        rank: 1,
      },
    ],
  },
  {
    name: "Ash Prime",
    category: "prime",
    ducats: 65,
    vaulted: true,
    wikiSlug: "Ash/Prime",
    sources: [
      {
        mission: "Axi A4, Neo A1 + others",
        planet: "Void",
        type: "Void Fissure",
        note: "Blueprint: Axi A4 (rare). Neuroptics: Neo A1 (rare). Chassis and Systems relics return during Prime Resurgence, check wiki for the full list.",
        rank: 1,
      },
      {
        mission: "Trade chat",
        planet: "Any",
        type: "Special",
        note: "warframe.market is the fastest way to buy individual parts",
        rank: 2,
      },
    ],
  },
  {
    name: "Gauss Prime",
    category: "prime",
    ducats: 65,
    wikiSlug: "Gauss/Prime",
    sources: [
      {
        mission: "Axi G5, Lith G6, Meso G4, Neo G3",
        planet: "Void",
        type: "Void Fissure",
        note: "Blueprint: Axi G5 (rare). Neuroptics: Lith G6 (rare). Chassis: Meso G4 (rare). Systems: Neo G3 (rare).",
        rank: 1,
      },
    ],
  },
  {
    name: "Nidus Prime",
    category: "prime",
    ducats: 65,
    vaulted: true,
    wikiSlug: "Nidus/Prime",
    sources: [
      {
        mission: "Axi N10, Lith N8, Meso N11, Neo N14",
        planet: "Void",
        type: "Void Fissure",
        note: "Blueprint: Axi N10 (rare). Neuroptics: Lith N8 (rare). Chassis: Neo N14 (rare). Systems: Meso N11 (rare).",
        rank: 1,
      },
      {
        mission: "Trade chat",
        planet: "Any",
        type: "Special",
        note: "warframe.market for quick part purchases",
        rank: 2,
      },
    ],
  },
  {
    name: "Harrow Prime",
    category: "prime",
    ducats: 65,
    vaulted: true,
    wikiSlug: "Harrow/Prime",
    sources: [
      {
        mission: "Axi H5, Lith H4, Meso H2, Neo H2",
        planet: "Void",
        type: "Void Fissure",
        note: "Blueprint: Axi H5 (rare). Neuroptics: Lith H4 (rare). Chassis: Meso H2 (rare). Systems: Neo H2 (rare).",
        rank: 1,
      },
      {
        mission: "Trade chat",
        planet: "Any",
        type: "Special",
        note: "warframe.market for quick part purchases",
        rank: 2,
      },
    ],
  },
  {
    name: "Octavia Prime",
    category: "prime",
    ducats: 65,
    vaulted: true,
    wikiSlug: "Octavia/Prime",
    sources: [
      {
        mission: "Axi O5, Lith O5, Meso O5, Neo O3",
        planet: "Void",
        type: "Void Fissure",
        note: "Blueprint: Lith O5 (rare). Neuroptics: Neo O3 (rare). Chassis: Meso O5 (rare). Systems: Axi O5 (rare).",
        rank: 1,
      },
      {
        mission: "Trade chat",
        planet: "Any",
        type: "Special",
        note: "warframe.market for quick part purchases",
        rank: 2,
      },
    ],
  },
  {
    name: "Khora Prime",
    category: "prime",
    ducats: 65,
    vaulted: true,
    wikiSlug: "Khora/Prime",
    sources: [
      {
        mission: "Axi K7, Lith K6, Meso K5, Neo K4",
        planet: "Void",
        type: "Void Fissure",
        note: "Blueprint: Axi K7 (rare). Neuroptics: Lith K6 (rare). Chassis: Meso K5 (rare). Systems: Neo K4 (rare).",
        rank: 1,
      },
      {
        mission: "Trade chat",
        planet: "Any",
        type: "Special",
        note: "warframe.market for quick part purchases",
        rank: 2,
      },
    ],
  },
  {
    name: "Revenant Prime",
    category: "prime",
    ducats: 65,
    vaulted: true,
    wikiSlug: "Revenant/Prime",
    sources: [
      {
        mission: "Axi R4, Lith R9, Meso R8, Neo R9",
        planet: "Void",
        type: "Void Fissure",
        note: "Blueprint: Axi R4 (rare). Neuroptics: Lith R9 (rare). Chassis: Meso R8 (rare). Systems: Neo R9 (rare).",
        rank: 1,
      },
      {
        mission: "Trade chat",
        planet: "Any",
        type: "Special",
        note: "warframe.market for quick part purchases",
        rank: 2,
      },
    ],
  },
  {
    name: "Wisp Prime",
    category: "prime",
    ducats: 65,
    vaulted: true,
    wikiSlug: "Wisp/Prime",
    sources: [
      {
        mission: "Axi W3, Lith W3, Meso W5, Neo W3",
        planet: "Void",
        type: "Void Fissure",
        note: "Blueprint: Axi W3 (rare). Neuroptics: Lith W3 (rare). Chassis: Meso W5 (rare). Systems: Neo W3 (rare).",
        rank: 1,
      },
      {
        mission: "Trade chat",
        planet: "Any",
        type: "Special",
        note: "warframe.market for quick part purchases",
        rank: 2,
      },
    ],
  },
  {
    name: "Gara Prime",
    category: "prime",
    ducats: 65,
    vaulted: true,
    wikiSlug: "Gara/Prime",
    sources: [
      {
        mission: "Various relics (all vaulted)",
        planet: "Void",
        type: "Void Fissure",
        note: "All relics are currently vaulted. Blueprint: Lith G11, Meso G3, Neo G4, Axi G6/G9. Chassis: Neo P5, Lith K6, Meso A4. Neuroptics: Lith S12, Neo N18, Meso C10. Systems: Meso K5, Axi G7, Neo N21. Relics return during Prime Resurgence.",
        rank: 1,
      },
      {
        mission: "Trade chat",
        planet: "Any",
        type: "Special",
        note: "warframe.market for quick part purchases while vaulted.",
        rank: 2,
      },
    ],
  },
  {
    name: "Nova Prime",
    category: "prime",
    ducats: 65,
    vaulted: true,
    wikiSlug: "Nova/Prime",
    sources: [
      {
        mission: "Axi N5, Lith N5, Meso N6, Neo N10",
        planet: "Void",
        type: "Void Fissure",
        note: "Blueprint: Axi N5 (rare). Neuroptics: Neo N10 (rare). Chassis: Lith N5 (rare). Systems: Meso N6 (rare). Relics return during Prime Resurgence.",
        rank: 1,
      },
      {
        mission: "Trade chat",
        planet: "Any",
        type: "Special",
        note: "warframe.market for quick part purchases",
        rank: 2,
      },
    ],
  },
  {
    name: "Trinity Prime",
    category: "prime",
    ducats: 65,
    vaulted: true,
    wikiSlug: "Trinity/Prime",
    sources: [
      {
        mission: "Axi T3, Lith T3, Meso T3, Neo T1",
        planet: "Void",
        type: "Void Fissure",
        note: "Relics return during Prime Resurgence. Check wiki for current designations.",
        rank: 1,
      },
      {
        mission: "Trade chat",
        planet: "Any",
        type: "Special",
        note: "warframe.market for quick part purchases",
        rank: 2,
      },
    ],
  },
  {
    name: "Loki Prime",
    category: "prime",
    ducats: 65,
    vaulted: true,
    wikiSlug: "Loki/Prime",
    sources: [
      {
        mission: "Meso K2, Neo K2, Axi L4",
        planet: "Void",
        type: "Void Fissure",
        note: "Relics return during Prime Resurgence. Check wiki for current designations.",
        rank: 1,
      },
      {
        mission: "Trade chat",
        planet: "Any",
        type: "Special",
        note: "warframe.market for quick part purchases",
        rank: 2,
      },
    ],
  },
  {
    name: "Volt Prime",
    category: "prime",
    ducats: 45,
    vaulted: true,
    wikiSlug: "Volt/Prime",
    sources: [
      {
        mission: "Meso V4, Neo V8, Axi V8",
        planet: "Void",
        type: "Void Fissure",
        note: "Relics return during Prime Resurgence. Check wiki for current designations.",
        rank: 1,
      },
      {
        mission: "Trade chat",
        planet: "Any",
        type: "Special",
        note: "warframe.market for quick part purchases",
        rank: 2,
      },
    ],
  },

  // Relics
  // Best spots: Lith = Hepit (Void Capture), Meso = Io (Jupiter Defense),
  //             Neo = Hydron (Sedna Defense), Axi = Mot (Void Survival)

  // Rhino Prime relics
  {
    name: "Axi A6 Relic",
    category: "relic",
    sources: [
      {
        mission: "Mot (Survival) / Xini (Interception)",
        planet: "Void",
        type: "Axi Fissure",
        note: "Rare: Rhino Prime Blueprint. Uncommon: Nyx Prime Neuroptics, Ankyros Prime Gauntlet. Common: Soma Prime Barrel, Paris Prime Upper Limb, Boltor Prime Receiver",
        rank: 1,
      },
    ],
  },
  {
    name: "Lith R4 Relic",
    category: "relic",
    sources: [
      {
        mission: "Hepit (Capture)",
        planet: "Void",
        type: "Lith Fissure",
        note: "Rare: Rhino Prime Neuroptics. Uncommon: Bronco Prime Receiver, Hikou Prime Pouch. Common: Ankyros Prime Guard, Paris Prime Lower Limb, Boar Prime Blueprint",
        rank: 1,
      },
    ],
  },
  {
    name: "Meso C6 Relic",
    category: "relic",
    sources: [
      {
        mission: "Io (Defense)",
        planet: "Jupiter",
        type: "Meso Fissure",
        note: "Rare: Rhino Prime Chassis. Uncommon: Orthos Prime Handle, Fang Prime Handle. Common: Nyx Prime Chassis, Paris Prime Grip, Boar Prime Receiver",
        rank: 1,
      },
    ],
  },
  {
    name: "Neo R4 Relic",
    category: "relic",
    sources: [
      {
        mission: "Hydron (Defense)",
        planet: "Sedna",
        type: "Neo Fissure",
        note: "Rare: Rhino Prime Systems. Uncommon: Soma Prime Stock, Braton Prime Receiver. Common: Ankyros Prime Guard, Boar Prime Receiver, Boltor Prime Receiver",
        rank: 1,
      },
    ],
  },

  // Saryn Prime relics
  {
    name: "Axi S3 Relic",
    category: "relic",
    sources: [
      {
        mission: "Mot (Survival) / Xini (Interception)",
        planet: "Void",
        type: "Axi Fissure",
        note: "Rare: Saryn Prime Blueprint. Uncommon: Cernos Prime Grip, Nikana Prime Blade. Common: Kogake Prime Gauntlet, Spira Prime Pouch, Vectis Prime Barrel",
        rank: 1,
      },
    ],
  },
  {
    name: "Lith S9 Relic",
    category: "relic",
    sources: [
      {
        mission: "Hepit (Capture)",
        planet: "Void",
        type: "Lith Fissure",
        note: "Rare: Saryn Prime Chassis. Uncommon: Cernos Prime Lower Limb, Nikana Prime Handle. Common: Kogake Prime Blueprint, Spira Prime Blueprint, Vectis Prime Stock",
        rank: 1,
      },
    ],
  },
  {
    name: "Meso S4 Relic",
    category: "relic",
    sources: [
      {
        mission: "Io (Defense)",
        planet: "Jupiter",
        type: "Meso Fissure",
        note: "Rare: Saryn Prime Neuroptics. Uncommon: Nikana Prime Blueprint, Cernos Prime String. Common: Kogake Prime Guard, Spira Prime Pouch, Vectis Prime Receiver",
        rank: 1,
      },
    ],
  },
  {
    name: "Neo S5 Relic",
    category: "relic",
    sources: [
      {
        mission: "Hydron (Defense)",
        planet: "Sedna",
        type: "Neo Fissure",
        note: "Rare: Saryn Prime Systems. Uncommon: Nikana Prime Handle, Cernos Prime Upper Limb. Common: Kogake Prime Gauntlet, Spira Prime Blade, Vectis Prime Barrel",
        rank: 1,
      },
    ],
  },

  // Mesa Prime relics
  {
    name: "Axi M2 Relic",
    category: "relic",
    sources: [
      {
        mission: "Mot (Survival) / Xini (Interception)",
        planet: "Void",
        type: "Axi Fissure",
        note: "Rare: Mesa Prime Blueprint. Uncommon: Akjagara Prime Link, Redeemer Prime Blade. Common: Akjagara Prime Barrel, Redeemer Prime Handle, Akjagara Prime Blueprint",
        rank: 1,
      },
    ],
  },
  {
    name: "Lith M7 Relic",
    category: "relic",
    sources: [
      {
        mission: "Hepit (Capture)",
        planet: "Void",
        type: "Lith Fissure",
        note: "Rare: Mesa Prime Neuroptics. Uncommon: Redeemer Prime Blueprint, Akjagara Prime Blueprint. Common: Akjagara Prime Barrel, Redeemer Prime Handle, Akjagara Prime Link",
        rank: 1,
      },
    ],
  },
  {
    name: "Meso M3 Relic",
    category: "relic",
    sources: [
      {
        mission: "Io (Defense)",
        planet: "Jupiter",
        type: "Meso Fissure",
        note: "Rare: Mesa Prime Chassis. Uncommon: Akjagara Prime Link, Redeemer Prime Blade. Common: Akjagara Prime Barrel, Redeemer Prime Handle, Akjagara Prime Blueprint",
        rank: 1,
      },
    ],
  },
  {
    name: "Neo M4 Relic",
    category: "relic",
    sources: [
      {
        mission: "Hydron (Defense)",
        planet: "Sedna",
        type: "Neo Fissure",
        note: "Rare: Mesa Prime Systems. Uncommon: Akjagara Prime Link, Redeemer Prime Blueprint. Common: Akjagara Prime Barrel, Redeemer Prime Handle, Redeemer Prime Blade",
        rank: 1,
      },
    ],
  },

  // Ash Prime relics
  {
    name: "Axi A4 Relic",
    category: "relic",
    sources: [
      {
        mission: "Mot (Survival) / Xini (Interception)",
        planet: "Void",
        type: "Axi Fissure",
        note: "Rare: Ash Prime Blueprint. Uncommon: Paris Prime Upper Limb, Soma Prime Barrel. Common: Boltor Prime Stock, Braton Prime Barrel, Latron Prime Barrel",
        rank: 1,
      },
    ],
  },
  {
    name: "Neo A1 Relic",
    category: "relic",
    sources: [
      {
        mission: "Hydron (Defense)",
        planet: "Sedna",
        type: "Neo Fissure",
        note: "Rare: Ash Prime Neuroptics. Uncommon: Vasto Prime Barrel, Orthos Prime Handle. Common: Braton Prime Blueprint, Latron Prime Receiver, Paris Prime Grip",
        rank: 1,
      },
    ],
  },

  // Gauss Prime relics
  {
    name: "Axi G5 Relic",
    category: "relic",
    sources: [
      {
        mission: "Mot (Survival) / Xini (Interception)",
        planet: "Void",
        type: "Axi Fissure",
        note: "Rare: Gauss Prime Blueprint. Uncommon: Stahlta Prime Barrel, Acceltra Prime Barrel. Common: Stahlta Prime Stock, Acceltra Prime Blueprint, Stahlta Prime Blueprint",
        rank: 1,
      },
    ],
  },
  {
    name: "Meso G4 Relic",
    category: "relic",
    sources: [
      {
        mission: "Io (Defense)",
        planet: "Jupiter",
        type: "Meso Fissure",
        note: "Rare: Gauss Prime Chassis. Uncommon: Acceltra Prime Receiver, Stahlta Prime Receiver. Common: Acceltra Prime Blueprint, Stahlta Prime Blueprint, Acceltra Prime Stock",
        rank: 1,
      },
    ],
  },
  {
    name: "Neo G3 Relic",
    category: "relic",
    sources: [
      {
        mission: "Hydron (Defense)",
        planet: "Sedna",
        type: "Neo Fissure",
        note: "Rare: Gauss Prime Systems. Uncommon: Acceltra Prime Stock, Stahlta Prime Stock. Common: Acceltra Prime Receiver, Stahlta Prime Barrel, Acceltra Prime Barrel",
        rank: 1,
      },
    ],
  },
  {
    name: "Lith G6 Relic",
    category: "relic",
    sources: [
      {
        mission: "Hepit (Capture)",
        planet: "Void",
        type: "Lith Fissure",
        note: "Rare: Gauss Prime Neuroptics. Uncommon: Stahlta Prime Receiver, Acceltra Prime Barrel. Common: Acceltra Prime Blueprint, Stahlta Prime Blueprint, Stahlta Prime Barrel",
        rank: 1,
      },
    ],
  },

  // ── Kuva Weapons ──────────────────────────────────────────────────────────
  {
    name: "Kuva Bramma",
    category: "weapon",
    imageName: "KuvaGrnBow.png",
    sources: KUVA_SRC,
  },
  {
    name: "Kuva Chakkhurr",
    category: "weapon",
    imageName: "GrnKuvaLichRifleWeapon.png",
    sources: KUVA_SRC,
  },
  {
    name: "Kuva Drakgoon",
    category: "weapon",
    imageName: "KuvaLichDrakgoonSkin.png",
    sources: KUVA_SRC,
  },
  {
    name: "Kuva Hek",
    category: "weapon",
    imageName: "KuvaHek.png",
    sources: KUVA_SRC,
  },
  {
    name: "Kuva Hind",
    category: "weapon",
    imageName: "KuvaHind.png",
    sources: KUVA_SRC,
  },
  {
    name: "Kuva Karak",
    category: "weapon",
    imageName: "KuvaLichKarakSkin.png",
    sources: KUVA_SRC,
  },
  {
    name: "Kuva Kohm",
    category: "weapon",
    imageName: "KuvaLichKohmSkin.png",
    sources: KUVA_SRC,
  },
  {
    name: "Kuva Ogris",
    category: "weapon",
    imageName: "KuvaLichOgrisSkin.png",
    sources: KUVA_SRC,
  },
  {
    name: "Kuva Quartakk",
    category: "weapon",
    imageName: "KuvaLichQuartakkSkin.png",
    sources: KUVA_SRC,
  },
  {
    name: "Kuva Sobek",
    category: "weapon",
    imageName: "KuvaSobek.png",
    sources: KUVA_SRC,
  },
  {
    name: "Kuva Tonkor",
    category: "weapon",
    imageName: "KuvaLichTonkorSkin.png",
    sources: KUVA_SRC,
  },
  {
    name: "Kuva Zarr",
    category: "weapon",
    imageName: "KuvaZarr.png",
    sources: KUVA_SRC,
  },
  {
    name: "Kuva Brakk",
    category: "weapon",
    imageName: "KuvaLichBrakkSkin.png",
    sources: KUVA_SRC,
  },
  {
    name: "Kuva Kraken",
    category: "weapon",
    imageName: "KuvaLichKrakenSkin.png",
    sources: KUVA_SRC,
  },
  {
    name: "Kuva Nukor",
    category: "weapon",
    imageName: "KuvaNukor.png",
    sources: KUVA_SRC,
  },
  {
    name: "Kuva Seer",
    category: "weapon",
    imageName: "KuvaLichSeerSkin.png",
    sources: KUVA_SRC,
  },
  {
    name: "Kuva Twin Stubbas",
    category: "weapon",
    imageName: "KuvaLichStubbaSkin.png",
    sources: KUVA_SRC,
  },
  {
    name: "Kuva Shildeg",
    category: "weapon",
    imageName: "GrnKuvaLichScytheWeapon.png",
    sources: KUVA_SRC,
  },
  {
    name: "Kuva Ghoulsaw",
    category: "weapon",
    imageName: "KuvaGhoulSaw.png",
    sources: KUVA_SRC,
  },
  {
    name: "Kuva Ayanga",
    category: "weapon",
    imageName: "GrnHeavyGrenadeLauncher.png",
    sources: KUVA_SRC,
  },
  {
    name: "Kuva Grattler",
    category: "weapon",
    imageName: "KuvaGrattler.png",
    sources: KUVA_SRC,
  },

  // ── Tenet Weapons ─────────────────────────────────────────────────────────
  {
    name: "Tenet Arca Plasmor",
    category: "weapon",
    imageName: "CrpBEArcaPlasmor.png",
    sources: TENET_SRC,
  },
  {
    name: "Tenet Envoy",
    category: "weapon",
    imageName: "CrpBriefcaseLauncher.png",
    sources: TENET_SRC,
  },
  {
    name: "Tenet Ferrox",
    category: "weapon",
    imageName: "TenetFerrox.png",
    sources: TENET_SRC,
  },
  {
    name: "Tenet Flux Rifle",
    category: "weapon",
    imageName: "CrpBEFluxRifle.png",
    sources: TENET_SRC,
  },
  {
    name: "Tenet Glaxion",
    category: "weapon",
    imageName: "CrpBEGlaxion.png",
    sources: TENET_SRC,
  },
  {
    name: "Tenet Quanta",
    category: "weapon",
    imageName: "TenetQuanta.png",
    sources: TENET_SRC,
  },
  {
    name: "Tenet Tetra",
    category: "weapon",
    imageName: "CrpBETetra.png",
    sources: TENET_SRC,
  },
  {
    name: "Tenet Cycron",
    category: "weapon",
    imageName: "CrpBECycron.png",
    sources: TENET_SRC,
  },
  {
    name: "Tenet Detron",
    category: "weapon",
    imageName: "CrpBEDetron.png",
    sources: TENET_SRC,
  },
  {
    name: "Tenet Diplos",
    category: "weapon",
    imageName: "CrpBriefcaseAkimboGun.png",
    sources: TENET_SRC,
  },
  {
    name: "Tenet Plinx",
    category: "weapon",
    imageName: "TenetPlinx.png",
    sources: TENET_SRC,
  },
  {
    name: "Tenet Spirex",
    category: "weapon",
    imageName: "CrpIgniterPistol.png",
    sources: TENET_SRC,
  },
  {
    name: "Tenet Agendus",
    category: "weapon",
    imageName: "CrpHammerShield.png",
    sources: TENET_SRC,
  },
  {
    name: "Tenet Exec",
    category: "weapon",
    imageName: "CrpBigSlash.png",
    sources: TENET_SRC,
  },
  {
    name: "Tenet Grigori",
    category: "weapon",
    imageName: "CrpBriefcaseScythe.png",
    sources: TENET_SRC,
  },
  {
    name: "Tenet Livia",
    category: "weapon",
    imageName: "CrpBriefcase2HKatana.png",
    sources: TENET_SRC,
  },

  // ── Carmine Weapons (Jade Shadows) ────────────────────────────────────────
  {
    name: "Carmine Penta",
    category: "weapon",
    imageName: "PentaCarmine.png",
    sources: [
      {
        mission: "Ascension",
        planet: "Uranus",
        type: "Boss",
        rank: 1,
        note: "Blueprint drops from completing Jade's Ascension missions on Brutus (Uranus). Requires completing the Jade Shadows quest first.",
      },
    ],
  },

  // ── Coda Weapons (Warframe: 1999) ─────────────────────────────────────────
  {
    name: "Coda Bassocyst",
    category: "weapon",
    imageName: "1999InfShotgunWeapon.png",
    sources: CODA_SRC,
  },
  {
    name: "Coda Bubonico",
    category: "weapon",
    imageName: "CodaBubonico.png",
    sources: CODA_SRC,
  },
  {
    name: "Coda Hema",
    category: "weapon",
    imageName: "CodaHema.png",
    sources: CODA_SRC,
  },
  {
    name: "Coda Sporothrix",
    category: "weapon",
    imageName: "CodaSporothrix.png",
    sources: CODA_SRC,
  },
  {
    name: "Coda Synapse",
    category: "weapon",
    imageName: "CodaSynapse.png",
    sources: CODA_SRC,
  },
  {
    name: "Coda Catabolyst",
    category: "weapon",
    imageName: "CodaCatabolyst.png",
    sources: CODA_SRC,
  },
  {
    name: "Coda Pox",
    category: "weapon",
    imageName: "CodaPox.png",
    sources: CODA_SRC,
  },
  {
    name: "Coda Tysis",
    category: "weapon",
    imageName: "CodaTysis.png",
    sources: CODA_SRC,
  },
  {
    name: "Coda Caustacyst",
    category: "weapon",
    imageName: "CodaCaustacyst.png",
    sources: CODA_SRC,
  },
  {
    name: "Coda Hirudo",
    category: "weapon",
    imageName: "CodaHirudo.png",
    sources: CODA_SRC,
  },
  {
    name: "Coda Mire",
    category: "weapon",
    imageName: "CodaMire.png",
    sources: CODA_SRC,
  },
  {
    name: "Coda Motovore",
    category: "weapon",
    imageName: "InfLichHammerWeapon.png",
    sources: CODA_SRC,
  },
  {
    name: "Coda Pathocyst",
    category: "weapon",
    imageName: "CodaPathocyst.png",
    sources: CODA_SRC,
  },
  {
    name: "Dual Coda Torxica",
    category: "weapon",
    sources: [
      {
        mission: "Eleanor (The Hex)",
        planet: "Höllvania",
        type: "Vendor",
        rank: 1,
        mr: 17,
        note: "Purchase from Eleanor at The Hex Syndicate hub for 10 Live Heartcells. Live Heartcells drop from defeating Technocyte Coda adversaries. The weapon cycles through Eleanor's shop every 4 days and comes with a random progenitor bonus damage type (25–60%). Requires completing The Hex quest.",
      },
    ],
  },

  // ── Kubrow ────────────────────────────────────────────────────────────────
  {
    name: "Huras Kubrow",
    category: "companion",
    sources: [
      {
        mission: "Incubator",
        planet: "Orbiter",
        type: "Companion",
        rank: 1,
        note: "Collect a Kubrow Egg from breakable containers in Earth Forest missions. Hatch in the Orbiter Incubator using an Incubator Power Core. Breed is random — use Genetic Imprints to aim for a specific type. Gives 3,000 mastery XP at rank 30.",
      },
    ],
  },
  {
    name: "Sahasa Kubrow",
    category: "companion",
    sources: [
      {
        mission: "Incubator",
        planet: "Orbiter",
        type: "Companion",
        rank: 1,
        note: "Kubrow Eggs drop from breakable containers in Earth Forest missions. Random breed on hatch; use matching Genetic Imprints to steer toward Sahasa. Gives 3,000 mastery XP at rank 30.",
      },
    ],
  },
  {
    name: "Raksa Kubrow",
    category: "companion",
    sources: [
      {
        mission: "Incubator",
        planet: "Orbiter",
        type: "Companion",
        rank: 1,
        note: "Kubrow Eggs drop from breakable containers in Earth Forest missions. Use Raksa Genetic Imprints to increase the chance. Gives 3,000 mastery XP at rank 30.",
      },
    ],
  },
  {
    name: "Sunika Kubrow",
    category: "companion",
    sources: [
      {
        mission: "Incubator",
        planet: "Orbiter",
        type: "Companion",
        rank: 1,
        note: "Kubrow Eggs drop from breakable containers in Earth Forest missions. Use Sunika Genetic Imprints. Gives 3,000 mastery XP at rank 30.",
      },
    ],
  },
  {
    name: "Chesa Kubrow",
    category: "companion",
    sources: [
      {
        mission: "Incubator",
        planet: "Orbiter",
        type: "Companion",
        rank: 1,
        note: "Kubrow Eggs drop from breakable containers in Earth Forest missions. Use Chesa Genetic Imprints. Gives 3,000 mastery XP at rank 30.",
      },
    ],
  },
  {
    name: "Helminth Charger",
    category: "companion",
    sources: [
      {
        mission: "Incubator",
        planet: "Orbiter",
        type: "Companion",
        rank: 1,
        note: "Hatched from the Helminth Cyst. Let an infected Kubrow gestate in the Incubator — the cyst randomly appears after sleeping in your Orbiter for ~12 hours. Alternatively, have another player's Helminth cough on you during a mission, then sleep. Gives 3,000 mastery XP at rank 30.",
      },
    ],
  },

  // ── Kavat ─────────────────────────────────────────────────────────────────
  {
    name: "Adarza Kavat",
    category: "companion",
    sources: [
      {
        mission: "Incubator",
        planet: "Orbiter",
        type: "Companion",
        rank: 1,
        note: "Collect 10 Kavat Genetic Codes by scanning Feral Kavats in Deimos missions on the Orokin Derelict tileset (Horend Capture, Phlegyas Exterminate, or Formido Sabotage). Use a Codex or Synthesis Scanner on the Kavat's back. Breed is random between Adarza and Smeeta on hatch. Gives 3,000 mastery XP at rank 30.",
      },
    ],
  },
  {
    name: "Smeeta Kavat",
    category: "companion",
    sources: [
      {
        mission: "Incubator",
        planet: "Orbiter",
        type: "Companion",
        rank: 1,
        note: "Collect 10 Kavat Genetic Codes by scanning Feral Kavats in Deimos missions on the Orokin Derelict tileset (Horend, Phlegyas, or Formido). Hatch in Incubator — 50/50 chance of Adarza vs Smeeta. Gives 3,000 mastery XP at rank 30.",
      },
    ],
  },
  {
    name: "Vasca Kavat",
    category: "companion",
    sources: [
      {
        mission: "Incubator",
        planet: "Earth",
        type: "Companion",
        rank: 1,
        note: "Go to Plains of Eidolon at night. Let a Vasca Kavat (glowing feral Kavat) scratch you to become infected. Return to Orbiter and let the Vasca strain incubate (sleep in Orbiter). Then use a Kavat Genetic Code + Incubator to hatch. Gives 3,000 mastery XP at rank 30.",
      },
    ],
  },

  // ── Zariman Ten Zero ──────────────────────────────────────────────────────
  {
    name: "Voidplume Down",
    category: "resource",
    imageName: "VoidplumeDown.png",
    sources: [
      {
        planet: "Zariman Ten Zero",
        mission: "Any",
        type: "Exploration",
        rank: 1,
        note: "Common — 8 spawn locations per mission, 75% chance each. Search side rooms, vent shafts, and hidden corridors. Worth 500 Holdfasts standing.",
      },
    ],
  },
  {
    name: "Voidplume Vane",
    category: "resource",
    imageName: "VoidplumeVane.png",
    sources: [
      {
        planet: "Zariman Ten Zero",
        mission: "Any",
        type: "Exploration",
        rank: 1,
        note: "Uncommon — 25% chance from the 8 spawn locations, plus 2 guaranteed per mission. Worth 1,000 Holdfasts standing.",
      },
    ],
  },
  {
    name: "Voidplume Crest",
    category: "resource",
    imageName: "VoidplumeCrest.png",
    sources: [
      {
        planet: "Zariman Ten Zero",
        mission: "Any",
        type: "Exploration",
        rank: 1,
        note: "Rare — 1 guaranteed spawn per mission. Check high-up ledges and secret alcoves. Worth 2,000 Holdfasts standing.",
      },
    ],
  },
  {
    name: "Voidplume Quill",
    category: "resource",
    imageName: "VoidplumeQuill.png",
    sources: [
      {
        planet: "Zariman Ten Zero",
        mission: "Any",
        type: "Bounty",
        rank: 2,
        note: "Collect Zarium Accolades (large golden objects in terminal rooms) and deliver them to Cephalon Melica's kiosks — rewards up to 3 Quills per mission. Also awarded from Tier 4-5 Holdfasts bounties. Worth 2,500 standing.",
      },
    ],
  },
  {
    name: "Voidplume Pinion",
    category: "resource",
    imageName: "VoidplumePinion.png",
    sources: [
      {
        planet: "Zariman Ten Zero",
        mission: "Any",
        type: "Boss",
        rank: 3,
        note: "Rare — drops from Dormant Void Angels (1 guaranteed per angel). Void Angels appear on all Zariman missions once you unlock them. Worth 5,000 Holdfasts standing.",
      },
    ],
  },
  {
    name: "Entrati Lanthorn",
    category: "resource",
    imageName: "EntratiLanthorn.png",
    sources: [
      {
        planet: "Zariman Ten Zero",
        mission: "Any",
        type: "Mission Reward",
        rank: 1,
        note: "~10% chance from mission end rewards. Also guaranteed from Netracell runs on Deimos and from killing Gruzzlings in Albrecht's Laboratories (Sanctum Anatomica). Required to craft Dante, Gyre, Qorvex, Styanax, and several weapons.",
      },
    ],
  },
  {
    name: "Thrax Plasm",
    category: "resource",
    sources: [
      {
        planet: "Zariman Ten Zero",
        mission: "Any",
        type: "Enemy Drop",
        rank: 1,
        note: "Drops from Thrax Centurion and Thrax Legatus enemies (6 Plasm guaranteed per kill). Also rewarded from high-tier Zariman bounties (levels 90-95 and 110-115). Used to rank up The Holdfasts syndicate and craft Gyre, Styanax, the Alternox rifle, and Archon Shard Helminth segments.",
      },
    ],
  },
  {
    name: "Lua Thrax Plasm",
    category: "resource",
    sources: [
      {
        planet: "Lua",
        mission: "Yuvarium / Circulus",
        type: "Conjunction Survival",
        rank: 1,
        note: "Drops from Hollow Thrax Centurion, Eclipse Thrax Centurion, Hollow Thrax Legatus, and Lua Thrax Legatus enemies (30% drop rate each). Also drops as a guaranteed rotation reward. Used to buy Voruna blueprints from Archimedean Yonta on the Chrysalith (75 Plasm per component, 125 for main blueprint). Requires The War Within to access Lua.",
      },
    ],
  },

  // ── Orb Vallis Toroids ────────────────────────────────────────────────────
  {
    name: "Calda Toroid",
    category: "resource",
    sources: [
      {
        mission: "Enrichment Labs",
        planet: "Orb Vallis",
        type: "Enemy Drop",
        note: "Best method: kill Scyto Raknoids near the Enrichment Labs (~20% drop rate, ~5 kills per toroid). Trigger a Reinforcement Beacon at the Labs for a steady enemy stream. Also drops from Profit-Taker Bounty Phase 2 (12.5% chance for 3x — requires Old Mate rank with Solaris United). Used for Vox Solaris standing and various crafting recipes.",
        rank: 1,
      },
    ],
  },
  {
    name: "Sola Toroid",
    category: "resource",
    sources: [
      {
        mission: "Temple of Profit",
        planet: "Orb Vallis",
        type: "Enemy Drop",
        note: "Best method: kill Kyta Raknoids near the Temple of Profit (~20% drop rate). Also drops from Profit-Taker Bounty Phase 3 (12.5% for 3x — requires Old Mate rank). Can also be found in Orb Vallis caves around the Temple area.",
        rank: 1,
      },
    ],
  },
  {
    name: "Vega Toroid",
    category: "resource",
    sources: [
      {
        mission: "Spaceport / Caves",
        planet: "Orb Vallis",
        type: "Enemy Drop",
        note: "Very rare from enemies — Mite Raknoids and Spaceport enemies drop at ~1-2%. Best obtained from Profit-Taker Bounty Phase 1 (12.5% for 3x — requires Old Mate rank) or by collecting from Orb Vallis caves. Used for Vox Solaris standing.",
        rank: 1,
      },
    ],
  },
  {
    name: "Crisma Toroid",
    category: "resource",
    sources: [
      {
        mission: "Profit-Taker Orb",
        planet: "Orb Vallis",
        type: "Boss",
        note: "Exclusive drop from the Profit-Taker Orb boss (Phase 4 bounty from Eudico in Fortuna). Requires Rank 5: Old Mate with Solaris United. Worth 6,000 Vox Solaris standing each — the highest-value Toroid.",
        rank: 1,
      },
    ],
  },

  // ── Sanctum Anatomica (Albrecht's Laboratories) ───────────────────────────
  {
    name: "Shrill Voca",
    category: "resource",
    imageName: "ShrillVoca.png",
    sources: [
      {
        planet: "Deimos",
        mission: "Albrecht's Labs",
        type: "Exploration",
        rank: 1,
        note: "Syndicate Medallion equivalent for the Cavia faction — 5 spawn locations per mission, 75% chance each. Used to rank up Cavia (ranks 1-3) and craft the Ekhein melee weapon.",
      },
    ],
  },
  {
    name: "Bellow Voca",
    category: "resource",
    imageName: "BellowVoca.png",
    sources: [
      {
        planet: "Deimos",
        mission: "Albrecht's Labs",
        type: "Exploration",
        rank: 1,
        note: "2 guaranteed spawns per mission (10 on Steel Path). Used to rank up Cavia (ranks 3-4) and craft Dante Neuroptics and Ruvox components.",
      },
    ],
  },
  {
    name: "Echo Voca",
    category: "resource",
    imageName: "EchoVoca.png",
    sources: [
      {
        planet: "Deimos",
        mission: "Albrecht's Labs",
        type: "Exploration",
        rank: 2,
        note: "1 guaranteed spawn per mission. Gruzzlings in non-Disruption missions may also drop one. Used to rank up Cavia (ranks 4-5) and craft Qorvex, Grimoire, Mandonel, and Ruvox.",
      },
    ],
  },

  // ── Deimos / Albrecht's Labs ──────────────────────────────────────────────
  {
    name: "Necracoil",
    category: "resource",
    sources: [
      {
        planet: "Deimos",
        mission: "Albrecht's Labs",
        type: "Enemy Drop",
        rank: 1,
        note: "Drops from Jugulus and Saxum variants (exocrine enemies) in Albrecht's Labs on Deimos at ~20% per kill. Also from resource caches in Labs missions. Used for Cavia rank-up offerings and to craft Dante and Ruvox components. Requires Angels of the Zariman quest to access the Labs.",
      },
    ],
  },

  // ── Jupiter ───────────────────────────────────────────────────────────────
  {
    name: "Hexenon",
    category: "resource",
    sources: [
      {
        planet: "Jupiter",
        mission: "Ganymede",
        type: "Disruption",
        rank: 1,
        note: "Best source: Disruption on Ganymede (Jupiter). Amalgam enemies drop Hexenon at ~20% per kill; complete demolysts for bonus drops. Also drops from standard Jupiter enemies at low rates in any mission. Used for the Wisp blueprint and various crafting recipes.",
      },
    ],
  },

  // ── Mars / Uranus ─────────────────────────────────────────────────────────
  {
    name: "Gallium",
    category: "resource",
    sources: [
      {
        planet: "Uranus",
        mission: "Desdemona",
        type: "Sabotage",
        rank: 1,
        note: "Best farm: Desdemona Sabotage on Uranus or Ophelia Survival on Uranus. Gallium is a rare drop from Grineer enemies on Mars and Uranus — approximately 2.5–3% per enemy kill. Also found in resource caches. Dark Sector bonuses on Mars (Kadesh) improve drop rates.",
      },
    ],
  },

  // ── Railjack / Proxima resources ─────────────────────────────────────────
  {
    name: "Asterite",
    category: "resource",
    sources: [
      {
        planet: "Railjack",
        mission: "Saturn Proxima / Earth Proxima",
        type: "Railjack",
        rank: 1,
        note: "Resource found in Railjack Proxima missions. Asterite drops from enemies and containers in Saturn Proxima and Earth Proxima. Used for crafting Railjack gear, components, and Avionics. Collect with Railjack Granum Void or standard pick-up while on missions.",
      },
    ],
  },
  {
    name: "Gallos Rods",
    category: "resource",
    sources: [
      {
        planet: "Railjack",
        mission: "Grineer Proxima missions",
        type: "Railjack",
        rank: 1,
        note: "Drops from Grineer enemies and containers in Proxima missions (Earth, Saturn, Veil Proxima). Used to craft Railjack parts and upgrades. Collected inside enemy crewships and resource containers during missions.",
      },
    ],
  },
  {
    name: "Isos",
    category: "resource",
    sources: [
      {
        planet: "Railjack",
        mission: "Corpus Proxima missions",
        type: "Railjack",
        rank: 1,
        note: "Drops from Corpus enemies and containers in Corpus Proxima missions (Venus, Neptune, Pluto Proxima). Used for crafting Corpus Railjack components and Avionics. Primarily collected from enemy crewships and resource containers.",
      },
    ],
  },
  {
    name: "Cubic Diodes",
    category: "resource",
    sources: [
      {
        planet: "Railjack",
        mission: "Corpus Proxima missions",
        type: "Railjack",
        rank: 1,
        note: "Drops from Corpus Proxima enemies and containers (Venus, Neptune, Pluto Proxima). Also a rare drop from Eximus enemies on Europa in standard missions. Used for crafting Corpus-related Railjack parts.",
      },
    ],
  },

  // ── Zariman ───────────────────────────────────────────────────────────────
  {
    name: "Voidgel Orb",
    category: "resource",
    sources: [
      {
        planet: "Zariman Ten Zero",
        mission: "Any",
        type: "Enemy Drop",
        rank: 1,
        note: "Drops from Void Thrax enemies (Centurion, Legatus) and breakable containers throughout Zariman missions at approximately 9% per source. Also drops from Exo Voidrig enemies. Used to craft Hespar, Battacor Prime, and Holdfasts offerings.",
      },
    ],
  },

  // ── Eidolon Plains (Quills standing) ─────────────────────────────────────
  {
    name: "Intact Sentient Core",
    category: "resource",
    sources: [
      {
        planet: "Cetus",
        mission: "Plains of Eidolon (night)",
        type: "Enemy Drop",
        rank: 1,
        note: "100% drop from Vomvalysts on the Plains of Eidolon at night. Also drops at 50% from Battalysts and Conculysts. These small Sentient creatures patrol the Plains after the sun sets — they disappear at dawn. Used as currency with the Quills syndicate in Cetus (1 Intact = 100 Standing at Rank 1).",
      },
    ],
  },
  {
    name: "Exceptional Sentient Core",
    category: "resource",
    sources: [
      {
        planet: "Cetus",
        mission: "Plains of Eidolon (night)",
        type: "Eidolon Hunt",
        rank: 1,
        note: "Drops from Eidolon Synovia (the glowing joints on Teralyst, Gantulyst, and Hydrolyst limbs). Destroy a synovia to get 1 Exceptional Core. Also obtained by killing (not capturing) Eidolons. Worth 500 Quills standing each. Requires a Void Strike (charged Amp shot) to damage Eidolons.",
      },
    ],
  },
  {
    name: "Flawless Sentient Core",
    category: "resource",
    sources: [
      {
        planet: "Cetus",
        mission: "Plains of Eidolon (night)",
        type: "Eidolon Hunt",
        rank: 1,
        note: "Guaranteed drop from capturing an Eidolon (Teralyst, Gantulyst, or Hydrolyst) — you must capture, not kill. To capture: destroy all synovia, shoot the core when the Eidolon kneels, then throw a Void Strike before it recovers. Captures also yield Arcanes. Worth 1,000 Quills standing each.",
      },
    ],
  },

  // ── Eris / Infested ───────────────────────────────────────────────────────
  {
    name: "Mutalist Alad V Nav Coordinate",
    category: "resource",
    sources: [
      {
        planet: "Deimos",
        mission: "Hyf",
        type: "Defense",
        rank: 1,
        note: "Rotation B reward (22.56% — complete 15 waves per rotation). Also drops from Terrorem Survival on Deimos (Rotation B, 12.5% at 10/20/30 min). Used to craft the Mutalist Alad V Assassinate Key (10 coordinates per key). That key unlocks the fight on Eris (Jordas Golem Assassinate) which drops Nidus blueprints.",
      },
    ],
  },

  // ── General / Cross-game ──────────────────────────────────────────────────
  {
    name: "Riven Sliver",
    category: "resource",
    sources: [
      {
        planet: "Any",
        mission: "Any (Eximus enemies)",
        type: "Enemy Drop",
        rank: 1,
        note: "2% drop chance from Eximus enemies at level 30+. Also drops from Requiem Relics (Lich/Kuva cycle). In Railjack: drops from enemy crewships and side-objectives. Collect 10 Riven Slivers and trade them for 1 random Riven Mod at Palladino (Iron Wake, Mars). Best farming: high-level Kuva Survival or Steel Path missions with many Eximus spawns.",
      },
    ],
  },
];
