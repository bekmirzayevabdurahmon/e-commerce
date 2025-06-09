import { Product, ProductDocument } from "./schema/product.schema";
import { Model, Types } from "mongoose";
import { CreateProductDto } from "./dtos/create-product.dto";
import { CategoryDocument } from "../category";
export declare class ProductService {
    private productModel;
    private categoryModel;
    constructor(productModel: Model<ProductDocument>, categoryModel: Model<CategoryDocument>);
    getAll(): Promise<{
        message: string;
        data: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Product, {}> & Product & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}> & import("mongoose").Document<unknown, {}, Product, {}> & Product & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>)[];
    }>;
    create(createProductDto: CreateProductDto): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Product, {}> & Product & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}> & import("mongoose").Document<unknown, {}, Product, {}> & Product & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>;
    }>;
}
