const DEF_PUBLIC_ERROR_DESC = "An error has occurred";

export const handleError = (err: Error) => {
    console.error(err);
}

export const throwPublicDescription = (description: string): never => {
    throw description;
}

export const handlePublicError = (
    err: Error,
    message: string = DEF_PUBLIC_ERROR_DESC
): never => {
    handleError(err);
    return throwPublicDescription(message);
}