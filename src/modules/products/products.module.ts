import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ProductsService from './products.service';
import ProductsRepository from './products.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProductsRepository])],
  providers: [ProductsService],
  exports: [ProductsService],
})
export default class ProductsModule {}
