FROM node:16
WORKDIR /app
ADD package.json /app/package.json
RUN npm install
ADD . /app
EXPOSE 8080
CMD ["npm", "run", "start"]