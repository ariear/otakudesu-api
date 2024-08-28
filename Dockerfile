FROM oven/bun:latest AS base

WORKDIR /app

COPY package.json bun.lockb ./
COPY tsconfig.json ./
COPY src ./src

RUN bun install

EXPOSE 3000/tcp

CMD ["bun", "run", "dev"]
