FROM node:12.14.1-alpine
RUN mkdir /app
RUN npm install react-scripts -g --silent
COPY album/ /app/
WORKDIR /app
RUN yarn install
EXPOSE 3000