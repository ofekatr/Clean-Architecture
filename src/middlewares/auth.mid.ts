import { MiddlewareFn } from "type-graphql";
import { verifyAccessToken } from "../libs/jwt.lib";
import { IGraphQLSContext } from "../types/context";
import { handleError, throwErrorOnCondition } from "../utils/error.utils";

const extractRefreshTokenFromAuthorizationHeader = (header: string) => header.split(" ")[1];

const isAuthMiddleware: MiddlewareFn<IGraphQLSContext> = (
    { context }: { context: IGraphQLSContext },
    next
) => {
    try {
        const authorizationHeader = context.req.headers.authorization as string;
        throwErrorOnCondition(
            !authorizationHeader,
            "Missing Authorization header",
        );

        const refreshToken = extractRefreshTokenFromAuthorizationHeader(authorizationHeader);
        throwErrorOnCondition(!refreshToken,
            "Failed to extract refresh token from authorization header");

        const payload = verifyAccessToken(refreshToken);
        throwErrorOnCondition(!payload,
            "Failed to verify refresh token");

        context.payload = payload;
        return next();
    } catch (err) {
        handleError(err);
        throw new Error("User is Unauthenticated");
    }
}

const AuthMiddlewares = {
    isAuthMiddleware,
};

export {
    isAuthMiddleware,
};

export default AuthMiddlewares;