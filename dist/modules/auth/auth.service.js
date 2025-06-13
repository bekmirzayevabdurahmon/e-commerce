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
const config_1 = require("@nestjs/config");
const user_1 = require("../user");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
let AuthService = class AuthService {
    userModel;
    jwtService;
    configService;
    constructor(userModel, jwtService, configService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
        this.configService = configService;
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
            this.jwtService.verify(refreshToken);
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
    async forgetPassword(email) {
        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const token = this.jwtService.sign({ id: user.id, email: user.email }, { expiresIn: '30m' });
        const frontendUrl = this.configService.get('FRONTEND_URL') || 'http://localhost:3000';
        const resetLink = `${frontendUrl}/pages/auth/reset-password.html?token=${token}`;
        const transporter = nodemailer.createTransport({
            host: this.configService.get('EMAIL_HOST'),
            port: Number(this.configService.get('EMAIL_PORT')),
            secure: Number(this.configService.get('EMAIL_PORT')) === 465,
            auth: {
                user: this.configService.get('EMAIL_USER'),
                pass: this.configService.get('EMAIL_PASS'),
            },
        });
        try {
            await transporter.sendMail({
                from: `"E-commerce" <${this.configService.get('EMAIL_USER')}>`,
                to: user.email,
                subject: 'Parolni tiklash',
                html: `<p>Parolni tiklash uchun <a href="${resetLink}">shu yerga bosing</a>.</p>
        <p>Agar bu siz bo'lmasangiz, bu xabarni e'tiborsiz qoldiring.</p>`,
            });
        }
        catch (err) {
            throw new common_1.BadRequestException('Email yuborilmadi: ' + err.message);
        }
        return { message: 'Reset link sent to email' };
    }
    async resetPassword(token, newPassword) {
        let payload;
        try {
            payload = this.jwtService.verify(token);
        }
        catch (e) {
            throw new common_1.BadRequestException('Token is invalid or expired');
        }
        const user = await this.userModel.findById(payload.id);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();
        return { message: 'Password successfully changed' };
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
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map