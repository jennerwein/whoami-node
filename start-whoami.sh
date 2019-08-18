#!/bin/sh

# Clean up
docker container stop whoami
docker container rm whoami

# Build Image
docker build -t jennerwein/whoami .

# Start whoami
docker run -p 7777:8080 --name whoami --restart=always -d jennerwein/whoami


