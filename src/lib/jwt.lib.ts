import jwt from "jsonwebtoken";
import globalConfig from "../config";
import { User } from "../entity/User";
import { IPayload } from "../type/context";

const generateAccessToken = (user: User) =>
    jwt.sign(
        { userId: user.id, email: user.email },
        globalConfig.jwtAccessKey,
        { expiresIn: "15m", }
    );

const verifyAccessToken = (token: string) =>
    jwt.verify(token, globalConfig.jwtAccessKey) as IPayload;

const generateRefreshToken = (user: User) =>
    jwt.sign(
        { userId: user.id, email: user.email },
        globalConfig.jwtRefreshKey,
        { expiresIn: "7d" }
    );

const verifyRefreshToken = (token: string) =>
    jwt.verify(token, globalConfig.jwtRefreshKey) as IPayload;

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