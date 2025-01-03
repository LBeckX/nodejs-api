import express from "express";
import {UserController} from "../controller/user.controller.js";

export const userRouter = express.Router();
userRouter.get('/me', UserController.me);
userRouter.get('/', UserController.getUsers);
userRouter.get('/:id', UserController.getUser);
userRouter.post('/', UserController.createUser);
userRouter.put('/:id', UserController.updateUser);
userRouter.delete('/:id', UserController.deleteUser);

export default userRouter