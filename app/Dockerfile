# Build stage
FROM node:20-alpine AS builder

# Install build dependencies
RUN apk add --no-cache python3 make g++ git

# Enable Corepack for Yarn 4
RUN corepack enable

WORKDIR /workspace

# Copy root workspace files first
COPY package.json yarn.lock tsconfig.base.json .yarnrc.yml ./
COPY .yarn ./.yarn

# Copy all workspace directories
COPY app ./app
COPY scripts ./scripts
COPY server/package.json ./server/package.json

# Install all workspace dependencies
RUN yarn install

# Set build-time environment variables
ARG API_ORIGIN
ARG APP_ENV=production
ARG APP_NAME=TouchType
ARG APP_ORIGIN
ARG GOOGLE_CLOUD_PROJECT
ARG FIREBASE_APP_ID
ARG FIREBASE_API_KEY
ARG FIREBASE_AUTH_DOMAIN
ARG GA_MEASUREMENT_ID

ENV API_ORIGIN=$API_ORIGIN
ENV APP_ENV=$APP_ENV
ENV APP_NAME=$APP_NAME
ENV APP_ORIGIN=$APP_ORIGIN
ENV GOOGLE_CLOUD_PROJECT=$GOOGLE_CLOUD_PROJECT
ENV FIREBASE_APP_ID=$FIREBASE_APP_ID
ENV FIREBASE_API_KEY=$FIREBASE_API_KEY
ENV FIREBASE_AUTH_DOMAIN=$FIREBASE_AUTH_DOMAIN
ENV GA_MEASUREMENT_ID=$GA_MEASUREMENT_ID

# Build the frontend application
WORKDIR /workspace/app
RUN yarn build

# Production stage - serve with nginx
FROM nginx:alpine AS production

# Copy built files
COPY --from=builder /workspace/app/dist /usr/share/nginx/html

# Copy custom nginx config for SPA routing
RUN printf 'server {\n\
    listen 80;\n\
    server_name localhost;\n\
    root /usr/share/nginx/html;\n\
    index index.html;\n\
    location / {\n\
        try_files $uri $uri/ /index.html;\n\
    }\n\
}\n' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
