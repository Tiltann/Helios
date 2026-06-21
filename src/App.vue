<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import Fuse from 'fuse.js'
import { ITEMS, PLANETS, type Item } from './data'
import { T, type Locale, type TKey, LOCALE_LABELS } from './i18n'

const LOCALES = Object.keys(LOCALE_LABELS) as Locale[]

const CATEGORY_COLOR: Record<string, string> = {
  resource: '#5284e0', prime: '#c49a3c', warframe: '#52c27a', mod: '#c47a3c', relic: '#9c6cc4',
}

const CATEGORIES = ['all', 'resource', 'warframe', 'mod', 'prime', 'relic'] as const

const BEGINNER_KEYS: TKey[] = [
  'termSurvival', 'termDefense', 'termExcavation', 'termDarkSector',
  'termBoss', 'termRotation', 'termDucats', 'termRelics',
  'termVoidFissure', 'termBounty', 'termVendor', 'termRailjack',
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
}))

const query          = ref('')
const results        = ref<Item[]>([])
const selected       = ref<Item | null>(null)
const cursor         = ref(-1)
const input          = ref<HTMLInputElement | null>(null)
const beginnerModal  = ref(false)
const imageMap       = ref<Record<string, string>>({})
const activeCategory = ref<string | null>(null)

const fuse = new Fuse(ITEMS, { keys: ['name', 'category'], threshold: 0.35 })

const filteredResults = computed(() =>
  activeCategory.value
    ? results.value.filter(i => i.category === activeCategory.value)
    : results.value
)

const displayItems = computed(() => {
  if (query.value.trim()) return filteredResults.value
  return activeCategory.value
    ? ITEMS.filter(i => i.category === activeCategory.value)
    : ITEMS
})

function isActiveTab(cat: string): boolean {
  return cat === 'all' ? !activeCategory.value : activeCategory.value === cat
}

function search() {
  const q = query.value.trim()
  if (!q) { results.value = []; cursor.value = -1; return }
  results.value = fuse.search(q).slice(0, 10).map(r => r.item)
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
  return imageMap.value[item.name]
    || (item.imageName ? `https://cdn.warframestat.us/img/${item.imageName}` : '')
}

function bestSource(item: Item): string {
  const s = item.sources[0]
  return s ? [s.mission, s.planet, s.type].filter(Boolean).join(', ') : ''
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
  } catch { /* silently ignore */ }
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

    <!-- Page column -->
    <div class="max-w-[640px] mx-auto px-5">

      <!-- Header -->
      <div class="flex items-center justify-between pt-11 pb-[22px]">
        <div class="flex items-center gap-2.5">
          <img src="/logo.svg" alt="Helios" class="w-6 h-6"/>
          <span class="text-[11px] font-bold tracking-[0.22em] uppercase text-[#c49a3c]">HELIOS</span>
          <span class="text-[11px] text-[#4a5870] ml-1.5 tracking-[0.04em]">{{ t.subtitle }}</span>
        </div>
        <div class="flex items-center gap-2">
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

          <button @click="pick(item)"
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
              <img v-if="getImage(item)" :src="getImage(item)" alt=""
                   class="relative z-[1] w-[18px] h-[18px] object-contain opacity-80"
                   @error="(e) => (e.target as HTMLImageElement).style.display='none'"/>
            </div>

            <!-- Name + preview -->
            <div class="flex-1 min-w-0">
              <div class="text-[13.5px] font-medium leading-[1.3] transition-colors duration-150"
                   :class="selected?.name === item.name ? 'text-[#d4c4a0]' : 'text-[#a8b6b6]'">
                {{ item.name }}
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
                    {{ src.type }}
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
                    <span class="w-[5px] h-[5px] rounded-full shrink-0 inline-block"
                          :style="{ background: PLANETS[src.planet].color }"/>
                    {{ src.planet }}
                  </span>
                  <span v-else class="text-[11px] text-[#5a6a88]">{{ src.planet }}</span>
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
      </div>

    </div>
  </div>
</template>
