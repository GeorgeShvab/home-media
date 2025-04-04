FROM node:20 as builder

WORKDIR /usr/src/app

COPY ./package.json ./package-lock.json ./

RUN npm i

COPY . .

RUN npm run build


FROM nginx

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

EXPOSE 3000