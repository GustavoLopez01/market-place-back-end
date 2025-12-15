import { 
  Body, 
  Controller, 
  Delete, 
  Get, 
  HttpStatus, 
  Param, 
  ParseIntPipe, 
  Post, 
  Put, 
  Res
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { Rol } from './rol.entity';
import type { Response } from 'express';
import { Public } from '../auth/isPublic';

@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) { }

  @Get()
  async getAll(@Res() res: Response) {
    const response = await this.rolesService.getAll();
    return res.status(HttpStatus.OK).json({
      success: true,
      roles: response
    })
  }

  @Get('/:id')
  async findById(
    @Param('id', new ParseIntPipe({
      errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE
    }))
    id: Rol['id'],
    @Res() res: Response
  ) {
    const response = await this.rolesService.findById(id);
    if (!response) {
      return res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        message: `No existe rol con id ${id}`
      });
    }

    return res.status(HttpStatus.OK).json({
      success: true,
      rol: response
    });
  }

  @Public()
  @Post()
  async save(
    @Body() rol: Rol,
    @Res() res: Response
  ) {
    const response = await this.rolesService.save(rol);
    if (!response) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: `Ocurrió un error al crear el rol`
      });
    }

    return res.status(HttpStatus.OK).json({
      success: true,
      rol: response
    });
  }

  @Put('/:id')
  async update(
    @Param('id', new ParseIntPipe({
      errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE
    }))
    id: Rol['id'],
    @Body() rol: Rol,
    @Res() res: Response
  ) {
    const response = await this.rolesService.update(id, rol);
    if (!response) {
      return res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        message: `No existe rol con id ${id}`
      });
    }

    return res.status(HttpStatus.OK).json({
      success: true,
      rol: response
    });
  }

  @Delete('/:id')
  async delete(
    @Param('id', new ParseIntPipe({
      errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE
    }))
    id: Rol['id'],
    @Res() res: Response
  ) {
    const response = await this.rolesService.delete(id);
    if (!response) {
      return res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        message: `No existe rol con id ${id}`
      });
    }

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Rol eliminado correctamente'
    });
  }
}
