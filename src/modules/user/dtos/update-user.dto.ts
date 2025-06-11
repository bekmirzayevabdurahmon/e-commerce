import { IsBoolean, IsEmail, IsEnum, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from 'src/enums';

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'Foydalanuvchi ismi (ixtiyoriy)',
    example: 'Vali',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'Foydalanuvchi elektron pochta manzili (ixtiyoriy)',
    example: 'vali@example.com',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    description: 'Foydalanuvchi telefon raqami (ixtiyoriy)',
    example: '+998901234567',
  })
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @ApiPropertyOptional({
    description: 'Foydalanuvchi paroli (6-14 belgidan iborat, ixtiyoriy)',
    example: 'newpassword123',
  })
  @IsOptional()
  @IsString()
  @MinLength(6)
  @MaxLength(14)
  password?: string;

  @ApiPropertyOptional({
    description: 'Foydalanuvchi roli (ixtiyoriy)',
    enum: UserRole,
    example: UserRole.ADMIN,
  })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;

  @ApiPropertyOptional({
    description: 'Kompaniya nomi (ixtiyoriy)',
    example: 'Tech Solutions',
  })
  @IsOptional()
  @IsString()
  companyName?: string;

  @ApiPropertyOptional({
    description: 'Foydalanuvchi tasdiqlanganligi (ixtiyoriy)',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  isVerified?: boolean;
}