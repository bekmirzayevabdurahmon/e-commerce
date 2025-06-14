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
const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");
let ProductService = class ProductService {
    productModel;
    categoryModel;
    constructor(productModel, categoryModel) {
        this.productModel = productModel;
        this.categoryModel = categoryModel;
    }
    async getAll(filters = {}) {
        const { categoryId, brand, minPrice, maxPrice, inStock, q, page = 1, limit = 12, } = filters;
        const query = {};
        if (categoryId)
            query.categoryId = categoryId;
        if (brand)
            query.brand = brand;
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice !== undefined)
                query.price.$gte = Number(minPrice);
            if (maxPrice !== undefined)
                query.price.$lte = Number(maxPrice);
        }
        if (inStock === 'true' || inStock === true) {
            query.stock = { $gt: 0 };
        }
        if (q) {
            query.$or = [
                { name: { $regex: q, $options: "i" } },
                { description: { $regex: q, $options: "i" } }
            ];
        }
        const pageNum = Math.max(1, parseInt(page, 10));
        const limitNum = Math.max(1, parseInt(limit, 10));
        const skip = (pageNum - 1) * limitNum;
        const [products, total] = await Promise.all([
            this.productModel.find(query).skip(skip).limit(limitNum).exec(),
            this.productModel.countDocuments(query).exec()
        ]);
        return {
            message: "success ✅",
            data: products,
            pagination: {
                page: pageNum,
                limit: limitNum,
                total,
                totalPages: Math.ceil(total / limitNum)
            }
        };
    }
    async getById(id) {
        const product = await this.productModel.findById(id).exec();
        if (!product) {
            throw new common_1.NotFoundException(`Product with ID ${id} not found`);
        }
        return {
            message: "success ✅",
            data: product,
        };
    }
    async create(createProductDto, files) {
        const uploadDir = path.join(process.cwd(), "uploads");
        const productsImagesDir = path.join(uploadDir, "products-images");
        try {
            await fs.mkdir(uploadDir, { recursive: true });
            await fs.mkdir(productsImagesDir, { recursive: true });
            const product = await this.productModel.create({
                ...createProductDto,
                categoryId: new mongoose_2.Types.ObjectId(createProductDto.categoryId),
                sellerId: new mongoose_2.Types.ObjectId(createProductDto.sellerId),
                images: [],
            });
            const productDir = path.join(productsImagesDir, product._id.toString());
            await fs.mkdir(productDir, { recursive: true });
            const savedImages = [];
            for (const file of files) {
                const randomName = crypto.randomUUID() + path.extname(file.originalname);
                const filePath = path.join(productDir, randomName);
                await fs.writeFile(filePath, file.buffer);
                savedImages.push(randomName);
            }
            await this.productModel.findByIdAndUpdate(product._id, { images: savedImages }, { new: true });
            await this.categoryModel.findByIdAndUpdate(createProductDto.categoryId, { $push: { products: product._id } }, { new: true });
            const updatedProduct = await this.productModel.findById(product._id).exec();
            return {
                message: "success ✅",
                data: updatedProduct,
            };
        }
        catch (error) {
            throw new Error(`Failed to create product: ${error.message}`);
        }
    }
    async update(id, updateProductDto, files) {
        const product = await this.productModel.findById(id).exec();
        if (!product) {
            throw new common_1.NotFoundException(`Product with ID ${id} not found`);
        }
        const uploadDir = path.join(process.cwd(), "uploads");
        const productsImagesDir = path.join(uploadDir, "products-images");
        const productDir = path.join(productsImagesDir, id);
        try {
            await fs.mkdir(uploadDir, { recursive: true });
            await fs.mkdir(productsImagesDir, { recursive: true });
            await fs.mkdir(productDir, { recursive: true });
            const savedImages = product.images || [];
            if (files && files.length > 0) {
                for (const file of files) {
                    const randomName = crypto.randomUUID() + path.extname(file.originalname);
                    const filePath = path.join(productDir, randomName);
                    await fs.writeFile(filePath, file.buffer);
                    savedImages.push(randomName);
                }
            }
            const updatedProduct = await this.productModel.findByIdAndUpdate(id, {
                ...updateProductDto,
                categoryId: updateProductDto.categoryId ? new mongoose_2.Types.ObjectId(updateProductDto.categoryId) : product.categoryId,
                sellerId: updateProductDto.sellerId ? new mongoose_2.Types.ObjectId(updateProductDto.sellerId) : product.sellerId,
                images: savedImages,
            }, { new: true });
            if (updateProductDto.categoryId && updateProductDto.categoryId !== product.categoryId.toString()) {
                await this.categoryModel.findByIdAndUpdate(product.categoryId, { $pull: { products: product._id } });
                await this.categoryModel.findByIdAndUpdate(updateProductDto.categoryId, { $push: { products: product._id } });
            }
            return {
                message: "success ✅",
                data: updatedProduct,
            };
        }
        catch (error) {
            throw new Error(`Failed to update product: ${error.message}`);
        }
    }
    async delete(id) {
        const product = await this.productModel.findById(id).exec();
        if (!product) {
            throw new common_1.NotFoundException(`Product with ID ${id} not found`);
        }
        await this.productModel.findByIdAndDelete(id).exec();
        await this.categoryModel.findByIdAndUpdate(product.categoryId, { $pull: { products: product._id } });
        const productDir = path.join(process.cwd(), "uploads", "products-images", id);
        await fs.rm(productDir, { recursive: true, force: true });
        return {
            message: "success ✅",
            data: null,
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