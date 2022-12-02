FROM node:18

COPY lib /app/lib
COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock

WORKDIR /app

RUN yarn install --production

EXPOSE 3000

CMD yarn start