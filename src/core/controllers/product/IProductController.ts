import { Callback } from "../../types";

export type ListAllProductsParamsDTO = {
  currenPage: number;
  pageSize: number;
};

export type RpcFunction = (
  call: Record<string, any>,
  callback: Callback
) => Promise<void>;

export interface IProductController {
  listAllProducts: RpcFunction;
  showProduct: RpcFunction;
  createProduct: RpcFunction;
  updateProduct: RpcFunction;
  deleteProduct: RpcFunction;
}
