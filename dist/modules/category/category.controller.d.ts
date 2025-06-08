import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dtos";
export declare class CategoryController {
    private service;
    constructor(service: CategoryService);
    getAll(): Promise<{
        message: string;
        data: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schema").Category, {}> & import("./schema").Category & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, {}> & import("mongoose").Document<unknown, {}, import("./schema").Category, {}> & import("./schema").Category & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>)[];
    }>;
    create(payload: CreateCategoryDto): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schema").Category, {}> & import("./schema").Category & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, {}> & import("mongoose").Document<unknown, {}, import("./schema").Category, {}> & import("./schema").Category & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
}
