import { IsArray, IsMongoId, IsOptional, IsString } from "class-validator";

export class CreateCategoryDto {
    @IsString()
    name: string;

  @IsOptional()
  @IsString()
  categoryId?: string;

  @IsOptional()
  @IsArray()
  products?: string[];
}