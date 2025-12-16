FROM node:22-alpine AS deps
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

FROM node:22-alpine AS builder
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm run build

FROM node:22-alpine AS runner
RUN apk add --no-cache curl
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 zamili
WORKDIR /app
COPY --from=builder --chown=zamili:nodejs /app/.output ./.output
COPY --from=builder --chown=zamili:nodejs /app/public ./public
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3443
USER zamili
EXPOSE 3443
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3443/ || exit 1
CMD ["node", ".output/server/index.mjs"]
