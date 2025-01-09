import multer, {StorageEngine} from "multer";
import * as fs from "node:fs";
import {ExpressUserRequest} from "../types/express.types.js";
import path from "path";

export class MulterConfig {
    static userStorage(diskPath: string) {
        return multer.diskStorage({
            destination: (req: ExpressUserRequest, file, cb) => {
                const diskPathUser = `${diskPath}/${req.user.id}`
                fs.mkdirSync(diskPathUser, {recursive: true})
                cb(null, diskPathUser)
            },
            filename(req, file, cb) {
                const filename = `avatar-${Date.now()}${path.extname(file.originalname)}`
                cb(null, filename)
            }
        })
    }

    static basicUpload(storage: StorageEngine) {
        return multer({
            storage: storage,
            limits: {fileSize: 1024 * 1024 * 10}, // 5 MB
        })
    }
}