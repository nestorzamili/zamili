# syntax=docker/dockerfile:1
FROM --platform=$BUILDPLATFORM node:22-alpine AS builder

RUN corepack enable && corepack prepare pnpm@11.3.0 --activate
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build

FROM --platform=$BUILDPLATFORM alpine:3.22 AS tzdata
RUN apk add --no-cache tzdata

FROM nginx:1.29-alpine

ENV TZ=Asia/Jakarta

COPY --from=tzdata /usr/share/zoneinfo /usr/share/zoneinfo
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
