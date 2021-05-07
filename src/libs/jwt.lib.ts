import jwt from "jsonwebtoken";
import globalConfig from "../configs";

const sign = (payload: string | object | Buffer) => jwt.sign(payload, globalConfig.jwtKey, {
    expiresIn: "10h",
});

const JWTLib = {
    sign,
}

export default JWTLib;