import bs58 from "bs58";
import ContractData from "@type/contract";
import BadgeData from "@type/badge";

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

function decodeBadgeLevel(level: any): string {
  if (level.bronze) return "Bronze";
  if (level.silver) return "Silver";
  if (level.gold) return "Gold";
  if (level.platinum) return "Platinum";
  throw new Error();
}

export function resolveBadge(badge: BadgeData) {
  return {
    contract: badge.contract.toBase58(),
    employee: badge.employee.toBase58(),
    level: decodeBadgeLevel(badge.level),
    uri: badge.uri,
    mintedAt: badge.mintedAt.toString(),
  };
}
