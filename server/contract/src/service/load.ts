import "dotenv/config";
import { Connection, PublicKey } from "@solana/web3.js";
import { Program, AnchorProvider } from "@coral-xyz/anchor";
import { ContractProgram } from "@type/contract_program";
import { loadIdl } from "@util/load";
import {
  parseCluster,
  clusterEndpoint,
  defaultCommitment,
} from "@config/cluster";
import { resolveBadge, resolveContract } from "../lib/resolve";

const IDL = loadIdl(process.env.IDL!);
const CLUSTER = parseCluster(process.env.CLUSTER!);

const endpoint = clusterEndpoint(CLUSTER);
const commitment = defaultCommitment(CLUSTER);
const connection = new Connection(endpoint, { commitment });

export async function loadContract(contract: PublicKey) {
  try {
    const provider = new AnchorProvider(connection, {
      publicKey: new PublicKey(0),
      signTransaction: async (tx) => tx,
      signAllTransactions: async (txs) => txs,
    });
    const program = new Program<ContractProgram>(IDL, provider);

    const contractData = await program.account.contract.fetch(contract);

    return {
      ok: true,
      message: "Contract loaded successfully.",
      contract: resolveContract(contractData),
    };
  } catch (e) {
    return { ok: false, message: "Failed to load contract." };
  }
}

export async function loadBadge(badge: PublicKey) {
  try {
    const provider = new AnchorProvider(connection, {
      publicKey: new PublicKey(0),
      signTransaction: async (tx) => tx,
      signAllTransactions: async (txs) => txs,
    });
    const program = new Program<ContractProgram>(IDL, provider);

    const badgeData = await program.account.badge.fetch(badge);

    return {
      ok: true,
      message: "Badge loaded successfully.",
      badge: resolveBadge(badgeData),
    };
  } catch (e) {
    return { ok: false, message: "Failed to load badge." };
  }
}
