import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserModule } from "../user";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        JwtModule.register({
            secret: process.env.ACCESS_TOKEN_SECRET || "secret_key",
            signOptions: { expiresIn: process.env.ACCESS_TOKEN_SECRET_TIME || '900' }
        }),
        UserModule,
    ],
    providers: [AuthService],
    controllers: [AuthController],
})

export class AuthModule {}