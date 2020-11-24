FROM alpine:3.10 AS builder
ENV NODE_VERSION 14.9.0

RUN apk add --update nodejs npm && apk upgrade && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories && \
    apk add --no-cache \
        chromium@edge \
        nss@edge

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app
COPY package-lock.json /app
COPY . /app

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
RUN npm install puppeteer@0.11.0

RUN addgroup -S pptruser && adduser -S -g pptruser pptruser \
    && mkdir -p /home/pptruser/Downloads \
    && chown -R pptruser:pptruser /home/pptruser \
    && chown -R pptruser:pptruser /app

USER pptruser

RUN npm install --silent
RUN npm install react-scripts cross-env -g --silent
RUN npm run build
COPY . /app

FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
RUN rm -f /etc/nginx/conf.d/default.conf
COPY /nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]