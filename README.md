#  Clean Architecture Practice 🧼

## Full-Stack app for practicing <a href="https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html" target="_blank">Clean Architecture</a> and safe JWT authorization.

### Implemented in TypeScript, using Node.js, Express.js, PostgresQL, TypeORM, GraphQL, Apollo, TypeGraphQ, GraphQL Code Generator and React.

- Includes an implementation for safe usage of JWT authorization - Using <a href="https://hasura.io/blog/best-practices-of-using-jwt-with-graphql/#silent_refresh" target="_blank">access and refresh tokens mechanism</a>.
- Utilizes GraphQL Code Generator in order to build strict types on the client-side from the GraphQL schema and operations.
- Implements concepts demonstrated in Robert Cecil Martin's Clean Architectural Design.
- 

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `ormconfig.json` file
3. Run `npm start` command
