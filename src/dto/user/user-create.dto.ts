import {IsEmail, IsStrongPassword} from "class-validator";
import {Expose} from "class-transformer";

export class UserPasswordDto {
    @IsStrongPassword({
        minSymbols: 1,
        minNumbers: 1,
        minUppercase: 1,
        minLowercase: 1,
        minLength: 8,
    })
    @Expose()
    password: string;
}

export class UserCreateDto extends UserPasswordDto {
    @IsEmail()
    @Expose()
    email: string;
}