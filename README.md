# Helios — Warframe Farm Guide

> Fast, searchable farming guide for Warframe. Find where to farm any resource, Warframe, mod, or Prime part — in your language.

Live at **[helios.tiltann.dev](https://helios.tiltann.dev)**

## Features

- Fuzzy search across 60+ items (Fuse.js)
- Browse by category — Resources, Warframes, Mods, Prime
- Ranked farming sources with planet chips and mission type badges
- Beginner's Guide modal explaining Warframe terminology
- Color-coded planet indicators in source cards
- Fully static — no backend, no account, no tracking
- 10 languages: EN, DE, FR, ES, IT, PL, PT, RU, KO, ZH (auto-detected from browser)
- Keyboard navigable: arrow keys, Space to focus search, Escape to clear

## Tech Stack

| Tool | Purpose |
|---|---|
| Vue 3 (Composition API) | UI framework, single-file component |
| TypeScript | Type safety |
| Vite 8 | Build tool and dev server |
| Tailwind CSS v4 | Utility-class styling |
| Fuse.js | Fuzzy search |

Item images are fetched at runtime from [warframestat.us](https://warframestat.us/) — no backend required.

## Getting Started

**Prerequisites:** Node.js 18+, npm

```bash
git clone https://github.com/Appercy/Helios.git
cd Helios
npm install
npm run dev
```

The dev server starts at `http://localhost:5173`.

## Build

```bash
npm run build
```

Output goes to `dist/`. Preview locally with `npm run preview`.

## Deployment

The app deploys automatically to [helios.tiltann.dev](https://helios.tiltann.dev) via GitHub Actions on every push to `master`. The workflow builds the app and pushes `dist/` to the `gh-pages` branch.

**To deploy your own fork:**
1. Enable GitHub Pages in repo Settings → Pages → Source: `gh-pages` branch
2. Add a CNAME record in your DNS: `helios` → `<your-username>.github.io`
3. Update `public/CNAME` with your domain
4. Push to `master` — the Actions workflow handles the rest

## Contributing

Data corrections and new items are welcome. Edit `src/data.ts` — each item follows this shape:

```typescript
{
  name: 'Item Name',
  category: 'resource' | 'warframe' | 'mod' | 'prime',
  imageName: 'itemName.png',   // CDN filename from warframestat.us
  sources: [
    { mission: 'Mission', planet: 'Planet', type: 'Type', note: 'Optional tip', rank: 1 },
  ],
}
```

Open a PR with your changes. Verify the app runs with `npm run dev` before submitting.

## License

MIT

---

*Not affiliated with Digital Extremes Ltd. Warframe is a trademark of Digital Extremes.*
