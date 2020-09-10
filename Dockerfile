FROM alpine:3.10 AS builder
ENV NODE_VERSION 14.9.0
RUN apk add --update nodejs npm
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app
COPY package-lock.json /app
RUN npm install --silent
RUN npm install react-scripts cross-env -g --silent
COPY . /app
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
RUN rm -f /etc/nginx/conf.d/default.conf
COPY /nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]