## Deployment Guide

### Stack
- Frontend: Vite React SPA at `.scripts/modules/frontend/apps/web/diglit-web`
- Node version: 20.17.0 (see `.nvmrc`)
- Package manager: npm (npm@10)

### Local development
- Install Node via nvm: `nvm install 20.17.0 && nvm use`
- Install deps: `npm ci`
- Dev server (SPA): `npm run dev:web`
- API (if used): `.scripts/modules/backend` with Python/uvicorn (optional)
- Express health (local only): `npm start` then open `http://localhost:3000`

### Type checking
- SPA: `npm run typecheck`

### Build
- SPA: `npm run build` (outputs to `.scripts/modules/frontend/apps/web/diglit-web/dist`)
- Preview static build: `npm run preview`

### Netlify
- Config: `netlify.toml`
- Base: `.scripts/modules/frontend/apps/web/diglit-web`
- Publish directory: `dist`
- Build command: `npm ci && npm run build`
- Redirects: SPA fallback to `/index.html`

### Vercel (optional)
- Import the project, set framework to **Other** (static site)
- Build command: `npm ci && npm run build:web`
- Output directory: `.scripts/modules/frontend/apps/web/diglit-web/dist`

### Docker
- Build image: `docker build -t diglit-web .`
- Run: `docker run --rm -p 8080:8080 diglit-web`
- Open: `http://localhost:8080`

### CI
- GitHub Actions workflow at `.github/workflows/ci.yml` runs install → typecheck → build and uploads artifact.

### Environment
- Copy `.env.example` to `.env` locally if needed. Do not commit secrets.
