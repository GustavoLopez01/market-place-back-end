import { OrderProducts } from '../orderProduct.entity';

export class CreateOrder {

  quantityProducts: number;

  total: number;

  userId: number

  products: OrderProducts[];
}