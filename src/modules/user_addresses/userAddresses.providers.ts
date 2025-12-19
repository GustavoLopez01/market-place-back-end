import { UserAddresses } from './userAddress.entity';

export const addressesProviders = [
  {
    provide: 'ADDRESSES_REPOSITORY',
    useValue: UserAddresses
  }
];