import { IsString, IsMongoId, IsNumber, IsArray, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class CreateProductDto {
    @ApiProperty({ description: "Product name", example: "Smartphone X" })
    @IsString()
    name: string;

    @ApiProperty({ description: "Product description", example: "A high-end smartphone" })
    @IsString()
    description: string;

    @ApiProperty({ description: "Product price", example: 599.99 })
    @IsNumber()
    @Type(() => Number)
    price: number;

    @ApiProperty({ description: "Product brand", example: "BrandX" })
    @IsString()
    brand: string;

    @ApiProperty({ description: "Category ID", example: "60f7b1a2c3d4e5f67890abcd" })
    @IsMongoId()
    categoryId: string;

    @ApiProperty({ description: "Product color", example: "Black" })
    @IsString()
    color: string;

    @ApiProperty({ description: "Product RAM", example: "8GB" })
    @IsString()
    ram: string;

    @ApiProperty({ description: "Product storage", example: "128GB" })
    @IsString()
    storage: string;

    @ApiProperty({ description: "Product processor", example: "Octa-core" })
    @IsString()
    processor: string;

    @ApiProperty({ description: "Product battery", example: "4000mAh" })
    @IsString()
    battery: string;

    @ApiProperty({ description: "Product camera", example: "48MP" })
    @IsString()
    camera: string;

    @ApiProperty({ description: "Product selfie camera", example: "12MP" })
    @IsString()
    selfieCamera: string;

    @ApiProperty({ description: "Product stock quantity", example: 100 })
    @IsNumber()
    @Type(() => Number)
    stock: number;

    @ApiProperty({ description: "Seller ID", example: "60f7b1a2c3d4e5f67890abcd" })
    @IsMongoId()
    sellerId: string;

    @ApiProperty({ description: "Array of image filenames", type: [String], example: ["image1.jpg", "image2.jpg"], required: false })
    @IsArray()
    @IsOptional()
    images?: string[];
}