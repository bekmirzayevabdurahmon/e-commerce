import {
  ConflictException,
  Injectable,
  UnauthorizedException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User, UserDocument } from '../user';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { LoginDto, RegisterDto } from './dtos';
import * as nodemailer from 'nodemailer';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(payload: RegisterDto) {
    await this.#_checkExistUserByEmailAndPhone(
      payload.email,
      payload.phoneNumber,
    );

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

    const accessToken = this.jwtService.sign(
      { id: user.id, role: user.role },
      { expiresIn: '15m' },
    );

    const refreshToken = this.jwtService.sign(
      { id: user.id },
      { expiresIn: '7d' },
    );

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

  async login(payload: LoginDto) {
    const user = await this.userModel.findOne({ email: payload.email });

    if (!user) {
      throw new ConflictException(`User not found`);
    }

    const isMatch = await bcrypt.compare(payload.password, user.password);
    if (!isMatch) {
      throw new ConflictException(`Password is incorrect`);
    }

    const accessToken = this.jwtService.sign(
      { id: user.id, role: user.role },
      { expiresIn: '15m' },
    );

    const refreshToken = this.jwtService.sign(
      { id: user.id },
      { expiresIn: '7d' },
    );

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

  async refreshAccessToken(refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token is required');
    }

    const user = await this.userModel.findOne({ refreshToken });

    if (!user) {
      throw new UnauthorizedException('Refresh token not found');
    }

    try {
      this.jwtService.verify(refreshToken);

      const newAccessToken = this.jwtService.sign(
        { id: user.id, role: user.role },
        { expiresIn: '15m' },
      );

      return {
        message: 'Access token refreshed ✅',
        accessToken: newAccessToken,
      };
    } catch (error) {
      throw new UnauthorizedException('Refresh token expired or invalid');
    }
  }

  async forgetPassword(email: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const token = this.jwtService.sign(
      { id: user.id, email: user.email },
      { expiresIn: '30m' }
    );

    const frontendUrl =
      this.configService.get<string>('FRONTEND_URL') || 'http://localhost:3000';
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
    } catch (err) {
      throw new BadRequestException('Email yuborilmadi: ' + err.message);
    }

    return { message: 'Reset link sent to email' };
  }

  async resetPassword(token: string, newPassword: string) {
    let payload: any;
    try {
      payload = this.jwtService.verify(token);
    } catch (e) {
      throw new BadRequestException('Token is invalid or expired');
    }
    const user = await this.userModel.findById(payload.id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    return { message: 'Password successfully changed' };
  }

  async #_checkExistUserByEmailAndPhone(email: string, phoneNumber: string) {
    const user = await this.userModel.findOne({
      $or: [{ email: email }, { phoneNumber: phoneNumber }],
    });

    if (user) {
      throw new ConflictException(`This email already used`);
    }

    return true;
  }
}