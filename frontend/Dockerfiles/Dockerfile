FROM node:20-alpine

WORKDIR /app

COPY frontend .

RUN npm install

RUN npm run build

RUN mkdir public

EXPOSE 3000

RUN chmod u+x entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]