import { EntityRepository, Repository } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';
import Orders from './orders.entity';
import OrdersDto from '../../dtos/orders.dto';

@EntityRepository(Orders)
export default class OrdersRepository extends Repository<Orders> {
  async createOrder(ordersDto: OrdersDto): Promise<Orders> {
    const { products, total } = ordersDto;

    const order = this.create();
    order.products = products;
    order.total = total;

    try {
      await order.save();
      return order;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao salvar order no banco de dados',
      );
    }
  }
}
