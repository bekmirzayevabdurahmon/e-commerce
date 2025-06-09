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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const product_schema_1 = require("./schema/product.schema");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const category_1 = require("../category");
let ProductService = class ProductService {
    productModel;
    categoryModel;
    constructor(productModel, categoryModel) {
        this.productModel = productModel;
        this.categoryModel = categoryModel;
    }
    async getAll() {
        const products = await this.productModel.find().exec();
        return {
            message: "success ✅",
            data: products,
        };
    }
    async create(createProductDto) {
        const product = await this.productModel.create({
            ...createProductDto,
            categoryId: new mongoose_2.Types.ObjectId(createProductDto.categoryId),
            sellerId: new mongoose_2.Types.ObjectId(createProductDto.sellerId),
        });
        await this.categoryModel.findByIdAndUpdate(createProductDto.categoryId, { $push: { products: product._id } }, { new: true });
        return {
            message: "success ✅",
            data: product,
        };
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(product_schema_1.Product.name)),
    __param(1, (0, mongoose_1.InjectModel)(category_1.Category.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], ProductService);
//# sourceMappingURL=product.service.js.map