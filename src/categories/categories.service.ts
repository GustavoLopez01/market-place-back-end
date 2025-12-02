import {
  BadRequestException,
  Inject,
  Injectable
} from '@nestjs/common';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @Inject('CATEGORIES_REPOSITORY')
    private categoryRepository: typeof Category
  ) { }

  async getAll(): Promise<Category[] | null> {
    try {
      return await this.categoryRepository.findAll();
    } catch (error) {
      console.error(`Ocurrió un error al obtener las categorias : ${error}`);
      throw new BadRequestException(`Ocurrió un error al obtener las categorias : ${error}`);
    }
  }

  async findById(id: Category['id']): Promise<Category | null> {
    try {
      return await this.categoryRepository.findByPk(id);
    } catch (error) {
      console.error(`Ocurrió un error al obtener la categoria : ${error}`);
      throw new BadRequestException(`Ocurrió un error al obtener la categoria : ${error}`);
    }
  }

  async save(category: CreateCategoryDto): Promise<Category | null> {
    try {
      const existCategory = await this.categoryRepository.findOne({
        where: {
          name: category.name
        }
      });
      if(existCategory) return null;

      return await this.categoryRepository.create({
        ...category
      });
    } catch (error) {
      console.error(`Ocurrió un error al guardar la categoria : ${error}`);
      throw new BadRequestException(`Ocurrió un error al guardar la categoria : ${error}`);
    }
  }

  async update(id: Category['id'], category: CreateCategoryDto): Promise<Category | null> {
    try {
      const existCategory = await this.categoryRepository.findByPk(id);
      if (!existCategory) return null;

      const response = await existCategory.update({
        ...category
      });

      return response;
    } catch (error) {
      console.error(`Ocurrió un error al actualizar la categoria : ${error}`);
      throw new BadRequestException(`Ocurrió un error al actualizar la categoria : ${error}`);
    }
  }

  async delete(id: Category['id']) {
    try {
      const existCategory = await this.categoryRepository.findByPk(id);
      if (!existCategory) return null;
      return await existCategory.destroy();
    } catch (error) {
      console.error(`Ocurrió un error al eliminar la categoria : ${error}`);
      throw new BadRequestException(`Ocurrió un error al eliminar la categoria : ${error}`);
    }
  }
}
