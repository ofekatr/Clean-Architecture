import { initDatabase } from "./db";
import { ServiceContext } from "../type/context";


export const initServiceContext = async (): Promise<ServiceContext> => {
    const db = await initDatabase();

    return {
        db,
    }
};