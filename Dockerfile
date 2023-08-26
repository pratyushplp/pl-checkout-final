FROM node:lts-slim
WORKDIR /webapp
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm","run", "dev"]
