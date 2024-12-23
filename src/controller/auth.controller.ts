import express from "express";
import {plainToInstance} from "class-transformer";
import {validateOrReject} from "class-validator";
import {UserService} from "../services/user.service.js";
import {User} from "../entities/user.entity.js";
import {EmailService} from "../services/email.service.js";
import {RegisterDto} from "../dto/auth/register.dto.js";
import {Token} from "../entities/token.entity.js";
import {TokenService} from "../services/token.service.js";

export class AuthController {
    static async login(req: express.Request, res: express.Response) {
        res.send('login')
    }

    static async register(req: express.Request, res: express.Response) {
        const registerDto: RegisterDto = plainToInstance(RegisterDto, req.body, {excludeExtraneousValues: true});

        try {
            await validateOrReject(registerDto)
        } catch (e) {
            return res.status(400).send(e)
        }

        try {
            if (await User.getByEmail(registerDto.email)) {
                return res.status(409).send({message: 'Email already in use'})
            }
        } catch (e) {
            return res.status(500).send({message: 'Could not check email'})
        }

        let user: User;
        try {
            user = await UserService.create(registerDto);
        } catch (e) {
            return res.status(500).send({message: 'Could not create user'})
        }

        let token: Token;
        try {
            token = await TokenService.create('register', user.id.toString(), 8)
        } catch (e) {
            return res.status(500).send({message: 'Could not create token'})
        }

        try {
            await EmailService.sendRegistration({
                token: token.token,
                returnUrl: registerDto.returnUrl,
                email: user.email
            })
        } catch (e) {
            return res.status(500).send({message: 'Could not send registration email'})
        }

        return res.send(UserService.getUserResponse(user))
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