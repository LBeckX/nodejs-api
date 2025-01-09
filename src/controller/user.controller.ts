import express from "express";
import {ExpressUserRequest} from "../types/express.types.js";
import {UserService} from "../services/user.service.js";
import {plainToInstance} from "class-transformer";
import {validateOrReject} from "class-validator";
import {UserCreateDto, UserUpdateDto} from "../dto/user/user-create.dto.js";
import {User} from "../entities/user.entity.js";
import {File} from "../entities/file.entity.js";
import {hashPassword} from "../utils/password.utils.js";
import {removeUndefinedVal} from "../utils/form-data.utils.js";
import {FileService} from "../services/file.service.js";

export class UserController {
    static async getUsers(req: ExpressUserRequest, res: express.Response): Promise<any> {
        try {
            const users = await UserService.getAll()
            res.send(UserService.getUserResponse(users))
        } catch (e) {
            return res.status(500).send({message: 'Could not get users'})
        }
    }

    static async getUser(req: ExpressUserRequest, res: express.Response): Promise<any> {
        try {
            const user = await UserService.getById(Number(req.params.id))
            return res.send(UserService.getUserResponse(user))
        } catch (e) {
            return res.status(404).send({message: 'User not found'})
        }
    }

    static async createUser(req: ExpressUserRequest, res: express.Response): Promise<any> {
        const userCreateDto = plainToInstance(UserCreateDto, req.body, {excludeExtraneousValues: true})
        try {
            await validateOrReject(userCreateDto)
        } catch (e) {
            return res.status(400).send(e)
        }

        let user: User;
        try {
            user = await UserService.getByEmail(userCreateDto.email)
            if (user) {
                return res.status(409).send({message: 'Email already in use'})
            }
        } catch (e) {
            return res.status(500).send({message: 'Could not check email'})
        }

        if (!user) {
            try {
                user = await UserService.create(userCreateDto)
                user.confirmed = true
                await UserService.update(user)
            } catch (e) {
                return res.status(500).send({message: 'Could not create user'})
            }
        }

        return res.send(UserService.getUserResponse(user))
    }

    static async updateUser(req: ExpressUserRequest, res: express.Response): Promise<any> {
        const userUpdateDto = plainToInstance(UserUpdateDto, req.body, {excludeExtraneousValues: true})
        try {
            await validateOrReject(userUpdateDto)
        } catch (e) {
            return res.status(400).send(e)
        }

        let user: User
        try {
            user = await UserService.getById(Number(req.params.id))
        } catch (e) {
            return res.status(404).send({message: 'User not found'})
        }

        try {
            const userData = removeUndefinedVal<Partial<User>>(userUpdateDto)
            if (userData.password) {
                userData.password = await hashPassword(userData.password)
            }
            user = Object.assign(user, userData)
            await UserService.update(user)
        } catch (e) {
            return res.status(500).send({message: 'Could not update user'})
        }

        return res.send(UserService.getUserResponse(user))
    }

    static async deleteUser(req: ExpressUserRequest, res: express.Response): Promise<any> {
        let user: User
        try {
            user = await UserService.getById(Number(req.params.id))
        } catch (e) {
            return res.status(404).send({message: 'User not found'})
        }

        try {
            await UserService.delete(user.id)
            return res.send(UserService.getUserResponse(user))
        } catch (e) {
            return res.status(500).send({message: 'Could not delete user'})
        }
    }

    static async me(req: ExpressUserRequest, res: express.Response): Promise<any> {
        return res.send(UserService.getUserResponse(req.user))
    }

    static async avatarUpload(req: ExpressUserRequest, res: express.Response): Promise<any> {
        if (!req.file) {
            return res.status(400).send({message: 'Avatar not uploaded'})
        }

        let file: File
        try {
            file = new File()
            file.path = req.file.path
            file.name = req.file.filename
            file.ready = true
            await FileService.save(file)
        } catch (e) {
            return res.status(500).send({message: 'Could not create file'})
        }

        try {
            req.user.avatar = file
            await UserService.update(req.user)
        } catch (e) {
            return res.status(500).send({message: 'Could not update user'})
        }

        return res.send(UserService.getUserResponse(req.user))
    }

    static async avatarDelete(req: ExpressUserRequest, res: express.Response): Promise<any> {
        if (!req.user.avatar) {
            return res.status(404).send({message: 'Avatar not found'})
        }

        try {
            const avatarId = req.user.avatar.id
            await FileService.deleteFile(req.user.avatar)
            req.user.avatar = null
            await UserService.update(req.user)
            await FileService.delete(avatarId)
        } catch (e) {
            return res.status(500).send({message: 'Could not delete avatar'})
        }

        return res.send(UserService.getUserResponse(req.user))
    }
}