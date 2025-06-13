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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const dtos_1 = require("./dtos");
const decorators_1 = require("../../decorators");
const enums_1 = require("../../enums");
const swagger_1 = require("@nestjs/swagger");
const guards_1 = require("../../guards");
let UserController = class UserController {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    async create(payload) {
        return this.userService.create(payload);
    }
    async findAll(query) {
        return this.userService.findAll(query);
    }
    async getMe(req) {
        const userFromToken = req.user;
        if (!userFromToken) {
            throw new common_1.NotFoundException('Token foydalanuvchisi topilmadi!');
        }
        const userId = userFromToken.id || userFromToken._id || userFromToken.sub;
        if (!userId) {
            throw new common_1.NotFoundException('Foydalanuvchi ID topilmadi!');
        }
        const user = await this.userService.findById(userId);
        if (!user) {
            throw new common_1.NotFoundException('Foydalanuvchi topilmadi!');
        }
        return { data: filterUser(user) };
    }
    async findOne(id) {
        return this.userService.findById(id);
    }
    async update(id, payload) {
        return this.userService.update(id, payload);
    }
    async remove(id) {
        return this.userService.delete(id);
    }
};
exports.UserController = UserController;
__decorate([
    (0, decorators_1.Protected)(true),
    (0, decorators_1.Roles)([enums_1.UserRole.ADMIN]),
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Yangi foydalanuvchi yaratish (faqat admin)' }),
    (0, swagger_1.ApiBody)({ type: dtos_1.CreateUserDto }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Foydalanuvchi yaratildi.',
        type: dtos_1.CreateUserDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Ruxsat yo‘q.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, decorators_1.Protected)(true),
    (0, decorators_1.Roles)([enums_1.UserRole.ADMIN]),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Barcha foydalanuvchilar (admin)' }),
    (0, swagger_1.ApiQuery)({
        type: dtos_1.FindUserDto,
        description: 'Filtr uchun query parametrlari',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Foydalanuvchilar ro‘yxati.',
        type: [dtos_1.CreateUserDto],
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.FindUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('me'),
    (0, decorators_1.Protected)(true),
    (0, decorators_1.Roles)([enums_1.UserRole.USER, enums_1.UserRole.SELLER, enums_1.UserRole.ADMIN]),
    (0, swagger_1.ApiOperation)({ summary: 'Avtorizatsiyalangan foydalanuvchini olish' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Foydalanuvchining o‘zi',
        type: dtos_1.CreateUserDto,
    }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getMe", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, decorators_1.Protected)(true),
    (0, decorators_1.Roles)([enums_1.UserRole.USER, enums_1.UserRole.ADMIN]),
    (0, swagger_1.ApiOperation)({ summary: 'Foydalanuvchini ID bo‘yicha olish' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Foydalanuvchi ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, decorators_1.Protected)(true),
    (0, decorators_1.Roles)([enums_1.UserRole.USER, enums_1.UserRole.ADMIN]),
    (0, swagger_1.ApiOperation)({ summary: 'Foydalanuvchini yangilash' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Foydalanuvchi ID' }),
    (0, swagger_1.ApiBody)({ type: dtos_1.UpdateUserDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dtos_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, decorators_1.Protected)(true),
    (0, decorators_1.Roles)([enums_1.UserRole.ADMIN]),
    (0, swagger_1.ApiOperation)({ summary: 'Foydalanuvchini o‘chirish (admin)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Foydalanuvchi ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "remove", null);
exports.UserController = UserController = __decorate([
    (0, swagger_1.ApiTags)('users'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('users'),
    (0, common_1.UseGuards)(guards_1.CheckAuthGuard, guards_1.CheckRolesGuard),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
function filterUser(user) {
    if (!user)
        return user;
    const obj = user.toObject ? user.toObject() : { ...user };
    delete obj.password;
    delete obj.__v;
    return obj;
}
//# sourceMappingURL=user.controller.js.map