import {
  IsString,
  IsBoolean,
  IsEmail,
  IsNotEmpty
} from 'class-validator';

export class CreateUserDto {

  @IsNotEmpty({ message: 'El nombre es obligatorio.' })
  @IsString({ message: 'El Nombre debe ser una cadena de caracteres.' })
  name: string;

  @IsNotEmpty({ message: 'El correo electrónico es obligatorio.' })
  @IsString({ message: 'El correo electrónico debe ser una cadena de caracteres.' })
  @IsEmail({}, { message: 'El correo electrónico no es válido.' })
  email: string;

  @IsNotEmpty({ message: 'El teléfono es obligatorio.' })
  @IsString({ message: 'El teléfono debe ser una cadena de caracteres.' })
  phoneNumber: string;

  @IsNotEmpty({ message: 'El apellido es obligatorio.' })
  @IsString({ message: 'El apellido debe ser una cadena de caracteres.' })
  lastName: string;

  @IsNotEmpty({ message: 'La contrasea es obligatoria.' })
  @IsString({ message: 'La contraseña debe ser una cadena de caracteres.' })
  password: string;

  @IsNotEmpty({ message: 'El estado es obligatorio.' })
  @IsBoolean({ message: 'El estado debe ser un boleano.' })
  isEnabled: boolean;
}