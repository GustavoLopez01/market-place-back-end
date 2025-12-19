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
import { CategoriesService } from './categories.service';
import { Category } from './category.entity';
import type { Response } from 'express';
import { CreateCategoryDto } from './dto/category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private categoryService: CategoriesService) { }

  @Get()
  async getAll() {
    return await this.categoryService.getAll();
  }

  @Get('/:id')
  async findById(
    @Param('id', new ParseIntPipe({
      errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE
    }))
    id: Category['id'],
    @Res() res: Response
  ) {
    const response = await this.categoryService.findById(id);
    if (!response) {
      return res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        message: `No existe categoria con id ${id}`
      });
    }

    return res.status(HttpStatus.OK).json({
      success: true,
      category: response
    });
  }

  @Post()
  async save(
    @Body() category: CreateCategoryDto,
    @Res() res: Response
  ) {
    const response = await this.categoryService.save(category);
    if (!response) {
      return res.status(HttpStatus.OK).json({
        success: false,
        message: `Ya existe la categoria con el nombre ${category.name}`
      })
    }

    return res.status(HttpStatus.OK).json({
      success: true,
      category: response
    });
  }

  @Put('/:id')
  async uodate(
    @Param('id', new ParseIntPipe({
      errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE
    }))
    id: Category['id'],
    @Body() category: CreateCategoryDto,
    @Res() res: Response
  ) {
    const response = await this.categoryService.update(id, category);
    if (!response) {
      return res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        message: `No existe categoria con id ${id}`
      });
    }

    return res.status(HttpStatus.OK).json({
      success: true,
      category: response
    });
  }

  @Delete('/:id')
  async delete(
    @Param('id', new ParseIntPipe({
      errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE
    }))
    id: Category['id'],
    @Res() res: Response
  ) {
    const response = await this.categoryService.delete(id);
    if (!response) {
      return res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        message: `No existe categoria con id ${id}`
      });
    }

    return res.status(HttpStatus.OK).json({
      success: true,
      category: response
    });
  }
}
