import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";

export default interface ContractData {
  id: number[];
  employer: PublicKey;
  employee: PublicKey;
  salary: BN;
  amount: BN;
  startDate: BN;
  dueDate: BN;
  endDate: BN;
  createdAt: BN;
  updatedAt: BN;
}
