import { Injectable } from "@nestjs/common";
import { Product, ProductDocument } from "./schema/product.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { CreateProductDto } from "./dtos/create-product.dto";
import { Category, CategoryDocument } from "../category";

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name) private productModel: Model<ProductDocument>,
        @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>
    ) {}
    
    async getAll() {
        const products = await this.productModel.find().exec();
        return {
          message: "success ✅",
          data: products,
        };
    }

    async create(createProductDto: CreateProductDto) {
        const product = await this.productModel.create({
            ...createProductDto,
            categoryId: new Types.ObjectId(createProductDto.categoryId),
            sellerId: new Types.ObjectId(createProductDto.sellerId),
        });

        await this.categoryModel.findByIdAndUpdate(
            createProductDto.categoryId,
            { $push: { products: product._id } },
            { new: true}
        );

        return {
            message: "success ✅",
            data: product,
        }
    }
}