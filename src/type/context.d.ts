import { Request, Response } from "express";
import { DAO } from "./database";
import { IServices } from "./services";

export interface ServiceContext {
    db: DAO;
}

export interface IAccessPayload {
    userId: number;
    email: string;
}

export interface IRefreshPayload extends IAccessPayload {
    refreshTokenVersion: number;
}

export interface IGraphQLContext {
    req: Request;
    res: Response;
    services: IServices;
    payload: IAccessPayload;
}