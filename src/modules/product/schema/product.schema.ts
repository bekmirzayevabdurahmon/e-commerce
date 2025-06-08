import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ProductDocument = HydratedDocument<Product>

@Schema({ timestamps: true })
export class Product {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    price: number;
    
    @Prop({ required: true })
    brand: string;

    @Prop({ required: true })
    categoryId: string;

    @Prop({ required: true})
    images: string;

    @Prop({ required: true, type: {
        color: { type: String, required: true},
        ram: { type: String, required: true},
        storage: { type: String, required: true},
        processor: { type: String, required: true},
        battery: { type: String, required: true},
        camera: { type: String, required: true},
        selfieCamera: { type: String, required: true},
    }})
    specs: {
        color: string
        ram: string,
        storage: string,
        processor: string,
        battery: string,
        camera: string,
        selfieCamera: string
    }

    @Prop({ required: true })
    stock: number;

    @Prop({ required: true })
    sellerId: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);