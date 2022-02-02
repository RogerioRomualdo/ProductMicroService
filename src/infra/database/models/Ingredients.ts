import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { ProductIngredients } from "./ProductIngredients";

@Entity("ingredient")
export class Ingredient {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  price: string;

  @OneToMany(() => ProductIngredients, ({ ingredientId }) => ingredientId)
  productIngredients!: ProductIngredients[];
}
