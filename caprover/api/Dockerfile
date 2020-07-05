FROM node:12.18.2-alpine AS builder
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn nx build --prod api

FROM node:12.18.2-alpine
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production
COPY --from=builder /usr/src/app/dist/apps/api/ ./
EXPOSE 3333
CMD ["node", "/usr/src/app/main.js"]
