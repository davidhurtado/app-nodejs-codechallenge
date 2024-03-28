FROM node:21-alpine3.18 AS base

WORKDIR /usr/src/app

FROM base AS development

ENV NODE_ENV=development

COPY package*.json ./

RUN npm install

COPY . .
COPY ./src/transactions/nest-cli.json .
COPY ./src/main.transactions.ts ./src/main.ts
RUN ls
EXPOSE 3000 3001

CMD ["npm", "run", "start"]