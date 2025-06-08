import { Product, ProductDocument } from "./schema/product.schema";
import { Model } from "mongoose";
import { CreateProductDto } from "./dtos/create-product.dto";
export declare class ProductService {
    private productModel;
    constructor(productModel: Model<ProductDocument>);
    getAll(): Promise<{
        message: string;
        data: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Product, {}> & Product & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, {}> & import("mongoose").Document<unknown, {}, Product, {}> & Product & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>)[];
    }>;
    create(createProductDto: CreateProductDto): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Product, {}> & Product & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, {}> & import("mongoose").Document<unknown, {}, Product, {}> & Product & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
}
