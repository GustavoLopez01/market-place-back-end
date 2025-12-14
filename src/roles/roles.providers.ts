import { Rol } from './rol.entity';

export const rolProviders = [
  {
    provide: 'ROLES_REPOSITORY',
    useValue: Rol
  }
];