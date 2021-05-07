import { ApolloError } from "apollo-server-errors";
import { DEF_PUBLIC_ERROR_DESC, DEF_PUBLIC_ERROR_STATUS } from "../constants/error.constants";
import logger from "../logger/logger";
import { GeneralObject } from "../types/general";

export const handleError = (err: Error) => {
    logger.error(err);
}

export const throwPublicMessage = (message: string): never => {
    throw message;
}

export const handlePublicError = (
    err: Error,
    message: string = DEF_PUBLIC_ERROR_DESC,
    code: string = DEF_PUBLIC_ERROR_STATUS,
    extensions?: GeneralObject,
): never => {
    handleError(err);
    throw new ApolloError(message, code, extensions);
}