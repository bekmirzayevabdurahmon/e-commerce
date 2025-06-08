import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsArray, IsObject, IsPositive, ArrayMinSize, ArrayMaxSize } from 'class-validator';

export class SpecsDto {
  @ApiProperty({ example: 'Qora', description: 'Mahsulot rangi' })
  @IsString()
  @IsNotEmpty()
  color: string;

  @ApiProperty({ example: '8GB', description: 'Mahsulot RAM hajmi' })
  @IsString()
  @IsNotEmpty()
  ram: string;

  @ApiProperty({ example: '256GB', description: 'Mahsulot xotira hajmi' })
  @IsString()
  @IsNotEmpty()
  storage: string;

  @ApiProperty({ example: 'Snapdragon 8 Gen 1', description: 'Mahsulot protsessori' })
  @IsString()
  @IsNotEmpty()
  processor: string;

  @ApiProperty({ example: '5000mAh', description: 'Mahsulot batareya quvvati' })
  @IsString()
  @IsNotEmpty()
  battery: string;

  @ApiProperty({ example: '48MP', description: 'Asosiy kamera xususiyatlari' })
  @IsString()
  @IsNotEmpty()
  camera: string;

  @ApiProperty({ example: '12MP', description: 'Selfi kamera xususiyatlari' })
  @IsString()
  @IsNotEmpty()
  selfieCamera: string;
}

export class CreateProductDto {
  @ApiProperty({ example: 'Smartphone XYZ', description: 'Mahsulot nomi' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Yuqori sifatli smartfon', description: 'Mahsulot tavsifi' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 599.99, description: 'Mahsulot narxi (USD)' })
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({ example: 'BrandX', description: 'Mahsulot brendi' })
  @IsString()
  @IsNotEmpty()
  brand: string;

  @ApiProperty({ example: 'category123', description: 'Mahsulot kategoriyasi IDsi' })
  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @ApiProperty({ example: 'image.jpg', description: 'Mahsulot rasmlari URLlari' })
  @IsString()
  images: string;

  @ApiProperty({ type: SpecsDto, description: 'Mahsulot spetsifikatsiyalari' })
  @IsObject()
  specs: SpecsDto;

  @ApiProperty({ example: 100, description: 'Mahsulot zaxirasi miqdori' })
  @IsNumber()
  @IsPositive()
  stock: number;

  @ApiProperty({ example: 'seller123', description: 'Sotuvchi IDsi' })
  @IsString()
  @IsNotEmpty()
  sellerId: string;
};