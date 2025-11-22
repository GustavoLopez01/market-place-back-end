import { Controller, Get, Post, Put } from '@nestjs/common';

@Controller('users')
export class UsersController {

  @Get()
  async getAll() {
    return []
  }

  @Post()
  async save() {
    return "";
  }

  @Put()
  async update() {
    return "";
  }

}
