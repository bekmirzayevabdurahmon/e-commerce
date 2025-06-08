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
exports.CreateProductDto = exports.SpecsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class SpecsDto {
    color;
    ram;
    storage;
    processor;
    battery;
    camera;
    selfieCamera;
}
exports.SpecsDto = SpecsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Qora', description: 'Mahsulot rangi' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SpecsDto.prototype, "color", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '8GB', description: 'Mahsulot RAM hajmi' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SpecsDto.prototype, "ram", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '256GB', description: 'Mahsulot xotira hajmi' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SpecsDto.prototype, "storage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Snapdragon 8 Gen 1', description: 'Mahsulot protsessori' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SpecsDto.prototype, "processor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '5000mAh', description: 'Mahsulot batareya quvvati' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SpecsDto.prototype, "battery", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '48MP', description: 'Asosiy kamera xususiyatlari' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SpecsDto.prototype, "camera", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '12MP', description: 'Selfi kamera xususiyatlari' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SpecsDto.prototype, "selfieCamera", void 0);
class CreateProductDto {
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
exports.CreateProductDto = CreateProductDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Smartphone XYZ', description: 'Mahsulot nomi' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Yuqori sifatli smartfon', description: 'Mahsulot tavsifi' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 599.99, description: 'Mahsulot narxi (USD)' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'BrandX', description: 'Mahsulot brendi' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "brand", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'category123', description: 'Mahsulot kategoriyasi IDsi' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'image.jpg', description: 'Mahsulot rasmlari URLlari' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "images", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: SpecsDto, description: 'Mahsulot spetsifikatsiyalari' }),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", SpecsDto)
], CreateProductDto.prototype, "specs", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 100, description: 'Mahsulot zaxirasi miqdori' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "stock", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'seller123', description: 'Sotuvchi IDsi' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "sellerId", void 0);
;
//# sourceMappingURL=create-product.dto.js.map