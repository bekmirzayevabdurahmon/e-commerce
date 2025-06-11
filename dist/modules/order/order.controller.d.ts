import { OrderService } from './order.service';
import { CreateOrderDto, UpdateOrderDto } from './dtos';
export declare class OrderController {
    private readonly service;
    constructor(service: OrderService);
    create(createOrderDto: CreateOrderDto): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, import("./schema").OrderDocument, {}> & import("./schema").Order & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    getAll(): Promise<{
        message: string;
        data: (import("mongoose").Document<unknown, {}, import("./schema").OrderDocument, {}> & import("./schema").Order & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        })[];
        total: number;
    }>;
    getOne(id: string): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, import("./schema").OrderDocument, {}> & import("./schema").Order & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    update(id: string, updateOrderDto: UpdateOrderDto): Promise<{
        message: string;
        data: (import("mongoose").Document<unknown, {}, import("./schema").OrderDocument, {}> & import("./schema").Order & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        }) | null;
    }>;
    delete(id: string): Promise<null>;
}
