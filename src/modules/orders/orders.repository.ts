import { EntityRepository, Repository } from 'typeorm';
import Orders from './orders.entity';
import OrdersDto from '../../dtos/orders.dto';

@EntityRepository(Orders)
export default class OrdersRepository extends Repository<Orders> {
  async createOrder(ordersDto: OrdersDto): Promise<Orders> {
    const { total } = ordersDto;

    const order = this.create();
    order.total = total;

    try {
      await order.save();
      return order;
    } catch (error) {
      console.error(error.message);
      // throw new InternalServerErrorException(
      //   `Erro ao salvar order no banco de dados`,
      // );
    }
  }

  async getOrders(): Promise<Orders[]> {
    return this.createQueryBuilder('orders').getMany();
  }

  async getOrder(orderId: string): Promise<Orders> {
    return this.createQueryBuilder('orders')
      .where('orders.id = :orderId', { orderId })
      .getOne();
  }
}
