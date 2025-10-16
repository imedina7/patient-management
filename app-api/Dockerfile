FROM node:22

# Set the working directory in the container
WORKDIR /app

COPY ./package.json /app
COPY ./yarn.lock /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install dependencies and build app
RUN yarn install
RUN yarn run build

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Run app.js when the container launches
CMD [ "yarn", "run", "start:prod" ]