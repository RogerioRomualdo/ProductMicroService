import { IProductController } from "./IProductController";
import { IProductService } from "../../services/product/IProductService";
import { Callback } from "../../types";

export class ProductController implements IProductController {
  constructor(private productService: IProductService) {}

  listAllProducts = async (call: Record<string, any>, callback: Callback) => {
    const { ...options } = call.request;

    const productList = await this.productService.index(options);

    return callback(null, productList);
  };
  showProduct = async (call: Record<string, any>, callback: Callback) => {
    const { id: productId } = call.request;

    const product = await this.productService.show(productId);

    if (product instanceof Error) return callback(product, null);

    return callback(null, product);
  };
  createProduct = async (call: Record<string, any>, callback: Callback) => {
    const { ...productData } = call.request;

    const product = await this.productService.create(productData);

    if (product instanceof Error) return callback(product, null);

    return callback(null, product);
  };
  updateProduct = async (call: Record<string, any>, callback: Callback) => {
    const { id: productId, ...productData } = call.request;

    const product = await this.productService.update(productId, productData);

    if (product instanceof Error) return callback(product, null);

    return callback(null, product);
  };
  deleteProduct = async (call: Record<string, any>, callback: Callback) => {
    const { id: productId } = call.request;

    const error = await this.productService.delete(productId);

    if (error instanceof Error) return callback(error, null);

    return callback(null, null);
  };
}
