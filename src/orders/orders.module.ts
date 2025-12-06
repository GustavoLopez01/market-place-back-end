import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { orderProviders } from './orders.providers';

@Module({
  providers: [
    OrdersService,
    ...orderProviders
  ],
  controllers: [OrdersController],
})
export class OrdersModule { }
