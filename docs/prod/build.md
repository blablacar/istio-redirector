# Build and run

### Build the Next.js app
From the `./front` directory

`npm run build`&& `npm run export`

This will create a static export of the app in `./front/out`

### Build the server
From the `./server` directory

`go build .`
This command will build the server and directly use the front app from `./front/out`.

Once built, you can simply run `./istio-redirector web`

## Build with Docker

- Build the image `docker build -t istio-redirector/my-build .`
- Run the image `docker run -it --rm -p 8080:8080 istio-redirector/my-build`