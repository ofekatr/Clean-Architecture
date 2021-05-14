import assert from "assert";
import { Request, Response } from "express";
import { MiddlewareFn } from "type-graphql";
import { User } from "../../entity/User";
import JWTLib, { verifyAccessToken } from "../../lib/jwt.lib";
import { IGraphQLContext } from "../../type/context";
import { handleError, throwErrorOnCondition } from "../../util/error.utils";

export function extractRefreshTokenFromAuthorizationHeader(header: string): string {
    return header.split(" ")[1]
};

export function getAutorizationHeaderFromRequest(req: Request): string | undefined {
    return req?.headers?.authorization;
}

export function attachRefreshTokenCookie(res: Response, user: User): Response {
    assert.ok(user, "Missing user argument");
    assert.ok(res, "Missing res argument");

    return res.cookie("jid", JWTLib.generateRefreshToken(user), {
        httpOnly: true,
        path: "/auth/refresh-token",
    })
}

const isAuthMiddleware: MiddlewareFn<IGraphQLContext> = (
    { context }: { context: IGraphQLContext },
    next
) => {
    try {
        const authorizationHeader = getAutorizationHeaderFromRequest(context.req) as string;
        throwErrorOnCondition(
            !authorizationHeader,
            "Missing authorization header",
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
        throw new Error("User is unauthenticated");
    }
}

const AuthMiddlewares = {
    isAuthMiddleware,
};

export {
    isAuthMiddleware,
};

export default AuthMiddlewares;