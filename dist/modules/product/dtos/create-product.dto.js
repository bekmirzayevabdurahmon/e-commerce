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
exports.CreateProductDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
class CreateProductDto {
    name;
    description;
    price;
    brand;
    categoryId;
    color;
    ram;
    storage;
    processor;
    battery;
    camera;
    selfieCamera;
    stock;
    sellerId;
    images;
}
exports.CreateProductDto = CreateProductDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Product name", example: "Smartphone X" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Product description", example: "A high-end smartphone" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Product price", example: 599.99 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Product brand", example: "BrandX" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "brand", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Category ID", example: "60f7b1a2c3d4e5f67890abcd" }),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Product color", example: "Black" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "color", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Product RAM", example: "8GB" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "ram", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Product storage", example: "128GB" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "storage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Product processor", example: "Octa-core" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "processor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Product battery", example: "4000mAh" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "battery", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Product camera", example: "48MP" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "camera", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Product selfie camera", example: "12MP" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "selfieCamera", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Product stock quantity", example: 100 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "stock", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Seller ID", example: "60f7b1a2c3d4e5f67890abcd" }),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "sellerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Array of image filenames", type: [String], example: ["image1.jpg", "image2.jpg"], required: false }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateProductDto.prototype, "images", void 0);
//# sourceMappingURL=create-product.dto.js.map