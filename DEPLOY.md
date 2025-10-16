# DigLit Frontend Deploy Guide

## Overview
- Stack: Next.js 14 (App Router) + TypeScript
- Node: 18+

## Commands
- Dev: `npm run dev`
- Build: `npm run build`
- Preview: `npm run preview`
- Lint: `npm run lint`
- Typecheck: `npm run typecheck`

## Local Development
1. Copy `.env.example` to `.env.local` and set any needed values.
2. Install deps: `npm install`
3. Run dev server: `npm run dev` (http://localhost:3000)

## Production Build
1. `npm run build`
2. `npm run preview` (http://localhost:3000)

## Docker (optional)
```bash
# Build image
docker build -t diglit-frontend .
# Run container
docker run -p 3000:3000 --env-file .env.production diglit-frontend
```

## Static Output
The app is server-rendered by default. For static export, add suitable `export` config and ensure no server-only features are used.

## Artifacts
- Build output: `.next/`
- Static assets: `public/`

## Deployment Targets
- Vercel: push to main; Vercel detects Next.js and builds.
- Any Node host: run `npm run build` then `npm run start`.
