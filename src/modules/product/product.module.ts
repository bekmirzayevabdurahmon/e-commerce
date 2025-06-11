import { Module } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Product, ProductSchema } from "./schema";
import { CategoryModule } from "../category";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Product.name, schema: ProductSchema}
        ]),
        CategoryModule,
    ],
    providers: [ProductService],
    controllers: [ProductController],
    exports: [MongooseModule]
})

export class ProductModule {}