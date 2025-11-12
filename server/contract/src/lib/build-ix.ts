import {
  PublicKey,
  SystemProgram,
  TransactionInstruction,
} from "@solana/web3.js";
import { Program, BN } from "@coral-xyz/anchor";
import { ContractProgram } from "@type/contract_program";

export async function buildCreateContractIx(
  program: Program<ContractProgram>,
  employer: PublicKey,
  employee: PublicKey,
  salary: bigint,
  startDate: number,
  dueDate: number,
  seed: Buffer
): Promise<{
  ix: TransactionInstruction;
  contract: PublicKey;
  escrow: PublicKey;
}> {
  const [contract, _contractBump] = PublicKey.findProgramAddressSync(
    [Buffer.from("contract"), employer.toBuffer(), seed],
    program.programId
  );
  const [escrow, _escrowBump] = PublicKey.findProgramAddressSync(
    [Buffer.from("escrow"), contract.toBuffer()],
    program.programId
  );

  const ix = await program.methods
    .createContract(
      new BN(salary.toString()),
      new BN(startDate),
      new BN(dueDate)
    )
    .accounts({
      employer,
      employee,
      contract,
      systemProgram: SystemProgram.programId,
    } as any)
    .instruction();

  return { ix, contract, escrow };
}

export async function buildCompleteContractIx(
  program: Program<ContractProgram>,
  employer: PublicKey,
  employee: PublicKey,
  contract: PublicKey,
  escrow: PublicKey,
  amount: bigint
): Promise<TransactionInstruction> {
  const ix = await program.methods
    .completeContract(new BN(amount.toString()))
    .accounts({
      employer,
      employee,
      contract,
      escrow,
      systemProgram: SystemProgram.programId,
    } as any)
    .instruction();

  return ix;
}

export async function buildTerminateContractIx(
  program: Program<ContractProgram>,
  employer: PublicKey,
  contract: PublicKey,
  escrow: PublicKey
): Promise<TransactionInstruction> {
  const ix = await program.methods
    .terminateContract()
    .accounts({
      employer,
      contract,
      escrow,
      systemProgram: SystemProgram.programId,
    } as any)
    .instruction();

  return ix;
}

export async function buildCloseEscrowIx(
  program: Program<ContractProgram>,
  platform: PublicKey,
  escrow: PublicKey
): Promise<TransactionInstruction> {
  const ix = await program.methods
    .closeEscrow()
    .accounts({
      platform,
      escrow,
      systemProgram: SystemProgram.programId,
    } as any)
    .instruction();

  return ix;
}
