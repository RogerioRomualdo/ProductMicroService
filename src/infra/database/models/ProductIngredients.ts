import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Ingredient } from "./Ingredients";
import { Product } from "./Product";

@Entity("productIngredients")
export class ProductIngredients {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  quantity: number;

  @ManyToOne(() => Product, ({ productIngredients }) => productIngredients)
  productId!: Product;

  @ManyToOne(() => Ingredient, ({ productIngredients }) => productIngredients)
  ingredientId!: Ingredient;
}
