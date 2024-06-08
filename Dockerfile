# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.12.1

FROM node:${NODE_VERSION}-alpine as base


FROM node:${NODE_VERSION} as deps
WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./
RUN npm install

FROM deps as build

COPY . .
RUN npm run build

FROM base as final

ENV NODE_ENV production

USER node

COPY package.json .

COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist

CMD npm start
