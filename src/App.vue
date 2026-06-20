<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import Fuse from 'fuse.js'
import { ITEMS, type Item } from './data'

const fuse = new Fuse(ITEMS, { keys: ['name', 'category'], threshold: 0.35 })

const query    = ref('')
const results  = ref<Item[]>([])
const selected = ref<Item | null>(null)
const cursor   = ref(0)
const input    = ref<HTMLInputElement | null>(null)

const CATEGORY_LABEL: Record<string, string> = {
  resource: 'Resource', prime: 'Prime', warframe: 'Warframe', mod: 'Mod',
}
const CATEGORY_COLOR: Record<string, string> = {
  resource: '#5284e0', prime: '#c49a3c', warframe: '#52c27a', mod: '#c47a3c',
}

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
  }
}

function spaceToFocus(e: KeyboardEvent) {
  if (e.key === ' ' && document.activeElement !== input.value) {
    e.preventDefault()
    input.value?.focus()
  }
}

onMounted(() => {
  input.value?.focus()
  window.addEventListener('keydown', spaceToFocus)
})
onUnmounted(() => window.removeEventListener('keydown', spaceToFocus))

const hasBorder = computed(() => !!query.value)
</script>

<template>
  <div class="min-h-screen flex flex-col items-center px-4" style="background:#07090f">

    <!-- Header -->
    <div class="mt-[12vh] mb-8 text-center">
      <div class="flex items-center justify-center gap-2.5 mb-1.5">
        <span class="w-2 h-2 rounded-full" style="background:#c49a3c;box-shadow:0 0 8px #c49a3c88"/>
        <span style="font-size:11px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:#c49a3c">
          Helios
        </span>
        <span class="w-2 h-2 rounded-full" style="background:#c49a3c;box-shadow:0 0 8px #c49a3c88"/>
      </div>
      <p style="font-size:12px;color:#3a4050;letter-spacing:0.08em">Warframe · Where to Farm</p>
    </div>

    <!-- Search -->
    <div class="w-full max-w-[640px]">
      <div class="relative transition-all duration-200 rounded-[10px]"
           :style="{
             border: `1px solid ${hasBorder ? '#c49a3c55' : '#1c1f27'}`,
             background: '#0e1016',
             boxShadow: hasBorder ? '0 0 0 3px rgba(196,154,60,0.05)' : undefined,
           }">
        <!-- Search icon -->
        <svg class="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-30"
             width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#c49a3c" stroke-width="1.6">
          <circle cx="7" cy="7" r="5"/><path d="M11 11l3 3"/>
        </svg>

        <input
          ref="input"
          v-model="query"
          @input="search"
          @keydown="onKey"
          placeholder="Search resource, warframe, item…"
          class="w-full bg-transparent border-none outline-none"
          style="padding:15px 44px;font-size:15.5px;color:#d4c4a0;font-family:inherit"
        />

        <button v-if="query" @click="query='';search()"
          class="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer border-none bg-transparent"
          style="color:#3a4050;font-size:20px;line-height:1;padding:4px">×</button>
      </div>

      <!-- Hint -->
      <p v-if="!query" class="text-center mt-2.5" style="font-size:11px;color:#1e2530;letter-spacing:0.06em">
        Press
        <kbd style="padding:1px 5px;border-radius:3px;background:#0e1016;border:1px solid #1c1f27;color:#2a3040;font-family:monospace;font-size:10px">
          Space
        </kbd>
        anywhere to focus
      </p>

      <!-- Results -->
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
          <img v-if="item.image" :src="item.image" alt=""
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
          }">{{ CATEGORY_LABEL[item.category] }}</span>
        </button>
      </div>
    </div>

    <!-- Detail card -->
    <div v-if="selected" class="w-full max-w-[640px] mt-3 overflow-hidden rounded-[10px]"
         style="border:1px solid #1c1f27;background:#0e1016">

      <!-- Card header -->
      <div class="flex items-center gap-3.5" style="padding:14px 18px;border-bottom:1px solid #14171e;background:rgba(196,154,60,0.025)">
        <img v-if="selected.image" :src="selected.image" alt=""
             class="object-contain opacity-90"
             style="width:38px;height:38px"
             @error="(e) => (e.target as HTMLImageElement).style.display='none'"/>
        <div>
          <div style="font-size:15.5px;font-weight:600;color:#d4c4a0">{{ selected.name }}</div>
          <div style="font-size:10.5px;color:#5a6070;margin-top:2px;text-transform:uppercase;letter-spacing:0.08em">
            {{ CATEGORY_LABEL[selected.category] }}
            <template v-if="selected.ducats"> · {{ selected.ducats }} Ducats</template>
          </div>
        </div>
      </div>

      <!-- Sources -->
      <div>
        <div style="padding:10px 18px 6px;font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:#2a3040">
          Best Farm Locations
        </div>

        <div v-for="(src, i) in selected.sources" :key="i"
             class="flex items-start gap-3"
             :style="{ padding:'10px 18px', borderTop: i > 0 ? '1px solid #0d0f14' : undefined }">

          <!-- Rank bubble -->
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
              <span style="font-size:9px;font-weight:600;text-transform:uppercase;letter-spacing:0.07em;padding:2px 6px;border-radius:3px;color:#5284e0;background:rgba(82,132,224,0.1);border:1px solid rgba(82,132,224,0.18)">
                {{ src.type }}
              </span>
              <span style="font-size:11px;color:#3a4050">{{ src.planet }}</span>
            </div>
            <div v-if="src.note" style="font-size:11.5px;color:#4a5060;margin-top:3px">{{ src.note }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="mt-auto pt-12 pb-6 text-center" style="font-size:10.5px;color:#1e2530">
      Data from warframestat.us · Not affiliated with Digital Extremes Ltd. · WIP
    </div>
  </div>
</template>
