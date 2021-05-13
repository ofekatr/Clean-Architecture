import { InMemoryCache } from "@apollo/client/cache/inmemory/inMemoryCache";
import { ApolloClient } from "@apollo/client/core/ApolloClient";
import { ApolloLink } from "@apollo/client/link/core/ApolloLink";
import { concat } from "@apollo/client/link/core/concat";
import { HttpLink } from "@apollo/client/link/http/HttpLink";
import { createAuthorizationHeader } from "./jwt.service";

const httpLink = new HttpLink({
    uri: "http://localhost:8080/graphql",
});

const authMiddleware = new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    operation.setContext({
        headers: {
            authorization: createAuthorizationHeader(),
        },
    });

    return forward(operation);
});

function createApolloClient() {
    return new ApolloClient({
        cache: new InMemoryCache(),
        credentials: "include",
        link: concat(authMiddleware, httpLink),
    });
}

const apolloService = {
    createApolloClient,
}

export {
    createApolloClient,
}

export default apolloService;