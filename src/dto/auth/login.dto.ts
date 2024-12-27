import {IsEmail, IsString} from "class-validator";
import {Expose} from "class-transformer";

export class LoginDto {
    @IsEmail()
    @Expose()
    email: string;

    @IsString()
    @Expose()
    password: string;
}
