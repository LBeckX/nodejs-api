import express from "express";
import {UserController} from "../controller/user.controller.js";
import {MulterConfig} from "../configs/multer.config.js";

const avatarUpload = MulterConfig.basicUpload(MulterConfig.userStorage('files/user'))

export const userRouter = express.Router();
userRouter.get('/me', UserController.me);
userRouter.post('/me/avatar', avatarUpload.single('avatar'), UserController.avatarUpload);
userRouter.delete('/me/avatar', UserController.avatarDelete);
userRouter.get('/', UserController.getUsers);
userRouter.get('/:id', UserController.getUser);
userRouter.post('/', UserController.createUser);
userRouter.put('/:id', UserController.updateUser);
userRouter.delete('/:id', UserController.deleteUser);

export default userRouter