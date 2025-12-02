
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
  name: string

  @Length(10, 150, {
    message: 'El nombre debe tener entre 10 y 150 caracteres'
  })
  @IsString({
    message: 'El nombre debe ser una cadena de caracteres'
  })
  description: string
}