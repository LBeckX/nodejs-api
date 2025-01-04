FROM node:20-alpine as build
USER node:node
WORKDIR /app
COPY --chown=node:node . .
RUN npm install
RUN npm run build

# Runner service
FROM node:20-alpine as runner
USER root:root
WORKDIR /app

COPY --from=build --chown=root:root /app/dist ./dist
COPY --from=build --chown=root:root /app/emails ./emails
COPY --chown=root:root package*.json .

RUN npm install --only=prod

EXPOSE 3001

CMD [ "npm", "run", "start" ]