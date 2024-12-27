import jwt from 'jsonwebtoken';
import {appConfig} from "../configs/app.config.js";

export function generateToken(payload: any): string {
    return jwt.sign(payload, appConfig.secret, {
        expiresIn: appConfig.jwtExpire,
    });
}

export function validateToken(jwtStr: string) {
    return jwt.verify(jwtStr, appConfig.secret);
}

export function getToken(jwtStr: string) {
    return jwt.decode(jwtStr);
}