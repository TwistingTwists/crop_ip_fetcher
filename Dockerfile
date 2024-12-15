# syntax=docker/dockerfile:1

FROM oven/bun:alpine as builder

WORKDIR /app

COPY package*.json ./
RUN bun install

COPY . .

RUN bun run build

FROM oven/bun:alpine

WORKDIR /app
RUN apk add  --no-cache  curl

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["bun", "start"]