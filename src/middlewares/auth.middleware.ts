import {decodeToken, validateToken} from "../utils/jwt.utils.js";
import {UserService} from "../services/user.service.js";
import express from "express";
import {ExpressUserRequest} from "../types/express.types.js";

export class AuthMiddleware {
    static async needAuth(req: ExpressUserRequest, res: express.Response, next: express.NextFunction) {
        try {
            const bearer = req.header('authorization') || req.header('Authorization');
            const jwt = bearer ? bearer.split(' ')[1] : null;

            if (!bearer || !jwt || !validateToken(jwt)) {
                res.status(401).send({message: '401 unauthorized'});
                return;
            }

            const {id} = decodeToken(jwt);
            req.user = await UserService.getById(id);
        } catch (e) {
            console.error(e);
            res.status(401).send({message: '401 unauthorized'})
            return;
        }
        next();
    }

    static needRole(role: string | string[]) {
        return async (req: ExpressUserRequest, res: express.Response, next: express.NextFunction) => {
            const roles = Array.isArray(role) ? role : [role];
            if (!req.user) {
                res.status(401).send({message: '401 unauthorized'});
                return;
            }
            if (!req.user.role || !roles.find(r => r.toLowerCase().includes(req.user.role.toLowerCase()))) {
                res.status(403).send({message: '403 forbidden'});
                return;
            }
            next();
        };
    }
}

export const needAuth = AuthMiddleware.needAuth;
export const needRole = AuthMiddleware.needRole;