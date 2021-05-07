import { Context } from "../types/context";
import { initDatabase } from "./db";

export const initContext = async (): Promise<Context> => {
    const db = await initDatabase();

    return {
        db,
    }
};