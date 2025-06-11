import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dtos';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { Protected, Roles } from 'src/decorators';
import { UserRole } from 'src/enums';

@ApiTags('categories')
@ApiBearerAuth()
@Controller('categories')
export class CategoryController {
  constructor(private service: CategoryService) {}

  @Get()
  @Protected(true)
  @Roles([UserRole.ADMIN])
  @ApiOperation({ summary: 'Barcha kategoriyalarni olish' })
  @ApiResponse({ status: 200, description: 'Kategoriyalar ro‘yxati muvaffaqiyatli qaytarildi.', type: [CreateCategoryDto] })
  @ApiResponse({ status: 403, description: 'Ruxsat yo‘q (faqat admin uchun).' })
  async getAll() {
    return await this.service.getAll();
  }

  @Get(':id')
  @Protected(true)
  @Roles([UserRole.ADMIN])
  @ApiOperation({ summary: 'Kategoriyani ID bo‘yicha olish' })
  @ApiParam({ name: 'id', description: 'Kategoriya ID', example: '507f1f77bcf86cd799439011' })
  @ApiResponse({ status: 200, description: 'Kategoriya topildi.', type: CreateCategoryDto })
  @ApiResponse({ status: 404, description: 'Kategoriya topilmadi.' })
  @ApiResponse({ status: 403, description: 'Ruxsat yo‘q (faqat admin uchun).' })
  async getById(@Param('id') id: string) {
    return await this.service.getOne(id);
  }

  @Post()
  @Protected(true)
  @Roles([UserRole.ADMIN])
  @ApiOperation({ summary: 'Yangi kategoriya yaratish' })
  @ApiBody({ type: CreateCategoryDto })
  @ApiResponse({ status: 201, description: 'Kategoriya muvaffaqiyatli yaratildi.', type: CreateCategoryDto })
  @ApiResponse({ status: 403, description: 'Ruxsat yo‘q (faqat admin uchun).' })
  async create(@Body() payload: CreateCategoryDto) {
    return await this.service.create(payload);
  }

  @Patch(':id')
  @Protected(true)
  @Roles([UserRole.ADMIN])
  @ApiOperation({ summary: 'Kategoriyani yangilash' })
  @ApiParam({ name: 'id', description: 'Kategoriya ID', example: '507f1f77bcf86cd799439011' })
  @ApiBody({ type: UpdateCategoryDto })
  @ApiResponse({ status: 200, description: 'Kategoriya muvaffaqiyatli yangilandi.', type: UpdateCategoryDto })
  @ApiResponse({ status: 404, description: 'Kategoriya topilmadi.' })
  @ApiResponse({ status: 403, description: 'Ruxsat yo‘q (faqat admin uchun).' })
  async update(@Body() payload: UpdateCategoryDto, @Param('id') id: string) {
    return await this.service.update(id, payload);
  }

  @Delete(':id')
  @Protected(true)
  @Roles([UserRole.ADMIN])
  @ApiOperation({ summary: 'Kategoriyani o‘chirish' })
  @ApiParam({ name: 'id', description: 'Kategoriya ID', example: '507f1f77bcf86cd799439011' })
  @ApiResponse({ status: 200, description: 'Kategoriya muvaffaqiyatli o‘chirildi.' })
  @ApiResponse({ status: 404, description: 'Kategoriya topilmadi.' })
  @ApiResponse({ status: 403, description: 'Ruxsat yo‘q (faqat admin uchun).' })
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}