import { Request, Response } from "express";
import { DAO } from "./database";

export interface IBaseContext {
    db: DAO;
}

export interface IPayload {
    userId: number;
    email: string;
}

export interface IGraphQLSContext extends IBaseContext {
    req: Request;
    res: Response;
    payload: IPayload;
}