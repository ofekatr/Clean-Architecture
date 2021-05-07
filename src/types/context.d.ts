import { Request, Response } from "express";
import { DAO } from "./database";

export interface IBaseContext {
    db: DAO;
}

export interface IGraphQLSContext extends IBaseContext {
    req: Request;
    res: Response;
}