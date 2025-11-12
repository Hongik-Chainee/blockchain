import { Connection, PublicKey } from "@solana/web3.js";
import { Program, AnchorProvider } from "@coral-xyz/anchor";
import type { ContractProgram } from "@type/contract_program";
import { terminateContractTx } from "../lib/build-tx";
import { contractDataToJson, ContractData } from "../lib/encode";
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

export default async function terminateContractService(
  employer: PublicKey,
  contract: PublicKey,
  escrow: PublicKey
) {
  try {
    const wallet = new NodeWallet(platform);
    const provider = new AnchorProvider(connection, wallet);
    const program = new Program<ContractProgram>(IDL, provider);
    const { tx, blockhash, lastValidBlockHeight } = await terminateContractTx(
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
      contract: contractDataToJson(contractData),
      signature,
    };
  } catch (e) {
    return {
      ok: false,
      message: "Failed to terminate contract.",
    };
  }
}
