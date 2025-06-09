"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const schema_1 = require("./schema");
const product_schema_1 = require("../product/schema/product.schema");
let CategoryService = class CategoryService {
    categoryModel;
    productModel;
    constructor(categoryModel, productModel) {
        this.categoryModel = categoryModel;
        this.productModel = productModel;
    }
    async create(payload) {
        if (payload.products && payload.products.length > 0) {
            const validProducts = await this.productModel
                .find({ _id: { $in: payload.products } })
                .exec();
            if (validProducts.length !== payload.products.length) {
                throw new common_1.NotFoundException('Some products not found ❌');
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
    async getOne(id) {
        const category = await this.categoryModel
            .findById(id)
            .populate('products')
            .exec();
        if (!category) {
            throw new common_1.NotFoundException('Category not found ❌');
        }
        return {
            message: 'success ✅',
            data: category,
        };
    }
    async update(id, payload) {
        const category = await this.categoryModel.findByIdAndUpdate(id, {
            $set: {
                name: payload.name,
                categoryId: payload.categoryId,
                products: payload.products,
            },
        }, { new: true }).populate('products');
        if (!category) {
            throw new common_1.NotFoundException('Category not found ❌');
        }
        return {
            message: 'success ✅',
            data: category,
        };
    }
    async delete(id) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.NotFoundException('Invalid category ID ❌');
        }
        const category = await this.categoryModel.findById(id).exec();
        if (!category) {
            throw new common_1.NotFoundException('Category not found ❌');
        }
        await this.productModel
            .updateMany({ categoryId: new mongoose_2.Types.ObjectId(id) }, { $set: { categoryId: null } })
            .exec();
        await this.categoryModel.findByIdAndDelete(id).exec();
        return {
            message: 'success ✅',
        };
    }
};
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schema_1.Category.name)),
    __param(1, (0, mongoose_1.InjectModel)(product_schema_1.Product.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], CategoryService);
//# sourceMappingURL=category.service.js.map