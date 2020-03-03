FROM node:10

# Create app directory
WORKDIR /usr/src/app

# Copy config
COPY package*.json ./

# Install app dependencies
RUN npm install
RUN npm install -g gulp

# Copy sources
COPY . .

EXPOSE 8080

CMD [ "gulp" ]