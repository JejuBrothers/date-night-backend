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

## Fork & Pull Request Workflow

We follow the Fork & Pull Request Workflow to create PR to avoid updating this repository accidentally

```bash
# Fork into your github account by clicking the Fork button (at the top-right corner).

# Clone your forked repository, [your_github_account]/date-night-backend

# Set JejuBrothers/date-night-backend as upstream
$ git remote add upstream https://github.com/JejuBrothers/date-night-backend.git

 # list remote repositories with fetch and push urls
$ git remote -v

# Set the push url as irrelevant (in this case, no-push)
# So, we can avoid updating upstream accidentally
$ git remote set-url --push upstream no-push

# Always pull from upstream before creating branch

$ git pull upstream main
$ git checkout -b [branch_name]

# Push your branch into your forked repository, and then, create PR

$ git push origin [branch_name]
```

For more info, please check [this document](https://www.atlassian.com/git/tutorials/comparing-workflows/forking-workflow).
