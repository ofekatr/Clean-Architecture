import express from "express";
import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/user.resolver";
import { createConnection } from "typeorm";

(async () => {
    const port = 8080;
    const app = express();
    app.get('/', (_, res) => res.send("Hello World"));

    const connection = await createConnection();
    

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [
                UserResolver,
            ],
        })
    });
    apolloServer.applyMiddleware({ app });
    app.listen(port, () => console.log(`Server started.\nListening on port ${port}`));
})();