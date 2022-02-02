import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";

import { ProductIngredients } from "./ProductIngredients";

@Entity("product")
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  thumbnail: string;

  @Column()
  name: string;

  @Column()
  price: string;

  @Column()
  volume: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @OneToMany(() => ProductIngredients, ({ productId }) => productId)
  productIngredients!: ProductIngredients[];
}
