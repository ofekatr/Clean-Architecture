import { ApolloServer } from "apollo-server-express";
import express, { Express } from "express";
import { buildSchema } from "type-graphql";
import { initServiceContext } from "./context";
import initControllers from "./controllers";
import { UserResolver } from "./resolver/user.resolver";
import appRouterFactory from "./router/server.router";
import initServices from "./service";
import { IGraphQLContext } from "./type/context";

const initApp = async (): Promise<Express> => {
    const context = await initServiceContext();
    const services = initServices(context);
    const controllers = initControllers(services);

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [
                UserResolver,
            ],
        }),
        context: ({ req, res }) => ({ req, res, services } as IGraphQLContext),
    });

    const app = express();
    app.use("/", appRouterFactory(controllers));
    apolloServer.applyMiddleware({ app });

    return app;
}

export default initApp;