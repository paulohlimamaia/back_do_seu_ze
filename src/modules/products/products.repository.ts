import { EntityRepository, Repository } from 'typeorm';
import Products from './products.entity';
import ProductsDto from '../../dtos/products.dto';

@EntityRepository(Products)
export default class ProductsRepository extends Repository<Products> {
  async createProduct(productsDto: ProductsDto): Promise<Products> {
    const { name, price, quantity } = productsDto;

    const product = this.create();
    product.name = name;
    product.price = price;
    product.quantity = quantity;

    try {
      await product.save();
      return product;
    } catch (error) {
      // console.error(error.message);
      // throw new InternalServerErrorException(
      //   `Erro ao salvar ${name} no banco de dados`,
      // );
    }
  }

  async decrementProduct(productName: string): Promise<Products> {
    const product = await this.createQueryBuilder('product')
      .where('product.name = :productName', { productName })
      .getOne();

    if (product.quantity > 0) {
      product.quantity = product.quantity - 1;
      try {
        await product.save();
        return product;
      } catch (error) {
        // console.error(error.message);
        // throw new InternalServerErrorException(
        //   `Erro ao salvar ${name} no banco de dados`,
        // );
      }
    }
  }

  async incrementProduct(productName: string): Promise<Products> {
    const product = await this.createQueryBuilder('product')
      .where('product.name = :productName', { productName })
      .getOne();

    product.quantity = product.quantity + 1;

    try {
      await product.save();
      return product;
    } catch (error) {
      // console.error(error.message);
      // throw new InternalServerErrorException(
      //   `Erro ao salvar ${name} no banco de dados`,
      // );
    }
  }

  async getProduct(productName: string): Promise<Products> {
    return this.createQueryBuilder('product')
      .where('product.name = :productName', { productName })
      .getOne();
  }
}
