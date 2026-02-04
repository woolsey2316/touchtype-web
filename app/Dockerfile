# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy root workspace files
COPY ../package.json ../yarn.lock ../tsconfig.base.json ./

# Copy app package files
COPY package*.json ./
COPY yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Set build-time environment variables
ARG API_ORIGIN=/api
ARG APP_ENV=production
ARG APP_NAME=TouchType
ARG APP_ORIGIN
ARG GOOGLE_CLOUD_PROJECT

ENV API_ORIGIN=$API_ORIGIN
ENV APP_ENV=$APP_ENV
ENV APP_NAME=$APP_NAME
ENV APP_ORIGIN=$APP_ORIGIN
ENV GOOGLE_CLOUD_PROJECT=$GOOGLE_CLOUD_PROJECT

# Copy source code
COPY . .

# Build the application
RUN yarn build

# Production stage - serve with nginx
FROM nginx:alpine AS production

# Copy built files
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config for SPA routing
RUN echo 'server { \n\
    listen 80; \n\
    server_name localhost; \n\
    root /usr/share/nginx/html; \n\
    index index.html; \n\
    location / { \n\
        try_files $uri $uri/ /index.html; \n\
    } \n\
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
