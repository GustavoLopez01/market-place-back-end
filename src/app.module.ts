import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { ProductsController } from './products/products.controller';
import { ProductsModule } from './products/products.module';
@Module({
  imports: [
    AuthModule, 
    UsersModule, 
    DatabaseModule, 
    ProductsModule
  ],
  controllers: [AppController, ProductsController],
  providers: [AppService],
})
export class AppModule {}
