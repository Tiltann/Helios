<script setup lang="ts">
declare const __LAST_UPDATED__: string
const LAST_UPDATED = __LAST_UPDATED__
import { ref, computed, onMounted, onUnmounted } from 'vue'
import Fuse from 'fuse.js'
import { ITEMS, PLANETS, type Item } from './data'
import { T, ITEM_LABELS, PLANET_LABELS, TYPE_LABELS, type Locale, type TKey, LOCALE_LABELS } from './i18n'

const LOCALES = Object.keys(LOCALE_LABELS) as Locale[]

const CATEGORY_COLOR: Record<string, string> = {
  resource: '#5284e0', prime: '#c49a3c', warframe: '#52c27a', mod: '#c47a3c', relic: '#9c6cc4', weapon: '#c45252', companion: '#4fb8b0',
}

const CATEGORIES = ['all', 'resource', 'warframe', 'weapon', 'companion', 'mod', 'prime', 'relic'] as const

const BEGINNER_KEYS: TKey[] = [
  'termSurvival', 'termDefense', 'termExcavation', 'termDarkSector',
  'termBoss', 'termRotation', 'termDucats', 'termRelics',
  'termVoidFissure', 'termBounty', 'termVendor', 'termRailjack', 'termVaulted',
]

const locale         = ref<Locale>('en')
const t              = computed(() => T[locale.value])
const catLabel       = computed((): Record<string, string> => ({
  all:      t.value.catAll,
  resource: t.value.catResource,
  prime:    t.value.catPrime,
  warframe: t.value.catWarframe,
  mod:      t.value.catMod,
  relic:    t.value.catRelic,
  weapon:    t.value.catWeapon,
  companion: t.value.catCompanion,
}))

const query          = ref('')
const results        = ref<Item[]>([])
const selected       = ref<Item | null>(null)
const cursor         = ref(-1)
const input          = ref<HTMLInputElement | null>(null)
const beginnerModal    = ref(false)
const masteryModal     = ref(false)
const mrLevel          = ref(0)

// Cumulative mastery XP required to reach each MR level
const MR_THRESHOLDS = [
  // MR 0–30
  0, 1500, 5250, 11250, 20000, 31250, 45000, 61250, 80000,
  101250, 125000, 151250, 180000, 211250, 245000, 281250, 320000,
  361250, 405000, 451250, 500000, 551250, 605000, 661250, 720000,
  781250, 845000, 911250, 980000, 1051250, 1125000,
  // Legendary 1–6 (MR 31–36)
  1201250, 1280000, 1361250, 1445000, 1531250, 1620000,
]

function mrLabel(level: number): string {
  if (level <= 30) return String(level)
  return `L${level - 30}`
}
function mrFullLabel(level: number): string {
  if (level <= 30) return `MR ${level}`
  return `Legendary ${level - 30}`
}
const imageMap         = ref<Record<string, string>>({})
const activeCategory   = ref<string | null>(null)
const spoilerPopup     = ref<Item | null>(null)
const revealedSpoilers = ref(new Set<string>())
const showSpoilers     = ref(false)

const IMG_CACHE_KEY = 'helios_img_v1'
const IMG_CACHE_TTL = 86_400_000 // 24 h

void (async () => {
  // Load any cached data immediately (even stale) so images appear at once
  let cacheAge = Infinity
  try {
    const raw = localStorage.getItem(IMG_CACHE_KEY)
    if (raw) {
      const { ts, map } = JSON.parse(raw) as { ts: number; map: Record<string, string> }
      imageMap.value = map
      cacheAge = Date.now() - ts
    }
  } catch {}
  if (cacheAge < IMG_CACHE_TTL) return  // Cache is fresh — no need to refetch
  // Cache is stale or absent — refresh from API, keep showing existing images while fetching
  try {
    const data: { name: string; imageName?: string }[] = await fetch(
      'https://api.warframestat.us/items?only=name,imageName'
    ).then(r => r.json())
    const map: Record<string, string> = {}
    for (const d of data) {
      if (!d.imageName) continue
      const url = `https://cdn.warframestat.us/img/${d.imageName}`
      map[d.name] = url
      if (d.name.endsWith(' Warframe')) map[d.name.slice(0, -9)] = url
    }
    imageMap.value = map
    try { localStorage.setItem(IMG_CACHE_KEY, JSON.stringify({ ts: Date.now(), map })) } catch {}
    preloadImages()
  } catch { /* API failed — stale cache stays active, images remain visible */ }
})()

