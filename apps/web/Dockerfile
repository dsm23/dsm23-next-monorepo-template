# syntax=docker.io/docker/dockerfile:1@sha256:2780b5c3bab67f1f76c781860de469442999ed1a0d7992a5efdf2cffc0e3d769

FROM ghcr.io/pnpm/pnpm:11.0.9@sha256:a48f87a9bec3c86956a1bc3165c6498aff076234d0a01e628bca98a0523c2a9a AS base
FROM dhi.io/node:26.1.0-alpine3.23@sha256:89ba306d54a9025da2e7862ff22ae13a95d825a0e459217138242115dfc700a5 AS runtime

# renovate: datasource=docker depName=dhi.io/node
ARG NODE_VERSION="26.1.0"
# renovate: datasource=npm depName=turbo
ARG TURBO_VERSION="2.9.12"

FROM base AS builder

WORKDIR /app

COPY . .

# Generate a partial monorepo with a pruned lockfile for a target workspace.
# Assuming "web" is the name entered in the project's package.json: { name: "web" }
RUN pnpm runtime set node "$NODE_VERSION" -g \
  && pnpm dlx "turbo@$TURBO_VERSION" prune web --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer

WORKDIR /app

ENV LEFTHOOK=0

# First install the dependencies (as they change less often)
COPY --from=builder /app/out/json/ .

RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
  pnpm runtime set node "$NODE_VERSION" -g && pnpm install --frozen-lockfile

# Build the project
COPY --from=builder /app/out/full/ .

RUN pnpm runtime set node "$NODE_VERSION" -g && pnpm run build

FROM runtime

WORKDIR /app

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer /app/apps/web/.next/standalone ./
COPY --from=installer /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=installer /app/apps/web/public ./apps/web/public

EXPOSE 3000

ENV PORT=3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
ENV HOSTNAME="0.0.0.0"
CMD ["node", "apps/web/server.js"]
