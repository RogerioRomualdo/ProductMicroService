import { IProductRepository } from "../../repositories/product/IProductRepository";
import { ProductDTO, paginationOptions, ProductList } from "../../types";
import { IProductService } from "./IProductService";
import { Validator } from "../../../utils/validator";

export class ProductService implements IProductService {
  private validator;

  constructor(private productRepository: IProductRepository) {
    this.validator = new Validator();
  }

  create = async (productData: ProductDTO) => {
    const validationError = this.validator.ValidateFalsyFields(productData, [
      "createdAt",
      "updatedAt",
    ]);

    if (!productData.createdAt) delete productData.createdAt;
    if (!productData.updatedAt) delete productData.updatedAt;

    if (validationError) return validationError;

    return await this.productRepository.create(productData);
  };
  index = async (options: paginationOptions) => {
    return await this.productRepository.index(options);
  };
  update = async (productId: string, productData: Partial<ProductDTO>) => {
    const validationError = this.validator.ValidateFalsyFields(productData, [
      "createdAt",
      "updatedAt",
    ]);

    if (validationError) return validationError;

    const product = await this.productRepository.findById(productId);

    if (!product) return new Error("Product not found");

    return await this.productRepository.update(productId, productData);
  };
  show = async (productId: string) => {
    const product = await this.productRepository.findById(productId);

    if (!product) return new Error("Product not found");

    return product;
  };
  delete = async (productId: string) => {
    const product = await this.productRepository.findById(productId);

    if (!product) return new Error("Product not found");

    await this.productRepository.delete(product.id);
  };
  getProductsByIds = async (productIds: Array<string>) => {
    return await this.productRepository.getProductsByIds(productIds);
  };
}
