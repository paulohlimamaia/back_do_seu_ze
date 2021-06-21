import { Injectable } from '@nestjs/common';

@Injectable()
export default class ProductsService {
  getHello(): string {
    return 'Hello World!';
  }
}
