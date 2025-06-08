import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsArray, IsObject, IsPositive, IsOptional } from 'class-validator';
import { SpecsDto } from './create-product.dto';

export class UpdateProductDto {
  @ApiProperty({ example: 'Smartphone XYZ', description: 'Mahsulot nomi', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: 'Yangilangan tavsif', description: 'Mahsulot tavsifi', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 649.99, description: 'Mahsulot narxi (USD)', required: false })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number;

  @ApiProperty({ example: 'BrandX', description: 'Mahsulot brendi', required: false })
  @IsString()
  @IsOptional()
  brand?: string;

  @ApiProperty({ example: 'category123', description: 'Mahsulot kategoriyasi IDsi', required: false })
  @IsString()
  @IsOptional()
  categoryId?: string;

  @ApiProperty({ example: ['image1.jpg', 'image2.jpg'], description: 'Mahsulot rasmlari URLlari', required: false })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images?: string[];

  @ApiProperty({ type: SpecsDto, description: 'Mahsulot spetsifikatsiyalari', required: false })
  @IsObject()
  @IsOptional()
  specs?: SpecsDto;

  @ApiProperty({ example: 80, description: 'Mahsulot zaxirasi miqdori', required: false })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  stock?: number;

  @ApiProperty({ example: 'seller123', description: 'Sotuvchi IDsi', required: false })
  @IsString()
  @IsOptional()
  sellerId?: string;
}