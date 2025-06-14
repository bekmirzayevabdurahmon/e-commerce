import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Category, CategorySchema } from "./schema";
import { Product, ProductSchema } from "../product/schema/product.schema";
import { CategoryService } from "./category.service";
import { CategoryController } from "./category.controller";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Category.name, schema: CategorySchema },
            { name: Product.name, schema: ProductSchema},
        ]),
    ],
    providers: [CategoryService],
    controllers: [CategoryController],
    exports: [MongooseModule]
})

export class CategoryModule {}