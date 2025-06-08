import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { isValidObjectId, Model } from "mongoose";
import { User, UserDocument } from "./schema";
import { CreateUserDto } from "./dtos";
import { UpdateUserDto } from "./dtos/update-user.dto";
import * as bcrypt from "bcryptjs";
import { FindUserDto } from "./dtos/find-filter.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async create(payload: CreateUserDto) {
   
    const salt = await bcrypt.genSalt(10)
    const passHash = await  bcrypt.hash(payload.password, salt);

    const user = new this.userModel({
      name: payload.name,
      email: payload.email,
      phoneNumber: payload.phoneNumber,
      password: passHash,
      role: payload.role,
      companyName: payload.companyName,
      isVerified: payload.isVerified,
    });

    const foundUser = await this.userModel.findOne({
      $or: [
        { email: payload.email },
        { phoneNumber: payload.phoneNumber },
      ]
    });

    if(foundUser) {
      throw new BadRequestException(`User already exist`)
    }

    await this.userModel.create(user)
    
    return {
      message: "success ✅",
      data: user,
    }
  }

  async findAll(query: FindUserDto) {
    const { page = '1', limit = '10', search, role, isVerified } = query;

    const pageNumber = parseInt(page);
    const pageSize = parseInt(limit);

    const filter: any = {};

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    if (role) {
      filter.role = role;
    }

    if (isVerified !== undefined) {
      filter.isVerified = isVerified === 'true';
    }

    const total = await this.userModel.countDocuments(filter);
    const users = await this.userModel
      .find(filter)
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .exec();

    return {
      message: "success ✅",
      meta: {
        total,
        page: pageNumber,
        limit: pageSize,
        pages: Math.ceil(total / pageSize)
      },
      data: users,
    }
  }

  async findById(id: string) {
    if(!isValidObjectId(id)) {
      throw new NotFoundException(`Invalid ID format: ${id}`)
    }

    const user = await this.userModel.findById(id).exec();

    if(!user) {
      throw new NotFoundException(`User not found with this ${id} ID`)
    }

    return {
      message: "success ✅",
      data: user,
    }
  }

  async update(id: string, payload: UpdateUserDto) {
    if(!isValidObjectId(id)) {
      throw new NotFoundException(`Invalid ID format: ${id}`)
    }
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException(`User not found with this ${id} ID`);
    }

    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      { $set: payload },
      { new: true } 
    );

    return {
      message: "updated ✅",
      data: updatedUser,
    };
  }

  async delete(id: string) {
    if(!isValidObjectId(id)) {
      throw new NotFoundException(`Invalid ID format: ${id}`)
    }
    const user = this.userModel.findById(id)

    if(!user) {
      throw new NotFoundException(`User not found with this ${id} ID`)
    }

    await this.userModel.deleteOne(user)

    return {
      message: "deleted 💯",
    }
  }
}
