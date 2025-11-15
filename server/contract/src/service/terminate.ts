import { Connection, PublicKey } from "@solana/web3.js";
import { Program, AnchorProvider } from "@coral-xyz/anchor";
import type { ContractProgram } from "@type/contract_program";
import { buildExpireContractTx } from "../lib/build-tx";
import { resolveContract, ContractData } from "../lib/resolve";
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

export default async function terminateContract(
  employer: PublicKey,
  contract: PublicKey,
  escrow: PublicKey
) {
  try {
    const wallet = new NodeWallet(platform);
    const provider = new AnchorProvider(connection, wallet);
    const program = new Program<ContractProgram>(IDL, provider);
    const { tx, blockhash, lastValidBlockHeight } = await buildExpireContractTx(
      connection,
      program,
      platform.publicKey,
      employer,
      contract,
      escrow
    );

    const signature = await connection.sendRawTransaction(tx.serialize());
    await connection.confirmTransaction(
      { signature, blockhash, lastValidBlockHeight },
      commitment
    );

    const contractData = (await program.account.contract.fetch(
      contract
    )) as ContractData;

    return {
      ok: true,
      message: "Contract terminated.",
      contract: resolveContract(contractData),
      signature,
    };
  } catch (e) {
    return {
      ok: false,
      message: "Failed to terminate contract.",
    };
  }
}
