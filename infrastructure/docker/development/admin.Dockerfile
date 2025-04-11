FROM node:20-alpine AS development

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20-alpine AS production

WORKDIR /app

COPY --from=development /app/dist/apps/frontend/admin ./dist
COPY --from=development /app/node_modules ./node_modules
COPY package*.json ./

ENV NODE_ENV=production

EXPOSE 4300

CMD ["node", "dist/main.js"]
