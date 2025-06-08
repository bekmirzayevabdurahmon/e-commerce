import { IsMongoId, IsString } from "class-validator";

export class UpdateCategoryDto {
    @IsString()
    name: string

    @IsString()
    @IsMongoId()
    categoryId: string
}