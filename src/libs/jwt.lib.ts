import jwt from "jsonwebtoken";
import globalConfig from "../configs";

type Payload = string | object | Buffer;

const generateAccessToken = (payload: Payload) => jwt.sign(payload, globalConfig.jwtAccessKey, {
    expiresIn: "15m",
});

const generateRefreshToken = (payload: Payload) => jwt.sign(payload, globalConfig.jwtRefreshKey, {
    expiresIn: "7d",
});

const JWTLib = {
    generateAccessToken,
    generateRefreshToken,
}

export default JWTLib;