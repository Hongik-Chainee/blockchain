import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";

export const Status = [
  "pending",
  "active",
  "completed",
  "cancelled",
  "terminated",
  "expired",
] as const;

type Status = (typeof Status)[number];

export interface ContractData {
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
  status: string;
}
