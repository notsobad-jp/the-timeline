FROM node:10

# Setting working directory. All the path will be relative to WORKDIR
RUN mkdir /app
WORKDIR /app

# Installing dependencies
COPY ./package.json /app/
COPY ./yarn.lock /app/
RUN yarn install

# Copying source files
COPY . /app/
