FROM node:20-alpine AS development

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npx", "nx", "serve", "admin", "--host=0.0.0.0", "--port=4300"]

FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build admin

FROM nginx:alpine AS production

COPY --from=builder /app/dist/apps/frontend/admin /usr/share/nginx/html
COPY infrastructure/docker/development/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
