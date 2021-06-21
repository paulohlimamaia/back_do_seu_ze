import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import ProductsService from './services/products.service';
import OrdersService from './services/orders.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [ProductsService, OrdersService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Back do seu Zé"', () => {
      expect(appController.getBase()).toBe('Back do seu Zé');
    });
  });
});
