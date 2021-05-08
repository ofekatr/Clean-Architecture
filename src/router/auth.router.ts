import { Request, Response, Router } from "express";
import { User } from "../entity/User";
import JWTLib from "../lib/jwt.lib";
import { IUserService } from "../type/services";
import { handleError, throwErrorOnCondition } from "../util/error.utils";

const authRouterFactory = (userService: IUserService) => {
    const authRouter = Router();

    authRouter.post("/refresh-token", async (
        req: Request,
        res: Response,
    ) => {
        try {
            const token = req.cookies.jid;
            throwErrorOnCondition(!token, "Missing refresh token");

            const payload = JWTLib.verifyRefreshToken(token);
            throwErrorOnCondition(!payload?.userId, `Payload is missing user ID - ${payload}`);

            const user = await userService.getUserById(payload.userId) as User;
            throwErrorOnCondition(!user, `User ID: ${payload.userId} - Failed to retrieve user from DB`);

            const accessToken = JWTLib.generateAccessToken(user);

            return res.send({
                ok: true,
                accessToken,
            });
        } catch (err) {
            handleError(err);
            return res.send({
                ok: false,
                accessToken: "",
            });
        }
    });

    return authRouter;
};

export default authRouterFactory;