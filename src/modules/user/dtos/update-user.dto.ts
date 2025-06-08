import { IsBoolean, IsEmail, IsEnum, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { UserRole } from "src/enums";

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    phoneNumber?: string;

    @IsOptional()
    @IsString()
    @MinLength(6)
    @MaxLength(14)
    password?: string;

    @IsEnum(UserRole)
    @IsOptional()
    role?: UserRole;

    @IsOptional()
    @IsString()
    companyName?: string;

    @IsOptional()
    @IsBoolean()
    isVerified?: boolean;
}