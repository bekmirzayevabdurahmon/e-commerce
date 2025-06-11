import { IsString, IsNumber, IsOptional, IsEnum, IsArray, ValidateNested, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { OrderStatus } from 'src/enums';

class ProductOrderDto {
  @ApiPropertyOptional({ description: 'Mahsulot ID si', example: '507f1f77bcf86cd799439011' })
  @IsString()
  @IsNotEmpty()
  productId: string;

  @ApiPropertyOptional({ description: 'Buyurtma qilingan mahsulot miqdori', example: 2 })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}

export class UpdateOrderDto {
  @ApiPropertyOptional({ description: 'Buyurtma beruvchi foydalanuvchi ID si', example: '507f1f77bcf86cd799439011' })
  @IsString()
  @IsOptional()
  userId?: string;

  @ApiPropertyOptional({
    description: 'Buyurtmadagi mahsulotlar ro‘yxati va miqdorlari',
    type: [ProductOrderDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductOrderDto)
  @IsOptional()
  products?: ProductOrderDto[];

  @ApiPropertyOptional({ description: 'Buyurtma holati', enum: OrderStatus, example: OrderStatus.DELIVERED })
  @IsEnum(OrderStatus)
  @IsOptional()
  status?: OrderStatus;
}