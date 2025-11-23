
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User, CreateUser } from './interface/user.interface';
@Injectable()
export class UsersService {
  private readonly users = [
    {
      id: 1,
      name: 'john',
      email: 'john',
      phoneNumber: 'john',
      lastName: 'changeme',
      password: 'changeme',
      isEnabled: true
    }
  ];

  async getAll(): Promise<User[] | undefined> {
    return [];
  }

  async findById(id: number): Promise<User | undefined> {
    return undefined;
  }

  async findOne(email: string): Promise<User | undefined> {
    return this.users[0];
  }

  async save(createUser: CreateUserDto): Promise<CreateUser | undefined> {
    return createUser;
  }

  async update(id: number, createUser: CreateUserDto): Promise<CreateUser | undefined> {
    return createUser;
  }
}
