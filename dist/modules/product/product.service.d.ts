import { Product, ProductDocument } from "./schema/product.schema";
import { Model, Types } from "mongoose";
import { CreateProductDto } from "./dtos/create-product.dto";
import { UpdateProductDto } from "./dtos/update-product.dto";
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
    getById(id: string): Promise<{
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
    create(createProductDto: CreateProductDto, files: Express.Multer.File[]): Promise<{
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
        }>) | null;
    }>;
    update(id: string, updateProductDto: UpdateProductDto, files: Express.Multer.File[]): Promise<{
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
        }>) | null;
    }>;
    delete(id: string): Promise<{
        message: string;
        data: null;
    }>;
}
