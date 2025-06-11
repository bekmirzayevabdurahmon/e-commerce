import { IsEmail, IsEnum, IsOptional, IsString, MinLength, IsBoolean, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from 'src/enums';

export class CreateUserDto {
  @ApiProperty({
    description: 'Foydalanuvchi ismi',
    example: 'Ali',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Foydalanuvchi elektron pochta manzili',
    example: 'ali@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Foydalanuvchi telefon raqami',
    example: '+998901234567',
  })
  @IsString()
  phoneNumber: string;

  @ApiProperty({
    description: 'Foydalanuvchi paroli (6-14 belgidan iborat)',
    example: 'password123',
  })
  @IsString()
  @MinLength(6)
  @MaxLength(14)
  password: string;

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