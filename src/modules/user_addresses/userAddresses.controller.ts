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
import { UserAddressesService } from './userAddresses.service';
import { UserAddresses } from './userAddress.entity';
import { isEmpty } from 'class-validator';
import { CreateUserAddress } from './dto/userAddresses.dto';
import type { Response } from 'express';

@Controller('addresses')
export class AddressesController {
  constructor(private userAddressService: UserAddressesService) { }

  @Get()
  async getAll(@Res() res: Response) {
    const response = await this.userAddressService.getAll();
    return res.status(HttpStatus.OK).json({
      success: true,
      addresses: response
    });
  }

  @Get('/by-user/:id')
  async getAllByUser(
    @Param('id', new ParseIntPipe({
      errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
    }))
    id: UserAddresses['id'],
    @Res() res: Response
  ) {
    const response = await this.userAddressService.getAllByUserId(id);
    if (isEmpty(response)) {
      return res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        message: `No existe usuario con id ${id}`
      });
    }

    return res.status(HttpStatus.OK).json({
      success: true,
      addresses: response
    });
  }

  @Get('/:id')
  async findById(
    @Param('id', new ParseIntPipe({
      errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE
    }))
    id: UserAddresses['id'],
    @Res() res: Response
  ) {
    const response = await this.userAddressService.findById(id)
    if (isEmpty(response)) {
      return res.status(HttpStatus.OK).json({
        success: false,
        message: `No existe dirección con id ${id}`
      });
    }

    return res.status(HttpStatus.OK).json({
      success: true,
      address: response
    });
  }

  @Post()
  async save(
    @Body() userAddress: CreateUserAddress,
    @Res() res: Response
  ) {
    const response = await this.userAddressService.save(userAddress);
    return res.status(HttpStatus.OK).json({
      success: true,
      address: response
    });
  }

  @Put('/:id')
  async update(
    @Param('id', new ParseIntPipe({
      errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE
    }))
    id: UserAddresses['id'],
    @Body() userAddress: CreateUserAddress,
    @Res() res: Response
  ) {
    const response = await this.userAddressService.update(id, userAddress);
    if (isEmpty(response)) {
      return res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        message: `No existe dirección con id ${id}`
      });
    }

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Dirección actualizada correctamente'
    });
  }

  @Delete('/:id')
  async delete(
    @Param('id', new ParseIntPipe({
      errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE
    }))
    id: UserAddresses['id'],
    @Res() res: Response
  ) {
    const response = await this.userAddressService.delete(id);
    if (isEmpty(response)) {
      return res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        message: `No existe dirección con id ${id}`
      });
    }

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Dirección eliminada correctamente'
    });
  }
}
