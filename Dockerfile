# syntax=docker/dockerfile:1.7

# ---------- base ----------
FROM node:20-alpine AS base
RUN corepack enable && corepack prepare pnpm@10.26.2 --activate
WORKDIR /app

# ---------- deps ----------
FROM base AS deps
COPY pnpm-workspace.yaml pnpm-lock.yaml* package.json ./
COPY apps/web/package.json ./apps/web/
COPY packages/calc/package.json ./packages/calc/
COPY packages/data/package.json ./packages/data/
RUN pnpm install --frozen-lockfile || pnpm install

# ---------- build ----------
FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/web/node_modules ./apps/web/node_modules
COPY . .
RUN pnpm --filter @immatout/web exec prisma generate
RUN pnpm --filter @immatout/web build

# ---------- runtime ----------
FROM node:20-alpine AS runtime
RUN corepack enable && corepack prepare pnpm@10.26.2 --activate
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/apps/web/.next ./apps/web/.next
COPY --from=build /app/apps/web/public ./apps/web/public
COPY --from=build /app/apps/web/package.json ./apps/web/
COPY --from=build /app/apps/web/prisma ./apps/web/prisma
COPY --from=build /app/apps/web/next.config.mjs ./apps/web/
COPY --from=build /app/packages ./packages
COPY --from=build /app/package.json /app/pnpm-workspace.yaml ./

EXPOSE 3000
CMD ["pnpm", "--filter", "@immatout/web", "start"]
