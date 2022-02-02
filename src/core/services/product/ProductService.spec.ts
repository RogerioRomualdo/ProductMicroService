import {
  paginationOptions,
  Product,
  ProductDTO,
  ProductList,
} from "../../types";
import { ProductService } from "./ProductService";
import { returnAValidProduct } from "../../../utils/test";

describe("Product service", () => {
  const MockPhramacyRepository = {
    index: jest.fn<Promise<ProductList>, [options: paginationOptions]>(),
    findById: jest.fn<Promise<Product | undefined>, [productId: string]>(),
    create: jest.fn<Promise<Product>, [productData: ProductDTO]>(),
    update: jest.fn<
      Promise<Product>,
      [productId: string, productData: Partial<ProductDTO>]
    >(),
    delete: jest.fn<Promise<void>, [phramacyId: string]>(),
  };

  const productService = new ProductService(MockPhramacyRepository);

  it("should be defined", () => {
    expect(productService).toBeDefined();
  });

  describe("Creating a product", () => {
    const validProduct = returnAValidProduct();

    it("should create a product", async () => {
      MockPhramacyRepository.create.mockReturnValue(
        new Promise((resolve) => resolve(validProduct))
      );

      const product = await productService.create({} as ProductDTO);

      expect(product).toEqual(validProduct);
      expect(MockPhramacyRepository.create).toBeCalledTimes(1);
    });

    it("shouldn't create a product (insufficient data)", async () => {
      const { id, ...productDTO } = returnAValidProduct({ name: "" });

      const product = await productService.create(productDTO);

      expect(MockPhramacyRepository.create).toBeCalledTimes(0);
      expect(product).toBeInstanceOf(Error);
    });
  });

  describe("Listing all phramacies", () => {
    const paginationOptions = { currentPage: 0, pageSize: 10 };
    const validProduct = returnAValidProduct();

    it("should return a list of products", async () => {
      const mockProductList = {
        count: paginationOptions.pageSize,
        products: new Array(paginationOptions.pageSize).fill(validProduct),
      };

      MockPhramacyRepository.index.mockReturnValue(
        new Promise((resolve) => resolve(mockProductList))
      );

      const productList = await productService.index(paginationOptions);

      expect(productList.products.length).toEqual(paginationOptions.pageSize);
      expect(productList.products.length).toEqual(productList.count);
      expect(productList).toBe(mockProductList);
      expect(MockPhramacyRepository.index).toBeCalledTimes(1);
    });
  });

  describe("Updating a product", () => {
    const validProduct = returnAValidProduct();
    const { id, ...mockUpdatedProduct } = returnAValidProduct({
      name: "anotherProductName",
    });

    it("should update a product", async () => {
      MockPhramacyRepository.findById.mockReturnValue(
        new Promise((resolve) => resolve(validProduct))
      );

      MockPhramacyRepository.update.mockReturnValue(
        new Promise((resolve) => resolve({ id, ...mockUpdatedProduct }))
      );

      const updatedProduct = await productService.update(
        validProduct.id,
        mockUpdatedProduct
      );

      expect(updatedProduct).toEqual({
        id: validProduct.id,
        ...mockUpdatedProduct,
      });
      expect(MockPhramacyRepository.findById).toBeCalledTimes(1);
      expect(MockPhramacyRepository.update).toBeCalledTimes(1);
    });

    it("shouldn't update a product (product not found)", async () => {
      MockPhramacyRepository.findById.mockReturnValue(
        new Promise((resolve) => resolve(undefined))
      );

      const updatedProduct = await productService.update(
        "notAValidId",
        mockUpdatedProduct
      );

      expect(updatedProduct).toBeInstanceOf(Error);
      expect(MockPhramacyRepository.findById).toBeCalledTimes(1);
      expect(MockPhramacyRepository.update).toBeCalledTimes(0);
    });

    it("shouldn't update a pharmcy (productData contains falsy fields)", async () => {
      const productWithFalsyFields = returnAValidProduct({ name: "" });

      const updatedProduct = await productService.update(
        id,
        productWithFalsyFields
      );

      expect(updatedProduct).toBeInstanceOf(Error);
      expect(MockPhramacyRepository.findById).toBeCalledTimes(0);
      expect(MockPhramacyRepository.update).toBeCalledTimes(0);
    });
  });

  describe("Showing a product", () => {
    const validProduct = returnAValidProduct();

    it("should return a product", async () => {
      MockPhramacyRepository.findById.mockReturnValue(
        new Promise((resolve) => resolve(validProduct))
      );

      const product = await productService.show(validProduct.id);

      expect(product).toEqual(validProduct);
      expect(MockPhramacyRepository.findById).toBeCalledTimes(1);
    });

    it("shouldn't return a product (product not found)", async () => {
      MockPhramacyRepository.findById.mockReturnValue(
        new Promise((resolve) => resolve(undefined))
      );

      const product = await productService.show(validProduct.id);

      expect(product).toBeInstanceOf(Error);
      expect(MockPhramacyRepository.findById).toBeCalledTimes(1);
    });
  });

  describe("Delete a product", () => {
    const product = returnAValidProduct();

    it("should delete a product", async () => {
      MockPhramacyRepository.findById.mockReturnValue(
        new Promise((resolve) => resolve(product))
      );

      MockPhramacyRepository.delete.mockReturnValue(
        new Promise((resolve) => resolve(undefined))
      );

      const returnedValue = await productService.delete(product.id);

      expect(returnedValue).toBeUndefined();
      expect(MockPhramacyRepository.findById).toBeCalledTimes(1);
      expect(MockPhramacyRepository.delete).toBeCalledTimes(1);
    });

    it("shouldn't delete a product (product not found)", async () => {
      MockPhramacyRepository.findById.mockReturnValue(
        new Promise((resolve) => resolve(undefined))
      );

      const returnedValue = await productService.delete(product.id);

      expect(returnedValue).toBeInstanceOf(Error);
      expect(MockPhramacyRepository.findById).toBeCalledTimes(1);
      expect(MockPhramacyRepository.delete).toBeCalledTimes(0);
    });
  });
});
