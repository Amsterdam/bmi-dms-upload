FROM node:14.16.1-alpine AS builder

RUN apk --no-cache add git

FROM builder AS runner

RUN npm install
