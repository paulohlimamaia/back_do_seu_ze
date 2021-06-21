import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import ProductsService from './services/products.service';
import OrdersService from './services/orders.service';
import typeOrmConfig from './config/typeorm.config';
import OrdersModule from './modules/orders/orders.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), OrdersModule],
  controllers: [AppController],
  providers: [ProductsService, OrdersService],
})
export class AppModule {}
