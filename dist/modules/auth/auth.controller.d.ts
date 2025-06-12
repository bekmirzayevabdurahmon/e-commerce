import { AuthService } from "./auth.service";
import { RegisterDto } from "./dtos/register.dto";
import { ForgetPasswordDto, LoginDto, ResetPasswordDto } from "./dtos";
export declare class AuthController {
    private service;
    constructor(service: AuthService);
    register(payload: RegisterDto): Promise<{
        message: string;
        data: {
            user: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("..").User, {}> & import("..").User & {
                _id: import("mongoose").Types.ObjectId;
            } & {
                __v: number;
            }, {}> & import("mongoose").Document<unknown, {}, import("..").User, {}> & import("..").User & {
                _id: import("mongoose").Types.ObjectId;
            } & {
                __v: number;
            } & Required<{
                _id: import("mongoose").Types.ObjectId;
            }>;
            accessToken: string;
            refreshToken: string;
        };
    }>;
    login(payload: LoginDto): Promise<{
        message: string;
        data: {
            user: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("..").User, {}> & import("..").User & {
                _id: import("mongoose").Types.ObjectId;
            } & {
                __v: number;
            }, {}> & import("mongoose").Document<unknown, {}, import("..").User, {}> & import("..").User & {
                _id: import("mongoose").Types.ObjectId;
            } & {
                __v: number;
            } & Required<{
                _id: import("mongoose").Types.ObjectId;
            }>;
            accessToken: string;
            refreshToken: string;
        };
    }>;
    refresh(refreshToken: string): Promise<{
        message: string;
        accessToken: string;
    }>;
    forgetPassword(dto: ForgetPasswordDto): Promise<{
        message: string;
    }>;
    resetPassword(dto: ResetPasswordDto): Promise<{
        message: string;
    }>;
}
