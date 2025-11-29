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
  Res,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { CreateProduct } from './dto/product.dto';
import type { Response } from 'express';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) { }

  @Get()
  async getAll() {
    return await this.productService.getAll();
  }

  @Get('/:id')
  async findById(
    @Param('id', new ParseIntPipe({
      errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE
    }))
    id: Product['id'],
    @Res() res: Response
  ) {
    const response = await this.productService.findById(id)
    if (!response) {
      res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        message: `No existe producto con id ${id}`
      });
    }

    return res.status(HttpStatus.OK).json({
      success: true,
      product: response
    });
  }

  @Post()
  async save(
    @Body() product: CreateProduct,
    @Res() res: Response
  ) {
    const response = await this.productService.create(product);
    if (!response) {
      return res.status(HttpStatus.OK).json({
        success: false,
        message: `Ya existe un producto con el nombre de ${product.name}`
      });
    }

    return res.status(HttpStatus.OK).json({
      success: true,
      product: response
    });
  }

  @Put('/:id')
  async update(
    @Param('id', new ParseIntPipe({
      errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE
    }))
    id: Product['id'],
    @Body() product: CreateProduct,
    @Res() res: Response
  ) {
    const response = await this.productService.update(id, product);
    if (!response) {
      return res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        message: `No existe producto con id ${id}`
      });
    }

    return res.status(HttpStatus.OK).json({
      success: true,
      product: response
    });
  }

  @Delete('/:id')
  async delete(
    @Param('id', new ParseIntPipe({
      errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE
    }))
    id: Product['id'],
    @Res() res: Response
  ) {
    const response = await this.productService.delete(id);
    if (!response) {
      return res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        message: `No existe producto con id ${id}`
      });
    }

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Producto eliminado correctamente'
    });
  }
}
