FROM node:21-alpine3.18 AS base

WORKDIR /usr/src/app

FROM base AS development

ENV NODE_ENV=development

COPY package*.json ./

RUN npm install

COPY . .
COPY ./src/anti-fraud/nest-cli.json .
COPY ./src/main.antiFraud.ts ./src/main.ts

CMD ["npm", "run", "start"]