import {databaseConfig} from "../configs/database.config.js";
import {Token} from "../entities/token.entity.js";
import * as dateFns from 'date-fns'

type CreateTokenDto = {
    name?: string,
    value: string,
    length?: number,
    validUntil?: Date
}

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

    static async create({name = '', value, length = 16, validUntil}: CreateTokenDto) {
        const token = new Token()
        token.name = name
        token.token = this.generateToken(length)
        token.value = value
        token.validUntil = validUntil ? validUntil : dateFns.addHours(new Date(), 1)
        return await this.tokenRepository.save(token)
    }

    static async getByToken(tokenStr: string) {
        const token = await this.tokenRepository.findOne({where: {token: tokenStr}})
        if (dateFns.isBefore(token.validUntil, new Date())) {
            console.log('Token expired', token, new Date())
            return null
        }
        return token
    }

    static async deleteByToken(tokenStr: string) {
        return await this.tokenRepository.delete({token: tokenStr})
    }
}