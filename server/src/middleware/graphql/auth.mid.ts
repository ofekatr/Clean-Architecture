import { Request } from "express";
import { MiddlewareFn } from "type-graphql";
import { verifyAccessToken } from "../../lib/jwt.lib";
import { IGraphQLContext } from "../../type/context";
import { handleError, throwErrorOnCondition } from "../../util/error.utils";

const extractRefreshTokenFromAuthorizationHeader = (header: string) => header.split(" ")[1];

const getAutorizationHeaderFromRequest = (req: Request): string | undefined =>
    req?.headers?.authorization;

const isAuthMiddleware: MiddlewareFn<IGraphQLContext> = (
    { context }: { context: IGraphQLContext },
    next
) => {
    try {
        const authorizationHeader = getAutorizationHeaderFromRequest(context.req) as string;
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