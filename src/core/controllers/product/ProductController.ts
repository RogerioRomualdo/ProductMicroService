import { IProductController, RpcFunction } from "./IProductController";
import { IProductService } from "../../services/product/IProductService";
import { Callback } from "../../types";

export class ProductController implements IProductController {
  constructor(private productService: IProductService) {}

  listAllProducts = async (call: Record<string, any>, callback: Callback) => {
    try {
      const { ...options } = call.request;

      const productList = await this.productService.index(options);

      return callback(null, productList);
    } catch (e: any) {
      return callback(e, null);
    }
  };
  showProduct = async (call: Record<string, any>, callback: Callback) => {
    try {
      const { id: productId } = call.request;

      const product = await this.productService.show(productId);

      if (product instanceof Error) return callback(product, null);

      return callback(null, product);
    } catch (e: any) {
      return callback(e, null);
    }
  };
  createProduct = async (call: Record<string, any>, callback: Callback) => {
    try {
      const { ...productData } = call.request;

      const product = await this.productService.create(productData);

      if (product instanceof Error) return callback(product, null);

      return callback(null, product);
    } catch (e: any) {
      return callback(e, null);
    }
  };
  updateProduct = async (call: Record<string, any>, callback: Callback) => {
    try {
      const { id: productId, ...productData } = call.request;

      const product = await this.productService.update(productId, productData);

      if (product instanceof Error) return callback(product, null);

      return callback(null, product);
    } catch (e: any) {
      return callback(e, null);
    }
  };
  deleteProduct = async (call: Record<string, any>, callback: Callback) => {
    try {
      const { id: productId } = call.request;

      const error = await this.productService.delete(productId);

      if (error instanceof Error) return callback(error, null);

      return callback(null, null);
    } catch (e: any) {
      return callback(e, null);
    }
  };
  getProductsByIds = async (call: Record<string, any>, callback: Callback) => {
    try {
      const { productIds } = call.request;

      const productList = await this.productService.getProductsByIds(
        productIds
      );

      return callback(null, productList);
    } catch (e: any) {
      return callback(e, null);
    }
  };
}
