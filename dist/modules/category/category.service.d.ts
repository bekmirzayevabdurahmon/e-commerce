import { Category, CategoryDocument } from "./schema";
import { Model } from "mongoose";
import { CreateCategoryDto } from "./dtos";
export declare class CategoryService {
    private categoryModel;
    constructor(categoryModel: Model<CategoryDocument>);
    getAll(): Promise<{
        message: string;
        data: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Category, {}> & Category & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, {}> & import("mongoose").Document<unknown, {}, Category, {}> & Category & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>)[];
    }>;
    create(payload: CreateCategoryDto): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Category, {}> & Category & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, {}> & import("mongoose").Document<unknown, {}, Category, {}> & Category & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
}
