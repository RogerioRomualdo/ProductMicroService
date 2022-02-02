import { getRepository, Repository } from "typeorm";
import { Product as ProductEntity } from "../../../infra/database/models/Product";
import { ProductDTO, paginationOptions } from "../../types";
import { IProductRepository } from "./IProductRepository";

export class ProductRepository implements IProductRepository {
  private typeOrm: Repository<ProductEntity>;

  constructor() {
    this.typeOrm = getRepository(ProductEntity);
  }

  index = async (options: paginationOptions) => {
    const { currentPage, pageSize } = options;

    const [products, count] = await this.typeOrm.findAndCount({
      take: pageSize,
      skip: currentPage * pageSize,
    });

    return { count, products };
  };
  findById = async (productId: string) => {
    return await this.typeOrm.findOne({ where: { id: productId } });
  };
  create = async (productData: ProductDTO) => {
    return await this.typeOrm.save(productData);
  };
  update = async (phramacyId: string, productData: Partial<ProductDTO>) => {
    return await this.typeOrm.save({ id: phramacyId, ...productData });
  };
  delete = async (productId: string) => {
    console.log()
    await this.typeOrm.delete(productId);
  };
}
