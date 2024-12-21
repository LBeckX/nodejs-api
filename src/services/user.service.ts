import {databaseConfig} from "../configs/database.config.js";
import {User} from "../entities/user.entity.js";
import {hashPassword} from "../utils/password.utils.js";
import {plainToInstance} from "class-transformer";

type CreateUser = {
    email: string,
    password: string,
    role?: string
}

export class UserService {

    static userRepository = databaseConfig.getRepository(User)

    static async create({email, password, role = 'USER'}: CreateUser) {
        const user = new User()
        user.email = email
        user.password = await hashPassword(password)
        user.role = role
        return await this.userRepository.save(user)
    }

    static getUserResponse(user: Partial<User>) {
        return plainToInstance(User, user, {excludeExtraneousValues: true})
    }
}