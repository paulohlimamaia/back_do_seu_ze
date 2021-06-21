import { Injectable } from '@nestjs/common';

@Injectable()
export default class OrdersService {
  getHello(): string {
    return 'Hello World!';
  }
}
