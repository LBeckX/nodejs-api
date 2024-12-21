import express from "express";
import {plainToInstance} from "class-transformer";
import {UserCreateDto} from "../dto/user/UserCreate.dto.js";
import {validateOrReject} from "class-validator";
import {UserService} from "../services/user.service.js";
import {User} from "../entities/user.entity.js";

export class AuthController {
    static async login(req: express.Request, res: express.Response) {
        res.send('login')
    }

    static async register(req: express.Request, res: express.Response) {
        const userCreateDto = plainToInstance(UserCreateDto, req.body, {excludeExtraneousValues: true});

        try {
            await validateOrReject(userCreateDto, {skipMissingProperties: true})
        } catch (e) {
            return res.status(400).send(e)
        }

        let user: User;
        try {
            user = await UserService.create(userCreateDto);
        } catch (e) {
            return res.status(409).send(e)
        }

        res.send(UserService.getUserResponse(user))
    }

    static async registerResend(req: express.Request, res: express.Response) {
        res.send('resendRegistrationEmail')
    }

    static async registerConfirmation(req: express.Request, res: express.Response) {
        res.send('registerConfirmation')
    }

    static async passwordReset(req: express.Request, res: express.Response) {
        res.send('passwordForgotten')
    }

    static async passwordResetConfirmation(req: express.Request, res: express.Response) {
        res.send('passwordForgottenConfirmation')
    }
}