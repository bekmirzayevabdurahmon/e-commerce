import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFiles, UseInterceptors, HttpCode, HttpStatus } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './dtos';
import { ApiOperation, ApiResponse, ApiTags, ApiConsumes, ApiBody, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { Protected, Roles } from 'src/decorators';
import { UserRole } from 'src/enums';

@ApiTags('products')
@ApiBearerAuth()
@Controller('products')
export class ProductController {
  constructor(private service: ProductService) {}

  @Get()
  @ApiOperation({ summary: 'Barcha mahsulotlarni olish' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Mahsulotlar ro‘yxati muvaffaqiyatli qaytarildi.', type: [CreateProductDto] })
  async getAll() {
    return await this.service.getAll();
  }

  @Get(':id')
  @Protected(true)
  @Roles([UserRole.USER, UserRole.ADMIN])
  @ApiOperation({ summary: 'Mahsulotni ID bo‘yicha olish' })
  @ApiParam({ name: 'id', description: 'Mahsulot ID si', example: '507f1f77bcf86cd799439011' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Mahsulot topildi.', type: CreateProductDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Mahsulot topilmadi.' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Ruxsat yo‘q.' })
  async getById(@Param('id') id: string) {
    return await this.service.getById(id);
  }

  @Post()
  @Protected(true)
  @Roles([UserRole.ADMIN])
  @ApiOperation({ summary: 'Yangi mahsulot yaratish' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Smartphone X' },
        description: { type: 'string', example: 'A high-end smartphone' },
        price: { type: 'number', example: 599.99 },
        brand: { type: 'string', example: 'BrandX' },
        categoryId: { type: 'string', example: '60f7b1a2c3d4e5f67890abcd' },
        color: { type: 'string', example: 'Black' },
        ram: { type: 'string', example: '8GB' },
        storage: { type: 'string', example: '128GB' },
        processor: { type: 'string', example: 'Octa-core' },
        battery: { type: 'string', example: '4000mAh' },
        camera: { type: 'string', example: '48MP' },
        selfieCamera: { type: 'string', example: '12MP' },
        stock: { type: 'number', example: 100 },
        sellerId: { type: 'string', example: '60f7b1a2c3d4e5f67890abcd' },
        images: { type: 'array', items: { type: 'string', format: 'binary' } },
      },
    },
  })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Mahsulot muvaffaqiyatli yaratildi.', type: CreateProductDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Noto‘g‘ri so‘rov ma’lumotlari.' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Ruxsat yo‘q (faqat admin uchun).' })
  @UseInterceptors(FilesInterceptor('images'))
  async create(@Body() payload: CreateProductDto, @UploadedFiles() files: Express.Multer.File[]) {
    return await this.service.create(payload, files);
  }

  @Put(':id')
  @Protected(true)
  @Roles([UserRole.ADMIN])
  @ApiOperation({ summary: 'Mahsulotni yangilash' })
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'id', description: 'Mahsulot ID si', example: '507f1f77bcf86cd799439011' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Smartphone X' },
        description: { type: 'string', example: 'A high-end smartphone' },
        price: { type: 'number', example: 599.99 },
        brand: { type: 'string', example: 'BrandX' },
        categoryId: { type: 'string', example: '60f7b1a2c3d4e5f67890abcd' },
        color: { type: 'string', example: 'Black' },
        ram: { type: 'string', example: '8GB' },
        storage: { type: 'string', example: '128GB' },
        processor: { type: 'string', example: 'Octa-core' },
        battery: { type: 'string', example: '4000mAh' },
        camera: { type: 'string', example: '48MP' },
        selfieCamera: { type: 'string', example: '12MP' },
        stock: { type: 'number', example: 100 },
        sellerId: { type: 'string', example: '60f7b1a2c3d4e5f67890abcd' },
        images: { type: 'array', items: { type: 'string', format: 'binary' } },
      },
    },
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Mahsulot muvaffaqiyatli yangilandi.', type: UpdateProductDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Mahsulot topilmadi.' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Ruxsat yo‘q (faqat admin uchun).' })
  @UseInterceptors(FilesInterceptor('images'))
  async update(@Param('id') id: string, @Body() payload: UpdateProductDto, @UploadedFiles() files: Express.Multer.File[]) {
    return await this.service.update(id, payload, files);
  }

  @Delete(':id')
  @Protected(true)
  @Roles([UserRole.ADMIN])
  @ApiOperation({ summary: 'Mahsulotni o‘chirish' })
  @ApiParam({ name: 'id', description: 'Mahsulot ID si', example: '507f1f77bcf86cd799439011' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Mahsulot muvaffaqiyatli o‘chirildi.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Mahsulot topilmadi.' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Ruxsat yo‘q (faqat admin uchun).' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    await this.service.delete(id);
    return null;
  }
}