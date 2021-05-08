import { IControllers } from "../type/controllers";
import { IServices } from "../type/services";
import authControllerFactory from "./auth.controller";

const initControllers = (services: IServices): IControllers => {
    const authController = authControllerFactory(services.userService);

    return {
        authController,
    }
}

export default initControllers;