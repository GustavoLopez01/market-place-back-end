
import {
  BadRequestException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUser } from './interface/user.interface';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private userRepository: typeof User
  ) { }

  async getAll(): Promise<User[] | null> {
    return await this.userRepository.findAll();
  }

  async findById(id: User['id']): Promise<User | null> {
    try {
      return await this.userRepository.findOne({
        where: {
          id
        }
      });
    } catch (error) {
      console.error(`Ocurrió un error al obtener al usuario : ${error}`);
      throw new BadRequestException('Ocurrió un error al obtener al usuario');
    }
  }

  async findOne(email: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: {
        email,
      }
    });
  }

  async save(user: CreateUserDto): Promise<User | null> {
    try {
      const existUser = await this.userRepository.findOne({
        where: {
          email: user.email
        }
      });

      if (existUser) return null;

      const response = await this.userRepository.create({
        ...user
      });
      return response;
    } catch (error) {
      console.error(`Ocurrió un error al crear al usuario : ${error}`);
      throw new BadRequestException('Ocurrió un error al crear el usuario');
    }
  }

  async update(id: User['id'], user: CreateUserDto): Promise<CreateUser | null> {
    try {
      const exist = await User.findOne({ where: { id } });
      if (!exist) {
        return null;
      }

      await this.userRepository.update({
        ...user,
      }, {
        where: {
          id
        },
        individualHooks: true
      });

      return user;
    } catch (error) {
      console.error(`Ocurrió un error al actualizar al usuario : ${error}`);
      throw new BadRequestException('Ocurrió un error al actualizar el usuario');
    }
  }
}
