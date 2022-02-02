import {
  paginationOptions,
  Product,
  ProductDTO,
  ProductList,
} from "../../types";
import { ProductController } from "./ProductController";
import { returnAValidProduct } from "../../../utils/test";

describe("Product Controller", () => {
  const MockProductService = {
    index: jest.fn<Promise<ProductList>, [options: paginationOptions]>(),
    show: jest.fn<Promise<Product | Error>, [productId: string]>(),
    create: jest.fn<Promise<Product | Error>, [productData: ProductDTO]>(),
    update: jest.fn<
      Promise<Product | Error>,
      [productId: string, productData: Partial<ProductDTO>]
    >(),
    delete: jest.fn<Promise<void | Error>, [productId: string]>(),
  };

  const productController = new ProductController(MockProductService);

  it("should be defined", () => {
    expect(productController).toBeDefined();
  });

  describe("Creating a new product", () => {
    const call = { request: {} as ProductDTO };

    it("should create a new product", async () => {
      const product = returnAValidProduct();

      MockProductService.create.mockReturnValue(
        new Promise((resolve) => resolve(product))
      );

      await productController.createProduct(call, (error, result) => {
        expect(result).toEqual(product);
        expect(error).toBeNull();
      });

      expect(MockProductService.create).toBeCalledTimes(1);
    });

    it("shouldn't create a new product (productService returned an Error)", async () => {
      MockProductService.create.mockReturnValue(
        new Promise((resolve) => resolve(new Error("Any error message")))
      );

      await productController.createProduct(call, (error, result) => {
        expect(error).toBeInstanceOf(Error);
        expect(result).toBeNull();
      });

      expect(MockProductService.create).toBeCalledTimes(1);
    });
  });

  describe("Showing a product", () => {
    const call = { request: { productId: "anyProductId" } };

    it("should return a product", async () => {
      const product = returnAValidProduct();

      MockProductService.show.mockReturnValue(
        new Promise((resolve) => resolve(product))
      );

      await productController.showProduct(call, (error, result) => {
        expect(error).toBeNull();
        expect(result).toEqual(product);
      });

      expect(MockProductService.show).toBeCalledTimes(1);
    });

    it("shouldn't return a product (productService returned an Error)", async () => {
      MockProductService.show.mockReturnValue(
        new Promise((resolve) => resolve(new Error("Any error message")))
      );

      await productController.showProduct(call, (error, result) => {
        expect(error).toBeInstanceOf(Error);
        expect(result).toBeNull();
      });

      expect(MockProductService.show).toBeCalledTimes(1);
    });
  });

  describe("Listing products", () => {
    const call = { request: {} as paginationOptions };

    it("should return an array of products", async () => {
      const productList = {
        count: 1,
        products: Array(1).fill(returnAValidProduct()),
      };

      MockProductService.index.mockReturnValue(
        new Promise((resolve) => resolve(productList))
      );

      await productController.listAllProducts(call, (error, result) => {
        expect(error).toBeNull();
        expect(result.products.length).toEqual(result.count);
        expect(result).toEqual(productList);
      });

      expect(MockProductService.index).toBeCalledTimes(1);
    });
  });

  describe("Deleting products", () => {
    const call = { request: { productId: "anyProductId" } };

    it("should delete a product", async () => {
      MockProductService.delete.mockReturnValue(
        new Promise((resolve) => resolve(undefined))
      );

      await productController.deleteProduct(call, (error, result) => {
        expect(error).toBeNull();
        expect(result).toBeNull();
      });

      expect(MockProductService.delete).toBeCalledTimes(1);
    });

    it("shouldn't delete a product (productService returned an Error)", async () => {
      MockProductService.delete.mockReturnValue(
        new Promise((resolve) => resolve(new Error("Any error message")))
      );

      await productController.deleteProduct(call, (error, result) => {
        expect(error).toBeInstanceOf(Error);
        expect(result).toBeNull();
      });

      expect(MockProductService.delete).toBeCalledTimes(1);
    });
  });

  describe("Updating a product", () => {
    const call = { request: {} as Partial<ProductDTO> };

    it("should return an updated product", async () => {
      const product = returnAValidProduct();

      MockProductService.update.mockReturnValue(
        new Promise((resolve) => resolve(product))
      );

      await productController.updateProduct(call, (error, result) => {
        expect(error).toBeNull();
        expect(result).toEqual(product);
      });

      expect(MockProductService.update).toBeCalledTimes(1);
    });

    it("shouldn't update a product (productService returned an Error)", async () => {
      MockProductService.update.mockReturnValue(
        new Promise((resolve) => resolve(new Error("Any error message")))
      );

      await productController.updateProduct(call, (error, result) => {
        expect(error).toBeInstanceOf(Error);
        expect(result).toBeNull();
      });

      expect(MockProductService.update).toBeCalledTimes(1);
    });
  });
});
