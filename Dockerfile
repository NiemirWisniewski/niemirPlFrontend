#stage 1 : compile and build angular codebase
#official node iamge as the base image
FROM node:18-alpine as build

#set working directory
WORKDIR /usr/local/app

#add source code to app
COPY ./ usr/local/app/

# Copy package.json and package-lock.json
COPY package*.json ./

#install dependencies
RUN npm install

#generate build of the aplication
RUN npm run build --omit=dev

#Stage 2: serve app with nginx server

#Use official nginx image
FROM nginx

#copy build output to replace default nginx content
COPY --from=build /usr/local/app/dist/niemir /usr/share/nginx/html

#expose port
EXPOSE 4200
