import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import OrderProductsService from './orderProducts.service';
import OrderProductsRepository from './orderProducts.repository';

@Module({
  imports: [TypeOrmModule.forFeature([OrderProductsRepository])],
  providers: [OrderProductsService],
  exports: [OrderProductsService],
})
export default class OrderProductsModule {}
