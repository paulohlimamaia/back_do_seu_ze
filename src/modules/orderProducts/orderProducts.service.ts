import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import OrderProductsDto from '../../dtos/orderProducts.dto';
import OrderProductsRepository from './orderProducts.repository';
import OrderProducts from './orderProducts.entity';

@Injectable()
export default class OrderProductsService {
  private logger = new Logger(OrderProductsService.name);

  constructor(
    @InjectRepository(OrderProductsRepository)
    private orderProductsRepository: OrderProductsRepository,
  ) {
    this.logger.log('OrderProductsService dependencies initialized');
  }

  async createOrderProducts(
    orderProducts: OrderProductsDto,
  ): Promise<OrderProducts> {
    return this.orderProductsRepository.createOrderProducts(orderProducts);
  }

  async getOrderProductsByOrderId(orderId: string): Promise<OrderProducts[]> {
    return this.orderProductsRepository.getOrderProductsByOrderId(orderId);
  }
}
