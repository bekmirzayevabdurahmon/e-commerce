import { HydratedDocument, ObjectId, Types } from "mongoose";
export type ProductDocument = HydratedDocument<Product>;
export declare class Product {
    name: string;
    description: string;
    price: number;
    brand: string;
    categoryId: ObjectId;
    images: string[];
    color: string;
    ram: string;
    storage: string;
    processor: string;
    battery: string;
    camera: string;
    selfieCamera: string;
    stock: number;
    sellerId: ObjectId;
}
export declare const ProductSchema: import("mongoose").Schema<Product, import("mongoose").Model<Product, any, any, any, import("mongoose").Document<unknown, any, Product, any> & Product & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Product, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Product>, {}> & import("mongoose").FlatRecord<Product> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
