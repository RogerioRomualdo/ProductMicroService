import {
  paginationOptions,
  Product,
  ProductDTO,
  ProductList,
} from "../../types";

export interface IProductService {
  create: (productData: ProductDTO) => Promise<Product | Error>;
  index: (options: paginationOptions) => Promise<ProductList>;
  update: (
    productId: string,
    productData: Partial<ProductDTO>
  ) => Promise<Product | Error>;
  show: (productId: string) => Promise<Product | Error>;
  delete: (productId: string) => Promise<void | Error>;
  getProductsByIds: (productIds: Array<string>) => Promise<ProductList>;
}
