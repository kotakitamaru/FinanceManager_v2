# syntax=docker/dockerfile:1

# ---------- Builder: installs all deps and builds ----------
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies (use npm ci for clean, reproducible installs)
COPY package*.json ./
RUN npm ci

# Copy sources and build
COPY . .
# Run TSOA build which generates routes/spec and then builds TypeScript
RUN npm run tsoa:build

# ---------- Production deps only ----------
FROM node:20-alpine AS prod-deps
WORKDIR /app

COPY package*.json ./
# Install only production dependencies
RUN npm ci --omit=dev

# ---------- Runner ----------
FROM node:20-alpine AS runner
ENV NODE_ENV=production
WORKDIR /app

# Use a non-root user provided by the Node image
USER node

# Copy production node_modules and built artifacts
COPY --chown=node:node --from=prod-deps /app/node_modules ./node_modules
COPY --chown=node:node --from=builder /app/dist ./dist
COPY --chown=node:node package*.json ./

# Change this if your app listens on a different port
EXPOSE 3000

# Prefer running via your package.json "start" script (recommended)
# Ensure package.json contains: "start": "node dist/index.js" (or your entry file)
CMD ["npm", "start"]