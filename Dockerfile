FROM mhart/alpine-node:10.16 as build

# copy the app
WORKDIR /usr/src/app
COPY . /usr/src/app/

# define used arguments
ARG STAGE

# install node modules
RUN npm i

# build the app
RUN npm run build

# drop node modules after build
RUN rm -rf ./node_modules

# use nginx to build the second stage
FROM nginx:1.13.12-alpine

# copy default nginx configuration and replace args with the values via envsubst
COPY --from=build /usr/src/app/nginx/default.conf /data/conf/nginx.conf

# copy static files
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# run the nginx
CMD ["nginx", "-c", "/data/conf/nginx.conf", "-g", "daemon off;"]
EXPOSE 80
