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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const schema_1 = require("./schema");
const bcrypt = require("bcryptjs");
let UserService = class UserService {
    userModel;
    constructor(userModel) {
        this.userModel = userModel;
    }
    async create(payload) {
        const salt = await bcrypt.genSalt(10);
        const passHash = await bcrypt.hash(payload.password, salt);
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
        if (foundUser) {
            throw new common_1.BadRequestException(`User already exist`);
        }
        await this.userModel.create(user);
        return {
            message: "success ✅",
            data: user,
        };
    }
    async findAll(query) {
        const { page = '1', limit = '10', search, role, isVerified } = query;
        const pageNumber = parseInt(page);
        const pageSize = parseInt(limit);
        const filter = {};
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
        };
    }
    async findById(id) {
        if (!(0, mongoose_2.isValidObjectId)(id)) {
            throw new common_1.NotFoundException(`Invalid ID format: ${id}`);
        }
        const user = await this.userModel.findById(id).exec();
        if (!user) {
            throw new common_1.NotFoundException(`User not found with this ${id} ID`);
        }
        return {
            message: "success ✅",
            data: user,
        };
    }
    async update(id, payload) {
        if (!(0, mongoose_2.isValidObjectId)(id)) {
            throw new common_1.NotFoundException(`Invalid ID format: ${id}`);
        }
        const user = await this.userModel.findById(id);
        if (!user) {
            throw new common_1.NotFoundException(`User not found with this ${id} ID`);
        }
        const updatedUser = await this.userModel.findByIdAndUpdate(id, { $set: payload }, { new: true });
        return {
            message: "updated ✅",
            data: updatedUser,
        };
    }
    async delete(id) {
        if (!(0, mongoose_2.isValidObjectId)(id)) {
            throw new common_1.NotFoundException(`Invalid ID format: ${id}`);
        }
        const user = this.userModel.findById(id);
        if (!user) {
            throw new common_1.NotFoundException(`User not found with this ${id} ID`);
        }
        await this.userModel.deleteOne(user);
        return {
            message: "deleted 💯",
        };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
//# sourceMappingURL=user.service.js.map