import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Category, CategoryDocument } from "./schema";
import { CreateCategoryDto, UpdateCategoryDto } from "./dtos";
import { Product, ProductDocument } from "../product/schema/product.schema";

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async create(payload: CreateCategoryDto) {
    if (payload.products && payload.products.length > 0) {
      const validProducts = await this.productModel
        .find({ _id: { $in: payload.products } })
        .exec();
      if (validProducts.length !== payload.products.length) {
        throw new NotFoundException('Some products not found ❌');
      }
    }

    const category = await this.categoryModel.create({
      name: payload.name,
      categoryId: payload.categoryId,
      products: payload.products || [],
    });

    return {
      message: 'success ✅',
      data: category,
    };
  }

  async getAll() {
    const categories = await this.categoryModel
      .find()
      .populate('products')
      .exec();

    return {
      message: 'success ✅',
      data: categories,
    };
  }

  async getOne(id: string) {
    const category = await this.categoryModel
      .findById(id)
      .populate('products')
      .exec();

    if (!category) {
      throw new NotFoundException('Category not found ❌');
    }

    return {
      message: 'success ✅',
      data: category,
    };
  }

  async update(id: string, payload: UpdateCategoryDto) {
    const category = await this.categoryModel.findByIdAndUpdate(
      id,
      {
        $set: {
          name: payload.name,
          categoryId: payload.categoryId,
          products: payload.products,
        },
      },
      { new: true },
    ).populate('products');

    if (!category) {
      throw new NotFoundException('Category not found ❌');
    }

    return {
      message: 'success ✅',
      data: category,
    };
  }

  async delete(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid category ID ❌');
    }

    const category = await this.categoryModel.findById(id).exec();
    if (!category) {
      throw new NotFoundException('Category not found ❌');
    }

    await this.productModel
      .updateMany(
        { categoryId: new Types.ObjectId(id) }, 
        { $set: { categoryId: null } }
      )
      .exec();

    await this.categoryModel.findByIdAndDelete(id).exec();

    return {
      message: 'success ✅',
    };
  }
}
