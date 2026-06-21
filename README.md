# Helios

A fast farming guide for Warframe. Type what you need, see where to get it.

Live at **[helios.tiltann.dev](https://helios.tiltann.dev)**

## What it does

Search any resource, warframe, mod, relic or prime part and get ranked farm locations with planet chips, mission types and tips. Includes a beginner glossary for players new to the game's terminology. Works in 10 languages and auto-detects your browser's locale.

No backend, no account, no tracking. Just a static page.

## Stack

| | |
|---|---|
| Vue 3 | UI |
| TypeScript | Types |
| Vite 8 | Build |
| Tailwind CSS v4 | Styling |
| Fuse.js | Fuzzy search |

Images pulled at runtime from [warframestat.us](https://warframestat.us/).

## Running locally

Requires Node.js 18+.

```bash
git clone https://github.com/Tiltann/Helios.git
cd Helios
npm install
npm run dev
```

Opens at `http://localhost:5173`.

## Building

```bash
npm run build
```

Output lands in `dist/`. Use `npm run preview` to serve it locally.

## Deploying your own fork

Pushes to `master` deploy automatically via GitHub Actions to `gh-pages`. To set up your own:

1. Go to repo Settings, Pages, set source to the `gh-pages` branch
2. Add a CNAME record pointing to `<your-username>.github.io`
3. Update `public/CNAME` with your domain

## Adding items

All data lives in `src/data.ts`. Each item looks like this:

```typescript
{
  name: 'Item Name',
  category: 'resource' | 'warframe' | 'mod' | 'prime' | 'relic',
  imageName: 'itemName.png',
  sources: [
    { mission: 'Mission', planet: 'Planet', type: 'Type', note: 'Optional tip', rank: 1 },
  ],
}
```

Open a PR with your changes. Run `npm run dev` first to make sure nothing's broken.

## License

MIT. Not affiliated with Digital Extremes Ltd.
