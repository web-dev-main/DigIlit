# Stage 1: Build Vite SPA
FROM node:20.17.0-alpine AS builder
WORKDIR /app

# Install root deps (turbo, etc.)
COPY package*.json ./
RUN npm ci

# Copy source
COPY . .

# Build the SPA (Vite)
RUN npm run build:web

# Stage 2: Serve with nginx
FROM nginx:1.27-alpine

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets
COPY --from=builder /app/.scripts/modules/frontend/apps/web/diglit-web/dist /usr/share/nginx/html

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