const fuse = computed(() =>
  new Fuse(
    ITEMS.map(i => ({ ...i, _loc: ITEM_LABELS[locale.value][i.name] ?? '' })),
    { keys: ['name', '_loc', 'category'], threshold: 0.35 },
  )
)

const visibleItems = computed(() => ITEMS)

const filteredResults = computed(() => {
  let r = results.value
  if (activeCategory.value) r = r.filter(i => i.category === activeCategory.value)
  return r
})

const displayItems = computed(() => {
  if (query.value.trim()) return filteredResults.value
  return activeCategory.value
    ? visibleItems.value.filter(i => i.category === activeCategory.value)
    : visibleItems.value
})

function isActiveTab(cat: string): boolean {
  return cat === 'all' ? !activeCategory.value : activeCategory.value === cat
}

function search() {
  const q = query.value.trim()
  if (!q) { results.value = []; cursor.value = -1; return }
  results.value = fuse.value.search(q).slice(0, 10).map(r => r.item)
  cursor.value = -1
}

function pick(item: Item) {
  if (selected.value?.name === item.name) {
    selected.value = null
    cursor.value = -1
  } else {
    selected.value = item
    cursor.value = displayItems.value.findIndex(i => i.name === item.name)
  }
}

function revealSpoiler(name: string) {
  const s = new Set(revealedSpoilers.value)
  s.add(name)
  revealedSpoilers.value = s
}

function onKey(e: KeyboardEvent) {
  const list = displayItems.value
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    cursor.value = Math.min(cursor.value + 1, list.length - 1)
    selected.value = list[cursor.value] ?? null
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    if (cursor.value > 0) cursor.value--
    selected.value = list[cursor.value] ?? null
  } else if (e.key === 'Escape') {
    if (spoilerPopup.value) { spoilerPopup.value = null; return }
    if (beginnerModal.value) { beginnerModal.value = false; return }
    if (selected.value) { selected.value = null; cursor.value = -1; return }
    query.value = ''; search()
  }
}

function spaceToFocus(e: KeyboardEvent) {
  if (e.key === ' ' && document.activeElement !== input.value) {
    e.preventDefault()
    input.value?.focus()
  }
}

function wikiUrl(item: Item): string {
  return `https://wiki.warframe.com/w/${(item.wikiSlug ?? item.name).replace(/ /g, '_')}`
}

const RELIC_TIER_IMAGE: Record<string, string> = {
  Axi:  'RelicAxiD.png',
  Lith: 'RelicLithD.png',
  Meso: 'RelicMesoD.png',
  Neo:  'RelicNeoD.png',
}

function getImage(item: Item): string {
  if (item.image) return item.image
  if (item.category === 'relic') {
    const tier = item.name.split(' ')[0]
    if (RELIC_TIER_IMAGE[tier])
      return `https://cdn.warframestat.us/img/${RELIC_TIER_IMAGE[tier]}`
  }
  if (item.imageName) return `https://cdn.warframestat.us/img/${item.imageName}`
  return imageMap.value[item.name] ?? ''
}

function preloadImages() {
  const urls = new Set<string>()
  for (const item of ITEMS) {
    const url = getImage(item)
    if (url) urls.add(url)
  }
  for (const planet of Object.values(PLANETS)) {
    if (planet.img) urls.add(`https://cdn.warframestat.us/img/${planet.img}`)
  }
  for (const filename of Object.values(RELIC_TIER_IMAGE)) {
    urls.add(`https://cdn.warframestat.us/img/${filename}`)
  }
  for (const url of urls) {
    const img = new Image()
    img.src = url
  }
}

function handleImageError(e: Event) {
  const img = e.target as HTMLImageElement
  const retries = parseInt(img.dataset.retries ?? '0')
  if (retries < 2) {
    img.dataset.retries = String(retries + 1)
    const src = img.src.split('?')[0]
    setTimeout(() => { img.src = src }, 800 * (retries + 1))
  } else {
    img.style.display = 'none'
  }
}

function tItem(name: string): string   { return ITEM_LABELS[locale.value][name]   ?? name }
function tPlanet(p: string): string    { return PLANET_LABELS[locale.value][p]      ?? p }
function tType(ty: string): string     { return TYPE_LABELS[locale.value][ty]       ?? ty }

function bestSource(item: Item): string {
  const s = item.sources[0]
  return s ? [s.mission, tPlanet(s.planet), tType(s.type)].filter(Boolean).join(', ') : ''
}

