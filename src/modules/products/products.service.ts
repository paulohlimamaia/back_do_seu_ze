/* eslint-disable @typescript-eslint/no-this-alias */
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ProductsDto from '../../dtos/products.dto';
import ProductsRepository from './products.repository';
import Products from './products.entity';
import { readFileSync } from 'fs';
const amqp = require('amqplib');

@Injectable()
export default class ProductsService {
  private logger = new Logger(ProductsService.name);

  constructor(
    @InjectRepository(ProductsRepository)
    private productsRepository: ProductsRepository,
  ) {
    const self = this;
    this.logger.log('ProductsService dependencies initialized');

    const data = readFileSync('/usr/src/node-api/products.csv', 'utf8');
    const lines = data.split('\r\n');

    lines.slice(1).forEach((line) => {
      const lineArray = line.split(',');
      const product = {
        name: lineArray[0],
        price: parseFloat(lineArray[1]),
        quantity: parseInt(lineArray[2]),
      };

      this.createProduct(product);
    });

    amqp
      .connect('amqp://guest:guest@rabbitmq:5672')
      .then(function (conn) {
        process.once('SIGINT', function () {
          conn.close();
        });
        return conn.createChannel().then(function (ch) {
          let ok = ch.assertExchange('stock', 'direct', { durable: true });
          ok = ok.then(function () {
            return ch.assertQueue('incremented', { exclusive: true });
          });
          ok = ok.then(function (qok) {
            return ch
              .bindQueue(qok.queue, 'stock', 'incremented')
              .then(function () {
                return qok.queue;
              });
          });
          ok = ok.then(function (queue) {
            return ch.consume(queue, incremented, { noAck: true });
          });
          ok = ok.then(function () {
            return ch.assertQueue('decremented', { exclusive: true });
          });
          ok = ok.then(function (qok) {
            return ch
              .bindQueue(qok.queue, 'stock', 'decremented')
              .then(function () {
                return qok.queue;
              });
          });
          ok = ok.then(function (queue) {
            return ch.consume(queue, decremented, { noAck: true });
          });
          return ok.then(function () {
            // console.log(' [*] Waiting for stock. To exit press CTRL+C');
          });

          function incremented(msg) {
            const product = msg.content.toString().split('"')[1];
            self.incrementProduct(product);
            // console.log(' [+] Incremented: %s', product);
          }

          function decremented(msg) {
            const product = msg.content.toString().split('"')[1];
            self.decrementProduct(product);
            // console.log(' [-] Decremented: %s', product);
          }
        });
      })
      .catch(console.warn);
  }

  async createProduct(product: ProductsDto): Promise<Products> {
    return this.productsRepository.createProduct(product);
  }

  async incrementProduct(productName: string): Promise<Products> {
    return this.productsRepository.incrementProduct(productName);
  }

  async decrementProduct(productName: string): Promise<Products> {
    return this.productsRepository.decrementProduct(productName);
  }

  async getProduct(productName: string): Promise<Products> {
    return this.productsRepository.getProduct(productName);
  }
}
