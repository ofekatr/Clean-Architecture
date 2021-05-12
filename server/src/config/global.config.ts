import "dotenv/config";
import { throwErrorOnCondition } from "../util/error.utils";
import { checkIfObjectHasFalseyValues } from "../util/object-utils";

const extractGlobalConfigPropsFromObject = ({
    NODE_ENV: nodeEnv = "",
    JWT_ACCESS_KEY: jwtAccessKey = "",
    JWT_REFRESH_KEY: jwtRefreshKey = "",
    PORT: port = 8080,
}) => ({
    jwtAccessKey,
    jwtRefreshKey,
    nodeEnv,
    port,
});

const globalConfig = extractGlobalConfigPropsFromObject(process.env);

throwErrorOnCondition(
    checkIfObjectHasFalseyValues(globalConfig),
    "Invalid Server Configuration"
);

export default globalConfig;