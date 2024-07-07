# Download the slim version of node

FROM node:20-slim

# Set the work directory to app folder.

RUN mkdir -p /usr/src/app

# We will be copying our code here

WORKDIR /usr/src/app

#Copy package.json file in the node folder inside container
COPY package.json .

# Install the dependencies in the container

RUN npm install

# Copy the rest of the code in the container

COPY . .

# Run the node server with server.js file

CMD ["node", "index.js"]

# Expose the service over PORT 3001

EXPOSE 3001
