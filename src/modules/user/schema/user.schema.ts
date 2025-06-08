import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { UserRole } from "src/enums";

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  phoneNumber: string;

  @Prop({ required: true })
  password: string;

  @Prop({ enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Prop()
  companyName?: string;

  @Prop({ default: false })
  isVerified: boolean;

  @Prop()
  refreshToken?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
