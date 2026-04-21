# syntax=docker/dockerfile:1.7

# ---------- base ----------
FROM node:20-alpine AS base
RUN corepack enable && corepack prepare pnpm@10.26.2 --activate
WORKDIR /app
ENV NODE_ENV=production
# OpenSSL needed by Prisma engines on Alpine
RUN apk add --no-cache openssl

# ---------- deps ----------
FROM base AS deps
ENV NODE_ENV=development
COPY pnpm-workspace.yaml pnpm-lock.yaml* package.json ./
COPY apps/web/package.json ./apps/web/
COPY packages/calc/package.json ./packages/calc/
COPY packages/data/package.json ./packages/data/
RUN pnpm install --frozen-lockfile || pnpm install

# ---------- build ----------
FROM base AS build
ENV NODE_ENV=production
# Cache-bust: bump this to force a full rebuild
ARG CACHEBUST=2026-04-21-02
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/web/node_modules ./apps/web/node_modules
COPY . .
# Ensure public dir exists (Next copies it even if empty)
RUN mkdir -p ./apps/web/public
RUN pnpm --filter @immatout/web exec prisma generate
RUN pnpm --filter @immatout/web build

# ---------- runtime ----------
FROM base AS runtime
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/apps/web/.next ./apps/web/.next
COPY --from=build /app/apps/web/public ./apps/web/public
COPY --from=build /app/apps/web/package.json ./apps/web/
COPY --from=build /app/apps/web/prisma ./apps/web/prisma
COPY --from=build /app/apps/web/next.config.mjs ./apps/web/
COPY --from=build /app/packages ./packages
COPY --from=build /app/package.json /app/pnpm-workspace.yaml ./

EXPOSE 3000
# Prisma migrate deploy + seed + start Next
CMD ["sh", "-c", "pnpm --filter @immatout/web exec prisma migrate deploy && pnpm --filter @immatout/web exec tsx prisma/seed.ts && pnpm --filter @immatout/web start"]
