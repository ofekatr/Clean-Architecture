const HOST = "http://localhost:8080/";

const METHODS = [
    "graphql",
    "refreshToken"
] as const;
type Method = typeof METHODS[number];
type MethodToEndpointMap = { [key in Method]: string };

const methodToEndpointMap = {
    graphql: "graphql",
    refreshToken: "auth/refresh-token",
} as MethodToEndpointMap;

function getEndpoint(method: Method) {
    const endpoint = methodToEndpointMap[method];
    if (!endpoint) {
        throw new Error(`Attempted to reach an invalid endpoint - Method: ${method}`)
    }
    return `${HOST}${endpoint}`;
}

const apiService = {
    getEndpoint,
}

export {
    getEndpoint,
}

export default apiService;