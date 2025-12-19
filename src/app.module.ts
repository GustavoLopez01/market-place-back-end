import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { DatabaseModule } from './database/database.module';
import { ProductsController } from './modules/products/products.controller';
import { ProductsModule } from './modules/products/products.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { OrdersModule } from './modules/orders/orders.module';
import { RolesModule } from './modules/roles/roles.module';
import { AddressesModule } from './modules/user_addresses/userAddresses.module';
@Module({
  imports: [
    AuthModule,
    UsersModule,
    DatabaseModule,
    ProductsModule,
    CategoriesModule,
    OrdersModule,
    RolesModule,
    AddressesModule
  ],
  controllers: [AppController, ProductsController],
  providers: [AppService],
})
export class AppModule { }
