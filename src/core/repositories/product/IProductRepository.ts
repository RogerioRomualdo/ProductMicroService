import {
  paginationOptions,
  Product,
  ProductDTO,
  ProductList,
} from "../../types";

export interface IProductRepository {
  index: (options: paginationOptions) => Promise<ProductList>;
  findById: (productId: string) => Promise<Product | undefined>;
  create: (productData: ProductDTO) => Promise<Product>;
  update: (
    productId: string,
    productData: Partial<ProductDTO>
  ) => Promise<Product>;
  delete: (productId: string) => Promise<void>;
  getProductsByIds: (productIds: Array<string>) => Promise<ProductList>;
}
