import { IsEmail, IsEnum, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { UserRole } from "src/enums";

export class RegisterDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    phoneNumber: string;

    @IsString()
    @MinLength(6)
    @MaxLength(14)
    password: string;

    @IsEnum(UserRole)
    @IsOptional()
    role?: UserRole.USER;

    @IsString()
    companyName: string;
}