FROM alpine:3.18.9
RUN apk update && apk upgrade && apk add nodejs npm
WORKDIR /app
ENTRYPOINT [ "npm" ]