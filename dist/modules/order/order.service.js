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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const schema_1 = require("./schema");
const schema_2 = require("../product/schema");
let OrderService = class OrderService {
    orderModel;
    productModel;
    constructor(orderModel, productModel) {
        this.orderModel = orderModel;
        this.productModel = productModel;
    }
    async create(createOrderDto) {
        try {
            let totalPrice = 0;
            const products = [];
            for (const item of createOrderDto.products) {
                const product = await this.productModel.findById(item.productId).exec();
                if (!product) {
                    throw new common_1.NotFoundException(`Mahsulot topilmadi: ${item.productId} ❌`);
                }
                if (product.stock < item.quantity) {
                    throw new common_1.BadRequestException(`Mahsulot zaxirasi yetarli emas: ${product.name} (Zaxira: ${product.stock}, Talab: ${item.quantity}) ❌`);
                }
                totalPrice += product.price * item.quantity;
                products.push({
                    productId: item.productId,
                    quantity: item.quantity,
                    price: product.price,
                });
                product.stock -= item.quantity;
                await product.save();
            }
            const orderData = {
                ...createOrderDto,
                products,
                totalPrice,
            };
            const order = await this.orderModel.create(orderData);
            return {
                message: 'Buyurtma muvaffaqiyatli yaratildi ✅',
                data: order,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(`Buyurtma yaratishda xatolik: ${error.message}`);
        }
    }
    async getAll() {
        const orders = await this.orderModel.find().exec();
        return {
            message: 'Muvaffaqiyatli ✅',
            data: orders,
            total: orders.length,
        };
    }
    async getOne(id) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException('Noto‘g‘ri buyurtma ID si ❌');
        }
        const order = await this.orderModel.findById(id).exec();
        if (!order) {
            throw new common_1.NotFoundException('Buyurtma topilmadi ❌');
        }
        return {
            message: 'Muvaffaqiyatli ✅',
            data: order,
        };
    }
    async update(id, updateOrderDto) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException('Noto‘g‘ri buyurtma ID si ❌');
        }
        try {
            let order = await this.orderModel.findById(id).exec();
            if (!order) {
                throw new common_1.NotFoundException('Buyurtma topilmadi ❌');
            }
            let totalPrice = order.totalPrice;
            const updateData = { ...updateOrderDto };
            if (updateOrderDto.products) {
                totalPrice = 0;
                const products = [];
                for (const item of order.products) {
                    const product = await this.productModel.findById(item.productId).exec();
                    if (product) {
                        product.stock += item.quantity;
                        await product.save();
                    }
                }
                for (const item of updateOrderDto.products) {
                    const product = await this.productModel.findById(item.productId).exec();
                    if (!product) {
                        throw new common_1.NotFoundException(`Mahsulot topilmadi: ${item.productId} ❌`);
                    }
                    if (product.stock < item.quantity) {
                        throw new common_1.BadRequestException(`Mahsulot zaxirasi yetarli emas: ${product.name} (Zaxira: ${product.stock}, Talab: ${item.quantity}) ❌`);
                    }
                    totalPrice += product.price * item.quantity;
                    products.push({
                        productId: item.productId,
                        quantity: item.quantity,
                        price: product.price,
                    });
                    product.stock -= item.quantity;
                    await product.save();
                }
                updateData.products = products;
            }
            order = await this.orderModel
                .findByIdAndUpdate(id, { $set: { ...updateData, totalPrice } }, { new: true, runValidators: true })
                .exec();
            return {
                message: 'Buyurtma muvaffaqiyatli yangilandi ✅',
                data: order,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(`Buyurtma yangilashda xatolik: ${error.message}`);
        }
    }
    async delete(id) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException('Noto‘g‘ri buyurtma ID si ❌');
        }
        const order = await this.orderModel.findByIdAndDelete(id).exec();
        if (!order) {
            throw new common_1.NotFoundException('Buyurtma topilmadi ❌');
        }
        return {
            message: 'Buyurtma muvaffaqiyatli o‘chirildi ✅',
        };
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schema_1.Order.name)),
    __param(1, (0, mongoose_1.InjectModel)(schema_2.Product.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], OrderService);
//# sourceMappingURL=order.service.js.map