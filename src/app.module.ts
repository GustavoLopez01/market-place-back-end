import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { ProductsController } from './products/products.controller';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { RolesModule } from './roles/roles.module';
@Module({
  imports: [
    AuthModule,
    UsersModule,
    DatabaseModule,
    ProductsModule,
    CategoriesModule,
    OrdersModule,
    RolesModule
  ],
  controllers: [AppController, ProductsController],
  providers: [AppService],
})
export class AppModule { }
