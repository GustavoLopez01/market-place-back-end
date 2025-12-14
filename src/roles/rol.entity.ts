import {
  Column,
  DataType,
  HasMany,
  Model,
  Table
} from 'sequelize-typescript';
import { User } from 'src/users/user.entity';

@Table({
  tableName: 'roles'
})
export class Rol extends Model {

  @Column({
    type: DataType.STRING
  })
  declare name: string;

  @Column({
    type: DataType.STRING
  })
  declare description: string;

  @HasMany(() => User)
  declare users: User[];

}