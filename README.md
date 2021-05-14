#  Clean Architecture Practice 🧼

## Full-Stack app for practicing <a href="https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html" target="_blank">Clean Architecture</a> and safe JWT authorization.

### Implemented in TypeScript, using: 
* Node.js
* Express.js
* PostgresQL
* TypeORM
* GraphQL
* Apollo
* TypeGraphQ
* GraphQL Code Generator
* React.

### Project Features:
- An implementation for safe usage of JWT authorization - Using access and refresh tokens mechanism for <a href="https://hasura.io/blog/best-practices-of-using-jwt-with-graphql/#silent_refresh" target="_blank">silent refreshes</a>.
- Utilizes GraphQL Code Generator in order to build strict types on the client-side from the GraphQL schema and operations.
- Implements concepts demonstrated in Robert Cecil Martin's Clean Architectural Design.

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `ormconfig.json` file
3. Setup .env with the following structure:
```
NODE_ENV=<"development" | "production" | "staging" | "test">
JWT_ACCESS_KEY=<Your private key for JWT access token generation>
JWT_REFRESH_KEY=<Your private key for JWT access token generation>
PORT=<The desired port to run the server on>
CLIENT_HOST=<The client app host, e.g, "http://localhost:3000">
```
4. Run `npm start` command for both the server and the client
