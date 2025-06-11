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
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const order_service_1 = require("./order.service");
const dtos_1 = require("./dtos");
const swagger_1 = require("@nestjs/swagger");
const decorators_1 = require("../../decorators");
const enums_1 = require("../../enums");
let OrderController = class OrderController {
    service;
    constructor(service) {
        this.service = service;
    }
    async create(createOrderDto) {
        return await this.service.create(createOrderDto);
    }
    async getAll() {
        return await this.service.getAll();
    }
    async getOne(id) {
        return await this.service.getOne(id);
    }
    async update(id, updateOrderDto) {
        return await this.service.update(id, updateOrderDto);
    }
    async delete(id) {
        await this.service.delete(id);
        return null;
    }
};
exports.OrderController = OrderController;
__decorate([
    (0, common_1.Post)(),
    (0, decorators_1.Protected)(true),
    (0, decorators_1.Roles)([enums_1.UserRole.USER]),
    (0, swagger_1.ApiOperation)({ summary: 'Yangi buyurtma yaratish' }),
    (0, swagger_1.ApiBody)({ type: dtos_1.CreateOrderDto }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.CREATED, description: 'Buyurtma muvaffaqiyatli yaratildi.', type: dtos_1.CreateOrderDto }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.BAD_REQUEST, description: 'Noto‘g‘ri so‘rov ma’lumotlari.' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.FORBIDDEN, description: 'Ruxsat yo‘q (faqat foydalanuvchi uchun).' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.CreateOrderDto]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, decorators_1.Protected)(true),
    (0, decorators_1.Roles)([enums_1.UserRole.ADMIN]),
    (0, swagger_1.ApiOperation)({ summary: 'Barcha buyurtmalarni olish' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Buyurtmalar ro‘yxati muvaffaqiyatli qaytarildi.' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.FORBIDDEN, description: 'Ruxsat yo‘q (faqat admin uchun).' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, decorators_1.Protected)(true),
    (0, decorators_1.Roles)([enums_1.UserRole.USER, enums_1.UserRole.ADMIN]),
    (0, swagger_1.ApiOperation)({ summary: 'Buyurtmani ID bo‘yicha olish' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Buyurtma ID si', example: '507f1f77bcf86cd799439011' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Buyurtma topildi.', type: dtos_1.CreateOrderDto }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.NOT_FOUND, description: 'Buyurtma topilmadi.' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.FORBIDDEN, description: 'Ruxsat yo‘q.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, decorators_1.Protected)(true),
    (0, decorators_1.Roles)([enums_1.UserRole.ADMIN]),
    (0, swagger_1.ApiOperation)({ summary: 'Buyurtmani yangilash' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Buyurtma ID si', example: '507f1f77bcf86cd799439011' }),
    (0, swagger_1.ApiBody)({ type: dtos_1.UpdateOrderDto }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Buyurtma muvaffaqiyatli yangilandi.', type: dtos_1.UpdateOrderDto }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.NOT_FOUND, description: 'Buyurtma topilmadi.' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.FORBIDDEN, description: 'Ruxsat yo‘q (faqat admin uchun).' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dtos_1.UpdateOrderDto]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, decorators_1.Protected)(true),
    (0, decorators_1.Roles)([enums_1.UserRole.ADMIN]),
    (0, swagger_1.ApiOperation)({ summary: 'Buyurtmani o‘chirish' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Buyurtma ID si', example: '507f1f77bcf86cd799439011' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.NO_CONTENT, description: 'Buyurtma muvaffaqiyatli o‘chirildi.' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.NOT_FOUND, description: 'Buyurtma topilmadi.' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.FORBIDDEN, description: 'Ruxsat yo‘q (faqat admin uchun).' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "delete", null);
exports.OrderController = OrderController = __decorate([
    (0, swagger_1.ApiTags)('orders'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('orders'),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], OrderController);
//# sourceMappingURL=order.controller.js.map