function termParts(key: TKey): { label: string; body: string } {
  const full = t.value[key]
  const sep  = full.indexOf(': ')
  return sep === -1 ? { label: '', body: full } : { label: full.slice(0, sep), body: full.slice(sep + 2) }
}

onMounted(async () => {
  const lang = navigator.language.slice(0, 2).toLowerCase()
  if (LOCALES.includes(lang as Locale)) locale.value = lang as Locale
  input.value?.focus()
  window.addEventListener('keydown', spaceToFocus)
  preloadImages()
})

onUnmounted(() => window.removeEventListener('keydown', spaceToFocus))
</script>

<template>
  <div class="min-h-screen font-sans antialiased" style="background:#050609;color:#e0d6bc">

    <!-- ══ BEGINNER MODAL ═══════════════════════════════════════════════════ -->
    <Transition name="zoom">
      <div v-if="beginnerModal"
           class="fixed inset-0 z-50 flex items-start justify-center pt-[5vh] px-4 pb-8"
           style="background:rgba(5,6,9,0.95);backdrop-filter:blur(10px)"
           @click.self="beginnerModal = false">
        <div class="w-full max-w-[720px] rounded-[14px] overflow-hidden"
             style="background:#0c0e1a;border:1px solid #1c2040;box-shadow:0 32px 80px rgba(0,0,0,0.8),0 0 0 1px rgba(212,168,76,0.05)">
          <div class="px-6 py-5 flex items-center justify-between"
               style="background:linear-gradient(180deg,#101326 0%,#0c0e1a 100%);border-bottom:1px solid #161930">
            <div>
              <div class="text-[14px] font-bold" style="color:#d4a84c;letter-spacing:0.06em">{{ t.beginnerTitle }}</div>
              <div class="text-[11px] mt-0.5" style="color:#50607e">{{ t.beginnerIntro }}</div>
            </div>
            <button @click="beginnerModal = false"
                    class="text-[22px] leading-none cursor-pointer ml-6 shrink-0 hover:text-[#d4a84c] transition-colors duration-150"
                    style="background:none;border:none;color:#404a68">×</button>
          </div>
          <div class="p-4 grid gap-2" style="grid-template-columns:repeat(auto-fill,minmax(290px,1fr))">
            <div v-for="key in BEGINNER_KEYS" :key="key"
                 class="rounded-[8px] px-4 py-3"
                 style="background:#0f1222;border:1px solid #161930">
              <div class="text-[9px] font-bold uppercase tracking-[0.15em] mb-1.5" style="color:#d4a84c">{{ termParts(key).label }}</div>
              <div class="text-[11.5px] leading-[1.65]" style="color:#7888a8">{{ termParts(key).body }}</div>
            </div>
          </div>
          <div class="px-6 py-3" style="border-top:1px solid #161930">
            <span class="text-[10px] italic" style="color:#404a68">{{ t.darkSectorNote }}</span>
          </div>
        </div>
      </div>
    </Transition>

    <!-- ══ SPOILER POPUP ════════════════════════════════════════════════════ -->
    <Transition name="zoom">
      <div v-if="spoilerPopup"
           class="fixed inset-0 z-50 flex items-center justify-center px-4"
           style="background:rgba(5,6,9,0.95);backdrop-filter:blur(10px)"
           @click.self="spoilerPopup = null">
        <div class="w-full max-w-[380px] rounded-[14px] p-6"
             style="background:#0c0e1a;border:1px solid #1c2040;box-shadow:0 32px 80px rgba(0,0,0,0.8)">
          <div class="text-[12px] font-bold mb-1" style="color:#d4a84c">⚠ Spoiler Warning</div>
          <div class="text-[13px] leading-[1.6] mb-5" style="color:#5a6a88">
            {{ t.spoilerFor }}
            <span style="color:#d8c89a;font-weight:500"> {{ spoilerPopup.spoilerFor }}</span>.
          </div>
          <div class="flex gap-2">
            <button @click="revealSpoiler(spoilerPopup!.name); spoilerPopup = null"
                    class="flex-1 text-[10px] font-bold uppercase tracking-[0.12em] py-2.5 rounded-[8px] cursor-pointer transition-all duration-150 hover:bg-[rgba(212,168,76,0.2)]"
                    style="background:rgba(212,168,76,0.1);border:1px solid rgba(212,168,76,0.35);color:#d4a84c">
              {{ t.spoilerReveal }}
            </button>
            <button @click="spoilerPopup = null"
                    class="flex-1 text-[10px] font-bold uppercase tracking-[0.12em] py-2.5 rounded-[8px] cursor-pointer transition-all duration-150 hover:text-[#d4a84c] hover:border-[rgba(212,168,76,0.3)]"
                    style="background:transparent;border:1px solid #1c2040;color:#4a5878">
              {{ t.spoilerKeep }}
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- ══ MASTERY MODAL ════════════════════════════════════════════════════ -->
    <Transition name="zoom">
      <div v-if="masteryModal"
           class="fixed inset-0 z-50 flex items-start justify-center pt-[4vh] px-4 pb-8"
           style="background:rgba(5,6,9,0.95);backdrop-filter:blur(10px)"
           @click.self="masteryModal = false">
        <div class="w-full max-w-[580px] rounded-[14px] overflow-hidden"
             style="background:#0c0e1a;border:1px solid #1c2040;box-shadow:0 32px 80px rgba(0,0,0,0.8),0 0 0 1px rgba(212,168,76,0.05);max-height:90vh;overflow-y:auto">
          <div class="px-6 py-5 flex items-center justify-between"
               style="background:linear-gradient(180deg,#101326 0%,#0c0e1a 100%);border-bottom:1px solid #161930">
            <span class="text-[13px] font-bold uppercase tracking-[0.12em]" style="color:#d4a84c">{{ t.masteryMode }} Rank Calculator</span>
            <button @click="masteryModal = false"
                    class="text-[22px] leading-none cursor-pointer ml-4 hover:text-[#d4a84c] transition-colors duration-150"
                    style="background:none;border:none;color:#404a68">×</button>
          </div>
          <div class="px-6 py-6 space-y-5">

            <!-- Slider -->
            <div class="flex items-center gap-4">
              <span class="text-[10.5px] font-bold uppercase tracking-[0.1em] whitespace-nowrap" style="color:#50607e">Your MR</span>
              <input type="range" min="0" max="36" v-model.number="mrLevel" class="flex-1 cursor-pointer" style="accent-color:#d4a84c"/>
              <span class="text-[28px] font-bold w-9 text-right shrink-0" style="color:#d4a84c;line-height:1">{{ mrLabel(mrLevel) }}</span>
            </div>

            <!-- Progress bar -->
            <div>
              <div class="flex justify-between text-[10px] mb-1.5" style="color:#384060">
                <span>{{ MR_THRESHOLDS[mrLevel].toLocaleString() }} XP earned</span>
                <span v-if="mrLevel < 36">{{ MR_THRESHOLDS[mrLevel + 1].toLocaleString() }} XP for {{ mrFullLabel(mrLevel + 1) }}</span>
                <span v-else style="color:#d4a84c">Maximum rank</span>
              </div>
              <div class="h-[5px] rounded-full overflow-hidden" style="background:#161930">
                <div class="h-full rounded-full transition-all duration-300"
                     style="background:linear-gradient(90deg,#9a7224,#d4a84c,#e8bf58)"
                     :style="{ width: mrLevel === 36 ? '100%' : `${((MR_THRESHOLDS[mrLevel] / MR_THRESHOLDS[36]) * 100).toFixed(1)}%` }"/>
              </div>
            </div>

            <!-- Items needed -->
            <div v-if="mrLevel < 36" class="rounded-[10px] p-4" style="background:#0f1222;border:1px solid #161930">
              <p class="text-[10.5px] uppercase tracking-[0.08em] mb-3" style="color:#50607e">
                To reach {{ mrFullLabel(mrLevel + 1) }}, you need
                <span style="color:#d4a84c;font-weight:700"> {{ (MR_THRESHOLDS[mrLevel + 1] - MR_THRESHOLDS[mrLevel]).toLocaleString() }}</span>
                more XP
              </p>
              <div class="grid grid-cols-2 gap-3 text-[11.5px]">
                <div class="flex items-center gap-2" style="color:#7888a8">
                  <span class="w-2 h-2 rounded-full shrink-0" style="background:#52c27a"/>
                  {{ Math.ceil((MR_THRESHOLDS[mrLevel + 1] - MR_THRESHOLDS[mrLevel]) / 6000) }} warframes
                  <span style="color:#384060">(6k ea.)</span>
                </div>
                <div class="flex items-center gap-2" style="color:#7888a8">
                  <span class="w-2 h-2 rounded-full shrink-0" style="background:#c45252"/>
                  {{ Math.ceil((MR_THRESHOLDS[mrLevel + 1] - MR_THRESHOLDS[mrLevel]) / 3000) }} weapons
                  <span style="color:#384060">(3k ea.)</span>
                </div>
              </div>
            </div>
            <div v-else class="rounded-[10px] p-4 text-center" style="background:#0f1222;border:1px solid rgba(212,168,76,0.3)">
              <p class="text-[14px] font-bold" style="color:#d4a84c">Legendary 6 — Maximum Rank</p>
            </div>

            <!-- XP table -->
            <div>
              <p class="text-[9px] font-bold uppercase tracking-[0.15em] mb-3" style="color:#384060">XP per item type (each counted once, at rank 30)</p>
              <div class="grid grid-cols-2 gap-x-6 gap-y-2 text-[11.5px]">
                <div v-for="[label, xp] in [['Warframe','6,000'],['Archwing','6,000'],['Primary','3,000'],['Secondary','3,000'],['Melee','3,000'],['Companion','3,000'],['K-Drive / MOA','3,000'],['Arch-Gun / Arch-Melee','3,000']]"
                     :key="label" class="flex items-center justify-between">
                  <span style="color:#50607e">{{ label }}</span>
                  <span class="font-mono font-bold" style="color:#d4a84c">{{ xp }}</span>
                </div>
              </div>
              <p class="text-[10px] mt-3" style="color:#283050">Forma re-leveling gives no mastery.</p>
            </div>

            <!-- In-game tip -->
            <div class="rounded-[10px] p-4 space-y-2" style="background:#0f1222;border:1px solid #161930">
              <p class="text-[9px] font-bold uppercase tracking-[0.15em] mb-2" style="color:#384060">Finding your mastery XP in-game</p>
              <p class="text-[11.5px] leading-[1.7]" style="color:#50607e">
                Press <kbd class="rounded px-1.5 py-0.5 text-[10px] font-mono" style="background:#1c2040;color:#d4a84c">ESC</kbd>
                → click your username → the Mastery bar shows current XP and progress toward the next rank.
              </p>
              <p class="text-[11.5px] leading-[1.7]" style="color:#50607e">
                During missions the <span style="color:#8090b8">Affinity panel</span> (right side of HUD) shows live XP per weapon and warframe.
              </p>
              <p class="text-[11.5px] leading-[1.7]" style="color:#50607e">
                <span style="color:#8090b8">MR tests</span> can be taken once per 24 h at any Relay — failing has no penalty.
              </p>
            </div>

          </div>
        </div>
      </div>
    </Transition>

    <!-- ══ PAGE ═════════════════════════════════════════════════════════════ -->
    <div class="max-w-[660px] mx-auto px-5">

      <!-- Header -->
      <div class="pt-10 pb-5">
        <div class="flex items-center justify-between gap-4 mb-4">

          <!-- Brand -->
          <div class="flex items-center gap-3 shrink-0">
            <img src="/logo.svg" alt="Helios" class="w-7 h-7"/>
            <div>
              <div class="text-[12px] font-bold uppercase tracking-[0.26em]" style="color:#d4a84c">HELIOS</div>
              <div class="text-[10px] mt-px" style="color:#303852;letter-spacing:0.04em">{{ t.subtitle }}</div>
              <div class="text-[9px] mt-px" style="color:#202838;letter-spacing:0.04em">Updated {{ LAST_UPDATED }}</div>
            </div>
          </div>

          <!-- Controls -->
          <div class="flex items-center gap-1.5 flex-wrap justify-end">
            <button @click="showSpoilers = !showSpoilers"
                    class="text-[9px] font-bold uppercase tracking-[0.12em] px-3 py-1.5 rounded-full cursor-pointer transition-all duration-150"
                    :style="showSpoilers
                      ? 'background:rgba(212,168,76,0.14);border:1px solid rgba(212,168,76,0.42);color:#d4a84c'
                      : 'background:transparent;border:1px solid #1c2040;color:#404e6a'">
              Spoilers {{ showSpoilers ? 'on' : 'off' }}
            </button>
            <button @click="masteryModal = true"
                    class="text-[9px] font-bold uppercase tracking-[0.12em] px-3 py-1.5 rounded-full cursor-pointer transition-all duration-150 hover:text-[#d4a84c] hover:border-[rgba(212,168,76,0.32)]"
                    style="background:transparent;border:1px solid #1c2040;color:#404e6a">
              {{ t.masteryMode }}
            </button>
            <button @click="beginnerModal = true"
                    class="text-[9px] font-bold uppercase tracking-[0.12em] px-3 py-1.5 rounded-full cursor-pointer transition-all duration-150 hover:text-[#d4a84c] hover:border-[rgba(212,168,76,0.32)]"
                    style="background:transparent;border:1px solid #1c2040;color:#404e6a">
              {{ t.beginnerMode }}
            </button>
            <select v-model="locale"
                    class="cursor-pointer outline-none rounded-full text-[9px] font-bold uppercase tracking-[0.12em] px-3 py-1.5 transition-all duration-150 hover:border-[rgba(212,168,76,0.4)]"
                    style="background:#0c0e1a;border:1px solid #1c2040;color:#d4a84c">
              <option v-for="l in LOCALES" :key="l" :value="l" style="background:#0c0e1a">{{ LOCALE_LABELS[l] }}</option>
            </select>
          </div>
        </div>

        <!-- Gold accent line -->
        <div class="h-px" style="background:linear-gradient(90deg,rgba(212,168,76,0.6) 0%,rgba(212,168,76,0.12) 50%,transparent 100%)"/>

        <!-- Catchphrase -->
        <p class="mt-3 text-[10.5px] italic" style="color:#384060;letter-spacing:0.02em">{{ t.catchphrase }}</p>
      </div>

      <!-- Search -->
      <div class="relative mb-4">
        <div class="rounded-[10px] transition-all duration-200"
             :style="query
               ? 'background:#0c0e1a;border:1px solid rgba(212,168,76,0.4);box-shadow:0 0 0 3px rgba(212,168,76,0.07),0 6px 24px rgba(0,0,0,0.5)'
               : 'background:#0c0e1a;border:1px solid #161930;box-shadow:0 4px 20px rgba(0,0,0,0.4)'">
          <svg class="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-opacity duration-200"
               :style="query ? 'opacity:0.6' : 'opacity:0.18'"
               width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#d4a84c" stroke-width="1.7">
            <circle cx="7" cy="7" r="5"/><path d="M11 11l3 3"/>
          </svg>
          <input ref="input" v-model="query" @input="search" @keydown="onKey"
                 :placeholder="t.placeholder"
                 class="w-full bg-transparent border-none outline-none px-11 py-3.5 text-[15px]"
                 style="color:#e0d6bc"/>
          <button v-if="query" @click="query='';search()"
                  class="absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer text-[20px] leading-none px-1 hover:text-[#d4a84c] transition-colors duration-100"
                  style="background:none;border:none;color:#505878">×</button>
        </div>
      </div>

      <!-- Category tabs -->
      <div class="flex gap-1.5 flex-wrap mb-5">
        <button v-for="cat in CATEGORIES" :key="cat"
                @click="activeCategory = cat === 'all' ? null : cat"
                class="text-[9px] font-bold uppercase tracking-[0.12em] px-3 py-1.5 rounded-full cursor-pointer transition-all duration-200"
                :style="isActiveTab(cat)
                  ? `background:${CATEGORY_COLOR[cat] ?? '#d4a84c'};border:1px solid transparent;color:#050609;box-shadow:0 0 14px ${(CATEGORY_COLOR[cat] ?? '#d4a84c')}55`
                  : `background:${cat === 'all' ? 'transparent' : (CATEGORY_COLOR[cat] ?? '#d4a84c') + '10'};border:1px solid ${cat === 'all' ? '#1c2040' : (CATEGORY_COLOR[cat] ?? '#d4a84c') + '38'};color:${cat === 'all' ? '#404e6a' : CATEGORY_COLOR[cat] ?? '#d4a84c'}`">
          {{ catLabel[cat] ?? cat }}
        </button>
      </div>

      <!-- No results -->
      <Transition name="fade">
        <p v-if="query && !displayItems.length" class="text-[12px] py-2 mb-2" style="color:#404e6a">
          {{ t.noResults }}
        </p>
      </Transition>

      <!-- Item list -->
      <div class="rounded-[12px] overflow-hidden" style="border:1px solid #161930">
        <template v-for="item in displayItems" :key="item.name">

          <!-- Spoiler row -->
          <button v-if="item.spoiler && !showSpoilers && !revealedSpoilers.has(item.name)"
                  @click="spoilerPopup = item"
                  class="w-full text-left cursor-pointer flex items-center gap-3 px-4 py-3 transition-colors duration-150 hover:bg-[rgba(20,24,40,0.8)]"
                  style="background:transparent;border:none;border-top:1px solid #0e1020;border-left:3px solid transparent">
            <div class="w-5 h-5 shrink-0 flex items-center justify-center text-[14px]" style="opacity:0.25">⚠</div>
            <div class="flex-1 min-w-0">
              <div class="text-[12px] font-medium" style="color:#3a4660">{{ t.spoilerHidden }} <span class="italic">{{ item.spoilerFor }}</span></div>
              <div class="text-[10px] mt-0.5" style="color:#252e46">Click to reveal</div>
            </div>
            <span class="text-[8px] font-bold uppercase tracking-[0.12em] px-2 py-1 rounded-[4px]"
                  style="color:#252e46;border:1px solid #161930">spoiler</span>
          </button>

          <!-- Normal row -->
          <template v-else-if="!item.spoiler || showSpoilers || revealedSpoilers.has(item.name)">
            <button @click="pick(item)"
                    class="w-full text-left cursor-pointer flex items-center gap-3 px-4 py-3 transition-all duration-150"
                    :style="`background:${selected?.name === item.name ? 'rgba(212,168,76,0.06)' : 'transparent'};border:none;border-top:1px solid #0e1020;border-left:3px solid ${selected?.name === item.name ? '#d4a84c' : 'transparent'}`"
                    @mouseover="(e) => { if (selected?.name !== item.name) (e.currentTarget as HTMLElement).style.background = 'rgba(16,19,34,0.8)' }"
                    @mouseout="(e) => { if (selected?.name !== item.name) (e.currentTarget as HTMLElement).style.background = 'transparent' }">

              <!-- Icon -->
              <div class="relative w-[22px] h-[22px] shrink-0">
                <span class="absolute inset-0 flex items-center justify-center">
                  <span class="w-2 h-2 rounded-full" style="opacity:0.6"
                        :style="`background:${CATEGORY_COLOR[item.category] ?? '#404e6a'}`"/>
                </span>
                <img v-if="getImage(item)" :key="getImage(item)" :src="getImage(item)" alt=""
                     class="relative z-[1] w-[22px] h-[22px] object-contain"
                     style="opacity:0.88"
                     @error="handleImageError"/>
              </div>

              <!-- Text -->
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2">
                  <span class="text-[14px] font-medium leading-snug"
                        :style="`color:${selected?.name === item.name ? '#ede4c8' : item.vaulted ? '#4a5870' : '#b8c4d0'}`">
                    {{ tItem(item.name) }}
                  </span>
                  <span v-if="item.vaulted"
                        class="text-[7px] font-bold uppercase tracking-[0.14em] px-1.5 py-0.5 rounded-[4px] leading-none shrink-0"
                        style="color:#384060;border:1px solid #1c2040">vaulted</span>
                </div>
                <div class="text-[11px] mt-0.5 truncate" style="color:#384060">{{ bestSource(item) }}</div>
              </div>

              <!-- Category label -->
              <span class="shrink-0 text-[8.5px] font-bold uppercase tracking-[0.1em]"
                    :style="`color:${CATEGORY_COLOR[item.category] ?? '#50607e'}`">
                {{ catLabel[item.category] }}
              </span>

              <!-- Chevron -->
              <svg class="shrink-0 transition-all duration-300"
                   :style="`transform:rotate(${selected?.name === item.name ? '180deg' : '0deg'});color:${selected?.name === item.name ? '#d4a84c' : '#283050'}`"
                   width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M2 4l4 4 4-4"/>
              </svg>
            </button>

            <!-- Expansion panel -->
            <Transition name="slide">
              <div v-if="selected?.name === item.name"
                   style="border-top:1px solid #161930;border-left:3px solid rgba(212,168,76,0.25)">
                <div class="px-5 pt-4 pb-5" style="background:linear-gradient(180deg,#0e1020 0%,#0a0c16 100%)">

                  <div class="text-[8px] font-bold uppercase tracking-[0.2em] mb-4" style="color:rgba(212,168,76,0.45)">
                    {{ t.bestFarm }}
                  </div>

                  <div v-for="(src, i) in item.sources" :key="i" class="mb-2">
                    <div class="rounded-[8px] p-3.5"
                         :style="`background:${i === 0 ? '#0f1222' : '#0c0e1a'};border:1px solid ${i === 0 ? '#1a1e36' : '#131628'}`">

                      <div class="flex items-center gap-2 flex-wrap mb-2">
                        <!-- Rank -->
                        <span class="w-[20px] h-[20px] rounded-full flex items-center justify-center text-[9px] font-bold shrink-0"
                              :style="`background:${i === 0 ? 'rgba(212,168,76,0.12)' : 'rgba(255,255,255,0.03)'};border:1px solid ${i === 0 ? 'rgba(212,168,76,0.35)' : '#1a1e36'};color:${i === 0 ? '#d4a84c' : '#404e68'}`">
                          {{ src.rank }}
                        </span>
                        <!-- Mission -->
                        <span class="text-[13.5px] font-semibold" style="color:#d8c89a">{{ src.mission }}</span>
                        <!-- Type badge -->
                        <span class="text-[8px] font-bold uppercase tracking-[0.1em] px-2 py-0.5 rounded-[4px]"
                              style="color:#6888d4;background:rgba(104,136,212,0.1);border:1px solid rgba(104,136,212,0.2)">
                          {{ tType(src.type) }}
                        </span>
                        <!-- MR badge -->
                        <span v-if="src.mr"
                              class="text-[8px] font-bold uppercase tracking-[0.1em] px-2 py-0.5 rounded-[4px]"
                              style="color:#d4a84c;background:rgba(212,168,76,0.1);border:1px solid rgba(212,168,76,0.28)">
                          MR {{ src.mr }}+
                        </span>
                        <!-- Planet chip -->
                        <span v-if="src.planet && PLANETS[src.planet]"
                              class="inline-flex items-center gap-1 text-[8.5px] font-bold uppercase tracking-[0.08em] px-2 py-0.5 rounded-full"
                              :style="`color:${PLANETS[src.planet].color};background:${PLANETS[src.planet].color}1a;border:1px solid ${PLANETS[src.planet].color}42`">
                          <span class="relative w-4 h-4 shrink-0 flex items-center justify-center">
                            <span class="w-[5px] h-[5px] rounded-full" :style="`background:${PLANETS[src.planet].color}`"/>
                            <img v-if="PLANETS[src.planet].img"
                                 :src="`https://cdn.warframestat.us/img/${PLANETS[src.planet].img}`"
                                 class="absolute inset-0 w-full h-full object-contain" alt=""
                                 @error="handleImageError"/>
                          </span>
                          {{ tPlanet(src.planet) }}
                        </span>
                        <span v-else class="text-[11px]" style="color:#404e68">{{ tPlanet(src.planet) }}</span>
                      </div>

                      <p v-if="src.note" class="text-[11px] leading-[1.7] pl-7" style="color:#6878a0">
                        {{ src.note }}
                      </p>
                    </div>
                  </div>

                  <!-- Wiki link -->
                  <a :href="wikiUrl(item)" target="_blank" rel="noopener"
                     class="mt-1 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.1em] px-3 py-1.5 rounded-[8px] no-underline transition-all duration-150 hover:text-[#d4a84c] hover:border-[rgba(212,168,76,0.35)]"
                     style="color:#404e68;border:1px solid #1c2040;background:transparent">
                    {{ t.wikiLink }}
                    <svg width="9" height="9" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.6">
                      <path d="M1 9L9 1M9 1H4M9 1V6"/>
                    </svg>
                  </a>
                </div>
              </div>
            </Transition>
          </template>
        </template>
      </div>

      <!-- Footer -->
      <div class="pt-10 pb-8 text-center">
        <div class="h-px mb-6" style="background:linear-gradient(90deg,transparent,rgba(212,168,76,0.18) 30%,rgba(212,168,76,0.18) 70%,transparent)"/>
        <p class="text-[10px]" style="color:#283050">
          Made with ♥ by
          <a href="https://tiltann.dev" target="_blank" rel="noopener"
             class="hover:text-[#d4a84c] transition-colors duration-150 no-underline"
             style="color:#384060">Tiltann</a>
          <span class="mx-1.5 opacity-30">|</span>
          Data: warframestat.us
          <span class="mx-1.5 opacity-30">|</span>
          Not affiliated with Digital Extremes Ltd.
        </p>
        <div class="mt-3 flex justify-center">
          <a href="https://github.com/Tiltann/Helios" target="_blank" rel="noopener"
             class="inline-flex items-center gap-1.5 text-[10px] no-underline transition-colors duration-150 hover:text-[#d4a84c]"
             style="color:#283050">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            GitHub
          </a>
        </div>
      </div>

    </div>
  </div>
</template>
