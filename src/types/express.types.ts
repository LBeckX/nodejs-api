import {User} from "../entities/user.entity.js";
import express from "express";

export type ExpressUserRequest = {
    user: User
} & express.Request;