import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dtos/register.dto";
import { ForgetPasswordDto, LoginDto, ResetPasswordDto } from "./dtos";

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @Post('register')
  async register(@Body() payload: RegisterDto) {
    return await this.service.register(payload);
  }

  @Post('login')
  async login(@Body() payload: LoginDto) {
    return await this.service.login(payload)
  }

  @Post('refresh')
  async refresh(@Body('refreshToken') refreshToken: string) {
    return this.service.refreshAccessToken(refreshToken);
  }

  @Post('forget-password')
  async forgetPassword(@Body() dto: ForgetPasswordDto) {
    return this.service.forgetPassword(dto.email);
  }

  @Post('reset-password')
  async resetPassword(@Body() dto: ResetPasswordDto) {
    return this.service.resetPassword(dto.token, dto.newPassword);
  }
}