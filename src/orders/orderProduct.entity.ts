import {
  Column,
  ForeignKey,
  Model,
  Table
} from 'sequelize-typescript';
import { Order } from './order.entity';
import { Product } from 'src/products/product.entity';

@Table({
  tableName: 'order_products'
})
export class OrderProducts extends Model {
  
  @ForeignKey(() => Order)
  @Column
  declare orderId: number;

  @ForeignKey(() => Product)
  @Column
  declare productId: number;
}