import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from '../user';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { LoginDto, RegisterDto } from './dtos';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
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
      const payload = this.jwtService.verify(refreshToken);

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
