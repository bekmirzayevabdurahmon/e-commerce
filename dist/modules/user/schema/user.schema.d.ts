import { HydratedDocument } from "mongoose";
import { UserRole } from "src/enums";
export type UserDocument = HydratedDocument<User>;
export declare class User {
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
    role: UserRole;
    companyName?: string;
    isVerified: boolean;
    refreshToken?: string;
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, import("mongoose").Document<unknown, any, User, any> & User & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<User>, {}> & import("mongoose").FlatRecord<User> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
