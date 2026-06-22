<script setup lang="ts">
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
  0, 1500, 5250, 11250, 20000, 31250, 45000, 61250, 80000,
  101250, 125000, 151250, 180000, 211250, 245000, 281250, 320000,
  361250, 405000, 451250, 500000, 551250, 605000, 661250, 720000,
  781250, 845000, 911250, 980000, 1051250, 1125000,
]
const imageMap         = ref<Record<string, string>>({})
const activeCategory   = ref<string | null>(null)
const spoilerPopup     = ref<Item | null>(null)
const revealedSpoilers = ref(new Set<string>())
const showSpoilers     = ref(false)

const IMG_CACHE_KEY = 'helios_img_v1'
const IMG_CACHE_TTL = 86_400_000 // 24 h

void (async () => {
  try {
    const raw = localStorage.getItem(IMG_CACHE_KEY)
    if (raw) {
      const { ts, map } = JSON.parse(raw) as { ts: number; map: Record<string, string> }
      if (Date.now() - ts < IMG_CACHE_TTL) { imageMap.value = map; return }
    }
  } catch {}
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
  } catch {}
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

})

onUnmounted(() => window.removeEventListener('keydown', spaceToFocus))
</script>

<template>
  <div class="min-h-screen bg-[#07090f] text-[#d4c4a0] font-sans antialiased">

    <!-- Beginner modal -->
    <Transition name="zoom">
      <div v-if="beginnerModal"
           class="fixed inset-0 z-50 flex items-center justify-center p-4
                  bg-[rgba(7,9,15,0.92)] backdrop-blur-[4px]"
           @click.self="beginnerModal = false">
        <div class="w-full max-w-[700px] rounded-[10px] overflow-hidden
                    border border-[#1c1f27] bg-[#0b0d12] max-h-[88vh] overflow-y-auto">

          <div class="flex items-center justify-between px-5 py-4 border-b border-b-[#14171e]">
            <div>
              <div class="text-[13px] font-bold text-[#c49a3c]">{{ t.beginnerTitle }}</div>
              <div class="text-[11px] text-[#7a8aa0] mt-[2px]">{{ t.beginnerIntro }}</div>
            </div>
            <button @click="beginnerModal = false"
                    class="bg-transparent border-none cursor-pointer text-[24px] leading-none
                           px-[10px] py-1 text-[#5a6a88] shrink-0
                           hover:text-[#c49a3c] transition-colors duration-150">×</button>
          </div>

          <div class="px-4 py-[14px] grid gap-2
                      grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
            <div v-for="key in BEGINNER_KEYS" :key="key"
                 class="px-3 py-[10px] bg-[#0f1219] rounded-[6px] border border-[#14171e]">
              <div class="text-[9px] font-bold uppercase tracking-[0.12em] text-[#c49a3c] mb-1">
                {{ termParts(key).label }}
              </div>
              <div class="text-[11px] text-[#8a9ab0] leading-[1.6]">
                {{ termParts(key).body }}
              </div>
            </div>
          </div>

          <div class="px-5 py-[10px] border-t border-t-[#14171e]">
            <span class="text-[10px] text-[#5a6a80] italic">{{ t.darkSectorNote }}</span>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Spoiler reveal popup -->
    <Transition name="zoom">
      <div v-if="spoilerPopup"
           class="fixed inset-0 z-50 flex items-center justify-center p-4
                  bg-[rgba(7,9,15,0.92)] backdrop-blur-[4px]"
           @click.self="spoilerPopup = null">
        <div class="w-full max-w-[360px] rounded-[10px] border border-[#1c1f27]
                    bg-[#0b0d12] px-5 py-5">
          <div class="text-[11px] text-[#c49a3c] font-bold mb-1">⚠ Spoiler Warning</div>
          <div class="text-[12px] text-[#8a9ab0] leading-[1.6] mb-4">
            {{ t.spoilerFor }} <span class="text-[#c8b890] font-medium">{{ spoilerPopup.spoilerFor }}</span>.
          </div>
          <div class="flex gap-2">
            <button @click="revealSpoiler(spoilerPopup!.name); spoilerPopup = null"
                    class="flex-1 text-[10px] font-bold uppercase tracking-[0.1em]
                           py-[7px] rounded cursor-pointer transition-all duration-150
                           bg-[rgba(196,154,60,0.1)] border border-[rgba(196,154,60,0.3)]
                           text-[#c49a3c] hover:bg-[rgba(196,154,60,0.18)]">
              {{ t.spoilerReveal }}
            </button>
            <button @click="spoilerPopup = null"
                    class="flex-1 text-[10px] font-bold uppercase tracking-[0.1em]
                           py-[7px] rounded cursor-pointer transition-all duration-150
                           bg-transparent border border-[#1c1f27]
                           text-[#5a6a88] hover:text-[#c49a3c] hover:border-[rgba(196,154,60,0.3)]">
              {{ t.spoilerKeep }}
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Mastery Modal -->
    <Transition name="zoom">
      <div v-if="masteryModal"
           class="fixed inset-0 z-50 flex items-center justify-center"
           style="background:rgba(7,9,15,0.85);backdrop-filter:blur(4px)"
           @click.self="masteryModal = false">
        <div class="bg-[#0d1018] border border-[#1c1f27] rounded-xl shadow-2xl w-full max-w-[560px] mx-4"
             style="max-height:88vh;overflow-y:auto">
          <div class="flex items-center justify-between px-6 pt-5 pb-4 border-b border-[#1c1f27]">
            <span class="text-[13px] font-bold uppercase tracking-[0.12em] text-[#c49a3c]">
              {{ t.masteryMode }} Rank Calculator
            </span>
            <button @click="masteryModal = false"
                    class="text-[#3a4050] hover:text-[#c49a3c] transition-colors text-lg leading-none cursor-pointer">
              ✕
            </button>
          </div>
          <div class="px-6 py-5 space-y-5">

            <div class="flex items-center gap-3">
              <span class="text-[11px] text-[#5a6a88] uppercase tracking-[0.08em] whitespace-nowrap">Your MR</span>
              <input type="range" min="0" max="30" v-model.number="mrLevel"
                     class="flex-1 accent-[#c49a3c] cursor-pointer"/>
              <span class="text-[22px] font-bold text-[#c49a3c] w-8 text-right">{{ mrLevel }}</span>
            </div>

            <div>
              <div class="flex justify-between text-[10px] text-[#3a4050] mb-1">
                <span>{{ MR_THRESHOLDS[mrLevel].toLocaleString() }} XP earned</span>
                <span v-if="mrLevel < 30">{{ MR_THRESHOLDS[mrLevel + 1].toLocaleString() }} XP for MR {{ mrLevel + 1 }}</span>
                <span v-else>Max rank reached</span>
              </div>
              <div class="h-[4px] rounded-full bg-[#1c1f27] overflow-hidden">
                <div class="h-full rounded-full bg-[#c49a3c] transition-all duration-300"
                     :style="{ width: mrLevel === 30 ? '100%' : `${((MR_THRESHOLDS[mrLevel] / MR_THRESHOLDS[30]) * 100).toFixed(1)}%` }"/>
              </div>
            </div>

            <div v-if="mrLevel < 30" class="bg-[#070a10] border border-[#1c1f27] rounded-lg p-4">
              <p class="text-[11px] text-[#5a6a88] uppercase tracking-[0.08em] mb-3">
                To reach MR {{ mrLevel + 1 }} you need
                <span class="text-[#c49a3c]">{{ (MR_THRESHOLDS[mrLevel + 1] - MR_THRESHOLDS[mrLevel]).toLocaleString() }}</span>
                more XP
              </p>
              <div class="grid grid-cols-2 gap-2 text-[11px]">
                <div class="flex items-center gap-2 text-[#8a9ab8]">
                  <span class="w-1.5 h-1.5 rounded-full bg-[#52c27a] shrink-0"/>
                  {{ Math.ceil((MR_THRESHOLDS[mrLevel + 1] - MR_THRESHOLDS[mrLevel]) / 6000) }} warframes
                  <span class="text-[#3a4050]">(6k each)</span>
                </div>
                <div class="flex items-center gap-2 text-[#8a9ab8]">
                  <span class="w-1.5 h-1.5 rounded-full bg-[#c45252] shrink-0"/>
                  {{ Math.ceil((MR_THRESHOLDS[mrLevel + 1] - MR_THRESHOLDS[mrLevel]) / 3000) }} weapons
                  <span class="text-[#3a4050]">(3k each)</span>
                </div>
              </div>
            </div>
            <div v-else class="bg-[#070a10] border border-[rgba(196,154,60,0.3)] rounded-lg p-4 text-center">
              <p class="text-[13px] font-bold text-[#c49a3c]">MR 30 — Maximum Rank</p>
            </div>

            <div>
              <p class="text-[10px] text-[#3a4050] uppercase tracking-[0.08em] mb-2">Mastery XP per item (leveled to 30, once only)</p>
              <div class="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[11px]">
                <div v-for="row in [
                  ['Warframe', '6,000'],['Archwing', '6,000'],
                  ['Primary', '3,000'],['Secondary', '3,000'],
                  ['Melee', '3,000'],['Companion', '3,000'],
                  ['K-Drive / MOA', '3,000'],['Arch-Gun / Arch-Melee', '3,000'],
                ]" :key="row[0]" class="flex items-center justify-between">
                  <span class="text-[#5a6a88]">{{ row[0] }}</span>
                  <span class="text-[#c49a3c] font-mono">{{ row[1] }} XP</span>
                </div>
              </div>
              <p class="text-[10px] text-[#2a3040] mt-2">Each item counts only once. Forma re-leveling gives no mastery.</p>
            </div>

            <div class="border border-[#1c1f27] rounded-lg p-4 space-y-2">
              <p class="text-[10px] text-[#3a4050] uppercase tracking-[0.08em]">How to check your mastery XP in-game</p>
              <p class="text-[11px] text-[#5a6a88] leading-relaxed">
                Press <kbd class="bg-[#1c1f27] text-[#c49a3c] text-[10px] px-1.5 py-0.5 rounded font-mono">ESC</kbd>
                → click your username in the top-left → the Mastery Rank bar shows your current XP and progress to the next rank.
              </p>
              <p class="text-[11px] text-[#5a6a88] leading-relaxed">
                During missions, the <span class="text-[#8a9ab8]">Affinity panel</span> on the right side of your HUD shows XP earned per weapon and warframe in real time.
              </p>
              <p class="text-[11px] text-[#5a6a88] leading-relaxed">
                You can also run a <span class="text-[#8a9ab8]">Mastery Rank test</span> at any relay — one attempt per 24 hours.
              </p>
            </div>

          </div>
        </div>
      </div>
    </Transition>

    <!-- Page column -->
    <div class="max-w-[640px] mx-auto px-5">

      <!-- Header -->
      <div class="flex items-center justify-between pt-11 pb-[14px]">
        <div class="flex items-center gap-2.5">
          <img src="/logo.svg" alt="Helios" class="w-6 h-6"/>
          <span class="text-[11px] font-bold tracking-[0.22em] uppercase text-[#c49a3c]">HELIOS</span>
          <span class="text-[11px] text-[#4a5870] ml-1.5 tracking-[0.04em]">{{ t.subtitle }}</span>
        </div>
        <div class="flex items-center gap-2">
          <button @click="showSpoilers = !showSpoilers"
                  class="text-[9.5px] font-bold uppercase tracking-[0.1em] px-[9px] py-1
                         rounded cursor-pointer transition-all duration-150 bg-transparent border"
                  :class="showSpoilers
                    ? 'text-[#c49a3c] border-[rgba(196,154,60,0.35)]'
                    : 'text-[#5a6a88] border-[#1c1f27] hover:text-[#c49a3c] hover:border-[rgba(196,154,60,0.3)]'">
            Spoilers {{ showSpoilers ? 'on' : 'off' }}
          </button>
          <button @click="masteryModal = true"
                  class="text-[9.5px] font-bold uppercase tracking-[0.1em] px-[9px] py-1
                         rounded cursor-pointer transition-all duration-150
                         text-[#5a6a88] bg-transparent border border-[#1c1f27]
                         hover:text-[#c49a3c] hover:border-[rgba(196,154,60,0.3)]">
            {{ t.masteryMode }}
          </button>
          <button @click="beginnerModal = true"
                  class="text-[9.5px] font-bold uppercase tracking-[0.1em] px-[9px] py-1
                         rounded cursor-pointer transition-all duration-150
                         text-[#5a6a88] bg-transparent border border-[#1c1f27]
                         hover:text-[#c49a3c] hover:border-[rgba(196,154,60,0.3)]">
            {{ t.beginnerMode }}
          </button>
          <select v-model="locale"
                  class="bg-[#0b0d12] border border-[#1c1f27] text-[#c49a3c]
                         text-[10px] font-bold tracking-[0.1em] uppercase
                         px-2 py-[5px] rounded cursor-pointer outline-none
                         hover:border-[rgba(196,154,60,0.35)] transition-colors duration-150">
            <option v-for="l in LOCALES" :key="l" :value="l"
                    class="bg-[#0b0d12] text-[#c49a3c]">{{ LOCALE_LABELS[l] }}</option>
          </select>
        </div>
      </div>

      <!-- Catchphrase -->
      <div class="pb-[18px] text-[10.5px] text-[#3a4860] italic tracking-[0.02em]">
        {{ t.catchphrase }}
      </div>

      <!-- Search box -->
      <div class="relative mb-[14px]">
        <div class="rounded-[8px] bg-[#0b0d12] transition-all duration-200"
             :class="query
               ? 'border border-[rgba(196,154,60,0.27)] shadow-[0_0_0_3px_rgba(196,154,60,0.04)]'
               : 'border border-[#1c1f27]'">
          <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-25"
               width="15" height="15" viewBox="0 0 16 16"
               fill="none" stroke="#c49a3c" stroke-width="1.6">
            <circle cx="7" cy="7" r="5"/><path d="M11 11l3 3"/>
          </svg>
          <input ref="input" v-model="query" @input="search" @keydown="onKey"
                 :placeholder="t.placeholder"
                 class="w-full bg-transparent border-none outline-none
                        px-10 py-[13px] text-[14.5px] text-[#c8b890]
                        placeholder:text-[#3a4860]"/>
          <button v-if="query" @click="query='';search()"
                  class="absolute right-3 top-1/2 -translate-y-1/2
                         border-none bg-transparent cursor-pointer
                         text-[#5a6a88] text-[18px] leading-none px-1.5 py-1
                         hover:text-[#c49a3c] transition-colors duration-100">×</button>
        </div>
      </div>

      <!-- Category tabs -->
      <div class="flex gap-2 flex-wrap mb-[18px]">
        <button v-for="cat in CATEGORIES" :key="cat"
                @click="activeCategory = cat === 'all' ? null : cat"
                class="text-[9.5px] font-bold uppercase tracking-[0.1em]
                       px-[11px] py-1 rounded-full cursor-pointer
                       transition-all duration-200 leading-[1.4]"
                :style="isActiveTab(cat) ? {
                  color: '#07090f',
                  background: CATEGORY_COLOR[cat] ?? '#c49a3c',
                  border: '1px solid transparent',
                } : {
                  color: cat === 'all' ? '#5a6a88' : (CATEGORY_COLOR[cat] ?? '#5a6a88'),
                  background: 'transparent',
                  border: '1px solid #1c1f27',
                }">
          {{ catLabel[cat] ?? cat }}
        </button>
      </div>

      <!-- No results -->
      <Transition name="fade">
        <p v-if="query && !displayItems.length"
           class="text-[12px] text-[#5a6a88] py-2">
          {{ t.noResults }}
        </p>
      </Transition>

      <!-- Item list -->
      <div>
        <template v-for="item in displayItems" :key="item.name">

          <!-- Spoiler row (not yet revealed, global toggle off) -->
          <button v-if="item.spoiler && !showSpoilers && !revealedSpoilers.has(item.name)"
                  @click="spoilerPopup = item"
                  class="w-full text-left border-none cursor-pointer
                         flex items-center gap-3 pl-[10px] py-[10px]
                         border-b border-b-[#0f1219] bg-transparent
                         hover:bg-white/[.018] transition-colors duration-150"
                  :style="{ borderLeft: '2px solid transparent' }">
            <div class="w-[18px] h-[18px] shrink-0 flex items-center justify-center">
              <span class="text-[12px] opacity-40">⚠</span>
            </div>
            <div class="flex-1 min-w-0">
              <div class="text-[12px] text-[#4a5870] font-medium">
                {{ t.spoilerHidden }} <span class="italic">{{ item.spoilerFor }}</span>
              </div>
              <div class="text-[10px] text-[#2a3848] mt-px">Click to reveal</div>
            </div>
            <span class="shrink-0 text-[9.5px] font-bold uppercase tracking-[0.1em]
                         text-[#2a3848] px-[5px] py-[2px] rounded border border-[#14171e]">
              spoiler
            </span>
          </button>

          <button v-else-if="!item.spoiler || showSpoilers || revealedSpoilers.has(item.name)" @click="pick(item)"
                  class="w-full text-left border-none cursor-pointer
                         flex items-center gap-3 pl-[10px] py-[10px]
                         border-b border-b-[#0f1219] transition-colors duration-150"
                  :class="selected?.name === item.name
                    ? 'bg-[rgba(196,154,60,0.04)]'
                    : 'bg-transparent hover:bg-white/[.018]'"
                  :style="{ borderLeft: selected?.name === item.name ? '2px solid #c49a3c' : '2px solid transparent' }">

            <!-- Image with dot fallback -->
            <div class="relative w-[18px] h-[18px] shrink-0">
              <span class="absolute inset-0 flex items-center justify-center">
                <span class="w-[7px] h-[7px] rounded-full opacity-50"
                      :style="{ background: CATEGORY_COLOR[item.category] ?? '#3a4050' }"/>
              </span>
              <img v-if="getImage(item)" :key="getImage(item)" :src="getImage(item)" alt=""
                   class="relative z-[1] w-[18px] h-[18px] object-contain opacity-80"
                   @error="(e) => (e.target as HTMLImageElement).style.display='none'"/>
            </div>

            <!-- Name + preview -->
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-1.5">
                <span class="text-[13.5px] font-medium leading-[1.3] transition-colors duration-150"
                      :class="selected?.name === item.name ? 'text-[#d4c4a0]' : (item.vaulted ? 'text-[#7a8a9a]' : 'text-[#a8b6b6]')">
                  {{ tItem(item.name) }}
                </span>
                <span v-if="item.vaulted"
                      class="text-[7.5px] font-bold uppercase tracking-[0.1em] px-[5px] py-[2px]
                             rounded text-[#5a6a78] border border-[#1c2030] leading-none shrink-0">
                  vaulted
                </span>
              </div>
              <div class="text-[11px] text-[#4a5870] mt-px truncate">
                {{ bestSource(item) }}
              </div>
            </div>

            <!-- Category label -->
            <span class="shrink-0 text-[9px] font-bold uppercase tracking-[0.08em]"
                  :style="{ color: CATEGORY_COLOR[item.category] ?? '#5a6a88' }">
              {{ catLabel[item.category] }}
            </span>

            <!-- Chevron -->
            <span class="text-[10px] text-[#4a5870] shrink-0 leading-none"
                  :class="selected?.name === item.name ? 'rotate-180' : 'rotate-0'"
                  :style="{ transition: 'transform 0.28s cubic-bezier(0.22, 1, 0.36, 1)' }">▾</span>
          </button>

          <!-- Inline expansion -->
          <Transition name="slide">
            <div v-if="selected?.name === item.name"
                 class="pr-3 pl-8 pt-3 pb-4 border-b border-b-[#0f1219] bg-black/[.12]">

              <div class="text-[8.5px] font-bold uppercase tracking-[0.14em]
                          text-[#4a5870] mb-[10px]">
                {{ t.bestFarm }}
              </div>

              <div v-for="(src, i) in item.sources" :key="i"
                   :class="i > 0 ? 'mt-[10px] pt-[10px] border-t border-t-[#0d0f14]' : ''">

                <div class="flex items-center flex-wrap gap-1.5">
                  <!-- Rank badge -->
                  <span class="flex items-center justify-center rounded-full shrink-0
                               w-[18px] h-[18px] text-[9px] font-bold"
                        :class="i === 0
                          ? 'bg-[rgba(196,154,60,0.1)] border border-[rgba(196,154,60,0.3)] text-[#c49a3c]'
                          : 'bg-[#0f1219] border border-[#1c1f27] text-[#5a6a88]'">
                    {{ src.rank }}
                  </span>

                  <!-- Mission name -->
                  <span class="text-[13px] font-medium text-[#c8b890]">{{ src.mission }}</span>

                  <!-- Type badge -->
                  <span class="text-[8.5px] font-semibold uppercase tracking-[0.07em]
                               px-[5px] py-[2px] rounded-[3px]
                               text-[#5284e0] bg-[rgba(82,132,224,0.08)]
                               border border-[rgba(82,132,224,0.15)]">
                    {{ tType(src.type) }}
                  </span>

                  <!-- Planet chip -->
                  <span v-if="src.planet && PLANETS[src.planet]"
                        class="inline-flex items-center gap-1 text-[9px] font-bold uppercase
                               tracking-[0.07em] px-[6px] py-[2px] rounded-[10px]"
                        :style="{
                          color: PLANETS[src.planet].color,
                          background: PLANETS[src.planet].color + '15',
                          border: `1px solid ${PLANETS[src.planet].color}35`,
                        }">
                    <span class="relative shrink-0 w-[14px] h-[14px] flex items-center justify-center">
                      <span class="w-[5px] h-[5px] rounded-full"
                            :style="{ background: PLANETS[src.planet].color }"/>
                      <img v-if="PLANETS[src.planet].img"
                           :src="`https://cdn.warframestat.us/img/${PLANETS[src.planet].img}`"
                           class="absolute inset-0 w-full h-full object-contain"
                           alt=""
                           @error="(e) => (e.target as HTMLImageElement).style.display = 'none'"/>
                    </span>
                    {{ tPlanet(src.planet) }}
                  </span>
                  <span v-else class="text-[11px] text-[#5a6a88]">{{ tPlanet(src.planet) }}</span>
                </div>

                <div v-if="src.note"
                     class="text-[11px] text-[#7a8aa0] mt-1 pl-[22px] leading-[1.6]">
                  {{ src.note }}
                </div>
              </div>

              <!-- Wiki link -->
              <a :href="wikiUrl(item)" target="_blank" rel="noopener"
                 class="mt-3 inline-flex items-center gap-1
                        text-[10px] font-bold uppercase tracking-[0.08em]
                        text-[#5a6a88] no-underline px-[9px] py-[5px] rounded
                        border border-[#1c1f27]
                        hover:text-[#c49a3c] hover:border-[rgba(196,154,60,0.35)]
                        transition-colors duration-150">
                {{ t.wikiLink }}
                <svg width="9" height="9" viewBox="0 0 10 10" fill="none"
                     stroke="currentColor" stroke-width="1.5">
                  <path d="M1 9L9 1M9 1H4M9 1V6"/>
                </svg>
              </a>
            </div>
          </Transition>

        </template>
      </div>

      <!-- Footer -->
      <div class="pt-8 pb-6 text-[10px] text-[#3a4860] text-center">
        Made with ♥ by
        <a href="https://tiltann.dev" target="_blank" rel="noopener"
           class="text-[#5a6a88] no-underline hover:text-[#c49a3c] transition-colors duration-150">
          Tiltann
        </a>
        <span class="mx-[5px] opacity-40">|</span>
        Data: warframestat.us
        <span class="mx-[5px] opacity-40">|</span>
        Not affiliated with Digital Extremes Ltd.
        <div class="mt-3 flex justify-center">
          <a href="https://github.com/Tiltann/Helios" target="_blank" rel="noopener"
             class="inline-flex items-center gap-1.5 text-[#3a4860] no-underline
                    hover:text-[#7a8aa0] transition-colors duration-150">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            GitHub
          </a>
        </div>
      </div>

    </div>
  </div>
</template>
