<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import Fuse from 'fuse.js'
import { ITEMS, PLANETS, type Item } from './data'
import { T, type Locale, type TKey, LOCALE_LABELS } from './i18n'

const LOCALES = Object.keys(LOCALE_LABELS) as Locale[]

const CATEGORY_COLOR: Record<string, string> = {
  resource: '#5284e0', prime: '#c49a3c', warframe: '#52c27a', mod: '#c47a3c', all: '#c49a3c',
}

const CATEGORIES = ['all', 'resource', 'warframe', 'mod', 'prime'] as const

const BEGINNER_KEYS: TKey[] = [
  'termSurvival', 'termDefense', 'termExcavation', 'termDarkSector',
  'termBoss', 'termRotation', 'termDucats', 'termRelics',
  'termVoidFissure', 'termBounty', 'termVendor', 'termRailjack',
]

// ── State ─────────────────────────────────────────────────────────────────
const locale         = ref<Locale>('en')
const t              = computed(() => T[locale.value])
const catLabel       = computed((): Record<string, string> => ({
  all:      t.value.catAll,
  resource: t.value.catResource,
  prime:    t.value.catPrime,
  warframe: t.value.catWarframe,
  mod:      t.value.catMod,
}))

const query          = ref('')
const results        = ref<Item[]>([])
const selected       = ref<Item | null>(null)
const cursor         = ref(0)
const input          = ref<HTMLInputElement | null>(null)
const beginnerModal  = ref(false)
const imageMap       = ref<Record<string, string>>({})
const activeCategory = ref<string | null>(null)

const fuse = new Fuse(ITEMS, { keys: ['name', 'category'], threshold: 0.35 })

// ── Computed ───────────────────────────────────────────────────────────────
const filteredResults = computed(() =>
  activeCategory.value
    ? results.value.filter(i => i.category === activeCategory.value)
    : results.value
)

const browseItems = computed(() =>
  activeCategory.value
    ? ITEMS.filter(i => i.category === activeCategory.value)
    : ITEMS
)

// ── Functions ─────────────────────────────────────────────────────────────
function search() {
  const q = query.value.trim()
  if (!q) { results.value = []; selected.value = null; return }
  const hits = fuse.search(q).slice(0, 8).map(r => r.item)
  results.value = hits
  selected.value = hits[0] ?? null
  cursor.value = 0
}

function pick(item: Item, i: number) {
  selected.value = item
  cursor.value = i
}

function selectBrowse(item: Item) {
  selected.value = item
}

function onKey(e: KeyboardEvent) {
  const list = filteredResults.value
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    const n = Math.min(cursor.value + 1, list.length - 1)
    if (list[n]) pick(list[n], n)
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    const n = Math.max(cursor.value - 1, 0)
    if (list[n]) pick(list[n], n)
  } else if (e.key === 'Escape') {
    query.value = ''
    search()
    beginnerModal.value = false
  }
}

function spaceToFocus(e: KeyboardEvent) {
  if (e.key === ' ' && document.activeElement !== input.value) {
    e.preventDefault()
    input.value?.focus()
  }
}

function wikiUrl(item: Item): string {
  const slug = (item.wikiSlug ?? item.name).replace(/ /g, '_')
  return `https://warframe.wiki.gg/wiki/${slug}`
}

function getImage(item: Item): string {
  if (item.image) return item.image
  if (item.imageName) return `https://cdn.warframestat.us/img/${item.imageName}`
  return imageMap.value[item.name] ?? ''
}

function termParts(key: TKey): { label: string; body: string } {
  const full = t.value[key]
  const sep  = full.indexOf(': ')
  if (sep === -1) return { label: '', body: full }
  return { label: full.slice(0, sep), body: full.slice(sep + 2) }
}

// ── Lifecycle ──────────────────────────────────────────────────────────────
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
    for (const item of data) {
      if (item.imageName) map[item.name] = `https://cdn.warframestat.us/img/${item.imageName}`
    }
    imageMap.value = map
  } catch { /* silently ignore */ }
})

onUnmounted(() => window.removeEventListener('keydown', spaceToFocus))

const hasBorder = computed(() => !!query.value)
</script>

