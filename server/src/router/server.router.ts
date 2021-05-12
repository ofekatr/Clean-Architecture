import cookieParser from "cookie-parser";
import { Router } from "express";
import { IControllers } from "../type/controllers";
import authRouterFactory from "./auth.router";

const appRouterFactory = (controllers: IControllers) => {
    const serverRouter = Router();

    serverRouter.use(cookieParser());

    serverRouter.use("/auth", authRouterFactory(controllers.authController));

    return serverRouter;
}

export default appRouterFactory;