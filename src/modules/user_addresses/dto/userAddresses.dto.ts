import { IsString } from "class-validator";

export class CreateUserAddress {
  @IsString({
    message: 'La calle debe ser una cadena de caracteres',
  })
  street: string;

  @IsString({
    message: 'El número exterior debe ser una cadena de caracteres'
  })
  extNumber: string;

  @IsString({
    message: 'El código postal debe ser una cadena de caracteres'
  })
  postalCode: string;

  @IsString({
    message: 'La ciudad debe ser una cadena de caracteres'
  })
  city: string;

  @IsString({
    message: 'El estado debe ser una cadena de caracteres'
  })
  state: string;

  @IsString({
    message: 'El país debe ser una cadena de caracteres'
  })
  country: string;

  @IsString({
    message: 'El telefono debe ser una cadena de caracteres'
  })
  phoneNumber: string;

  @IsString({
    message: 'Las observaciones deben ser una cadena de caracteres'
  })
  observations: string;
}