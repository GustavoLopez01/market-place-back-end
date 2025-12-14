import { IsString } from 'class-validator';

export class CreateRol {
  @IsString({
    message: 'El nombre debe ser una cadena de caracteres'
  })
  name: string;

  @IsString({
    message: 'El nombre debe ser una cadena de caracteres'
  })
  description: string;

}