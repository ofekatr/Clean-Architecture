import { ApolloServer } from "apollo-server-express";
import express from "express";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { initContext } from "./context";
import logger from "./logger/logger";
import { UserResolver } from "./resolvers/user.resolver";
import { IGraphQLSContext } from "./types/context";

(async () => {
    const context = await initContext();
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [
                UserResolver,
            ],
        }),
        context: ({ req, res }) => ({ req, res, ...context } as IGraphQLSContext),
    });

    const port = 8080;
    const app = express();
    apolloServer.applyMiddleware({ app });
    app.listen(port, () => logger.log(`Server started.\nListening on port ${port}`));
})();