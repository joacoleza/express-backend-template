# Express backend template

This repository contains a lightweight template for a [nodeJs](https://nodejs.org/en) backend API server implemented with [express](https://expressjs.com/), [typescript](https://www.typescriptlang.org/) and [tsoa](https://github.com/lukeautry/tsoa).

## Table of Contents
1. [Getting Started](#getting-started)
1. [Scripts](#scripts)
1. [Dependency injection](#dependency-injection)
1. [Rate limit](#rate-limit)
1. [API documentation](#api-documentation)
1. [Logging](#logging)
1. [Husky](#husky)
1. [Next steps](#next-steps)
1. [Logging](#built-with)
1. [License](#license)

## Getting Started

1. Install [nodeJs](https://nodejs.org/en) (tested on `v20.13.1`).
2. Clone this repository.
3. Create the _.env_ file (copy the _[.env.example](./.env.example)_ file and adjust the variables).
4. Install dependencies (`npm install`)
3. Build the app: `npm run build`.
4. Start the app: `npm run start`.
5. Check the API definition on `localhost:3000/docs` (the port could be different if it was changed on step 3) and start using it.

## Scripts

### Running in dev mode
Run `npm run dev` to start nodemon with ts-node, to serve the app and watch file changes.

### Linting

* Run `npm run lint` and/or `npm run prettier` analyze code format. 
* Run `npm run prettier:fix` to fix errors.

### Tests

* Integration tests: Controllers are integration tested with [supertest](https://github.com/ladjs/supertest).
* Unit tests: The other modules are unit tested with [ts-jest](https://github.com/kulshekhar/ts-jest).

## Project Structure

| Name                              | Description |
| --------------------------------- | ----------- |
| **build/**                        | Transpiled source files will be placed here  |
| **public/**                       | Static assets like swagger generated files |
| **src/**                          | Source files |
| **src/errors/**                   | Errors are defined here |
| **src/healthCheck/**              | Health check API and logic is here |
| **src/middlewares/**              | Express Middlewares like error handling  |
| **src/users/**                    | Users related files (controller, service and repository) |
| **src/utils/**                    | Utilities files |
| **app.ts**                        | App initialization and configuration |
| **ioc.ts**                        | Dependency injection configuration |
| **server.ts**                     | Server initialization and configuration |
| **.env.example**                  | Environment configurations |

## Dependency injection

The API uses dependency injection thanks to [tsoa](https://github.com/lukeautry/tsoa) and  [inversify](https://github.com/inversify/InversifyJS).

## Rate limit

The API has a rate-limit configured on the _.env_ file using  [express-rate-limit](https://github.com/express-rate-limit/express-rate-limit).

## API documentation

The API documentation is generated running `npm run swagger` and can be found on `<<base-url>>/docs`. The documentation is generated using [swagger-ui-express](https://github.com/scottie1984/swagger-ui-express) and [tsoa](https://github.com/lukeautry/tsoa).

## Logging

For logging [morgan](https://github.com/expressjs/morgan) with a minimal setup is used ([here](./src/app.ts#23)). This can be further customized as new middleware. 

## Husky

Hooks:
* [Pre-commit](./.husky/pre-commit): runs linter and prettier. If any error is found, commit is aborted. You can run `npm run prettier:fix` to auto fix some errors.
* [Pre-push](./.husky/pre-commit): runs linter and prettier. If any error is found, commit is aborted. You can run `npm run prettier:fix` to auto fix some errors.

## Next steps

Things that can be included in this template are:

* Connection to a real DB (eg. _postgreSQL_) using [typeORM](https://typeorm.io/). For local development have the DB as a [docker container](https://hub.docker.com/_/postgres).
* Include Redis to use it as cache. For local development have a Redis service as a [docker container](https://hub.docker.com/_/redis).

## Built with

* [dotenv](https://github.com/motdotla/dotenv)
* [express](https://expressjs.com/)
* [express-rate-limit](https://github.com/express-rate-limit/express-rate-limit)
* [inversify](https://github.com/inversify/InversifyJS)
* [morgan](https://github.com/expressjs/morgan)
* [swagger-ui-express](https://github.com/scottie1984/swagger-ui-express)
* [tsoa](https://github.com/lukeautry/tsoa)
* [eslint](https://eslint.org/)
* [husky](https://github.com/typicode/husky)
* [prettier](https://prettier.io/)
* [supertest](https://github.com/ladjs/supertest)
* [ts-jest](https://github.com/kulshekhar/ts-jest)
* [typescript](https://www.typescriptlang.org/)

## License
Copyright © 2024 Joaquín Lezama.
This project is [MIT](./LICENSE) licensed.
