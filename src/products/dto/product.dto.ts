
import {
  IsString,
  IsNumber,
  IsNotEmpty,
} from 'class-validator';

export class CreateProduct {
  @IsString({
    message: 'El nombre debe ser una cadena de caracteres'
  })
  name: string;

  @IsNumber({}, {
    message: 'El precio debe ser un número'
  })
  price: number;

  @IsNumber({}, {
    message: 'La cantidad debe ser un número'
  })
  quantity: number;

  @IsNotEmpty({
    message: 'El id de la categoria no debe ser vacío'
  })
  categoryId: Number;

  @IsString({
    message: 'La descripción debe ser una cadena de caracteres'
  })
  description: string;

  @IsString({
    message: 'La imagen debe ser una cadena de caracteres',
  })
  image: string
}