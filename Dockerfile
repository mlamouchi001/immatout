# syntax=docker/dockerfile:1.7

# ---------- base ----------
FROM node:20-alpine AS base
RUN corepack enable && corepack prepare pnpm@10.26.2 --activate
WORKDIR /app
# OpenSSL needed by Prisma engines on Alpine
RUN apk add --no-cache openssl

# ---------- deps (dev deps included for build) ----------
FROM base AS deps
COPY pnpm-workspace.yaml pnpm-lock.yaml* package.json ./
COPY apps/web/package.json ./apps/web/
COPY packages/calc/package.json ./packages/calc/
COPY packages/data/package.json ./packages/data/
RUN pnpm install --frozen-lockfile || pnpm install

# ---------- build ----------
FROM base AS build
ARG CACHEBUST=2026-04-21-03
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/web/node_modules ./apps/web/node_modules
COPY . .
RUN mkdir -p ./apps/web/public
RUN pnpm --filter @immatout/web exec prisma generate
RUN pnpm --filter @immatout/web build

# ---------- runtime (uses Next standalone output) ----------
FROM base AS runtime
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Standalone Next: copies only the minimal node_modules needed
COPY --from=build /app/apps/web/.next/standalone ./
COPY --from=build /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=build /app/apps/web/public ./apps/web/public

# Prisma: bring the generated client + schema/migrations to run migrate deploy
COPY --from=build /app/node_modules/.pnpm/@prisma+client@6.19.3_prisma@6.19.3_magicast@0.3.5_typescript@5.9.3__typescript@5.9.3/node_modules/.prisma ./node_modules/.prisma
COPY --from=build /app/node_modules/.pnpm/@prisma+client@6.19.3_prisma@6.19.3_magicast@0.3.5_typescript@5.9.3__typescript@5.9.3/node_modules/@prisma ./node_modules/@prisma
COPY --from=build /app/apps/web/prisma ./apps/web/prisma
COPY --from=build /app/apps/web/package.json ./apps/web/package.json

# Prisma CLI for migrate deploy at runtime
RUN npm i -g prisma@6.19.3

EXPOSE 3000

CMD ["sh", "-c", "cd apps/web && prisma migrate deploy && cd /app && node apps/web/server.js"]
