let accessToken = "";

function setAccessToken(newAccessToken: string): void {
    accessToken = newAccessToken;
}

function getAccessToken(): string {
    return accessToken;
}

function createAuthorizationHeader(): string {
    return accessToken ? `Bearer ${accessToken}` : "";
}

const jwtService = {
    getAccessToken,
    setAccessToken,
    createAuthorizationHeader,
}

export {
    getAccessToken,
    setAccessToken,
    createAuthorizationHeader,
};

export default jwtService;