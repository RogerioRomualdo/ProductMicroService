import GetCLient from "../../../infra/pb/loader";
import { IPharmacyClient } from "./IPharmacy";

export class PharmacyClient implements IPharmacyClient {
  private productClient;

  constructor() {
    this.productClient = GetCLient({
      serviceName: "PharmacyService",
      address: "localhost:8087",
      fileName: "pharmacy",
    });
  }

  unlinkProductFromAllPharmacies = async (productId: string) => {
    this.productClient.unlinkProductFromAllPharmacies({ id: productId });
  };
}
