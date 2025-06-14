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
exports.CreateCategoryDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateCategoryDto {
    name;
    categoryId;
    products;
}
exports.CreateCategoryDto = CreateCategoryDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Kategoriya nomi',
        example: 'Elektronika',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCategoryDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Kategoriya ID (ixtiyoriy)',
        example: '507f1f77bcf86cd799439011',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CreateCategoryDto.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Kategoriyaga tegishli mahsulotlar ro‘yxati (ixtiyoriy)',
        example: ['507f1f77bcf86cd799439012', '507f1f77bcf86cd799439013'],
        type: [String],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateCategoryDto.prototype, "products", void 0);
//# sourceMappingURL=create-category.dto.js.map