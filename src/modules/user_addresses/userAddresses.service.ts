import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UserAddresses } from './userAddress.entity';
import { CreateUserAddress } from './dto/userAddresses.dto';
import { User } from '../users/user.entity';

@Injectable()
export class UserAddressesService {

  constructor(
    @Inject('ADDRESSES_REPOSITORY')
    private userAddressRepository: typeof UserAddresses,
    @Inject('USERS_REPOSITORY')
    private userRepository: typeof User
  ) { }

  async getAll(): Promise<UserAddresses[] | null> {
    try {
      return await this.userAddressRepository.findAll();
    } catch (error) {
      console.error(`Ocurrió un error al obtener las direcciones : ${error}`);
      throw new BadRequestException(`Ocurrió un error al obtener las direcciones : ${error}`)
    }
  }

  async getAllByUserId(userId: User['id']): Promise<UserAddresses[] | null> {
    try {
      const existUser = await this.userRepository.findByPk(userId);
      if (!existUser) return null;

      return await this.userAddressRepository.findAll({
        where: {
          userId
        }
      });
    } catch (error) {
      console.error(`Ocurrió un error al obtener las direcciones del usuario : ${error}`);
      throw new BadRequestException(`Ocurrió un error al obtener las direcciones del usuario : ${error}`);
    }
  }

  async findById(id: UserAddresses['id']): Promise<UserAddresses | null> {
    try {
      return await this.userAddressRepository.findByPk(id);
    } catch (error) {
      console.error(`Ocurrió un error al obtener la dirección ${error}`);
      throw new BadRequestException(`Ocurrió un error al obtener la dirección ${error}`);
    }
  }

  async save(address: CreateUserAddress): Promise<UserAddresses | null> {
    try {
      const response = await this.userAddressRepository.create({
        ...address
      });
      return response;
    } catch (error) {
      console.error(`Ocurrió un error al guardar la dirección : ${error}`);
      throw new BadRequestException(`Ocurrió un error al guardar la dirección : ${error}`);
    }
  }

  async update(id: UserAddresses['id'], address: CreateUserAddress): Promise<number | null> {
    try {
      const existAddress = await this.findById(id);
      if (!existAddress) return null;

      const response = await this.userAddressRepository.update({
        ...address
      }, {
        where: { id }
      });
      return response[0]
    } catch (error) {
      console.error(`Ocurrió un error al guardar la dirección : ${error}`);
      throw new BadRequestException(`Ocurrió un error al guardar la dirección : ${error}`);
    }
  }

  async delete(id: UserAddresses['id']): Promise<null | boolean> {
    try {
      const existAddress = await this.findById(id);
      if (!existAddress) return null;

      await existAddress.destroy();
      return true;
    } catch (error) {
      console.error(`Ocurrió un error al eliminar la dirección : ${error}`);
      throw new BadRequestException(`Ocurrió un error al eliminar la dirección : ${error}`);
    }
  }
}
