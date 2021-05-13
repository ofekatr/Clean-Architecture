import cookieParser from "cookie-parser";
import { Router } from "express";
import { IControllers } from "../type/controllers";
import authRouterFactory from "./auth.router";
import cors from 'cors';
import globalConfig from "../config/global.config";

function initCors(serverRouter: Router): Router {
    return serverRouter.use(
        cors({
            credentials: true,
            origin: [
                globalConfig.clientHost,
            ]
        }),
    )
}

function initMiddlewares(serverRouter: Router) {
    return serverRouter.use(cookieParser());
}

function initRouters(serverRouter: Router, controllers: IControllers): Router {
    return serverRouter.use("/auth", authRouterFactory(controllers.authController));
}

const appRouterFactory = (controllers: IControllers) => {
    const serverRouter = Router();
    initCors(serverRouter);
    initMiddlewares(serverRouter);
    initRouters(serverRouter, controllers);
    
    return serverRouter;
}

export default appRouterFactory;