import { createConnection } from "typeorm";
import { DAO } from "../../type/database";
import userDalFactory from "./user.db";

export const initDatabase = async (): Promise<DAO> => {
    await createConnection();
    
    return {
        user: userDalFactory(),
    };
};