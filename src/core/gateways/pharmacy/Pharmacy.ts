import GetCLient from "../../../infra/pb/loader";
import { IPharmacyClient } from "./IPharmacy";

import dotenv from "dotenv";
dotenv.config();

export class PharmacyClient implements IPharmacyClient {
  private productClient;

  constructor() {
    this.productClient = GetCLient({
      serviceName: "PharmacyService",
      address: `${process.env.APP_HOST}:${process.env.MSPHARMACY_PORT}`,
      fileName: "pharmacy",
    });
  }

  unlinkProductFromAllPharmacies = async (productId: string) => {
    this.productClient.unlinkProductFromAllPharmacies({ id: productId });
  };
}
