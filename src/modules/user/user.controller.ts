import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  Req,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto, FindUserDto } from './dtos';
import { Protected, Roles } from 'src/decorators';
import { UserRole } from 'src/enums';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CheckAuthGuard, CheckRolesGuard } from 'src/guards';
import { Request } from 'express';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(CheckAuthGuard, CheckRolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Protected(true)
  @Roles([UserRole.ADMIN])
  @Post()
  @ApiOperation({ summary: 'Yangi foydalanuvchi yaratish (faqat admin)' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'Foydalanuvchi yaratildi.',
    type: CreateUserDto,
  })
  @ApiResponse({ status: 403, description: 'Ruxsat yo‘q.' })
  async create(@Body() payload: CreateUserDto) {
    return this.userService.create(payload);
  }

  @Protected(true)
  @Roles([UserRole.ADMIN])
  @Get()
  @ApiOperation({ summary: 'Barcha foydalanuvchilar (admin)' })
  @ApiQuery({
    type: FindUserDto,
    description: 'Filtr uchun query parametrlari',
  })
  @ApiResponse({
    status: 200,
    description: 'Foydalanuvchilar ro‘yxati.',
    type: [CreateUserDto],
  })
  async findAll(@Query() query: FindUserDto) {
    return this.userService.findAll(query);
  }

  @Get('me')
  @Protected(true)
  @Roles([UserRole.USER, UserRole.SELLER, UserRole.ADMIN])
  @ApiOperation({ summary: 'Avtorizatsiyalangan foydalanuvchini olish' })
  @ApiResponse({
    status: 200,
    description: 'Foydalanuvchining o‘zi',
    type: CreateUserDto,
  })
  
  async getMe(@Req() req: Request) {
    const userFromToken: any = req.user;

    if (!userFromToken) {
      throw new NotFoundException('Token foydalanuvchisi topilmadi!');
    }

    const userId = userFromToken.id || userFromToken._id || userFromToken.sub;

    if (!userId) {
      throw new NotFoundException('Foydalanuvchi ID topilmadi!');
    }

    const user = await this.userService.findById(userId);
    if (!user) {
      throw new NotFoundException('Foydalanuvchi topilmadi!');
    }

    return { data: filterUser(user) };
  }

  @Get(':id')
  @Protected(true)
  @Roles([UserRole.USER, UserRole.ADMIN])
  @ApiOperation({ summary: 'Foydalanuvchini ID bo‘yicha olish' })
  @ApiParam({ name: 'id', description: 'Foydalanuvchi ID' })
  async findOne(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Patch(':id')
  @Protected(true)
  @Roles([UserRole.USER, UserRole.ADMIN])
  @ApiOperation({ summary: 'Foydalanuvchini yangilash' })
  @ApiParam({ name: 'id', description: 'Foydalanuvchi ID' })
  @ApiBody({ type: UpdateUserDto })
  async update(@Param('id') id: string, @Body() payload: UpdateUserDto) {
    return this.userService.update(id, payload);
  }

  @Delete(':id')
  @Protected(true)
  @Roles([UserRole.ADMIN])
  @ApiOperation({ summary: 'Foydalanuvchini o‘chirish (admin)' })
  @ApiParam({ name: 'id', description: 'Foydalanuvchi ID' })
  async remove(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}

// Foydalanuvchi ma’lumotidan maxfiy maydonlarni olib tashlash
function filterUser(user: any) {
  if (!user) return user;
  const obj = user.toObject ? user.toObject() : { ...user };
  delete obj.password;
  delete obj.__v;
  return obj;
}
