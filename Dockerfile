FROM node:alpine AS stub
ARG ENV
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm ci
COPY . .
RUN export NODE_OPTIONS=--openssl-legacy-provider && npm run build --prod

# stage 2

FROM nginx
ARG ENV
COPY --from=stub /app/dist/SampleAngular /usr/share/nginx/html
COPY /nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80