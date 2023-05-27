FROM node:20 as build
WORKDIR /usr/local/app
COPY package*.json .
RUN npm ci --silent
COPY . .
RUN npm run build

FROM nginx:latest
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/local/app/dist/card-game /usr/share/nginx/html
EXPOSE 80