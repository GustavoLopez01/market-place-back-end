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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { unlink } from 'fs/promises';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { CreateProduct } from './dto/product.dto';
import type { Response } from 'express';
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) { }

  @Get()
  async getAll(
    @Res() res: Response
  ) {
    const products = await this.productService.getAll();
    return res.status(HttpStatus.OK).json({
      success: true,
      products
    });
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

  @Get('/get-image-product/:id')
  async findImageByProductId(
    @Param('id', new ParseIntPipe({
      errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE
    }))
    id: Product['id'],
    @Res() res: Response
  ) {
    const response = await this.productService.findImageByProductId(id);
    if (!response) {
      return res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        message: `No existe imagen del producto con id ${id}`
      });
    }
    return response.pipe(res);
  }

  @Post()
  @UseInterceptors(FileInterceptor('productImage', {
    storage: diskStorage({
      destination: './uploads', // folder where files will be saved
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        callback(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
      },
    }),
  }))
  async save(
    @UploadedFile() file: Express.Multer.File,
    @Body() product: CreateProduct,
    @Res() res: Response
  ) {
    const response = await this.productService.create({
      ...product,
      image: file.filename
    });
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
  @UseInterceptors(FileInterceptor('productImage', {
    storage: diskStorage({
      destination: './uploads', // folder where files will be saved
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        callback(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
      },
    }),
  }))
  async update(
    @UploadedFile() file: Express.Multer.File,
    @Param('id', new ParseIntPipe({
      errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE
    }))
    id: Product['id'],
    @Body() product: CreateProduct,
    @Res() res: Response,
  ) {
    if (product.image && file?.filename) {
      const filePath = join(process.cwd(), 'uploads', product.image);
      try {
        await unlink(filePath)
      } catch (error) {
        console.log(error);
      }
    }

    const currentImage = file?.filename ? file?.filename : product.image;
    const response = await this.productService.update(id, {
      ...product,
      image: currentImage
    });

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
