import { IsString, IsNumber, IsNotEmpty, IsArray, ValidateNested, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from 'src/enums';

class ProductOrderDto {
  @ApiProperty({ description: 'Mahsulot ID si', example: '507f1f77bcf86cd799439011' })
  @IsString()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({ description: 'Buyurtma qilingan mahsulot miqdori', example: 2 })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty({ description: 'Buyurtma beruvchi foydalanuvchi ID si', example: '507f1f77bcf86cd799439011' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    description: 'Buyurtmadagi mahsulotlar ro‘yxati va miqdorlari',
    type: [ProductOrderDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductOrderDto)
  @IsNotEmpty()
  products: ProductOrderDto[];

  @ApiProperty({ description: 'Buyurtma holati', enum: OrderStatus, example: OrderStatus.PENDING })
  @IsEnum(OrderStatus)
  @IsNotEmpty()
  status: OrderStatus;
}