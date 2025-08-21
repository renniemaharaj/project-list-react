# Stage 1: Build React app
FROM node:20-alpine as builder

WORKDIR /app
COPY . .

# Install dependencies and build
RUN npm install
RUN npm run build

# Stage 2: Serve with NGINX
FROM nginx:stable-alpine

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy built assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Optional: custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port NGINX serves on
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]