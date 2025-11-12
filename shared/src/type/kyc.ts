type KycMethod = "document" | "phone" | "bank";

export default interface KycSubject {
  kyc: true;
  verifiedAt: string;
  provider: string;
  method: KycMethod[];
}
