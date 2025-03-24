## Node.js REST API

The Node REST API is a Fastify app that uses Drizzle to manage data
stored in a PostgreSQL database.

The application requires docker for the database connection.

Pull the latest PostgreSQL image:
```
docker pull postgres
```

Start the postgres instance:
```
docker run --name postgres-test-api -e POSTGRES_PASSWORD=admin -d -p 5432:5432 postgres
```

Create a `.env` file in the `/api` directory with the following contents:
```
DATABASE_URL=postgres://postgres:admin@localhost:5432/postgres
NODE_ENV=development
```

Create also a `.env.test` file in the `/api` directory, to be used when running tests:
```
DATABASE_URL=postgres://postgres:admin@localhost:5434/postgres
NODE_ENV=test
```

Move into the `/api` directory:
```
cd api
```

Install the required NPM packages:
```
npm install
```

The application should now be ready for deployment:
```
npm run dev
```

The server should be listening on `localhost:8080`

There's also a simple test suite that can be run with the command:
```
npm run test
```

# SPA

The SPA is a Vue app with a Nuxt framework that uses Drizzle to manage data
stored in a PostgreSQL database.

This application also requires docker for the database connection.

Pull the latest PostgreSQL image:
```
docker pull postgres
```

Start the postgres instance:
```
docker run --name postgres-test-spa -e POSTGRES_PASSWORD=admin -d -p 5433:5432 postgres
```

Create a `.env` file in the `/spa` directory with the following contents:
```
DATABASE_URL=postgres://postgres:admin@localhost:5433/postgres
NODE_ENV=development
```

Create also a `.env.test` file in the `/spa` directory, to be used when running tests:
```
DATABASE_URL=postgres://postgres:admin@localhost:5435/postgres
NODE_ENV=test
```

Move into the `/spa` directory:
```
cd spa
```

Install the required NPM packages:
```
npm install
```

This app has a database seeder script to populate the database with book data:
```
npm run seed
```

The application should now be ready for deployment:
```
npm run dev
```

The server should be listening on `localhost:3000`

This application also has a simple test suite that can be run with the command:
```
npm run test
```
