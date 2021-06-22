import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import ProductsService from './modules/products/products.service';
import OrdersService from './modules/orders/orders.service';
import OrderProductsService from './modules/orderProducts/orderProducts.service';

interface Order {
  products: [{ name: string; quantity: number }];
}

@Controller()
export class AppController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly ordersService: OrdersService,
    private readonly orderProductsService: OrderProductsService,
  ) {}

  @Get()
  getBase(): string {
    return 'Back do seu Zé';
  }

  @Get('/products/:name')
  async getProductByName(@Param() params): Promise<any> {
    const product = await this.productsService.getProduct(params.name);

    return {
      name: product.name,
      price: product.price,
      quantity: product.quantity,
    };
  }

  @Post('/orders')
  async placeOrder(@Body() data: Order): Promise<any> {
    let total = 0;
    const products = [];
    if (data.products.length > 0) {
      for (const index in data.products) {
        const product = data.products[index];
        const prod = await this.productsService.getProduct(product.name);
        if (prod) {
          if (prod.quantity < product.quantity) {
            return {
              Error: `Não possuímos estoque do produto ${product.name} para atender ao seu pedido.`,
            };
          } else {
            total += product.quantity * prod.price;
            products.push({ prod, quantity: product.quantity });
          }
        } else {
          return {
            Error: `Não possuímos o produto ${product.name} para atender ao seu pedido.`,
          };
        }
      }

      const order = await this.ordersService.createOrder({
        total: total,
      });

      for (const key in products) {
        const product = products[key];

        await this.orderProductsService.createOrderProducts({
          order: order,
          product: product.prod,
          quantity: product.quantity,
        });

        await this.productsService.decrementProduct(product.prod.name);
      }

      const orderProducts =
        await this.orderProductsService.getOrderProductsByOrderId(order.id);

      const response = {
        id: order.id,
        products: [],
        total: order.total,
      };

      orderProducts.forEach((orderProduct) => {
        response.products.push({
          name: orderProduct.product.name,
          quantity: orderProduct.quantity,
          price: orderProduct.product.price,
        });
      });

      return response;
    }
    return {
      Error: 'Nenhum produto enviado.',
    };
  }

  @Get('/orders')
  async getOrders(): Promise<any> {
    const response = [];
    const orders = await this.ordersService.getOrders();

    for (let index = 0; index < orders.length; index++) {
      const order = orders[index];
      const res = {
        id: order.id,
        products: [],
        total: order.total,
      };
      const orderProducts =
        await this.orderProductsService.getOrderProductsByOrderId(order.id);

      orderProducts.forEach((orderProduct) => {
        res.products.push({
          name: orderProduct.product.name,
          quantity: orderProduct.quantity,
          price: orderProduct.product.price,
        });
      });
      response.push(res);
    }

    return response;
  }

  @Get('/orders/:id')
  async getOrderById(@Param() params): Promise<any> {
    const order = await this.ordersService.getOrder(params.id);
    const orderProducts =
      await this.orderProductsService.getOrderProductsByOrderId(order.id);
    const response = {
      id: order.id,
      products: [],
      total: order.total,
    };

    orderProducts.forEach((orderProduct) => {
      response.products.push({
        name: orderProduct.product.name,
        quantity: orderProduct.quantity,
        price: orderProduct.product.price,
      });
    });

    return response;
  }
}
