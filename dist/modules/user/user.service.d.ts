import { Model } from "mongoose";
import { User, UserDocument } from "./schema";
import { CreateUserDto } from "./dtos";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { FindUserDto } from "./dtos/find-filter.dto";
export declare class UserService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    create(payload: CreateUserDto): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, User, {}> & User & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, {}> & import("mongoose").Document<unknown, {}, User, {}> & User & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    findAll(query: FindUserDto): Promise<{
        message: string;
        meta: {
            total: number;
            page: number;
            limit: number;
            pages: number;
        };
        data: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, User, {}> & User & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, {}> & import("mongoose").Document<unknown, {}, User, {}> & User & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>)[];
    }>;
    findById(id: string): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, User, {}> & User & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, {}> & import("mongoose").Document<unknown, {}, User, {}> & User & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    update(id: string, payload: UpdateUserDto): Promise<{
        message: string;
        data: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, User, {}> & User & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, {}> & import("mongoose").Document<unknown, {}, User, {}> & User & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>) | null;
    }>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
