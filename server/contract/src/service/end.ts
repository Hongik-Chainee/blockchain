import { Connection, PublicKey } from "@solana/web3.js";
import { Program, AnchorProvider, BN } from "@coral-xyz/anchor";
import type { ContractProgram } from "@type/contract_program";
import { buildEndContractTx } from "../lib/build-tx";
import { resolveContract } from "../lib/resolve";
import {
  parseCluster,
  clusterEndpoint,
  defaultCommitment,
} from "@config/cluster";
import { loadIdl, loadKey } from "@util/load";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";

const KEYFILE = process.env.KEYFILE!;
const IDL = loadIdl(process.env.IDL!);
const CLUSTER = parseCluster(process.env.CLUSTER!);

const endpoint = clusterEndpoint(CLUSTER);
const commitment = defaultCommitment(CLUSTER);
const connection = new Connection(endpoint, { commitment });
const platform = loadKey(KEYFILE);

export default async function endContract(
  employer: PublicKey,
  employee: PublicKey,
  contract: PublicKey,
  escrow: PublicKey,
  amount: bigint
) {
  try {
    const wallet = new NodeWallet(platform);
    const provider = new AnchorProvider(connection, wallet);
    const program = new Program<ContractProgram>(IDL, provider);
    const amountBN = new BN(amount.toString());

    const { tx, blockhash, lastValidBlockHeight } = await buildEndContractTx(
      connection,
      program,
      platform.publicKey,
      employer,
      employee,
      contract,
      escrow,
      amountBN
    );

    const signature = await connection.sendRawTransaction(tx.serialize());
    await connection.confirmTransaction(
      { signature, blockhash, lastValidBlockHeight },
      commitment
    );

    const contractData = await program.account.contract.fetch(contract);

    return {
      ok: true,
      message: "Contract ended.",
      contract: resolveContract(contractData),
      signature,
    };
  } catch (e) {
    return {
      ok: false,
      message: "Failed to end contract.",
    };
  }
}
