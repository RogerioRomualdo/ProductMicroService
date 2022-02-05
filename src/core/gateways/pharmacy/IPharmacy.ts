export interface IPharmacyClient {
  unlinkProductFromAllPharmacies: (productId: string) => Promise<void>;
}
