import { Injectable } from "@nestjs/common";
import { Product, ProductDocument } from "./schema/product.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateProductDto } from "./dtos/create-product.dto";

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name) private productModel: Model<ProductDocument>
    ) {}
    
    async getAll() {
        const products = await this.productModel.find().exec()

        return {
            message: "success ✅",
            data: products,
        }
    }

    async create(createProductDto: CreateProductDto) {
        const newProduct = new this.productModel(createProductDto);
        const savedProduct = await newProduct.save();

        return {
            message: "success ✅",
            data: savedProduct,
        }
    }
}