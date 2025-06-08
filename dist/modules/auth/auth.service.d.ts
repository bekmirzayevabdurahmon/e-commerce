import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from '../user';
import { Model } from 'mongoose';
import { LoginDto, RegisterDto } from './dtos';
export declare class AuthService {
    #private;
    private userModel;
    private jwtService;
    constructor(userModel: Model<UserDocument>, jwtService: JwtService);
    register(payload: RegisterDto): Promise<{
        message: string;
        data: {
            user: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, User, {}> & User & {
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
            accessToken: string;
            refreshToken: string;
        };
    }>;
    login(payload: LoginDto): Promise<{
        message: string;
        data: {
            user: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, User, {}> & User & {
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
            accessToken: string;
            refreshToken: string;
        };
    }>;
    refreshAccessToken(refreshToken: string): Promise<{
        message: string;
        accessToken: string;
    }>;
}
