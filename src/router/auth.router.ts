import { Request, Response, Router } from "express";
import { IAuthController } from "../type/controllers";
import { handleError } from "../util/error.utils";

const authRouterFactory = (authController: IAuthController) => {
    const authRouter = Router();

    authRouter.post("/refresh-token", async (
        req: Request,
        res: Response,
    ) => {
        try {
            const accessToken = await authController.refreshAccessToken(req, res);
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