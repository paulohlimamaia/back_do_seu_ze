import { IsNotEmpty } from 'class-validator';
import Products from '../modules/products/products.entity';

export default class OrdersDto {
  @IsNotEmpty({ message: 'Informe o campo transbordo' })
  products: Products[];

  @IsNotEmpty({ message: 'Informe o campo total' })
  total: number;
}
