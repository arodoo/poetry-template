FROM node:20-alpine AS development

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npx", "nx", "serve", "customer", "--host=0.0.0.0"]

FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build customer

FROM nginx:alpine AS production

COPY --from=builder /app/dist/apps/frontend/customer /usr/share/nginx/html
COPY infrastructure/docker/development/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
