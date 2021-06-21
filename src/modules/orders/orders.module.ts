import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import OrdersService from './orders.service';
import OrdersRepository from './orders.repository';

@Module({
  imports: [TypeOrmModule.forFeature([OrdersRepository])],
  providers: [OrdersService],
  exports: [OrdersService],
})
export default class OrdersModule {}
