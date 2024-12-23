import {IsUrl} from "class-validator";
import {Expose} from "class-transformer";
import {UserCreateDto} from "../user/user-create.dto.js";

export class RegisterDto extends UserCreateDto {
    @IsUrl({protocols: ['https']})
    @Expose()
    returnUrl: string;
}