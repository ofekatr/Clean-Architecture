import "reflect-metadata";
import initApp from "./app";
import globalConfig from "./config/global.config";
import logger from "./logger/logger";

(async () => {
    const app = await initApp();
    const { port } = globalConfig
    return app.listen(
        port,
        () => logger.log(`Server started.\nListening on port ${port}`)
    );
})();