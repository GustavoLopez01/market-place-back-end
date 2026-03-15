import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import type { Response, Request } from 'express';
import { Public } from '../auth/isPublic';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) { }

  @Get()
  async getAll(@Res() res: Response) {
    const response = await this.userService.getAll();
    return res.status(HttpStatus.OK).json({
      success: true,
      users: response
    });
  }

  @Get('/get-user')
  async getUserByToken(
    @Req() req: Request,
    @Res() res: Response
  ) {
    const user = req["user"];
    if (!user?.username) {
      return res.status(HttpStatus.OK).json({
        success: false,
        message: 'El id del usuario es requerido.'
      });
    }

    const response = await this.userService.findOne(user.username);
    if (!response) {
      return res.status(HttpStatus.OK).json({
        success: false,
        message: `No existe usuario con correo electrónico ${user.username}`
      });
    }

    return res.status(HttpStatus.OK).json({
      success: true,
      user: response
    });
  }

  @Get('/:id')
  async findById(
    @Param('id', new ParseIntPipe({
      errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE
    }))
    id: User['id'],
    @Res() res: Response
  ) {
    const response = await this.userService.findById(id);
    if (!response) {
      return res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        message: `No existe usuario con id ${id}`
      });
    }

    return res.status(HttpStatus.OK).json({
      success: true,
      user: response
    });
  }

  @Post()
  @Public()
  async save(
    @Body() createUser: CreateUserDto,
    @Res() res: Response
  ) {
    const response = await this.userService.save(createUser);
    if (!response) {
      return res.status(HttpStatus.OK).json({
        success: false,
        message: `Ya existe un usuario con el correo electrónico ${createUser.email}`
      });
    }

    return res.status(HttpStatus.OK).json({
      success: true,
      user: response
    });
  }

  @Put('/:id')
  async update(
    @Param('id', new ParseIntPipe({
      errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE
    }))
    id: User['id'],
    @Body() user: CreateUserDto,
    @Res() res: Response
  ) {
    const response = await this.userService.update(id, user);

    if (!response) {
      return res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        message: `No existe usuario con id ${id}`
      });
    }

    return res.status(HttpStatus.OK).json({
      success: true,
      user: response
    });
  }
}
