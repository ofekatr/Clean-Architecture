import { ApolloError } from "apollo-server-errors";
import { DEF_PUBLIC_ERROR_DESC, DEF_PUBLIC_ERROR_STATUS } from "../constant/error.constants";
import logger from "../logger/logger";
import { GeneralObject } from "../type/general";

const handleError = (err: Error) => {
    logger.error(err);
}

const handlePublicError = (
    err: Error,
    message: string = DEF_PUBLIC_ERROR_DESC,
    code: string = DEF_PUBLIC_ERROR_STATUS,
    extensions?: GeneralObject,
): never => {
    handleError(err);
    throw new ApolloError(message, code, extensions);
}

const throwPublicMessage = (message: string): never => {
    throw message;
}

const throwErrorOnCondition = (cond: boolean, message: string) => {
    if (cond)
        throw new Error(message);
}

const ErrorUtils = {
    handleError,
    handlePublicError,
    throwPublicMessage,
    throwErrorOnCondition,
}

export {
    handleError,
    handlePublicError,
    throwPublicMessage,
    throwErrorOnCondition,
};

export default ErrorUtils;