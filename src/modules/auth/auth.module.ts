import { Module, forwardRef } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserModule } from "../user/user.module"; // <-- Yo‘lga e’tibor bering!
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
        forwardRef(() => UserModule), // <-- MUHIM!
    ],
    providers: [AuthService],
    controllers: [AuthController],
    exports: [JwtModule, AuthService],
})
export class AuthModule {}