<template>
  <div class="min-h-screen flex flex-col items-center px-4" style="background:#07090f">

    <!-- Beginner modal overlay -->
    <Transition name="fade">
      <div v-if="beginnerModal"
           class="fixed inset-0 z-50 flex items-center justify-center p-4"
           style="background:rgba(7,9,15,0.9);backdrop-filter:blur(4px)"
           @click.self="beginnerModal = false">
        <div class="w-full max-w-[700px] rounded-[12px] overflow-hidden"
             style="border:1px solid #1c1f27;background:#0e1016;max-height:85vh;overflow-y:auto">

          <div class="flex items-center justify-between"
               style="padding:16px 20px;border-bottom:1px solid #14171e;background:rgba(196,154,60,0.03)">
            <div>
              <div style="font-size:14px;font-weight:700;color:#c49a3c">{{ t.beginnerTitle }}</div>
              <div style="font-size:11px;color:#3a4050;margin-top:2px">{{ t.beginnerIntro }}</div>
            </div>
            <button @click="beginnerModal = false"
                    style="color:#3a4050;background:transparent;border:none;cursor:pointer;
                           font-size:26px;line-height:1;padding:2px 8px;flex-shrink:0;transition:color 0.15s"
                    @mouseenter="(e) => ((e.target as HTMLElement).style.color='#c49a3c')"
                    @mouseleave="(e) => ((e.target as HTMLElement).style.color='#3a4050')">×</button>
          </div>

          <div style="padding:14px 16px;display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:8px">
            <div v-for="key in BEGINNER_KEYS" :key="key"
                 style="padding:10px 12px;background:#111318;border-radius:7px;border:1px solid #14171e">
              <div style="font-size:9.5px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#c49a3c;margin-bottom:4px">
                {{ termParts(key).label }}
              </div>
              <div style="font-size:11px;color:#4a5568;line-height:1.55">
                {{ termParts(key).body }}
              </div>
            </div>
          </div>

          <div style="padding:10px 20px;border-top:1px solid #14171e">
            <span style="font-size:10.5px;color:#2e3545;font-style:italic">{{ t.darkSectorNote }}</span>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Header -->
    <div class="mt-[10vh] mb-5 text-center">
      <div class="flex items-center justify-center gap-3 mb-1.5">
        <img src="/logo.svg" alt="Helios" style="width:36px;height:36px"/>
        <span style="font-size:13px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:#c49a3c">
          Helios
        </span>
      </div>
      <p style="font-size:12px;color:#3a4050;letter-spacing:0.08em">{{ t.subtitle }}</p>
    </div>

    <!-- Controls row -->
    <div class="w-full max-w-[640px] flex items-center justify-between mb-3">
      <button
        @click="beginnerModal = !beginnerModal"
        :style="{
          fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em',
          padding: '5px 10px', borderRadius: '5px', cursor: 'pointer', transition: 'all 0.15s',
          color: beginnerModal ? '#c49a3c' : '#3a4050',
          background: beginnerModal ? 'rgba(196,154,60,0.08)' : 'transparent',
          border: `1px solid ${beginnerModal ? 'rgba(196,154,60,0.3)' : '#1c1f27'}`,
        }"
      >{{ t.beginnerMode }}</button>

      <select v-model="locale" class="locale-select">
        <option v-for="l in LOCALES" :key="l" :value="l">{{ LOCALE_LABELS[l] }}</option>
      </select>
    </div>

    <!-- Search -->
    <div class="w-full max-w-[640px]">
      <div class="relative transition-all duration-200 rounded-[10px]"
           :style="{
             border: `1px solid ${hasBorder ? '#c49a3c55' : '#1c1f27'}`,
             background: '#0e1016',
             boxShadow: hasBorder ? '0 0 0 3px rgba(196,154,60,0.05)' : undefined,
           }">
        <svg class="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-30"
             width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#c49a3c" stroke-width="1.6">
          <circle cx="7" cy="7" r="5"/><path d="M11 11l3 3"/>
        </svg>
        <input
          ref="input"
          v-model="query"
          @input="search"
          @keydown="onKey"
          :placeholder="t.placeholder"
          class="w-full bg-transparent border-none outline-none"
          style="padding:15px 44px;font-size:15.5px;color:#d4c4a0;font-family:inherit"
        />
        <button v-if="query" @click="query='';search()"
          class="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer border-none bg-transparent"
          style="color:#3a4050;font-size:20px;line-height:1;padding:4px">×</button>
      </div>
    </div>

    <!-- Category tabs -->
    <div class="w-full max-w-[640px] flex gap-2 mt-3 flex-wrap">
      <button
        v-for="cat in CATEGORIES"
        :key="cat"
        @click="activeCategory = cat === 'all' ? null : cat"
        :style="{
          fontSize: '10px', fontWeight: 700, textTransform: 'uppercase',
          letterSpacing: '0.1em', padding: '5px 13px', borderRadius: '20px',
          cursor: 'pointer', transition: 'all 0.15s',
          color: (activeCategory === cat || (cat === 'all' && !activeCategory))
            ? '#07090f' : (CATEGORY_COLOR[cat] ?? '#3a4050'),
          background: (activeCategory === cat || (cat === 'all' && !activeCategory))
            ? (CATEGORY_COLOR[cat] ?? '#c49a3c') : 'transparent',
          border: `1px solid ${(activeCategory === cat || (cat === 'all' && !activeCategory))
            ? (CATEGORY_COLOR[cat] ?? '#c49a3c') : '#1c1f27'}`,
        }"
      >{{ catLabel[cat] ?? cat }}</button>
    </div>

    <!-- No results -->
    <Transition name="fade">
      <p v-if="query && !filteredResults.length" class="w-full max-w-[640px] text-center mt-4"
         style="font-size:11.5px;color:#3a4050">
        {{ t.noResults }}
      </p>
    </Transition>

    <!-- Results list (when searching) -->
    <Transition name="fade">
      <div v-if="query && filteredResults.length" class="w-full max-w-[640px] mt-2 overflow-hidden rounded-[10px]"
           style="border:1px solid #1c1f27;background:#0e1016">
        <button
          v-for="(item, i) in filteredResults"
          :key="item.name"
          class="flex items-center gap-3 w-full text-left cursor-pointer border-none transition-colors duration-75"
          :style="{
            padding: '10px 14px',
            background: selected?.name === item.name ? 'rgba(196,154,60,0.05)' : 'transparent',
            borderBottom: i < filteredResults.length - 1 ? '1px solid #0d0f14' : 'none',
          }"
          @click="pick(item, i)"
          @mouseenter="pick(item, i)"
        >
          <img v-if="getImage(item)" :src="getImage(item)" alt=""
               class="shrink-0 object-contain opacity-80"
               style="width:26px;height:26px"
               @error="(e) => (e.target as HTMLImageElement).style.display='none'"/>
          <div v-else class="shrink-0 rounded" style="width:26px;height:26px;background:#14171e"/>

          <span class="flex-1" style="font-size:13.5px;color:#c8b890;font-weight:500">{{ item.name }}</span>

          <span class="shrink-0" :style="{
            fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em',
            padding: '2px 6px', borderRadius: '3px',
            color: CATEGORY_COLOR[item.category],
            background: CATEGORY_COLOR[item.category] + '18',
            border: `1px solid ${CATEGORY_COLOR[item.category]}28`,
          }">{{ catLabel[item.category] }}</span>
        </button>
      </div>
    </Transition>

    <!-- Browse grid (when not searching) -->
    <Transition name="fade">
      <div v-if="!query" class="w-full max-w-[640px] mt-3">
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(175px,1fr));gap:8px">
          <button
            v-for="item in browseItems"
            :key="item.name"
            @click="selectBrowse(item)"
            class="text-left cursor-pointer rounded-[8px] transition-colors duration-75"
            :style="{
              padding: '10px 12px',
              border: `1px solid ${selected?.name === item.name ? 'rgba(196,154,60,0.4)' : '#1c1f27'}`,
              background: selected?.name === item.name ? 'rgba(196,154,60,0.04)' : '#0e1016',
            }"
            @mouseenter="(e) => { if (selected?.name !== item.name) (e.currentTarget as HTMLElement).style.borderColor = '#c49a3c33' }"
            @mouseleave="(e) => { if (selected?.name !== item.name) (e.currentTarget as HTMLElement).style.borderColor = '#1c1f27' }"
          >
            <div class="flex items-center gap-2 mb-2">
              <img v-if="getImage(item)" :src="getImage(item)" alt=""
                   style="width:22px;height:22px;object-fit:contain;opacity:0.8;flex-shrink:0"
                   @error="(e) => (e.target as HTMLImageElement).style.display='none'"/>
              <div v-else style="width:22px;height:22px;background:#14171e;border-radius:4px;flex-shrink:0"/>
              <span style="font-size:12px;font-weight:500;color:#c8b890;line-height:1.3">{{ item.name }}</span>
            </div>
            <span :style="{
              fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em',
              padding: '1px 6px', borderRadius: '3px',
              color: CATEGORY_COLOR[item.category],
              background: CATEGORY_COLOR[item.category] + '18',
            }">{{ catLabel[item.category] }}</span>
          </button>
        </div>
      </div>
    </Transition>

    <!-- Detail card -->
    <Transition name="fade">
      <div v-if="selected" class="w-full max-w-[640px] mt-4 mb-2 overflow-hidden rounded-[10px]"
           style="border:1px solid #1c1f27;background:#0e1016">

        <!-- Card header -->
        <div class="flex items-center gap-3.5"
             style="padding:14px 18px;border-bottom:1px solid #14171e;background:rgba(196,154,60,0.025)">
          <img v-if="getImage(selected)" :src="getImage(selected)" alt=""
               class="object-contain opacity-90 shrink-0"
               style="width:38px;height:38px"
               @error="(e) => (e.target as HTMLImageElement).style.display='none'"/>
          <div v-else class="shrink-0 rounded" style="width:38px;height:38px;background:#14171e"/>

          <div class="flex-1 min-w-0">
            <div style="font-size:15.5px;font-weight:600;color:#d4c4a0">{{ selected.name }}</div>
            <div style="font-size:10.5px;color:#5a6070;margin-top:2px;text-transform:uppercase;letter-spacing:0.08em">
              {{ catLabel[selected.category] }}
              <template v-if="selected.ducats"> · {{ selected.ducats }} Ducats</template>
            </div>
          </div>

          <a :href="wikiUrl(selected)" target="_blank" rel="noopener" class="wiki-link">
            {{ t.wikiLink }}
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
                 stroke="currentColor" stroke-width="1.5">
              <path d="M1 9L9 1M9 1H4M9 1V6"/>
            </svg>
          </a>
        </div>

        <!-- Sources -->
        <div>
          <div style="padding:10px 18px 6px;font-size:9px;font-weight:700;
                      text-transform:uppercase;letter-spacing:0.12em;color:#2a3040">
            {{ t.bestFarm }}
          </div>

          <div v-for="(src, i) in selected.sources" :key="i"
               class="flex items-start gap-3"
               :style="{
                 padding: '12px 18px',
                 borderTop: i > 0 ? '1px solid #0d0f14' : undefined,
                 borderLeft: i === 0 ? '2px solid rgba(196,154,60,0.4)' : '2px solid transparent',
               }">

            <div class="shrink-0 flex items-center justify-center rounded-full"
                 :style="{
                   width:'22px', height:'22px', marginTop:'1px',
                   fontSize:'10px', fontWeight:700,
                   background: i === 0 ? 'rgba(196,154,60,0.12)' : '#111318',
                   border: `1px solid ${i === 0 ? 'rgba(196,154,60,0.35)' : '#1c1f27'}`,
                   color: i === 0 ? '#c49a3c' : '#3a4050',
                 }">{{ src.rank }}</div>

            <div class="flex-1 min-w-0">
              <div class="flex items-center flex-wrap gap-2">
                <span style="font-size:13.5px;font-weight:500;color:#c8b890">{{ src.mission }}</span>
                <span style="font-size:9px;font-weight:600;text-transform:uppercase;letter-spacing:0.07em;
                             padding:2px 6px;border-radius:3px;color:#5284e0;
                             background:rgba(82,132,224,0.1);border:1px solid rgba(82,132,224,0.18)">
                  {{ src.type }}
                </span>
                <!-- Planet chip -->
                <span v-if="src.planet && PLANETS[src.planet]"
                      class="inline-flex items-center gap-1.5"
                      :style="{
                        fontSize: '9.5px', fontWeight: 700, textTransform: 'uppercase',
                        letterSpacing: '0.07em', padding: '2px 7px', borderRadius: '12px',
                        color: PLANETS[src.planet].color,
                        background: PLANETS[src.planet].color + '18',
                        border: `1px solid ${PLANETS[src.planet].color}40`,
                      }">
                  <span :style="{
                    width: '6px', height: '6px', borderRadius: '50%',
                    background: PLANETS[src.planet].color,
                    display: 'inline-block', flexShrink: 0,
                  }"/>
                  {{ PLANETS[src.planet].abbr }}
                </span>
                <span v-else style="font-size:11px;color:#3a4050">{{ src.planet }}</span>
              </div>
              <div v-if="src.note" style="font-size:11.5px;color:#4a5060;margin-top:4px">{{ src.note }}</div>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Footer -->
    <div class="mt-auto pt-10 pb-6 text-center" style="font-size:10.5px;color:#1e2530">
      Made with ♥ by
      <a href="https://tiltann.dev" target="_blank" rel="noopener" class="tiltann-link">Tiltann</a>
      <span style="margin:0 6px">·</span>
      Data: warframestat.us
      <span style="margin:0 6px">·</span>
      Not affiliated with Digital Extremes Ltd.
      <span style="margin:0 6px">·</span>
      {{ t.wip }}
    </div>
  </div>
</template>
