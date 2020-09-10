FROM node:10

# Setting working directory. All the path will be relative to WORKDIR
RUN mkdir /web
WORKDIR /web

# Installing dependencies
COPY ./package.json /web/
COPY ./yarn.lock /web/
RUN PUPPETEER_PRODUCT=chrome yarn install

# Copying source files
COPY . /web/
