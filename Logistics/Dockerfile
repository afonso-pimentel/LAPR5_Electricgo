# syntax=docker/dockerfile:1

FROM node:18.11.0
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production
RUN npm install -g nodemon

COPY . .

CMD [ "nodemon", "" ]
