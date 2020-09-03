# Build the API image in CI
FROM node:12.18.2-alpine
USER node
WORKDIR /usr/src/app
COPY node_modules/ .
COPY dist/apps/api/ .
EXPOSE 3333
CMD ["node", "/usr/src/app/main.js"]
