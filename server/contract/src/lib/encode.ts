import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import bs58 from "bs58";

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
}

export function contractDataToJson(contract: ContractData) {
  return {
    id: bs58.encode(Buffer.from(contract.id)),
    employer: contract.employer.toBase58(),
    employee: contract.employee.toBase58(),
    salary: contract.salary.toString(),
    amount: contract.amount.toString(),
    startDate: contract.startDate.toString(),
    dueDate: contract.dueDate.toString(),
    endDate: contract.endDate.toString(),
    createdAt: contract.createdAt.toString(),
    updatedAt: contract.updatedAt.toString(),
  };
}
