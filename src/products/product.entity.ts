import {
  Column,
  DataType,
  Table,
  Model,
  Unique,
  BelongsTo,
  ForeignKey
} from 'sequelize-typescript';
import { Category } from 'src/categories/category.entity';

@Table({
  tableName: 'products'
})
export class Product extends Model {

  @Unique
  @Column({
    type: DataType.STRING
  })
  declare name: string;

  @Column({
    type: DataType.INTEGER
  })
  declare price: number;

  @Column({
    type: DataType.INTEGER
  })
  declare quantity: number;

  @Column({
    type: DataType.STRING
  })
  declare description: string;

  @Column({
    type: DataType.STRING
  })
  declare image: string;

  @ForeignKey(() => Category)
  @Column
  declare categoryId: number;

  @BelongsTo(() => Category)
  declare category: Category;
}