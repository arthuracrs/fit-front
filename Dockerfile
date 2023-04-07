FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy app source code to the working directory
COPY . .

# Expose port 3002
EXPOSE 3002

# Start the app
CMD ["npm", "run", "dev"]
