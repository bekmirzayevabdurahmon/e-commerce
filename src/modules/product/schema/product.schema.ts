import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, ObjectId, Types } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {
    @ApiProperty({ description: "Product name", example: "Smartphone X" })
    @Prop({ required: true })
    name: string;

    @ApiProperty({ description: "Product description", example: "A high-end smartphone" })
    @Prop({ required: true })
    description: string;

    @ApiProperty({ description: "Product price", example: 599.99 })
    @Prop({ required: true })
    price: number;

    @ApiProperty({ description: "Product brand", example: "BrandX" })
    @Prop({ required: true })
    brand: string;

    @ApiProperty({ description: "Category ID", example: "60f7b1a2c3d4e5f67890abcd" })
    @Prop({ type: Types.ObjectId, ref: "Category", required: true })
    categoryId: ObjectId;

    @ApiProperty({ description: "Array of image filenames", type: [String], example: ["image1.jpg", "image2.jpg"] })
    @Prop({ type: [String], required: true })
    images: string[];

    @ApiProperty({ description: "Product color", example: "Black" })
    @Prop({ required: true })
    color: string;

    @ApiProperty({ description: "Product RAM", example: "8GB" })
    @Prop({ required: true })
    ram: string;

    @ApiProperty({ description: "Product storage", example: "128GB" })
    @Prop({ required: true })
    storage: string;

    @ApiProperty({ description: "Product processor", example: "Octa-core" })
    @Prop({ required: true })
    processor: string;

    @ApiProperty({ description: "Product battery", example: "4000mAh" })
    @Prop({ required: true })
    battery: string;

    @ApiProperty({ description: "Product camera", example: "48MP" })
    @Prop({ required: true })
    camera: string;

    @ApiProperty({ description: "Product selfie camera", example: "12MP" })
    @Prop({ required: true })
    selfieCamera: string;

    @ApiProperty({ description: "Product stock quantity", example: 100 })
    @Prop({ required: true })
    stock: number;

    @ApiProperty({ description: "Seller ID", example: "60f7b1a2c3d4e5f67890abcd" })
    @Prop({ type: Types.ObjectId, ref: "User", required: true })
    sellerId: ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product);