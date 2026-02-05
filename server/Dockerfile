# Build stage
FROM node:20-alpine AS builder

# Install build dependencies
RUN apk add --no-cache python3 make g++ git

# Enable Corepack for Yarn 4
RUN corepack enable

WORKDIR /workspace

# Copy root workspace files
COPY package.json yarn.lock tsconfig.base.json .yarnrc.yml ./
COPY .yarn ./.yarn

# Copy workspace directories
COPY scripts ./scripts
COPY app/package.json ./app/package.json
COPY server ./server

# Install all workspace dependencies
RUN yarn install

# Build the backend
WORKDIR /workspace/server
RUN yarn build

# Production stage
FROM node:20-alpine AS production

# Enable Corepack for Yarn 4
RUN corepack enable

WORKDIR /app

# Copy package files for production install
COPY --from=builder /workspace/package.json /workspace/yarn.lock /workspace/tsconfig.base.json /workspace/.yarnrc.yml ./
COPY --from=builder /workspace/.yarn ./.yarn
COPY --from=builder /workspace/server/package.json ./server/package.json
COPY --from=builder /workspace/scripts/package.json ./scripts/package.json  
COPY --from=builder /workspace/app/package.json ./app/package.json

# Install production dependencies
RUN yarn workspaces focus server --production

# Copy built files and necessary runtime files
COPY --from=builder /workspace/server/dist ./server/dist
COPY --from=builder /workspace/server/swagger.yaml ./server/swagger.yaml

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Change ownership
RUN chown -R nodejs:nodejs /app

# Create logs directory
RUN mkdir -p /app/logs && chown -R nodejs:nodejs /app/logs

USER nodejs

WORKDIR /app/server

EXPOSE 3000

ENV NODE_ENV=production

CMD ["node", "dist/server.js"]
