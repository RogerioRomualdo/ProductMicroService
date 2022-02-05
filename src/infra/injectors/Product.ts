import { Server } from "@grpc/grpc-js";
import { ProductController } from "../../core/controllers/product/ProductController";
import { ProductService } from "../../core/services/product/ProductService";
import { ProductRepository } from "../../core/repositories/product/ProductRepository";
import { PharmacyClient } from "../../core/gateways/pharmacy/Pharmacy";

const productRepository = new ProductRepository();
const pharmacyClient = new PharmacyClient();
const productService = new ProductService(productRepository, pharmacyClient);
const productController = new ProductController(productService);

export default (server: Server, proto: any) => {
  server.addService(proto, productController as any);
};
