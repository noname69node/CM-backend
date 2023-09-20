FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --loglevel verbose

COPY . ./

# EXPOSE 5000

CMD [ "npm", "run", "dev" ]