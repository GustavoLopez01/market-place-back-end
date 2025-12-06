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
import { Order } from './order.entity';
import { OrdersService } from './orders.service';
import { CreateOrder } from './dto/order.dto';
import type { Response } from 'express';

@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) { }

  @Get()
  async getAll(@Res() res: Response) {
    const response = await this.orderService.getAll();
    return res.status(HttpStatus.OK).json({
      success: true,
      orders: response
    })
  }

  @Get('/:id')
  async findById(
    @Param('id', new ParseIntPipe({
      errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE
    }))
    id: Order['id'],
    @Res() res: Response
  ) {
    const response = await this.orderService.findById(id);
    return res.status(HttpStatus.OK).json({
      success: true,
      order: response
    })
  }

  @Post()
  async save(
    @Body() order: CreateOrder,
    @Res() res: Response
  ) {
    const response = await this.orderService.save(order);
    return res.status(HttpStatus.OK).json({
      success: true,
      response
    });
  }

  @Put('/:id')
  async update(
    @Param('id', new ParseIntPipe({
      errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE
    }))
    id: Order['id'],
    @Body() order: CreateOrder,
    @Res() res: Response
  ) {
    const response = await this.orderService.update(id, order);
    if (!response) {
      res.status(HttpStatus.NOT_FOUND).json({
        success: true,
        message: `No existe orden con id ${id}`
      })
    }
    return res.status(HttpStatus.OK).json({
      success: true,
      order: response
    });
  }

  @Delete('/:id')
  async delete(
    @Param('id', new ParseIntPipe({
      errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE
    }))
    id: Order['id'],
    @Res() res: Response
  ) {
    const response = await this.orderService.delete(id);
    if (!response) {
      return res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        message: `No existe orden con id ${id}`
      });
    }
    return res.status(HttpStatus.OK).json({
      success: true,
      message: `Se elimino la orden correctamente.`
    });
  }
}
