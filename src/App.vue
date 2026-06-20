<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import Fuse from 'fuse.js'
import { ITEMS, type Item } from './data'
import { T, type Locale, type TKey, LOCALE_LABELS } from './i18n'

const LOCALES = Object.keys(LOCALE_LABELS) as Locale[]

const CATEGORY_COLOR: Record<string, string> = {
  resource: '#5284e0', prime: '#c49a3c', warframe: '#52c27a', mod: '#c47a3c',
}

const BEGINNER_KEYS: TKey[] = [
  'termSurvival', 'termDefense', 'termExcavation', 'termDarkSector',
  'termBoss', 'termRotation', 'termDucats', 'termRelics',
  'termVoidFissure', 'termBounty', 'termVendor', 'termRailjack',
]

// ── State ─────────────────────────────────────────────────────────────────
const locale       = ref<Locale>('en')
const t            = computed(() => T[locale.value])
const catLabel     = computed((): Record<string, string> => ({
  resource: t.value.catResource,
  prime:    t.value.catPrime,
  warframe: t.value.catWarframe,
  mod:      t.value.catMod,
}))

const query        = ref('')
const results      = ref<Item[]>([])
const selected     = ref<Item | null>(null)
const cursor       = ref(0)
const input        = ref<HTMLInputElement | null>(null)
const beginnerOpen = ref(false)
const imageMap     = ref<Record<string, string>>({})

const fuse = new Fuse(ITEMS, { keys: ['name', 'category'], threshold: 0.35 })

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

function onKey(e: KeyboardEvent) {
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    const n = Math.min(cursor.value + 1, results.value.length - 1)
    pick(results.value[n], n)
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    const n = Math.max(cursor.value - 1, 0)
    pick(results.value[n], n)
  } else if (e.key === 'Escape') {
    query.value = ''
    search()
    beginnerOpen.value = false
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
  return item.image ?? imageMap.value[item.name] ?? ''
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

    <!-- Header -->
    <div class="mt-[10vh] mb-5 text-center">
      <div class="flex items-center justify-center gap-2.5 mb-1.5">
        <span class="w-2 h-2 rounded-full" style="background:#c49a3c;box-shadow:0 0 8px #c49a3c88"/>
        <span style="font-size:11px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:#c49a3c">
          Helios
        </span>
        <span class="w-2 h-2 rounded-full" style="background:#c49a3c;box-shadow:0 0 8px #c49a3c88"/>
      </div>
      <p style="font-size:12px;color:#3a4050;letter-spacing:0.08em">{{ t.subtitle }}</p>
    </div>

    <!-- Controls row -->
    <div class="w-full max-w-[640px] flex items-center justify-between mb-3">
      <button
        @click="beginnerOpen = !beginnerOpen"
        :style="{
          fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em',
          padding: '5px 10px', borderRadius: '5px', cursor: 'pointer', transition: 'all 0.15s',
          color: beginnerOpen ? '#c49a3c' : '#3a4050',
          background: beginnerOpen ? 'rgba(196,154,60,0.08)' : 'transparent',
          border: `1px solid ${beginnerOpen ? 'rgba(196,154,60,0.3)' : '#1c1f27'}`,
        }"
      >
        {{ t.beginnerMode }}
      </button>

      <select v-model="locale" class="locale-select">
        <option v-for="l in LOCALES" :key="l" :value="l">{{ LOCALE_LABELS[l] }}</option>
      </select>
    </div>

    <!-- Beginner panel -->
    <Transition name="slide">
      <div v-if="beginnerOpen"
           class="w-full max-w-[640px] mb-4 overflow-hidden rounded-[10px]"
           style="border:1px solid #1c1f27;background:#0e1016">

        <div style="padding:14px 18px 10px;border-bottom:1px solid #14171e">
          <div style="font-size:13px;font-weight:700;color:#c49a3c;margin-bottom:3px">
            {{ t.beginnerTitle }}
          </div>
          <div style="font-size:11px;color:#3a4050">{{ t.beginnerIntro }}</div>
        </div>

        <div style="padding:12px 14px;display:grid;grid-template-columns:repeat(auto-fill,minmax(265px,1fr));gap:8px">
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

        <div class="flex items-center justify-between"
             style="padding:9px 16px;border-top:1px solid #14171e">
          <span style="font-size:10.5px;color:#2e3545;font-style:italic">{{ t.darkSectorNote }}</span>
          <button
            @click="beginnerOpen = false"
            style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;
                   color:#3a4050;background:transparent;border:none;cursor:pointer;
                   padding:4px 8px;flex-shrink:0;margin-left:12px;transition:color 0.15s"
            @mouseenter="(e) => ((e.target as HTMLElement).style.color='#c49a3c')"
            @mouseleave="(e) => ((e.target as HTMLElement).style.color='#3a4050')"
          >
            {{ t.beginnerClose }}
          </button>
        </div>
      </div>
    </Transition>

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

      <!-- Space hint -->
      <Transition name="fade">
        <p v-if="!query" class="text-center mt-2.5"
           style="font-size:11px;color:#1e2530;letter-spacing:0.06em">
          {{ t.spaceHint }}
        </p>
      </Transition>

      <!-- No results -->
      <Transition name="fade">
        <p v-if="query && !results.length" class="text-center mt-3"
           style="font-size:11.5px;color:#3a4050">
          {{ t.noResults }}
        </p>
      </Transition>

      <!-- Results list -->
      <Transition name="fade">
        <div v-if="results.length" class="mt-1.5 overflow-hidden rounded-[10px]"
             style="border:1px solid #1c1f27;background:#0e1016">
          <button
            v-for="(item, i) in results"
            :key="item.name"
            class="flex items-center gap-3 w-full text-left cursor-pointer border-none transition-colors duration-75"
            :style="{
              padding: '10px 14px',
              background: selected?.name === item.name ? 'rgba(196,154,60,0.05)' : 'transparent',
              borderBottom: i < results.length - 1 ? '1px solid #0d0f14' : 'none',
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
    </div>

    <!-- Detail card -->
    <Transition name="fade">
      <div v-if="selected" class="w-full max-w-[640px] mt-3 overflow-hidden rounded-[10px]"
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
               :style="{ padding:'10px 18px', borderTop: i > 0 ? '1px solid #0d0f14' : undefined }">

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
                <span style="font-size:11px;color:#3a4050">{{ src.planet }}</span>
              </div>
              <div v-if="src.note" style="font-size:11.5px;color:#4a5060;margin-top:3px">{{ src.note }}</div>
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
