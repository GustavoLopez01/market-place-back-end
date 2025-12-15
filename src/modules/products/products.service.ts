import {
  BadRequestException,
  Inject,
  Injectable
} from '@nestjs/common';
import { Product } from './product.entity';
import { CreateProduct } from './dto/product.dto';
import { Category } from 'src/modules/categories/category.entity';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('PRODUCTS_REPOSITORY')
    private productRepository: typeof Product
  ) { }

  async getAll(): Promise<Product[] | null> {
    return await this.productRepository.findAll({
      include: [Category]
    });
  }

  async findById(id: Product['id']): Promise<Product | null> {
    try {
      return this.productRepository.findByPk(id);
    } catch (error) {
      console.error(`Ocurrió un error al obtener el producto: ${error}`);
      throw new BadRequestException(`Ocurrió un error al obtener el producto: ${error}`);
    }
  }

  async create(product: CreateProduct): Promise<Product | null> {
    try {
      const existProduct = await this.productRepository.findOne({
        where: {
          name: product.name
        }
      });

      if (existProduct) {
        return null;
      }

      const response = await this.productRepository.create({
        ...product
      });
      return response;
    } catch (error) {
      console.error(`Ocurrió un error al crear el producto : ${error}`);
      throw new BadRequestException(`Ocurrió un error al crear el producto : ${error}`);
    }
  }

  async update(id: Product['id'], product: CreateProduct) {
    try {
      const existProduct = await this.productRepository.findByPk(id);
      if (!existProduct) return null;

      const response = await existProduct.update({
        ...product
      });

      return response;
    } catch (error) {
      console.error(`Ocurrió un error al actualizar el producto : ${error}`);
      throw new BadRequestException(`Ocurrió un error al actualizar el producto : ${error}`);
    }
  }

  async delete(id: Product['id']) {
    try {
      const existProduct = await this.productRepository.findByPk(id);
      if (!existProduct) return null;
      return await existProduct.destroy();
    } catch (error) {
      console.error(`Ocurrió un error al eliminar el producto : ${error}`);
      throw new BadRequestException(`Ocurrió un error al eliminar el producto : ${error}`);
    }
  }
}
