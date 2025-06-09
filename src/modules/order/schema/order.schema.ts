import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type OrderDocument = HydratedDocument<Order>;

@Schema({ timestamps: true }) 
export class Order {
  @Prop({ required: true, type: String }) 
  userId: string;

  @Prop({ required: true, type: String }) 
  products: string;

  @Prop({ required: true, type: Number })
  totalPrice: number;

  @Prop({ required: true, type: String, default: 'pending' })
  status: string;

}

export const OrderSchema = SchemaFactory.createForClass(Order);