import {
  IsString,
  IsBoolean
} from 'class-validator';

export class CreateUserDto {
  @IsString({
    message: 'El Nombre debe ser un string'
  })
  name: string;

  @IsString({
    message: 'El correo electrónico debe ser un string'
  })
  email: string;

  @IsString({
    message: 'El telefono debe ser un string'
  })
  phoneNumber: string;

  @IsString({
    message: 'El apellido debe ser un string'
  })
  lastName: string;

  @IsString({
    message: 'La contraseña debe ser un string'
  })
  password: string;

  @IsBoolean({
    message: 'El esta activo debe ser un boleano'
  })
  isEnabled: boolean;
}