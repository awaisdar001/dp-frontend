FROM node:12

WORKDIR /app/

# Install dependencies

RUN npm install

# Add rest of the client code
COPY . /app/

EXPOSE 3000

# CMD npm start