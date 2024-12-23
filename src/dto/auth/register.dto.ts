import {IsUrl} from "class-validator";
import {Expose} from "class-transformer";
import {UserCreateDto} from "../user/UserCreate.dto.js";

export class RegisterDto extends UserCreateDto {
    @IsUrl({protocols: ['https']})
    @Expose()
    returnUrl: string;
}