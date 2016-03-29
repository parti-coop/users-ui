FROM node:5.6-slim

ENV NODE_ENV production

COPY package.json /parti/users-ui/package.json

WORKDIR /parti/users-ui

RUN npm install

COPY . /parti/users-ui

EXPOSE 8080

CMD npm run start-prod
