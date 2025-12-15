import { Sequelize } from 'sequelize-typescript';
import { Category } from 'src/modules/categories/category.entity';
import { Order } from 'src/modules/orders/order.entity';
import { OrderProducts } from 'src/modules/orders/orderProduct.entity';
import { Product } from 'src/modules/products/product.entity';
import { Rol } from 'src/modules/roles/rol.entity';
import { User } from 'src/modules/users/user.entity';

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
        Rol,
        Category,
        OrderProducts,
      ]);
      await sequelize.sync();
      return sequelize;
    }
  }
]