import { Request, Response } from "express";
import { User } from "../entity/User";
import JWTLib from "../lib/jwt.lib";
import { attachRefreshTokenCookie } from "../middleware/graphql/auth.mid";
import { IAuthController } from "../type/controllers";
import { IUserService } from "../type/services";
import { throwErrorOnCondition } from "../util/error.utils";

const authControllerFactory = (userService: IUserService): IAuthController => {
    const refreshAccessToken = async (
        req: Request,
        res: Response,
    ): Promise<string> => {
        const token = req.cookies.jid;
        throwErrorOnCondition(!token, "Missing refresh token");

        const payload = JWTLib.verifyRefreshToken(token);
        throwErrorOnCondition(!payload?.userId, `Payload is missing user ID - ${payload}`);

        const user = await userService.getUserById(payload.userId) as User;
        throwErrorOnCondition(
            !user,
            `User ID: ${payload.userId} - Failed to retrieve user from DB`
        );
        throwErrorOnCondition(
            user.refreshTokenVersion !== payload.refreshTokenVersion,
            `User ID: ${user.id} - Invalid refresh token version`,
        );

        attachRefreshTokenCookie(res, user);

        return JWTLib.generateAccessToken(user);
    }

    const authController = {
        refreshAccessToken,
    }

    return authController;
}

export default authControllerFactory;