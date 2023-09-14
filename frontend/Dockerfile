FROM node:lts-slim
LABEL name="frontend"
LABEL version="latest"
WORKDIR /client
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm","run", "dev"]
