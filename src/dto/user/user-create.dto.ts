import {IsEmail, IsOptional, IsStrongPassword} from "class-validator";
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

export class UserPasswordOptionalDto {
    @IsStrongPassword({
        minSymbols: 1,
        minNumbers: 1,
        minUppercase: 1,
        minLowercase: 1,
        minLength: 8,
    })
    @IsOptional()
    @Expose()
    password: string;
}

export class UserCreateDto extends UserPasswordDto {
    @IsEmail()
    @Expose()
    email: string;
}

export class UserUpdateDto extends UserPasswordOptionalDto {
    @Expose()
    @IsEmail()
    @IsOptional()
    email: string;
}