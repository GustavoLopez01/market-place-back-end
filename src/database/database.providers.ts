import { Sequelize } from 'sequelize-typescript';
import { Category } from 'src/categories/category.entity';
import { Order } from 'src/orders/order.entity';
import { OrderProducts } from 'src/orders/orderProduct.entity';
import { Product } from 'src/products/product.entity';
import { User } from 'src/users/user.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'nest',
      });
      sequelize.addModels([
        User,
        Order,
        Product, 
        Category,
        OrderProducts,
      ]);
      await sequelize.sync();
      return sequelize;
    }
  }
]