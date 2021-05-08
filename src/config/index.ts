import "dotenv/config";
import { throwErrorOnCondition } from "../util/error.utils";
import { checkIfObjectHasFalseyValues } from "../util/object-utils";

const globalConfig = (({
    NODE_ENV: nodeEnv = '',
    JWT_ACCESS_KEY: jwtAccessKey = '',
    JWT_REFRESH_KEY: jwtRefreshKey = '',
}) => ({
    jwtAccessKey,
    jwtRefreshKey,
    nodeEnv
}))(process.env);

throwErrorOnCondition(
    checkIfObjectHasFalseyValues(globalConfig),
    "Invalid Server Configuration"
);

export default globalConfig;