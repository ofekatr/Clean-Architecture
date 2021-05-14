import { InMemoryCache } from "@apollo/client/cache/inmemory/inMemoryCache";
import { ApolloClient } from "@apollo/client/core/ApolloClient";
import { ApolloLink } from "@apollo/client/link/core/ApolloLink";
import { HttpLink } from "@apollo/client/link/http/HttpLink";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import jwtDecode from "jwt-decode";
import { getEndpoint } from "./api.service";
import { createAuthorizationHeader, getAccessToken, setAccessToken } from "./jwt.service";

const httpLink = new HttpLink({
    uri: getEndpoint('graphql'),
    credentials: "include",
});

const authLink = new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    operation.setContext({
        headers: {
            authorization: createAuthorizationHeader(),
        },
    });

    return forward(operation);
});

const refreshTokenLink = new TokenRefreshLink({
    accessTokenField: "accessToken",
    isTokenValidOrUndefined: () => {
        const accessToken = getAccessToken();
        if (!accessToken) {
            return true;
        }

        try {
            const { exp } = jwtDecode<{ exp: number }>(accessToken);
            return Date.now() < exp * 1_000;
        } catch (err) {
            return false;
        }
    },
    fetchAccessToken: () => fetch(getEndpoint("refreshToken"), {
        method: "POST",
        credentials: "include",
    }),
    handleFetch: accessToken => {
        setAccessToken(accessToken);
    },
    handleError: err => {
        // full control over handling token fetch Error
        console.warn('Your refresh token is invalid. Try to relogin');
        console.error(err);
    }
});

const links = ApolloLink.from([
    refreshTokenLink,
    authLink,
    httpLink,
]);

function createApolloClient() {
    return new ApolloClient({
        cache: new InMemoryCache(),
        link: links,
    });
}

const apolloService = {
    createApolloClient,
}

export {
    createApolloClient,
};

export default apolloService;