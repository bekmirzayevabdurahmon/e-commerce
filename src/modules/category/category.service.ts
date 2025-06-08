import { Injectable } from "@nestjs/common";
import { Category, CategoryDocument } from "./schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateCategoryDto } from "./dtos";

@Injectable()
export class CategoryService {
    constructor(@InjectModel(Category.name) private categoryModel: Model<CategoryDocument>) {}

    async getAll() {
        const categories = await this.categoryModel.find().populate('products').exec()

        return {
            message: "success ✅",
            data: categories,
        }
    }

    async create(payload: CreateCategoryDto) {
        const category = new this.categoryModel({
            name: payload.name,
            categoryId: payload.categoryId,
        })

        await this.categoryModel.create(category)


        return {
            message: "success ✅",
            data: category,
        }
    }
}