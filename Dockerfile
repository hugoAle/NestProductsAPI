FROM node:22.13

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build