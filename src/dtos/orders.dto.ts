import { IsNotEmpty } from 'class-validator';

export default class OrdersDto {
  @IsNotEmpty({ message: 'Informe o campo total' })
  total: number;
}
