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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const jwt_1 = require("@nestjs/jwt");
const user_1 = require("../user");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcryptjs");
let AuthService = class AuthService {
    userModel;
    jwtService;
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    async register(payload) {
        await this.#_checkExistUserByEmailAndPhone(payload.email, payload.phoneNumber);
        const salt = await bcrypt.genSalt(10);
        const passHash = await bcrypt.hash(payload.password, salt);
        const user = await this.userModel.create({
            name: payload.name,
            email: payload.email,
            phoneNumber: payload.phoneNumber,
            password: passHash,
            companyName: payload.companyName,
            role: payload.role,
        });
        const accessToken = this.jwtService.sign({ id: user.id, role: user.role }, { expiresIn: '15m' });
        const refreshToken = this.jwtService.sign({ id: user.id }, { expiresIn: '7d' });
        user.refreshToken = refreshToken;
        await user.save();
        return {
            message: 'success ✅',
            data: {
                user,
                accessToken,
                refreshToken,
            },
        };
    }
    async login(payload) {
        const user = await this.userModel.findOne({ email: payload.email });
        if (!user) {
            throw new common_1.ConflictException(`User not found`);
        }
        const isMatch = await bcrypt.compare(payload.password, user.password);
        if (!isMatch) {
            throw new common_1.ConflictException(`Password is incorrect`);
        }
        const accessToken = this.jwtService.sign({ id: user.id, role: user.role }, { expiresIn: '15m' });
        const refreshToken = this.jwtService.sign({ id: user.id }, { expiresIn: '7d' });
        user.refreshToken = refreshToken;
        await user.save();
        return {
            message: 'success ✅',
            data: {
                user,
                accessToken,
                refreshToken,
            },
        };
    }
    async refreshAccessToken(refreshToken) {
        if (!refreshToken) {
            throw new common_1.UnauthorizedException('Refresh token is required');
        }
        const user = await this.userModel.findOne({ refreshToken });
        if (!user) {
            throw new common_1.UnauthorizedException('Refresh token not found');
        }
        try {
            const payload = this.jwtService.verify(refreshToken);
            const newAccessToken = this.jwtService.sign({ id: user.id, role: user.role }, { expiresIn: '15m' });
            return {
                message: 'Access token refreshed ✅',
                accessToken: newAccessToken,
            };
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Refresh token expired or invalid');
        }
    }
    async #_checkExistUserByEmailAndPhone(email, phoneNumber) {
        const user = await this.userModel.findOne({
            $or: [{ email: email }, { phoneNumber: phoneNumber }],
        });
        if (user) {
            throw new common_1.ConflictException(`This email already used`);
        }
        return true;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map