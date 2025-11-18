import { Connection, PublicKey, Transaction } from "@solana/web3.js";
import { BN, Program } from "@coral-xyz/anchor";
import { ContractProgram } from "@type/contract_program";
import {
  buildCreateContractIx,
  buildEndContractIx,
  buildExpireContractIx,
  buildCloseEscrowIx,
} from "./build-ix";
import finalizeTx from "@util/finalize";

export async function buildCreateContractTx(
  conn: Connection,
  program: Program<ContractProgram>,
  employer: PublicKey,
  employee: PublicKey,
  salary: BN,
  startDate: BN,
  dueDate: BN,
  seed: Buffer
): Promise<{
  tx: Transaction;
  blockhash: string;
  lastValidBlockHeight: number;
  contract: PublicKey;
  escrow: PublicKey;
}> {
  const { ix, contract, escrow } = await buildCreateContractIx(
    program,
    employer,
    employee,
    salary,
    startDate,
    dueDate,
    seed
  );

  const tx = new Transaction().add(ix);
  const {
    tx: finalizedTx,
    blockhash,
    lastValidBlockHeight,
  } = await finalizeTx(conn, tx, employer);

  return { tx: finalizedTx, blockhash, lastValidBlockHeight, contract, escrow };
}

export async function buildEndContractTx(
  conn: Connection,
  program: Program<ContractProgram>,
  platform: PublicKey,
  employer: PublicKey,
  employee: PublicKey,
  contract: PublicKey,
  escrow: PublicKey,
  amount: BN
): Promise<{
  tx: Transaction;
  blockhash: string;
  lastValidBlockHeight: number;
}> {
  const completeIx = await buildEndContractIx(
    program,
    employer,
    employee,
    contract,
    escrow,
    amount
  );

  const closeIx = await buildCloseEscrowIx(program, platform, escrow);

  const tx = new Transaction().add(completeIx, closeIx);
  const {
    tx: finalizedTx,
    blockhash,
    lastValidBlockHeight,
  } = await finalizeTx(conn, tx, platform);

  return { tx: finalizedTx, blockhash, lastValidBlockHeight };
}

export async function buildExpireContractTx(
  conn: Connection,
  program: Program<ContractProgram>,
  platform: PublicKey,
  employer: PublicKey,
  contract: PublicKey,
  escrow: PublicKey
): Promise<{
  tx: Transaction;
  blockhash: string;
  lastValidBlockHeight: number;
}> {
  const terminateIx = await buildExpireContractIx(
    program,
    employer,
    contract,
    escrow
  );

  const closeIx = await buildCloseEscrowIx(program, platform, escrow);

  const tx = new Transaction().add(terminateIx, closeIx);
  const {
    tx: finalizedTx,
    blockhash,
    lastValidBlockHeight,
  } = await finalizeTx(conn, tx, platform);

  return { tx: finalizedTx, blockhash, lastValidBlockHeight };
}
