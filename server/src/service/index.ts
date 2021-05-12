import { ServiceContext } from "../type/context";
import userServiceFactory from "./user.service";

const initServices = (context: ServiceContext) => {
    const userService = userServiceFactory(context);

    return {
        userService,
    };
}

export default initServices;