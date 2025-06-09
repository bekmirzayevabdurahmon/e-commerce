import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CreateCategoryDto, UpdateCategoryDto } from "./dtos";

@Controller('categories')
export class CategoryController {
    constructor( private service: CategoryService) {}

    @Get()
    async getAll() {
        return await this.service.getAll()
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        return await this.service.getOne(id)
    }

    @Post()
    async create(@Body() payload: CreateCategoryDto) {
        return await this.service.create(payload)
    }

    @Patch(':id')
    async update(
        @Body() payload: UpdateCategoryDto,
        @Param('id') id: string,    
    ) {
        return await this.service.update(id, payload)
    }

    @Delete(':id')
    async delete(
        @Param('id') id: string
    ) {
        return await this.service.delete(id)
    }


} 