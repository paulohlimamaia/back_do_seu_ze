import { IsNotEmpty } from 'class-validator';

export default class ProductsDto {
  @IsNotEmpty({ message: 'Informe o campo transbordo' })
  name: string;

  @IsNotEmpty({ message: 'Informe o campo total' })
  price: number;

  @IsNotEmpty({ message: 'Informe o campo total' })
  quantity: number;
}
