import { ServiceContext } from "../type/context";
import { initDatabase } from "./db";

export const initServiceContext = async (): Promise<ServiceContext> => {
    const db = await initDatabase();

    return {
        db,
    }
};