import dotenv from "dotenv";
import { throwErrorOnCondition } from "../utils/error.utils";
import { checkIfObjectHasFalseyValues } from "../utils/object-utils";
dotenv.config();

const globalConfig = (({
    NODE_ENV: nodeEnv = '',
    JWT_KEY: jwtKey = '',
}) => ({
    jwtKey,
    nodeEnv
}))(process.env);

throwErrorOnCondition(
    checkIfObjectHasFalseyValues(globalConfig),
    "Invalid Server Configuration"
);

export default globalConfig;