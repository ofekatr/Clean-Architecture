import { ApolloError } from "apollo-server-errors";
import logger from "../logs/logger";
import { GeneralObject } from "../types/general";

const DEF_PUBLIC_ERROR_DESC = "An error has occurred";
const DEF_PUBLIC_ERROR_STATUS = "GENERAL_ERROR";

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