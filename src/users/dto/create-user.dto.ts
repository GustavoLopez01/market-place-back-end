import {
  IsString,
  IsBoolean
} from 'class-validator';

export class CreateUserDto {
  @IsString({
    message: 'El Nombre debe ser una cadena de caracteres'
  })
  name: string;

  @IsString({
    message: 'El correo electrónico debe ser una cadena de caracteres'
  })
  email: string;

  @IsString({
    message: 'El telefono debe ser una cadena de caracteres'
  })
  phoneNumber: string;

  @IsString({
    message: 'El apellido debe ser una cadena de caracteres'
  })
  lastName: string;

  @IsString({
    message: 'La contraseña debe ser una cadena de caracteres'
  })
  password: string;

  @IsBoolean({
    message: 'El estado debe ser un boleano'
  })
  isEnabled: boolean;
}