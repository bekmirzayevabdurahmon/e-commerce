import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Order, OrderDocument } from './schema';
import { Product, ProductDocument } from '../product/schema';
import { CreateOrderDto, UpdateOrderDto } from './dtos';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    try {
      let totalPrice = 0;
      const products: { productId: string; quantity: number; price: number }[] = [];

      for (const item of createOrderDto.products) {
        const product = await this.productModel.findById(item.productId).exec();
        if (!product) {
          throw new NotFoundException(`Mahsulot topilmadi: ${item.productId} ❌`);
        }
        if (product.stock < item.quantity) {
          throw new BadRequestException(`Mahsulot zaxirasi yetarli emas: ${product.name} (Zaxira: ${product.stock}, Talab: ${item.quantity}) ❌`);
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
    } catch (error) {
      throw new BadRequestException(`Buyurtma yaratishda xatolik: ${error.message}`);
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

  async getOne(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Noto‘g‘ri buyurtma ID si ❌');
    }

    const order = await this.orderModel.findById(id).exec();

    if (!order) {
      throw new NotFoundException('Buyurtma topilmadi ❌');
    }

    return {
      message: 'Muvaffaqiyatli ✅',
      data: order,
    };
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Noto‘g‘ri buyurtma ID si ❌');
    }

    try {
      let order = await this.orderModel.findById(id).exec();
      if (!order) {
        throw new NotFoundException('Buyurtma topilmadi ❌');
      }

      let totalPrice = order.totalPrice;
      const updateData = { ...updateOrderDto };

      if (updateOrderDto.products) {
        totalPrice = 0;
        const products: { productId: string; quantity: number; price: number }[] = [];

        // Eski mahsulotlar zaxirasini qaytarish
        for (const item of order.products) {
          const product = await this.productModel.findById(item.productId).exec();
          if (product) {
            product.stock += item.quantity;
            await product.save();
          }
        }

        // Yangi mahsulotlar uchun zaxirani kamaytirish va narxni hisoblash
        for (const item of updateOrderDto.products) {
          const product = await this.productModel.findById(item.productId).exec();
          if (!product) {
            throw new NotFoundException(`Mahsulot topilmadi: ${item.productId} ❌`);
          }
          if (product.stock < item.quantity) {
            throw new BadRequestException(`Mahsulot zaxirasi yetarli emas: ${product.name} (Zaxira: ${product.stock}, Talab: ${item.quantity}) ❌`);
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
        .findByIdAndUpdate(
          id,
          { $set: { ...updateData, totalPrice } },
          { new: true, runValidators: true },
        )
        .exec();

      return {
        message: 'Buyurtma muvaffaqiyatli yangilandi ✅',
        data: order,
      };
    } catch (error) {
      throw new BadRequestException(`Buyurtma yangilashda xatolik: ${error.message}`);
    }
  }

  async delete(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Noto‘g‘ri buyurtma ID si ❌');
    }

    const order = await this.orderModel.findByIdAndDelete(id).exec();
    if (!order) {
      throw new NotFoundException('Buyurtma topilmadi ❌');
    }

    return {
      message: 'Buyurtma muvaffaqiyatli o‘chirildi ✅',
    };
  }
}