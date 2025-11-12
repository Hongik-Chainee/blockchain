import { PublicKey } from "@solana/web3.js";

export interface Contract {
  id: string;
  employer: PublicKey;
  employee: PublicKey;
  salary: bigint;
  amount: bigint;
  startDate: number;
  dueDate: number;
  endDate: number;
  createdAt: number;
  updatedAt: number;
  status: "pending" | "active" | "completed" | "terminated";
}
