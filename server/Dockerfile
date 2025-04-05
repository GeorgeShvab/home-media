FROM node:20-alpine AS builder

WORKDIR /app

COPY ./package.json ./package-lock.json ./
RUN npm i

ENV ALL_MOVIES_LINK=https://yts.mx/api/v2/list_movies.json
ENV MOVIE_LINK=https://yts.mx/api/v2/movie_details.json?with_images=true&with_cast=true
ENV DATABASE_URL=postgresql://home-media-test:1111@postgres_db:5432/home-media-test
ENV STORAGE_PREFIX=/app/storage/persisted
ENV TEMP_STORAGE_PREFIX=/app/storage/temp
ENV DOMAIN=localhost:5000
ENV PORT=5000

COPY . .
RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /app

COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/dist ./dist

RUN npm ci --only=production

EXPOSE 5000

CMD ["node", "dist/src/main.js"]