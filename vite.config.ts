import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { execSync } from 'child_process'

const lastUpdated = execSync('git log -1 --format=%cd --date=format:%Y-%m-%d').toString().trim()

export default defineConfig({
  base: '/',
  plugins: [vue(), tailwindcss()],
  define: {
    __LAST_UPDATED__: JSON.stringify(lastUpdated),
  },
})
