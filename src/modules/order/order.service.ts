import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, ClientSession } from 'mongoose';
import { Order, OrderDocument } from './schema';
import { CreateOrderDto, UpdateOrderDto } from './dtos';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private orderModel: Model<OrderDocument>) {}

  async create(createOrderDto: CreateOrderDto) {
    try {
      const order = await this.orderModel.create(createOrderDto);
      return {
        message: 'Order created successfully ✅',
        data: order,
      };
    } catch (error) {
      throw new BadRequestException(`Failed to create order: ${error.message}`);
    }
  }

  async getAll() {
    const orders = await this.orderModel.find().exec();

    return {
      message: 'success ✅',
      data: orders,
      total: orders.length,
    };
  }

  async getOne(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid order ID ❌');
    }

    const order = await this.orderModel.findById(id).exec();

    if (!order) {
      throw new NotFoundException('Order not found ❌');
    }

    return {
      message: 'success ✅',
      data: order,
    };
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid order ID ❌');
    }

    const order = await this.orderModel
      .findByIdAndUpdate(id, { $set: updateOrderDto }, { new: true, runValidators: true })
      .select('-__v')
      .lean()
      .exec();

    if (!order) {
      throw new NotFoundException('Order not found ❌');
    }

    return {
      message: 'Order updated successfully ✅',
      data: order,
    };
  }

  async delete(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid order ID ❌');
    }
  
    const order = await this.orderModel.findByIdAndDelete(id).exec();
    if (!order) {
      throw new NotFoundException('Order not found ❌');
    }
  
    return {
      message: 'Order deleted successfully ✅',
    };
  }
}