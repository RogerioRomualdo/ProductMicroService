export interface Product {
  id: string;
  thumbnail: string;
  name: string;
  price: number;
  volume: number;
  createdAt: string;
  updatedAt: string;
}

export type ProductDTO = Omit<Product, "id">;

export type ProductList = {
  count: number;
  products: Array<Product>;
};

export type paginationOptions = {
  currentPage: number;
  pageSize: number;
};

export type Callback = (error: Error | null, result?: any) => void;
