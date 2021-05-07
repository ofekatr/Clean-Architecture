import logger from "../logs/logger";

const DEF_PUBLIC_ERROR_DESC = "An error has occurred";

export const handleError = (err: Error) => {
    logger.error(err);
}

export const throwPublicMessage = (message: string): never => {
    throw message;
}

export const handlePublicError = (
    err: Error,
    message: string = DEF_PUBLIC_ERROR_DESC
): never => {
    handleError(err);
    return throwPublicMessage(message);
}