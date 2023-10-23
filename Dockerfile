FROM --platform=$BUILDPLATFORM node:18-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app
COPY package.json ./
COPY . .

FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

# Run Phase
FROM base
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/build/ /app
EXPOSE 8080
CMD [ "node", "server.js" ]