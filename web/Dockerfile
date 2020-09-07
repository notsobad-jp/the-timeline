FROM node:10

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /web

# Installing dependencies
COPY package*.json ./
RUN yarn install

# Copying source files
COPY . .

# Building app
# RUN npm run build

# Running the app
# CMD [ "npm", "start" ]
