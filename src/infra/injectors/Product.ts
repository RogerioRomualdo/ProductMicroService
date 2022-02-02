import { Server } from "@grpc/grpc-js";
import { ProductController } from "../../core/controllers/product/ProductController";
import { ProductService } from "../../core/services/product/ProductService";
import { ProductRepository } from "../../core/repositories/product/ProductRepository";

const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);

export default (server: Server, proto: any) => {
  server.addService(proto, productController as any);
};
