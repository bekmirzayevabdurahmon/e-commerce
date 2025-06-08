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
exports.UpdateProductDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const create_product_dto_1 = require("./create-product.dto");
class UpdateProductDto {
    name;
    description;
    price;
    brand;
    categoryId;
    images;
    specs;
    stock;
    sellerId;
}
exports.UpdateProductDto = UpdateProductDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Smartphone XYZ', description: 'Mahsulot nomi', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProductDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Yangilangan tavsif', description: 'Mahsulot tavsifi', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProductDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 649.99, description: 'Mahsulot narxi (USD)', required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateProductDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'BrandX', description: 'Mahsulot brendi', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProductDto.prototype, "brand", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'category123', description: 'Mahsulot kategoriyasi IDsi', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProductDto.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['image1.jpg', 'image2.jpg'], description: 'Mahsulot rasmlari URLlari', required: false }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateProductDto.prototype, "images", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: create_product_dto_1.SpecsDto, description: 'Mahsulot spetsifikatsiyalari', required: false }),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", create_product_dto_1.SpecsDto)
], UpdateProductDto.prototype, "specs", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 80, description: 'Mahsulot zaxirasi miqdori', required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateProductDto.prototype, "stock", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'seller123', description: 'Sotuvchi IDsi', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProductDto.prototype, "sellerId", void 0);
//# sourceMappingURL=update-product.dto.js.map