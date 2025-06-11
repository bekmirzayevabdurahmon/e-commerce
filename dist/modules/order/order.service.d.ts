import { Model } from 'mongoose';
import { Order, OrderDocument } from './schema';
import { ProductDocument } from '../product/schema';
import { CreateOrderDto, UpdateOrderDto } from './dtos';
export declare class OrderService {
    private readonly orderModel;
    private productModel;
    constructor(orderModel: Model<OrderDocument>, productModel: Model<ProductDocument>);
    create(createOrderDto: CreateOrderDto): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, OrderDocument, {}> & Order & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    getAll(): Promise<{
        message: string;
        data: (import("mongoose").Document<unknown, {}, OrderDocument, {}> & Order & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        })[];
        total: number;
    }>;
    getOne(id: string): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, OrderDocument, {}> & Order & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    update(id: string, updateOrderDto: UpdateOrderDto): Promise<{
        message: string;
        data: (import("mongoose").Document<unknown, {}, OrderDocument, {}> & Order & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        }) | null;
    }>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
