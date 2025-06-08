import { IsOptional, IsEnum, IsBooleanString, IsNumberString } from 'class-validator';
import { UserRole } from 'src/enums';

export class FindUserDto {
  @IsOptional()
  @IsNumberString()
  page?: string;

  @IsOptional()
  @IsNumberString()
  limit?: string;

  @IsOptional()
  search?: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @IsOptional()
  @IsBooleanString()
  isVerified?: string;
}
