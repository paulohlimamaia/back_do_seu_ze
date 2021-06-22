import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import OrdersDto from '../../dtos/orders.dto';
import OrdersRepository from './orders.repository';
import Orders from './orders.entity';

@Injectable()
export default class OrderService {
  private logger = new Logger(OrderService.name);

  constructor(
    @InjectRepository(OrdersRepository)
    private ordersRepository: OrdersRepository,
  ) {
    this.logger.log('OrderService dependencies initialized');
  }

  async createOrder(order: OrdersDto): Promise<Orders> {
    return this.ordersRepository.createOrder(order);
  }

  async getOrders(): Promise<Orders[]> {
    return this.ordersRepository.getOrders();
  }

  async getOrder(orderId: string): Promise<Orders> {
    return this.ordersRepository.getOrder(orderId);
  }
}
