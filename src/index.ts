import dotEnv from "dotenv";
import path from "path";
import { createConnection } from "typeorm";
import { loadSync } from "@grpc/proto-loader";
import {
  loadPackageDefinition,
  Server,
  ServerCredentials,
} from "@grpc/grpc-js";

dotEnv.config();

const port = process.env.APP_PORT;

const loadProto = () => {
  const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  };

  return loadPackageDefinition(
    loadSync(path.resolve(__dirname, "infra", "pb", "product.proto"), options)
  );
};

createConnection()
  .then(async () => {
    const proto: any = loadProto();
    const server = new Server();

    (await import("./infra/injectors/Product")).default(
      server,
      proto.ProductService.service
    );

    server.bindAsync(
      `${process.env.APP_HOST}:${port}`,
      ServerCredentials.createInsecure(),
      (error, port) => {
        if (error) return console.log(error);

        server.start();
        console.log(`Server is running on port ${port}..`);
      }
    );
  })
  .catch((e) => console.log(e));
