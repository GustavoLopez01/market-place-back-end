import { 
  BadRequestException, 
  Inject, 
  Injectable
} from '@nestjs/common';
import { Order } from './order.entity';
import { CreateOrder } from './dto/order.dto';
import { OrderProducts } from './orderProduct.entity';

@Injectable()
export class OrdersService {
  constructor(
    @Inject('ORDER_REPOSITORY')
    private orderRepository: typeof Order
  ) { }

  async getAll() {
    return this.orderRepository.findAll();
  }

  async findById(id: Order['id']) {
    try {
      return await this.orderRepository.findByPk(id);
    } catch (error) {
      console.error(`Ocurrió un error al obtener la orden : ${error}`);
    }
  }

  async save(order: CreateOrder) {
    try {
      const response = await this.orderRepository.create({
        ...order
      });

      if (!response) return null;

      const orderId = response.id;
      const products = order.products.map(productId => ({ productId, orderId }));
      const orderProducts = await OrderProducts.bulkCreate(products);

      return {
        ...response.dataValues,
        products: orderProducts
      }
    } catch (error) {
      console.error(`Ocurrió un error al guardar la orden : ${error}`);
      throw new BadRequestException(`Ocurrió un error al guardar la orden : ${error}`);
    }
  }

  async update(id: Order['id'], order: CreateOrder) {
    try {
      const existOrder = await this.orderRepository.findByPk(id);
      if (!existOrder) return null;

      const response = await this.orderRepository.update({
        ...order
      }, {
        where: {
          id
        }
      });
      return response;
    } catch (error) {
      console.error(`Ocurrió un error al actualizar la orden : ${error}`);
      throw new BadRequestException(`Ocurrió un error al actualizar la orden : ${error}`);
    }
  }

  async delete(id: Order['id']) {
    try {
      const existOrder = await this.orderRepository.findByPk(id);
      if (!existOrder) return null;

      return await this.orderRepository.destroy({
        where: { id }
      });
    } catch (error) {
      console.error(`Ocurrió un error al eliminar la orden: ${error}`);
      throw new BadRequestException(`Ocurrió un error al eliminar la orden: ${error}`);
    }
  }
}
