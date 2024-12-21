import express from "express";

export const userRouter = express.Router();
userRouter.get('/user', (req, res) => {
    res.send('user')
});

export default userRouter