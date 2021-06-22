import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import OrderProducts from '../orderProducts/orderProducts.entity';

@Entity()
export default class Orders extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(
    () => OrderProducts,
    (orderProducts: OrderProducts) => orderProducts.id,
  )
  @JoinColumn()
  orderProducts: OrderProducts[];

  @Column({ nullable: false, type: 'float' })
  total: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
