import { Module } from '@nestjs/common';
import { UserAddressesService } from './userAddresses.service';
import { AddressesController } from './userAddresses.controller';
import { addressesProviders } from './userAddresses.providers';
import { usersProviders } from '../users/users.providers';

@Module({
  controllers: [AddressesController],
  providers: [
    UserAddressesService,
    ...addressesProviders,
    ...usersProviders
  ],
})
export class AddressesModule {}
