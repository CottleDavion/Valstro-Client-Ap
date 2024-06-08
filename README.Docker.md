### Building and running your application

This application can be built and run using docker.

build:
`docker build -t client:local .`

run: (network host is needed for url localhost)
`docker run --rm -it --network="host" client:local`

This docker build and application can be upgraded to utilize environment variables to remove the need for host being specified
The application currently only works with the server running on localhost:3000