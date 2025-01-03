import {IsEmail, IsString, IsUrl, MaxLength} from "class-validator";
import {Expose} from "class-transformer";
import {UserPasswordDto} from "../user/user-create.dto.js";

export class PasswordResetDto {
    @IsEmail()
    @Expose()
    email: string;

    @IsUrl({protocols: ['https']})
    @Expose()
    returnUrl: string;
}

export class PasswordResetConfirmationDto extends UserPasswordDto {
    @IsString()
    @MaxLength(255)
    @Expose()
    token: string;
}
