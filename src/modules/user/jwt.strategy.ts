// import { Injectable } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { ConfigService } from '@nestjs/config';

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor(private configService: ConfigService) {
//     const secret = configService.get<string>('ACCESS_TOKEN_SECRET');
//     if (!secret) {
//       throw new Error('ACCESS_TOKEN_SECRET is not defined in .env');
//     }
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       secretOrKey: secret,
//     });
//   }

//   async validate(payload: any) {
//     return payload; // Foydalanuvchi ma'lumotlarini qaytarish
//   }
// }