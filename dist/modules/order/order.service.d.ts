import { Model, Types } from 'mongoose';
import { Order, OrderDocument } from './schema';
import { CreateOrderDto, UpdateOrderDto } from './dtos';
export declare class OrderService {
    private orderModel;
    constructor(orderModel: Model<OrderDocument>);
    create(createOrderDto: CreateOrderDto): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Order, {}> & Order & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}> & import("mongoose").Document<unknown, {}, Order, {}> & Order & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>;
    }>;
    getAll(): Promise<{
        message: string;
        data: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Order, {}> & Order & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}> & import("mongoose").Document<unknown, {}, Order, {}> & Order & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>)[];
        total: number;
    }>;
    getOne(id: string): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Order, {}> & Order & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}> & import("mongoose").Document<unknown, {}, Order, {}> & Order & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>;
    }>;
    update(id: string, updateOrderDto: UpdateOrderDto): Promise<{
        message: string;
        data: import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, Order, {}> & Order & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }> & Required<{
            _id: Types.ObjectId;
        }>;
    }>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
