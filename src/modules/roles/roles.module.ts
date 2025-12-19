import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { rolProviders } from './roles.providers';

@Module({
  controllers: [RolesController],
  providers: [
    RolesService,
    ...rolProviders
  ]
})
export class RolesModule {}
