import { Controller, Post, Get, Patch, Delete, Param, Body, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto, FindUserDto } from './dtos';
import { Protected, Roles } from 'src/decorators';
import { UserRole } from 'src/enums';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Protected(true)
  @Roles([UserRole.ADMIN])
  @Post()
  @ApiOperation({ summary: 'Yangi foydalanuvchi yaratish (faqat admin uchun)' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'Foydalanuvchi muvaffaqiyatli yaratildi.', type: CreateUserDto })
  @ApiResponse({ status: 403, description: 'Ruxsat yo‘q (faqat admin uchun).' })
  async create(@Body() payload: CreateUserDto) {
    return this.userService.create(payload);
  }

  @Protected(true)
  @Roles([UserRole.ADMIN])
  @Get()
  @ApiOperation({ summary: 'Barcha foydalanuvchilarni olish (faqat admin uchun)' })
  @ApiQuery({ type: FindUserDto, description: 'Foydalanuvchilarni filtrlash uchun so‘rov parametrlari' })
  @ApiResponse({ status: 200, description: 'Foydalanuvchilar ro‘yxati muvaffaqiyatli qaytarildi.', type: [CreateUserDto] })
  @ApiResponse({ status: 403, description: 'Ruxsat yo‘q (faqat admin uchun).' })
  async findAll(@Query() query: FindUserDto) {
    return this.userService.findAll(query);
  }

  @Get(':id')
  @Protected(true)
  @Roles([UserRole.USER, UserRole.ADMIN])
  @ApiOperation({ summary: 'Foydalanuvchini ID bo‘yicha olish' })
  @ApiParam({ name: 'id', description: 'Foydalanuvchi ID', example: '507f1f77bcf86cd799439011' })
  @ApiResponse({ status: 200, description: 'Foydalanuvchi topildi.', type: CreateUserDto })
  @ApiResponse({ status: 404, description: 'Foydalanuvchi topilmadi.' })
  @ApiResponse({ status: 403, description: 'Ruxsat yo‘q.' })
  async findOne(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Patch(':id')
  @Protected(true)
  @Roles([UserRole.USER, UserRole.ADMIN])
  @ApiOperation({ summary: 'Foydalanuvchini yangilash' })
  @ApiParam({ name: 'id', description: 'Foydalanuvchi ID', example: '507f1f77bcf86cd799439011' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: 'Foydalanuvchi muvaffaqiyatli yangilandi.', type: UpdateUserDto })
  @ApiResponse({ status: 404, description: 'Foydalanuvchi topilmadi.' })
  @ApiResponse({ status: 403, description: 'Ruxsat yo‘q.' })
  async update(@Param('id') id: string, @Body() payload: UpdateUserDto) {
    return this.userService.update(id, payload);
  }

  @Delete(':id')
  @Protected(true)
  @Roles([UserRole.ADMIN])
  @ApiOperation({ summary: 'Foydalanuvchini o‘chirish' })
  @ApiParam({ name: 'id', description: 'Foydalanuvchi ID', example: '507f1f77bcf86cd799439011' })
  @ApiResponse({ status: 200, description: 'Foydalanuvchi muvaffaqiyatli o‘chirildi.' })
  @ApiResponse({ status: 404, description: 'Foydalanuvchi topilmadi.' })
  @ApiResponse({ status: 403, description: 'Ruxsat yo‘q (faqat admin uchun).' })
  async remove(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}