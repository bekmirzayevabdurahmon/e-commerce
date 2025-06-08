import { ProductService } from "./product.service";
import { CreateProductDto } from "./dtos";
export declare class ProductController {
    private service;
    constructor(service: ProductService);
    getAll(): Promise<{
        message: string;
        data: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schema").Product, {}> & import("./schema").Product & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, {}> & import("mongoose").Document<unknown, {}, import("./schema").Product, {}> & import("./schema").Product & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>)[];
    }>;
    create(payload: CreateProductDto): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schema").Product, {}> & import("./schema").Product & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, {}> & import("mongoose").Document<unknown, {}, import("./schema").Product, {}> & import("./schema").Product & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
}
