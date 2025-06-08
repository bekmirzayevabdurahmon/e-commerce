import { Body, Controller, Get, Post, UploadedFile } from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dtos";

@Controller('products')
export class ProductController {
    constructor( private service: ProductService) {}

    @Get()
    async getAll() {
        return await this.service.getAll();
    }

    @Post()
    async create(
        @Body() payload: CreateProductDto) {
        return await this.service.create(payload)
    }
}