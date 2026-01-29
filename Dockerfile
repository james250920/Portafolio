# Multi-stage build for Quasar application

# Stage 1: Build the application
FROM node:20-alpine AS build

WORKDIR /app

# Copy all source files first (quasar prepare needs quasar.config.ts)
COPY . .

# Install dependencies
RUN npm ci --legacy-peer-deps

# Build the application for production
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

# Copy built files from build stage
COPY --from=build /app/dist/spa /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 5181
EXPOSE 5181

# Start nginx
CMD ["nginx", "-g", "daemon off;"]