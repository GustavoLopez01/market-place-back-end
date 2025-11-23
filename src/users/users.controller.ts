import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import type { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) { }

  @Get()
  async getAll(@Res() response: Response) {
    const users = await this.userService.getAll();    
    return response.json({
      users
    });
  }

  @Get('/:id')
  async findById(@Param('id') id: number) {
    return await this.userService.findById(id);
  }

  @Post()
  async save(@Body() createUser: CreateUserDto) {
    return await this.userService.save(createUser);
  }

  @Put()
  async update(@Param('id') id: number, @Body() user: CreateUserDto) {
    return await this.userService.update(id, user);
  }

}
