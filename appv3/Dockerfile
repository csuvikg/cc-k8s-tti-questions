FROM node:21.6.0-alpine3.19

WORKDIR /app

RUN npm install express

COPY app.js .

CMD [ "node", "app.js" ]

EXPOSE 3000
