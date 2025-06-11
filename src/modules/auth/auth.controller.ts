import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dtos/register.dto";
import { LoginDto } from "./dtos";

@Controller('auth')
export class AuthController {
    constructor(
        private service: AuthService,
    ) {}

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
}