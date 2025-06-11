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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSchema = exports.Product = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const swagger_1 = require("@nestjs/swagger");
let Product = class Product {
    name;
    description;
    price;
    brand;
    categoryId;
    images;
    color;
    ram;
    storage;
    processor;
    battery;
    camera;
    selfieCamera;
    stock;
    sellerId;
};
exports.Product = Product;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Product name", example: "Smartphone X" }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Product description", example: "A high-end smartphone" }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Product price", example: 599.99 }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Product brand", example: "BrandX" }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Product.prototype, "brand", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Category ID", example: "60f7b1a2c3d4e5f67890abcd" }),
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: "Category", required: true }),
    __metadata("design:type", Object)
], Product.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Array of image filenames", type: [String], example: ["image1.jpg", "image2.jpg"] }),
    (0, mongoose_1.Prop)({ type: [String], required: true }),
    __metadata("design:type", Array)
], Product.prototype, "images", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Product color", example: "Black" }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Product.prototype, "color", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Product RAM", example: "8GB" }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Product.prototype, "ram", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Product storage", example: "128GB" }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Product.prototype, "storage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Product processor", example: "Octa-core" }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Product.prototype, "processor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Product battery", example: "4000mAh" }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Product.prototype, "battery", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Product camera", example: "48MP" }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Product.prototype, "camera", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Product selfie camera", example: "12MP" }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Product.prototype, "selfieCamera", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Product stock quantity", example: 100 }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Product.prototype, "stock", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Seller ID", example: "60f7b1a2c3d4e5f67890abcd" }),
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: "User", required: true }),
    __metadata("design:type", Object)
], Product.prototype, "sellerId", void 0);
exports.Product = Product = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Product);
exports.ProductSchema = mongoose_1.SchemaFactory.createForClass(Product);
//# sourceMappingURL=product.schema.js.map