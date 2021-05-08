import jwt from "jsonwebtoken";
import globalConfig from "../config/global.config";
import { User } from "../entity/User";
import { IAccessPayload, IRefreshPayload } from "../type/context";

const generateAccessToken = (user: User) =>
    jwt.sign(
        { userId: user.id, email: user.email },
        globalConfig.jwtAccessKey,
        { expiresIn: "15m", }
    );

const verifyAccessToken = (token: string) =>
    jwt.verify(token, globalConfig.jwtAccessKey) as IAccessPayload;

const generateRefreshToken = (user: User) =>
    jwt.sign(
        {
            userId: user.id,
            email: user.email,
            refreshTokenVersion: user.refreshTokenVersion
        },
        globalConfig.jwtRefreshKey,
        { expiresIn: "7d" }
    );

const verifyRefreshToken = (token: string) =>
    jwt.verify(token, globalConfig.jwtRefreshKey) as IRefreshPayload;

const JWTLib = {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken,
}

export {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken,
};

export default JWTLib;