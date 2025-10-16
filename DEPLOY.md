## DigLit Frontend - Deploy Guide

### Detected stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Package manager: npm (packageManager set to npm@10)

### Commands
- Dev: `npm run dev`
- Build: `npm run build`
- Preview: `npm run preview` (alias of `next start -p 3000`)

### Output
- Next.js build artifacts: `.next/`

### Environment variables
- Copy `.env.example` to `.env.local` or set environment variables in your platform.
- Required:
  - `NEXT_PUBLIC_API_URL`
  - Optional: `OPENAI_API_KEY`, `STRIPE_SECRET_KEY`

### Local development
```bash
npm install
npm run dev
# open http://localhost:3000
```

### Production build & preview
```bash
npm ci
npm run build
npm run preview # http://localhost:3000
```

### Docker (static Next server)
```Dockerfile
# ./Dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
ENV NODE_ENV=production
WORKDIR /app
COPY --from=builder /app/package*.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["npx", "next", "start", "-p", "3000"]
```

Build and run:
```bash
docker build -t diglit-frontend .
docker run -p 3000:3000 diglit-frontend
```

### CI
- Minimal CI at `.github/workflows/ci.yml`:
  - install -> lint -> typecheck -> build

### Notes
- Only the landing page (`/`) is enabled. Add routes under `app/` as needed.
