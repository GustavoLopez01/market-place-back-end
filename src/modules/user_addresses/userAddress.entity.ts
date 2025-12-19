import { 
  BelongsTo,
  Column, 
  DataType, 
  ForeignKey, 
  Model, 
  Table
} from 'sequelize-typescript';
import { User } from '../users/user.entity';

@Table({
  tableName: 'user_addresses'
})
export class UserAddresses extends Model {

  @Column({
    type: DataType.STRING
  })
  declare street: string;

  @Column({
    type: DataType.STRING
  })
  declare extNumber: string;

  @Column({
    type: DataType.STRING
  })
  declare postalCode: string;

  @Column({
    type: DataType.STRING
  })
  declare settlement: string;

  @Column({
    type: DataType.STRING
  })
  declare city: string;

  @Column({
    type: DataType.STRING
  })
  declare state: string;

  @Column({
    type: DataType.STRING
  })
  declare country: string;

  @Column({
    type: DataType.STRING
  })
  declare phoneNumber: string;

  @Column({
    type: DataType.STRING
  })
  declare observations: string

  @ForeignKey(() => User)
  @Column
  declare userId: number;

  @BelongsTo(() => User)
  declare user: User;

}