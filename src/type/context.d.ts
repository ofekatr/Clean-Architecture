import { Request, Response } from "express";
import { DAO } from "./database";
import { IServices } from "./services";

export interface ServiceContext {
    db: DAO;
}

export interface IPayload {
    userId: number;
    email: string;
}

export interface IGraphQLContext {
    req: Request;
    res: Response;
    services: IServices;
    payload: IPayload;
}