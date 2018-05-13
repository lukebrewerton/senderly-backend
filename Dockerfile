FROM node:8.11

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

EXPOSE 5000

RUN mkdir -p /usr/src/senderly-api

WORKDIR /usr/src/senderly-api

COPY package.json package-lock.json* ./

RUN npm install && npm cache clean --force

COPY . .

CMD ["npm", "run", "server"]