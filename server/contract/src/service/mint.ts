import "dotenv/config";
import { Connection, PublicKey } from "@solana/web3.js";
import { Program, AnchorProvider } from "@coral-xyz/anchor";
import type { ContractProgram } from "@type/contract_program";
import { buildMintBadgeTx } from "../lib/build-tx";
import { resolveBadge } from "../lib/resolve";
import {
  parseCluster,
  clusterEndpoint,
  defaultCommitment,
} from "@config/cluster";
import { loadIdl, loadKey } from "@util/load";
import badgeUri from "@config/badge";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";

const KEYFILE = process.env.KEYFILE!;
const IDL = loadIdl(process.env.IDL!);
const CLUSTER = parseCluster(process.env.CLUSTER!);

const endpoint = clusterEndpoint(CLUSTER);
const commitment = defaultCommitment(CLUSTER);
const connection = new Connection(endpoint, { commitment });
const platform = loadKey(KEYFILE);

export default async function mintBadge(
  employee: PublicKey,
  contract: PublicKey,
  escrow: PublicKey,
  level: number
) {
  try {
    const wallet = new NodeWallet(platform);
    const provider = new AnchorProvider(connection, wallet);
    const program = new Program<ContractProgram>(IDL, provider);
    const uri = badgeUri(level);
    const { tx, blockhash, lastValidBlockHeight, badge } =
      await buildMintBadgeTx(
        connection,
        program,
        employee,
        platform.publicKey,
        contract,
        escrow,
        uri,
        level
      );

    const signature = await connection.sendRawTransaction(tx.serialize());
    await connection.confirmTransaction(
      { signature, blockhash, lastValidBlockHeight },
      commitment
    );

    const badgeData = await program.account.badge.fetch(badge);

    return {
      ok: true,
      message: "Badge Minted.",
      badge: resolveBadge(badgeData),
      signature,
    };
  } catch (e) {
    return {
      ok: false,
      message: "Failed to mint badge.",
    };
  }
}
