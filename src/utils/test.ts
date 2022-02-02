import { ProductDTO } from "../core/types";
import { Product } from "../infra/database/models/Product";

const defaultValues = {
  id: "anyProductId",
  thumbnail: "anyImage",
  name: "anyProductName",
  price: 1,
  volume: 1,
  createdAt: "2022-01-31T20:16Z",
  updatedAt: "2022-01-31T20:16Z",
};

export const returnAValidProduct = (productData?: Partial<ProductDTO>) => {
  const product = new Product();

  Object.assign(product, defaultValues);
  Object.assign(product, productData);

  return product;
};
