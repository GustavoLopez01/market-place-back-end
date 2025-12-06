import {
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table
} from 'sequelize-typescript';
import { User } from 'src/users/user.entity';
import { OrderProducts } from './orderProduct.entity';
import { Product } from 'src/products/product.entity';

@Table({
  tableName: 'orders'
})
export class Order extends Model {

  @Column({
    type: DataType.INTEGER
  })
  declare quantityProducts: number;

  @Column({
    type: DataType.INTEGER
  })
  declare total: number;

  @ForeignKey(() => User)
  @Column
  declare userId: number;

  @BelongsToMany(() => Product, {
    through: () => OrderProducts,
    foreignKey: 'orderId'
  })
  declare products: OrderProducts[];
}