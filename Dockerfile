# Base image
FROM node:20.17.0

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy app source code
COPY . .

# Compile the TypeScript code to JavaScript
RUN npm run build

# Expose port
EXPOSE 3000

# Start the server using the production build
CMD ["npm", "run", "start:prod"]