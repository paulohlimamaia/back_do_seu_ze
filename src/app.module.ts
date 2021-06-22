import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from './config/typeorm.config';
import OrdersModule from './modules/orders/orders.module';
import ProductsModule from './modules/products/products.module';
import OrderProductsModule from './modules/orderProducts/orderProducts.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    OrdersModule,
    ProductsModule,
    OrderProductsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
