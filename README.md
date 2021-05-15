## Description

Date Night backend implementation using Nest.js

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Setup database

```bash
# download postgres:13.2-alpine image
# set password=postgres and port=5432
# run a container from the image as pd-docker
$ docker run --name pg-docker -e POSTGRES_PASSWORD=postgres -d -p 5432:5432 postgres:13.2-alpine

# bash login into the container
$ docker exec -it pg-docker bash

# login into psql with user=postgres
$ psql -U postgres

# list databases
$ \l

# create a database
$ CREATE DATABASE date_night_dev;

# logout from psql and bash
$ \q
$ exit

# run migrations
$ npx knex migrate:latest # <- this creates (re-creates if already exists) users table in date_night_dev database

# run seeds
$ npx knex seed:run # <- this inserts (re-inserts if already exists) test data into users table

# list running containers
$ docker ps

# start/stop a container
$ docker start pg-docker
$ docker stop pg-docker
```
