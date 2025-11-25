import "dotenv/config";
import { Connection, PublicKey } from "@solana/web3.js";
import { Program, AnchorProvider, BN } from "@coral-xyz/anchor";
import { ContractProgram } from "@type/contract_program";
import { buildCreateContractTx } from "../lib/build-tx";
import {
  parseCluster,
  clusterEndpoint,
  defaultCommitment,
} from "@config/cluster";
import { loadIdl } from "@util/load";

const IDL = loadIdl(process.env.IDL!);
const CLUSTER = parseCluster(process.env.CLUSTER!);

const endpoint = clusterEndpoint(CLUSTER);
const commitment = defaultCommitment(CLUSTER);
const connection = new Connection(endpoint, { commitment });

export default async function createContract(
  employer: PublicKey,
  employee: PublicKey,
  salary: bigint,
  startDate: number,
  dueDate: number
) {
  try {
    const provider = new AnchorProvider(connection, {
      publicKey: employer,
      signTransaction: async (tx) => tx,
      signAllTransactions: async (txs) => txs,
    });
    const program = new Program<ContractProgram>(IDL, provider);
    const seed = Buffer.from(String(Date.now()));
    const salaryBN = new BN(salary.toString());
    const startDateBN = new BN(startDate);
    const dueDateBN = new BN(dueDate);

    const { tx, blockhash, lastValidBlockHeight, contract, escrow } =
      await buildCreateContractTx(
        connection,
        program,
        employer,
        employee,
        salaryBN,
        startDateBN,
        dueDateBN,
        seed
      );

    const txBase64 = tx
      .serialize({ requireAllSignatures: false, verifySignatures: false })
      .toString("base64");

    return {
      ok: true,
      message: "Unsigned transaction built.",
      txBase64,
      blockhash,
      lastValidBlockHeight,
      commitment,
      contract,
      escrow,
    };
  } catch (e) {
    return {
      ok: false,
      message: "Failed to create contract.",
    };
  }
}
