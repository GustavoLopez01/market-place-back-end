import {
  BadRequestException,
  Inject,
  Injectable
} from '@nestjs/common';
import { Rol } from './rol.entity';
import { CreateRol } from './dto/rol.dto';

@Injectable()
export class RolesService {
  constructor(
    @Inject('ROLES_REPOSITORY')
    private rolRepository: typeof Rol
  ) { }

  async getAll() {
    return await this.rolRepository.findAll();
  }

  async findById(id: Rol['id']) {
    try {
      return await this.rolRepository.findByPk(id);
    } catch (error) {
      console.error(`Ocurrió un error al obtener el rol : ${error}`);
      throw new BadRequestException(`Ocurrió un error al obtener el rol : ${error}`);
    }
  }

  async save(rol: CreateRol) {
    try {
      const existRol = await this.rolRepository.findOne({
        where: {
          name: rol.name
        }
      });

      if (existRol) return null;

      const response = await this.rolRepository.create({ ...rol });
      return response;
    } catch (error) {
      console.error(`Ocurrió un error al guardar el rol : ${error}`);
      throw new BadRequestException(`Ocurrió un error al guardar el rol : ${error}`);
    }
  }

  async update(id: Rol['id'], rol: CreateRol) {
    try {
      const existRol = await this.rolRepository.findByPk(id);
      if (existRol) return null;

      const response = await this.rolRepository.update({
        ...rol
      }, {
        where: id
      });

      return response;
    } catch (error) {
      console.error(`Ocurrió un error al actualizar el rol : ${error}`);
      throw new BadRequestException(`Ocurrió un error al actualizar el rol : ${error}`);
    }
  }

  async delete(id: Rol['id']) {
    try {
      const existRol = await this.rolRepository.findByPk(id);
      if (existRol) return null;

      return await this.rolRepository.destroy({
        where: id
      });
    } catch (error) {
      console.error(`Ocurrió un error al eliminar el rol : ${error}`);
      throw new BadRequestException(`Ocurrió un error al eliminar el rol : ${error}`);
    }
  }
}
