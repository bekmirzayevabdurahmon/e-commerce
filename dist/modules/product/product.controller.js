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
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const product_service_1 = require("./product.service");
const dtos_1 = require("./dtos");
const swagger_1 = require("@nestjs/swagger");
const decorators_1 = require("../../decorators");
const enums_1 = require("../../enums");
let ProductController = class ProductController {
    service;
    constructor(service) {
        this.service = service;
    }
    async getAll() {
        return await this.service.getAll();
    }
    async getById(id) {
        return await this.service.getById(id);
    }
    async create(payload, files) {
        return await this.service.create(payload, files);
    }
    async update(id, payload, files) {
        return await this.service.update(id, payload, files);
    }
    async delete(id) {
        await this.service.delete(id);
        return null;
    }
};
exports.ProductController = ProductController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Barcha mahsulotlarni olish' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Mahsulotlar ro‘yxati muvaffaqiyatli qaytarildi.', type: [dtos_1.CreateProductDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, decorators_1.Protected)(true),
    (0, decorators_1.Roles)([enums_1.UserRole.USER, enums_1.UserRole.ADMIN]),
    (0, swagger_1.ApiOperation)({ summary: 'Mahsulotni ID bo‘yicha olish' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Mahsulot ID si', example: '507f1f77bcf86cd799439011' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Mahsulot topildi.', type: dtos_1.CreateProductDto }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.NOT_FOUND, description: 'Mahsulot topilmadi.' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.FORBIDDEN, description: 'Ruxsat yo‘q.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getById", null);
__decorate([
    (0, common_1.Post)(),
    (0, decorators_1.Protected)(true),
    (0, decorators_1.Roles)([enums_1.UserRole.ADMIN]),
    (0, swagger_1.ApiOperation)({ summary: 'Yangi mahsulot yaratish' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                name: { type: 'string', example: 'Smartphone X' },
                description: { type: 'string', example: 'A high-end smartphone' },
                price: { type: 'number', example: 599.99 },
                brand: { type: 'string', example: 'BrandX' },
                categoryId: { type: 'string', example: '60f7b1a2c3d4e5f67890abcd' },
                color: { type: 'string', example: 'Black' },
                ram: { type: 'string', example: '8GB' },
                storage: { type: 'string', example: '128GB' },
                processor: { type: 'string', example: 'Octa-core' },
                battery: { type: 'string', example: '4000mAh' },
                camera: { type: 'string', example: '48MP' },
                selfieCamera: { type: 'string', example: '12MP' },
                stock: { type: 'number', example: 100 },
                sellerId: { type: 'string', example: '60f7b1a2c3d4e5f67890abcd' },
                images: { type: 'array', items: { type: 'string', format: 'binary' } },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.CREATED, description: 'Mahsulot muvaffaqiyatli yaratildi.', type: dtos_1.CreateProductDto }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.BAD_REQUEST, description: 'Noto‘g‘ri so‘rov ma’lumotlari.' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.FORBIDDEN, description: 'Ruxsat yo‘q (faqat admin uchun).' }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('images')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.CreateProductDto, Array]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, decorators_1.Protected)(true),
    (0, decorators_1.Roles)([enums_1.UserRole.ADMIN]),
    (0, swagger_1.ApiOperation)({ summary: 'Mahsulotni yangilash' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Mahsulot ID si', example: '507f1f77bcf86cd799439011' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                name: { type: 'string', example: 'Smartphone X' },
                description: { type: 'string', example: 'A high-end smartphone' },
                price: { type: 'number', example: 599.99 },
                brand: { type: 'string', example: 'BrandX' },
                categoryId: { type: 'string', example: '60f7b1a2c3d4e5f67890abcd' },
                color: { type: 'string', example: 'Black' },
                ram: { type: 'string', example: '8GB' },
                storage: { type: 'string', example: '128GB' },
                processor: { type: 'string', example: 'Octa-core' },
                battery: { type: 'string', example: '4000mAh' },
                camera: { type: 'string', example: '48MP' },
                selfieCamera: { type: 'string', example: '12MP' },
                stock: { type: 'number', example: 100 },
                sellerId: { type: 'string', example: '60f7b1a2c3d4e5f67890abcd' },
                images: { type: 'array', items: { type: 'string', format: 'binary' } },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Mahsulot muvaffaqiyatli yangilandi.', type: dtos_1.UpdateProductDto }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.NOT_FOUND, description: 'Mahsulot topilmadi.' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.FORBIDDEN, description: 'Ruxsat yo‘q (faqat admin uchun).' }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('images')),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dtos_1.UpdateProductDto, Array]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, decorators_1.Protected)(true),
    (0, decorators_1.Roles)([enums_1.UserRole.ADMIN]),
    (0, swagger_1.ApiOperation)({ summary: 'Mahsulotni o‘chirish' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Mahsulot ID si', example: '507f1f77bcf86cd799439011' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.NO_CONTENT, description: 'Mahsulot muvaffaqiyatli o‘chirildi.' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.NOT_FOUND, description: 'Mahsulot topilmadi.' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.FORBIDDEN, description: 'Ruxsat yo‘q (faqat admin uchun).' }),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "delete", null);
exports.ProductController = ProductController = __decorate([
    (0, swagger_1.ApiTags)('products'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
//# sourceMappingURL=product.controller.js.map