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
exports.CategoryController = void 0;
const common_1 = require("@nestjs/common");
const category_service_1 = require("./category.service");
const dtos_1 = require("./dtos");
const swagger_1 = require("@nestjs/swagger");
const decorators_1 = require("../../decorators");
const enums_1 = require("../../enums");
let CategoryController = class CategoryController {
    service;
    constructor(service) {
        this.service = service;
    }
    async getAll() {
        return await this.service.getAll();
    }
    async getById(id) {
        return await this.service.getOne(id);
    }
    async create(payload) {
        return await this.service.create(payload);
    }
    async update(payload, id) {
        return await this.service.update(id, payload);
    }
    async delete(id) {
        return await this.service.delete(id);
    }
};
exports.CategoryController = CategoryController;
__decorate([
    (0, common_1.Get)(),
    (0, decorators_1.Protected)(true),
    (0, decorators_1.Roles)([enums_1.UserRole.ADMIN]),
    (0, swagger_1.ApiOperation)({ summary: 'Barcha kategoriyalarni olish' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Kategoriyalar ro‘yxati muvaffaqiyatli qaytarildi.', type: [dtos_1.CreateCategoryDto] }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Ruxsat yo‘q (faqat admin uchun).' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, decorators_1.Protected)(true),
    (0, decorators_1.Roles)([enums_1.UserRole.ADMIN]),
    (0, swagger_1.ApiOperation)({ summary: 'Kategoriyani ID bo‘yicha olish' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Kategoriya ID', example: '507f1f77bcf86cd799439011' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Kategoriya topildi.', type: dtos_1.CreateCategoryDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Kategoriya topilmadi.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Ruxsat yo‘q (faqat admin uchun).' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getById", null);
__decorate([
    (0, common_1.Post)(),
    (0, decorators_1.Protected)(true),
    (0, decorators_1.Roles)([enums_1.UserRole.ADMIN]),
    (0, swagger_1.ApiOperation)({ summary: 'Yangi kategoriya yaratish' }),
    (0, swagger_1.ApiBody)({ type: dtos_1.CreateCategoryDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Kategoriya muvaffaqiyatli yaratildi.', type: dtos_1.CreateCategoryDto }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Ruxsat yo‘q (faqat admin uchun).' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.CreateCategoryDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, decorators_1.Protected)(true),
    (0, decorators_1.Roles)([enums_1.UserRole.ADMIN]),
    (0, swagger_1.ApiOperation)({ summary: 'Kategoriyani yangilash' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Kategoriya ID', example: '507f1f77bcf86cd799439011' }),
    (0, swagger_1.ApiBody)({ type: dtos_1.UpdateCategoryDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Kategoriya muvaffaqiyatli yangilandi.', type: dtos_1.UpdateCategoryDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Kategoriya topilmadi.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Ruxsat yo‘q (faqat admin uchun).' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.UpdateCategoryDto, String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, decorators_1.Protected)(true),
    (0, decorators_1.Roles)([enums_1.UserRole.ADMIN]),
    (0, swagger_1.ApiOperation)({ summary: 'Kategoriyani o‘chirish' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Kategoriya ID', example: '507f1f77bcf86cd799439011' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Kategoriya muvaffaqiyatli o‘chirildi.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Kategoriya topilmadi.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Ruxsat yo‘q (faqat admin uchun).' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "delete", null);
exports.CategoryController = CategoryController = __decorate([
    (0, swagger_1.ApiTags)('categories'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('categories'),
    __metadata("design:paramtypes", [category_service_1.CategoryService])
], CategoryController);
//# sourceMappingURL=category.controller.js.map