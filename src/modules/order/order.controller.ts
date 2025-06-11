import { Controller, Post, Get, Put, Delete, Param, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto, UpdateOrderDto } from './dtos';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { Protected, Roles } from 'src/decorators';
import { UserRole } from 'src/enums';

@ApiTags('orders')
@ApiBearerAuth()
@Controller('orders')
export class OrderController {
  constructor(private readonly service: OrderService) {}

  @Post()
  @Protected(true)
  @Roles([UserRole.USER])
  @ApiOperation({ summary: 'Yangi buyurtma yaratish' })
  @ApiBody({ type: CreateOrderDto })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Buyurtma muvaffaqiyatli yaratildi.', type: CreateOrderDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Noto‘g‘ri so‘rov ma’lumotlari.' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Ruxsat yo‘q (faqat foydalanuvchi uchun).' })
  async create(@Body() createOrderDto: CreateOrderDto) {
    return await this.service.create(createOrderDto);
  }

  @Get()
  @Protected(true)
  @Roles([UserRole.ADMIN])
  @ApiOperation({ summary: 'Barcha buyurtmalarni olish' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Buyurtmalar ro‘yxati muvaffaqiyatli qaytarildi.' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Ruxsat yo‘q (faqat admin uchun).' })
  async getAll() {
    return await this.service.getAll();
  }

  @Get(':id')
  @Protected(true)
  @Roles([UserRole.USER, UserRole.ADMIN])
  @ApiOperation({ summary: 'Buyurtmani ID bo‘yicha olish' })
  @ApiParam({ name: 'id', description: 'Buyurtma ID si', example: '507f1f77bcf86cd799439011' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Buyurtma topildi.', type: CreateOrderDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Buyurtma topilmadi.' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Ruxsat yo‘q.' })
  async getOne(@Param('id') id: string) {
    return await this.service.getOne(id);
  }

  @Put(':id')
  @Protected(true)
  @Roles([UserRole.ADMIN])
  @ApiOperation({ summary: 'Buyurtmani yangilash' })
  @ApiParam({ name: 'id', description: 'Buyurtma ID si', example: '507f1f77bcf86cd799439011' })
  @ApiBody({ type: UpdateOrderDto })
  @ApiResponse({ status: HttpStatus.OK, description: 'Buyurtma muvaffaqiyatli yangilandi.', type: UpdateOrderDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Buyurtma topilmadi.' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Ruxsat yo‘q (faqat admin uchun).' })
  async update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return await this.service.update(id, updateOrderDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Protected(true)
  @Roles([UserRole.ADMIN])
  @ApiOperation({ summary: 'Buyurtmani o‘chirish' })
  @ApiParam({ name: 'id', description: 'Buyurtma ID si', example: '507f1f77bcf86cd799439011' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Buyurtma muvaffaqiyatli o‘chirildi.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Buyurtma topilmadi.' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Ruxsat yo‘q (faqat admin uchun).' })
  async delete(@Param('id') id: string) {
    await this.service.delete(id);
    return null;
  }
}