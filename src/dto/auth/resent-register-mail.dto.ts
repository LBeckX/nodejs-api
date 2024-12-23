import {IsEmail, IsUrl} from "class-validator";
import {Expose} from "class-transformer";

export class ResentRegisterMailDto {
    @IsUrl({protocols: ['https']})
    @Expose()
    returnUrl: string;

    @IsEmail()
    @Expose()
    email: string;
}