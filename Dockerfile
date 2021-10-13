# Build the front app
FROM node:16.10 as front

# Create app directory
RUN mkdir -p /usr/src/front
WORKDIR /usr/src/front

# Installing dependencies
COPY front/package*.json /usr/src/front/
RUN npm install

# Copying source files
COPY front /usr/src/front

# Building app
RUN npm run build

# Export the app to /usr/src/front/out
RUN npm run export



# Build the server
FROM golang:1.17 as server

RUN mkdir -p /usr/src/server
WORKDIR /usr/src/server

# First download dependencies (to benefit from docker cache)
COPY server/go.mod /usr/src/server
COPY server/go.sum /usr/src/server
RUN go mod download

# Then build the app
COPY server .
ENV CGO_ENABLED=0

RUN go build -o ./app

# Copy the binary into base image
FROM gcr.io/distroless/base

COPY --from=front /usr/src/front/out ../front/out
COPY --from=server /usr/src/server/app .
COPY --from=server /usr/src/server/config_example.yaml .
COPY --from=server /usr/src/server/templates/ ./templates

EXPOSE 8080
CMD ["/app", "web"]

LABEL name="istio-redirector"
LABEL version_auto_semver="true"
