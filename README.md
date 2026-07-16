# YARAW

YARAW is a browser-based tool for reviewing Minecraft Speedrunning Ranked match statistics and deterministic ranked seed information.

It is based on [xFray's RAT-JS](https://github.com/NotE4sy/Ranked-Analysis-Tool) and extends the original project with an updated interface and additional tools.

## Features

- Better design
- Season picker
- Seed info for barters, blaze rods, flint, and eyes
- Updated 3D skin provider using `render.crafty.gg`
- Ranked, casual, private, and versus match analysis
- Elo display with rank icons

## Run Locally

The site uses vanilla HTML, CSS, and JavaScript and has no runtime dependencies.

```bash
npx serve . --single
```

Then open the local URL printed by `serve`.

## Build

```bash
npm run build
```

The production site is written to `dist/`. The build includes only the web application and its required assets; local reference sources such as `mc_src/` are excluded.

## Deployment

The included `vercel.json` builds and deploys `dist/`, with a filesystem-first fallback to `index.html` for player and versus routes.

## Credits

- Original RAT-JS project by xFray
- Minecraft textures are used for the Seed Info item previews
