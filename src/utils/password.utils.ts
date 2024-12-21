import * as argon2 from "argon2";

export function hashPassword(password: string) {
    return argon2.hash(password);
}

export async function comparePassword(hash: string, password: string) {
    try {
        return await argon2.verify(hash, password);
    } catch (err) {
        return false;
    }
}