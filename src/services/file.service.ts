import {databaseConfig} from "../configs/database.config.js";
import {File} from "../entities/file.entity.js";
import path from "node:path";
import {rootPath} from "../configs/path.config.js";
import * as fs from "node:fs";
import {promisify} from "node:util";

export const unlinkAsync = promisify(fs.unlink)

export class FileService {
    static fileRepository = databaseConfig.getRepository(File)

    static save(file: File) {
        return FileService.fileRepository.save(file)
    }

    static async delete(id: number) {
        return await this.fileRepository.delete({id})
    }

    static async deleteFile(file: File) {
        const realPath = path.resolve(rootPath, file.path)
        if (!fs.existsSync(realPath)) {
            return false;
        }
        await unlinkAsync(realPath)
        return true
    }
}