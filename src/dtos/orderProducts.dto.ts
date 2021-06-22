import { IsNotEmpty } from 'class-validator';
import Products from '../modules/products/products.entity';
import Orders from '../modules/orders/orders.entity';

export default class OrderProductsDto {
  @IsNotEmpty({ message: 'Informe o campo order' })
  order: Orders;

  @IsNotEmpty({ message: 'Informe o campo product' })
  product: Products;

  @IsNotEmpty({ message: 'Informe o campo quantity' })
  quantity: number;
}
