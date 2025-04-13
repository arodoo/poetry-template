FROM node:20-alpine AS development

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx nx build admin

FROM nginx:alpine AS production

WORKDIR /usr/share/nginx/html

# Copy the built app from the development stage
COPY --from=development /app/dist/apps/frontend/admin .

# Copy nginx configuration
COPY infrastructure/docker/development/admin-nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 4300

CMD ["nginx", "-g", "daemon off;"]
