import { IBaseContext } from "../type/context";
import { initDatabase } from "./db";

export const initContext = async (): Promise<IBaseContext> => {
    const db = await initDatabase();

    return {
        db,
    }
};