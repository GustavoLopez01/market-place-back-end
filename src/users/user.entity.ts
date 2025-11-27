import {
  Column,
  DataType,
  Model,
  Table,
  Unique,
  BeforeCreate,
  BeforeUpdate
} from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';
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

  @BeforeCreate
  @BeforeUpdate
  static async encyptPassword(user: User) {
    const salts = 10;
    const password = await bcrypt.hash(user.password, salts);
    user.password = password;
  }
}
