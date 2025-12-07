import { IsArray, IsNumber } from 'class-validator';
import { OrderProducts } from '../orderProduct.entity';

export class CreateOrder {
  @IsNumber({}, {
    message: 'La cantidad de productos debe ser un número'
  })
  quantityProducts: number;

  @IsNumber({}, {
    message: 'La cantidad de productos debe ser un número'
  })
  total: number;

  @IsNumber({}, {
    message: 'La cantidad de productos debe ser un número'
  })
  userId: number

  @IsArray({})
  products: OrderProducts[];
}