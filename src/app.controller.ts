import { Controller, Get, Post } from '@nestjs/common';
import ProductsService from './services/products.service';
import OrdersService from './services/orders.service';

@Controller()
export class AppController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly ordersService: OrdersService,
  ) {}

  @Get()
  getBase(): string {
    return 'Back do seu Zé';
  }

  @Get('/products/:name')
  getProductByName(): string {
    return this.productsService.getHello();
  }

  @Post('/orders')
  placeOrder(): string {
    return this.appService.getHello();
  }

  @Get('/orders')
  getOrders(): string {
    return this.appService.getHello();
  }

  @Get('/orders/:id')
  getOrderById(): string {
    return this.appService.getHello();
  }
}
