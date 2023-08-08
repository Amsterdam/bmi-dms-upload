FROM node:20.5.0-alpine AS builder

RUN apk --no-cache add git

FROM builder AS runner

RUN npm install
