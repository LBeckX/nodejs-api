import {databaseConfig} from "../configs/database.config.js";
import {Token} from "../entities/token.entity.js";

export class TokenService {

    static tokenRepository = databaseConfig.getRepository(Token)

    static generateToken(length: number): string {
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let token = "";
        for (let i = 0; i < length; i++) {
            token += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        return token;
    }

    static async create(name: string, value: string, length: number = 32) {
        const token = new Token()
        token.name = name
        token.token = this.generateToken(length)
        token.value = value
        return await this.tokenRepository.save(token)
    }
}