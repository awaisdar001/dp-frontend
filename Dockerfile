FROM node:16

WORKDIR /app/

# Install dependencies

# Add rest of the client code
COPY . /app/

RUN npm install



EXPOSE 3000

# CMD npm start