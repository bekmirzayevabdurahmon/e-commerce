import { IsOptional, IsString, IsArray } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCategoryDto {
  @ApiPropertyOptional({
    description: 'Kategoriya nomi (ixtiyoriy)',
    example: 'Elektronika',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'Kategoriya ID (ixtiyoriy)',
    example: '507f1f77bcf86cd799439011',
  })
  @IsOptional()
  @IsString()
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