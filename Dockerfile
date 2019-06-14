FROM node:8
WORKDIR /app
COPY package.json /app
COPY package-lock.json /app
COPY ./scripts /app
COPY ./config /app
RUN npm install
COPY . /app
RUN npm run build
CMD PORT=3010 node server/server.js
EXPOSE 3010
