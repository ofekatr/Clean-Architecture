import cookieParser from "cookie-parser";
import { Router } from "express";
import { IServices } from "../type/services";
import authRouterFactory from "./auth.router";

const serverRouterFactory = (services: IServices) => {
    const serverRouter = Router();

    serverRouter.use(cookieParser());

    serverRouter.use("/auth", authRouterFactory(services.userService));

    return serverRouter;
}

export default serverRouterFactory;