import express from "express";
import {AuthController} from "../controller/auth.controller.js";

export const authRouter = express.Router();
authRouter.post('/login', AuthController.login);
authRouter.post('/register', AuthController.register);
authRouter.post('/register/confirmation', AuthController.registerConfirmation);
authRouter.post('/register/resend', AuthController.registerResend);
authRouter.post('/password-reset', AuthController.passwordReset);
authRouter.post('/password-reset/confirmation', AuthController.passwordResetConfirmation);

export default authRouter