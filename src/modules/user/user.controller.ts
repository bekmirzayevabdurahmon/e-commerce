import { Controller, Post, Body, Get, Param, Delete, Query, ParseIntPipe, Patch } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dtos";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { FindUserDto } from "./dtos/find-filter.dto";
import { Protected, Roles } from "src/decorators";
import { UserRole } from "src/enums";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Protected(true)
  @Roles([UserRole.ADMIN])
  @Post()
  async create(@Body() payload: CreateUserDto) {
    return this.userService.create(payload);
  }

  @Protected(true)
  @Roles([UserRole.ADMIN])
  @Get()
  async findAll(@Query() query: FindUserDto) {
    return this.userService.findAll(query);
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.userService.findById(id);
  }

  @Patch(":id")
  async update(
    @Param('id') id: string,
    @Body() payload: UpdateUserDto
  ) {
    return this.userService.update(id, payload)
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.userService.delete(id);
  }
}
