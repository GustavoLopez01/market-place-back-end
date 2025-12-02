import {
  Model,
  Column,
  DataType,
  Unique,
  HasMany,
  Table
} from 'sequelize-typescript';
import { Product } from 'src/products/product.entity';

@Table({
  tableName: 'categories'
})
export class Category extends Model {

  @Unique
  @Column({
    type: DataType.STRING
  })
  declare name: string;

  @Column({
    type: DataType.STRING
  })
  declare description: string

  @HasMany(() => Product)
  declare products: Product[]
}
