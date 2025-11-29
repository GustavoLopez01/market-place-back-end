
import {
  IsString,
  IsNumber,
} from 'class-validator';

export class CreateProduct {
  @IsString({
    message: 'El Nombre debe ser una cadena de caracteres'
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

  @IsString({
    message: 'La categoria debe ser una cadena de caracteres'
  })
  category: string;

  @IsString({
    message: 'La descripción debe ser una cadena de caracteres'
  })
  description: string;

  @IsString({
    message: 'La imagen debe ser una cadena de caracteres',
  })
  image: string
}