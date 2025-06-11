import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Order, OrderSchema } from "./schema";
import { OrderService } from "./order.service";
import { OrderController } from "./order.controller";
import { ProductModule } from "../product";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Order.name, schema: OrderSchema }]),
            ProductModule,
    ],
    providers: [OrderService],
    controllers: [OrderController],
})

export class OrderModule {}