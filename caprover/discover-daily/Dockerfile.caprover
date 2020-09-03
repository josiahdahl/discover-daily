FROM node:12.18.1-alpine AS builder
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install --force-lockfile
COPY . .
RUN yarn nx build --prod discover-daily

FROM socialengine/nginx-spa:latest
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/dist/apps/discover-daily /app
