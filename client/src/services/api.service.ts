const HOST = "http://localhost:8080";

function getGraphqlEndpoint(): string {
    return `${HOST}/graphql`;
}

const apiService = {
    getGraphqlEndpoint,
}

export {
    getGraphqlEndpoint,
}

export default apiService;