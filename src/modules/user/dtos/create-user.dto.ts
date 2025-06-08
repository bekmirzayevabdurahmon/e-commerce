import { IsEmail, IsEnum, IsOptional, IsString, MinLength, IsBoolean, MaxLength } from "class-validator";
import { UserRole } from "src/enums";

export class CreateUserDto {
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
  role?: UserRole;

  @IsOptional()
  @IsString()
  companyName?: string;

  @IsOptional()
  @IsBoolean()
  isVerified?: boolean;
}
