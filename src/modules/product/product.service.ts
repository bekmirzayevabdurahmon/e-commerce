import { Injectable, NotFoundException } from "@nestjs/common";
import { Product, ProductDocument } from "./schema/product.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { CreateProductDto } from "./dtos/create-product.dto";
import { UpdateProductDto } from "./dtos/update-product.dto";
import { Category, CategoryDocument } from "../category";
import * as fs from "fs/promises";
import * as path from "path";
import * as crypto from "crypto";

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

    async getById(id: string) {
        const product = await this.productModel.findById(id).exec();
        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }
        return {
            message: "success ✅",
            data: product,
        };
    }

    async create(createProductDto: CreateProductDto, files: Express.Multer.File[]) {
        const uploadDir = path.join(process.cwd(), "uploads");
        const productsImagesDir = path.join(uploadDir, "products-images");

        try {
            await fs.mkdir(uploadDir, { recursive: true });
            await fs.mkdir(productsImagesDir, { recursive: true });

            // Mahsulotni avval yaratamiz, chunki product._id kerak
            const product = await this.productModel.create({
                ...createProductDto,
                categoryId: new Types.ObjectId(createProductDto.categoryId),
                sellerId: new Types.ObjectId(createProductDto.sellerId),
                images: [], // Hozircha bo'sh massiv, keyin yangilanadi
            });

            // Mahsulot ID si asosida papka yaratamiz
            const productDir = path.join(productsImagesDir, product._id.toString());
            await fs.mkdir(productDir, { recursive: true });

            const savedImages: string[] = [];
            for (const file of files) {
                const randomName = crypto.randomUUID() + path.extname(file.originalname);
                const filePath = path.join(productDir, randomName);
                await fs.writeFile(filePath, file.buffer);
                savedImages.push(randomName);
            }

            // Mahsulotni rasmlar bilan yangilaymiz
            await this.productModel.findByIdAndUpdate(
                product._id,
                { images: savedImages },
                { new: true }
            );

            // Kategoriyaga mahsulot ID sini qo'shamiz
            await this.categoryModel.findByIdAndUpdate(
                createProductDto.categoryId,
                { $push: { products: product._id } },
                { new: true }
            );

            // Yangilangan mahsulotni qaytarish uchun qayta so'raymiz
            const updatedProduct = await this.productModel.findById(product._id).exec();

            return {
                message: "success ✅",
                data: updatedProduct,
            };
        } catch (error) {
            throw new Error(`Failed to create product: ${error.message}`);
        }
    }

    async update(id: string, updateProductDto: UpdateProductDto, files: Express.Multer.File[]) {
        const product = await this.productModel.findById(id).exec();
        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }

        const uploadDir = path.join(process.cwd(), "uploads");
        const productsImagesDir = path.join(uploadDir, "products-images");
        const productDir = path.join(productsImagesDir, id);

        try {
            await fs.mkdir(uploadDir, { recursive: true });
            await fs.mkdir(productsImagesDir, { recursive: true });
            await fs.mkdir(productDir, { recursive: true });

            const savedImages: string[] = product.images || [];
            if (files && files.length > 0) {
                for (const file of files) {
                    const randomName = crypto.randomUUID() + path.extname(file.originalname);
                    const filePath = path.join(productDir, randomName);
                    await fs.writeFile(filePath, file.buffer);
                    savedImages.push(randomName);
                }
            }

            const updatedProduct = await this.productModel.findByIdAndUpdate(
                id,
                {
                    ...updateProductDto,
                    categoryId: updateProductDto.categoryId ? new Types.ObjectId(updateProductDto.categoryId) : product.categoryId,
                    sellerId: updateProductDto.sellerId ? new Types.ObjectId(updateProductDto.sellerId) : product.sellerId,
                    images: savedImages,
                },
                { new: true }
            );

            if (updateProductDto.categoryId && updateProductDto.categoryId !== product.categoryId.toString()) {
                await this.categoryModel.findByIdAndUpdate(product.categoryId, { $pull: { products: product._id } });
                await this.categoryModel.findByIdAndUpdate(updateProductDto.categoryId, { $push: { products: product._id } });
            }

            return {
                message: "success ✅",
                data: updatedProduct,
            };
        } catch (error) {
            throw new Error(`Failed to update product: ${error.message}`);
        }
    }

    async delete(id: string) {
        const product = await this.productModel.findById(id).exec();
        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found`);
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
}