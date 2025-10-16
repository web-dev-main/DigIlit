# Cursor Fix Summary

## Overview
Stabilized the repository for Node 20, Vite SPA build, CI, and Netlify-ready deploy. Avoided business logic/UI changes.

## Key Changes
- Updated engines and Node version: `.nvmrc` → `20.17.0`, `package.json.engines.node` → `>=20.17.0`
- Relaxed `.npmrc` engine strict to prevent install blocks
- Root `package.json` scripts aligned to actual app paths in `.scripts/`
  - Added `dev:env`, `build:web`, `preview:web`, `typecheck:web`
  - Switched `build` to build SPA
  - Size-limit paths updated to Vite `dist`
- Simplified root `tsconfig.json`; added app-specific `tsconfig` for Vite SPA
- Added Netlify config (`netlify.toml`) with SPA redirects and Node version
- Added developer ergonomics: `.editorconfig`, `.env.example`
- Added CI: `.github/workflows/ci.yml` (Node 20) installing, typechecking, building, and uploading artifacts
- Containerization: `Dockerfile` (multi-stage) + `nginx.conf` for static hosting
- Deployment docs: `DEPLOY.md`

## Commands to Reproduce
- Install: `npm ci`
- Typecheck: `npm run typecheck`
- Build: `npm run build`
- Preview: `npm run preview`

## Artifacts
- Vite build output: `.scripts/modules/frontend/apps/web/diglit-web/dist`

## Follow-ups
- Consider removing legacy Next app under `.scripts/modules/frontend/apps/web/diglit-quantum` or aligning aliases if you intend to ship it.
- If you need monorepo-scale turborepo tasks, add proper workspaces and project references.
- Ensure backend (Python) is deployed separately or converted to serverless functions if hosting on Netlify.
