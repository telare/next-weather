FROM node

WORKDIR /app

COPY package*.json .

RUN npm install

# overrides the package*.json files 
COPY . .

EXPOSE 3000

CMD [ "npm","run","dev" ]