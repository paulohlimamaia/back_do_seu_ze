import { EntityRepository, Repository } from 'typeorm';
import OrderProducts from './orderProducts.entity';
import OrderProductsDto from '../../dtos/orderProducts.dto';

@EntityRepository(OrderProducts)
export default class OrderProductsRepository extends Repository<OrderProducts> {
  async createOrderProducts(
    orderProductsDto: OrderProductsDto,
  ): Promise<OrderProducts> {
    const { order, product, quantity } = orderProductsDto;

    const orderProducts = this.create();
    orderProducts.order = order;
    orderProducts.product = product;
    orderProducts.quantity = quantity;

    try {
      await orderProducts.save();
      return orderProducts;
    } catch (error) {
      console.error(error.message);
      // throw new InternalServerErrorException(
      //   `Erro ao salvar orderProducts no banco de dados`,
      // );
    }
  }

  async getOrderProductsByOrderId(orderId: string): Promise<OrderProducts[]> {
    return this.createQueryBuilder('orderProducts')
      .where('orderProducts.order = :orderId', { orderId })
      .leftJoinAndSelect('orderProducts.product', 'products')
      .getMany();
  }
}
