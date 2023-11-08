# Build Phase
FROM --platform=$BUILDPLATFORM node:18-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app
COPY package.json ./
COPY . .
RUN pnpm install --prod --frozen-lockfile
EXPOSE 8000
CMD [ "node", "src/server.js" ]
