import { Body, Controller, Get, Post } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dtos";

@Controller('categories')
export class CategoryController {
    constructor( private service: CategoryService) {}

    @Get()
    async getAll () {
        return await this.service.getAll()
    }

    @Post()
    async create(@Body() payload: CreateCategoryDto) {
        return await this.service.create(payload)
    }
} 