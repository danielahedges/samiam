# Monocot

[![Known Vulnerabilities](https://snyk.io/test/github/{username}/{repo}/badge.svg)](https://snyk.io/test/github/{username}/{repo})

Seed project for a MEAN site, with user authentication, testing, material design
look and feel, and CI/CD.

## Installation Instructions

There are two ways to run the application:

1. "Run Local", where the database and app are both served from your local
   machine
1. "Containers", where the app is deployed in a Docker container, connected to a
   separate database container. Both containers run on your machine.

### Run Local

1. Install [Git](https://git-scm.com/downloads)
1. Download this repo.
1. Install [Node](https://nodejs.org/en/download/), at least version 10.1.
1. Install [MongoDB](https://docs.mongodb.com/manual/installation/)
1. Run a local database instance from a terminal: `mongod`
1. Clone this repository, and cd into the directory.
1. `npm install`
1. `npm run build`
1. `npm start`
1. Open a browser to http://localhost:3000/.

### Containers

For a container deployment, you do not even need to install node on your
machine. The web server will be deployed onto a docker container image that
already has node installed.

1. Install [Git](https://git-scm.com/downloads)
1. Download this repo.
1. Install [Docker](https://docs.docker.com/install/)
1. `docker image build -t monocot .`
1. `docker-compose up -d staging-deps`
1. Open a browser to http://localhost:3000/.
1. To shut down, `docker-compose down`
