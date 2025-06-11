import { IsString, IsMongoId, IsNumber, IsArray, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateProductDto {
    @ApiProperty({ description: "Product name", example: "Smartphone X", required: false })
    @IsString()
    @IsOptional()
    name?: string;

    @ApiProperty({ description: "Product description", example: "A high-end smartphone", required: false })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ description: "Product price", example: 599.99, required: false })
    @IsNumber()
    @IsOptional()
    price?: number;

    @ApiProperty({ description: "Product brand", example: "BrandX", required: false })
    @IsString()
    @IsOptional()
    brand?: string;

    @ApiProperty({ description: "Category ID", example: "60f7b1a2c3d4e5f67890abcd", required: false })
    @IsMongoId()
    @IsOptional()
    categoryId?: string;

    @ApiProperty({ description: "Product color", example: "Black", required: false })
    @IsString()
    @IsOptional()
    color?: string;

    @ApiProperty({ description: "Product RAM", example: "8GB", required: false })
    @IsString()
    @IsOptional()
    ram?: string;

    @ApiProperty({ description: "Product storage", example: "128GB", required: false })
    @IsString()
    @IsOptional()
    storage?: string;

    @ApiProperty({ description: "Product processor", example: "Octa-core", required: false })
    @IsString()
    @IsOptional()
    processor?: string;

    @ApiProperty({ description: "Product battery", example: "4000mAh", required: false })
    @IsString()
    @IsOptional()
    battery?: string;

    @ApiProperty({ description: "Product camera", example: "48MP", required: false })
    @IsString()
    @IsOptional()
    camera?: string;

    @ApiProperty({ description: "Product selfie camera", example: "12MP", required: false })
    @IsString()
    @IsOptional()
    selfieCamera?: string;

    @ApiProperty({ description: "Product stock quantity", example: 100, required: false })
    @IsNumber()
    @IsOptional()
    stock?: number;

    @ApiProperty({ description: "Seller ID", example: "60f7b1a2c3d4e5f67890abcd", required: false })
    @IsMongoId()
    @IsOptional()
    sellerId?: string;

    @ApiProperty({ description: "Array of image filenames", type: [String], example: ["image1.jpg", "image2.jpg"], required: false })
    @IsArray()
    @IsOptional()
    images?: string[];
}