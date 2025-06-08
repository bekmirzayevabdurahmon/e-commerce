import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type CategoryDocument = HydratedDocument<Category>

@Schema({ timestamps: true })
export class Category {
    @Prop({ required: true, unique: true })
    name: string;

    @Prop({ type: Types.ObjectId, ref: 'Category', default: null})
    categoryId: Types.ObjectId | null;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Product' }], default: [] })
    products: Types.ObjectId[] 
}

export const CategorySchema = SchemaFactory.createForClass(Category)