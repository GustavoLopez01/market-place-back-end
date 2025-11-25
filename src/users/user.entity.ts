import {
  Column,
  DataType,
  Default,
  Model,
  Table,
  Unique
} from 'sequelize-typescript';

@Table
export class User extends Model {

  @Column({
    type: DataType.STRING
  })
  declare name: string;

  @Unique
  @Column({
    type: DataType.STRING,
  })
  declare email: string;

  @Column({
    type: DataType.STRING
  })
  declare phoneNumber: string;

  @Column({
    type: DataType.STRING
  })
  declare lastName: string;

  @Column({
    type: DataType.STRING
  })
  declare password: string;

  @Column({
    type: DataType.BOOLEAN
  })
  declare isEnabled: boolean;

}
