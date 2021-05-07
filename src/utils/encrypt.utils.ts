import bcrypt from "bcrypt";

export const encrypt = (data: string, numOfSaltRounds: number): Promise<string> => bcrypt.hash(data, numOfSaltRounds);