"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const schema_1 = require("./schema");
const product_schema_1 = require("../product/schema/product.schema");
const category_service_1 = require("./category.service");
const category_controller_1 = require("./category.controller");
let CategoryModule = class CategoryModule {
};
exports.CategoryModule = CategoryModule;
exports.CategoryModule = CategoryModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: schema_1.Category.name, schema: schema_1.CategorySchema },
                { name: product_schema_1.Product.name, schema: product_schema_1.ProductSchema },
            ]),
        ],
        providers: [category_service_1.CategoryService],
        controllers: [category_controller_1.CategoryController],
        exports: [mongoose_1.MongooseModule]
    })
], CategoryModule);
//# sourceMappingURL=category.module.js.map