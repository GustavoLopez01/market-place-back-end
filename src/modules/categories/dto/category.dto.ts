
import {
  IsString,
  Length
} from 'class-validator';

export class CreateCategoryDto {

  @Length(3, 50, {
    message: 'El nombre debe tener entre 3 y 50 caracteres'
  })
  @IsString({
    message: 'El nombre debe ser una cadena de caracteres'
  })
  declare name: string

  @Length(10, 150, {
    message: 'La descripción debe tener entre 10 y 150 caracteres'
  })
  @IsString({
    message: 'La descripción debe ser una cadena de caracteres'
  })
  declare description: string
}