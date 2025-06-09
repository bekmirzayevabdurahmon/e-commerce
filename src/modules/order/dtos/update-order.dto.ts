import { IsString, IsNumber, IsOptional, IsEnum } from 'class-validator';

export class UpdateOrderDto {
  @IsString()
  @IsOptional()
  userId?: string;

  @IsString()
  @IsOptional()
  products?: string;

  @IsNumber()
  @IsOptional()
  totalPrice?: number;

  @IsString()
  @IsOptional()
  @IsEnum(['pending', 'completed', 'cancelled'], { message: 'Status must be pending, completed, or cancelled' })
  status?: string;
}