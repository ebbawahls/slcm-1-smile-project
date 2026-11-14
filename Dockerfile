#------Build

FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY frontend ./frontend
RUN npm run build

#------Kör

FROM node:22-alpine

ENV NODE_ENV=production

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY backend ./backend
COPY --from=builder /app/frontend/dist ./frontend/dist

USER node

EXPOSE 3000

CMD [ "node", "backend/server/server.js" ]
