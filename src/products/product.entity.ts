import {
  Column,
  DataType,
  Table,
  Model,
  Unique
} from 'sequelize-typescript';

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
  declare category: string;

  @Column({
    type: DataType.STRING
  })
  declare description: string;

  @Column({
    type: DataType.STRING
  })
  declare image: string
}