import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService, TokenExpiredError, JsonWebTokenError } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { PROTECTED_KEY } from 'src/decorators';
import { UserRole } from 'src/enums';

@Injectable()
export class CheckAuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isProtected = this.reflector.getAllAndOverride<boolean>(PROTECTED_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest() as any;

    // Agar route protected bo'lmasa, USER rolini beramiz va o'tkazamiz
    if (!isProtected) {
      request.role = UserRole.USER;
      return true;
    }

    const authHeader = request.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new BadRequestException('Iltimos, Bearer token yuboring');
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      throw new BadRequestException('Access token yuborilmadi');
    }

    try {
      const payload = this.jwtService.verify(token);

      // ⚠️ Shartli qism: bu bilan `req.user` controllerda ishlaydi
      request.user = payload;

      // Ixtiyoriy qo‘shimchalar (istamasang olib tashlashing mumkin)
      request.userId = payload.id;
      request.role = payload.role;

      return true;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new ForbiddenException('Token vaqti tugagan');
      }

      if (error instanceof JsonWebTokenError) {
        throw new UnauthorizedException("Token noto'g'ri");
      }

      throw new InternalServerErrorException('Tokenni tekshirishda xatolik');
    }
  }
}
