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
COPY --from=deps /app/packages/calc/node_modules ./packages/calc/node_modules
COPY --from=deps /app/packages/data/node_modules ./packages/data/node_modules
COPY . .
RUN mkdir -p ./apps/web/public
RUN pnpm --filter @immatout/web exec prisma generate
RUN pnpm --filter @immatout/web build
# Compile the catalog seeder to a single CJS bundle for the runtime stage.
RUN pnpm --filter @immatout/web build:seed-catalog

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

# Bring the compiled seed script to the runtime image.
COPY --from=build /app/apps/web/dist/seed-catalog.cjs ./seed-catalog.cjs

# Bring data-fix SQL scripts (idempotent maintenance scripts that run at boot
# alongside prisma migrate deploy — used for one-shot data consolidations
# that can't be expressed in a Prisma migration).
COPY --from=build /app/apps/web/prisma/migrations ./apps/web/prisma/migrations

# Prisma CLI for migrate deploy at runtime, plus psql client for data-fix scripts.
RUN npm i -g prisma@6.19.3 && apt-get update && apt-get install -y --no-install-recommends postgresql-client && rm -rf /var/lib/apt/lists/*

EXPOSE 3000

# Boot sequence:
#   1. Apply any pending Prisma migrations.
#   2. Run idempotent data-fix SQL scripts (consolidations that can't be
#      Prisma migrations because they depend on EEA seed output).
#   3. Seed / refresh the ADEME catalog rows (6s, idempotent).
#   4. EEA seed is skipped unless CATALOG_SEED_EEA=1 is set — it's heavier
#      (~30s + 13k upserts) and the catalog works fine with just ADEME.
#   5. Start the Next.js standalone server.
CMD ["sh", "-c", "cd apps/web && prisma migrate deploy && cd /app && for f in apps/web/prisma/migrations/2026-*/script.sql; do [ -f \"$f\" ] && echo \"[data-fix] running $f\" && psql \"$DATABASE_URL\" -f \"$f\"; done && node seed-catalog.cjs ademe && if [ \"$CATALOG_SEED_EEA\" = \"1\" ]; then node seed-catalog.cjs eea; fi && node apps/web/server.js"]
