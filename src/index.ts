import { ApolloServer } from "apollo-server-express";
import express from "express";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import globalConfig from "./config/global.config";
import { initServiceContext } from "./context";
import logger from "./logger/logger";
import { UserResolver } from "./resolver/user.resolver";
import serverRouterFactory from "./router/server.router";
import initServices from "./service";
import { IGraphQLContext } from "./type/context";

(async () => {
    const serviceContext = await initServiceContext();
    const services = initServices(serviceContext);

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [
                UserResolver,
            ],
        }),
        context: ({ req, res }) => ({ req, res, services } as IGraphQLContext),
    });

    const port = globalConfig.port;
    const app = express();
    app.use("/", serverRouterFactory(services));
    apolloServer.applyMiddleware({ app });

    app.listen(port, () => logger.log(`Server started.\nListening on port ${port}`));
})();