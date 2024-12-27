import {IsBooleanString, IsNumberString, IsString, MinLength} from "class-validator";
import {Expose} from "class-transformer";

export class EnvDto {
    @IsNumberString({no_symbols: true})
    @Expose()
    APP_PORT: number;

    @IsString()
    @MinLength(64)
    @Expose()
    SECRET_KEY: string;

    // Database
    @IsString()
    @Expose()
    DB_HOST: string
    @IsString()
    @Expose()
    DB_USER: string
    @IsString()
    @Expose()
    DB_PASSWORD: string
    @IsString()
    @Expose()
    DB_DATABASE: string
    @IsNumberString()
    @Expose()
    DB_PORT: string

    // SMTP
    @IsBooleanString()
    @Expose()
    SMTP_DEBUG: string
    @IsString()
    @Expose()
    SMTP_FROM: string
    @IsString()
    @Expose()
    SMTP_HOST: string
    @IsNumberString()
    @Expose()
    SMTP_PORT: string
    @IsString()
    @Expose()
    SMTP_USER: string
    @IsString()
    @Expose()
    SMTP_PASSWORD: string
    @IsBooleanString()
    @Expose()
    SMTP_SECURE: string
}