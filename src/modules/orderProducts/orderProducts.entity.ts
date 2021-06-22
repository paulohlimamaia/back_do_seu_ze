import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import Orders from '../orders/orders.entity';
import Products from '../products/products.entity';

@Entity()
export default class OrderProducts extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Orders, (order: Orders) => order.id)
  @JoinColumn()
  order: Orders;

  @ManyToOne(() => Products)
  @JoinColumn()
  product: Products;

  @Column({ nullable: false, type: 'integer' })
  quantity: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
