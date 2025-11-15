import bs58 from "bs58";
import { ContractData } from "@type/contract";

export function resolveContract(contract: ContractData) {
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
