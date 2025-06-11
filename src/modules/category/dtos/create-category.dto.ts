import { IsArray, IsMongoId, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Kategoriya nomi',
    example: 'Elektronika',
  })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: 'Kategoriya ID (ixtiyoriy)',
    example: '507f1f77bcf86cd799439011',
  })
  @IsOptional()
  @IsString()
  @IsMongoId()
  categoryId?: string;

  @ApiPropertyOptional({
    description: 'Kategoriyaga tegishli mahsulotlar ro‘yxati (ixtiyoriy)',
    example: ['507f1f77bcf86cd799439012', '507f1f77bcf86cd799439013'],
    type: [String],
  })
  @IsOptional()
  @IsArray()
  products?: string[];
}