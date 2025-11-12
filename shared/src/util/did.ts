import { Cluster, Connection, PublicKey, Transaction } from "@solana/web3.js";
import { DidSolIdentifier, DidSolService } from "@identity.com/sol-did-client";

export default function buildService(
  conn: Connection,
  authority: PublicKey,
  cluster: Cluster
) {
  const didId = DidSolIdentifier.create(authority, cluster);
  const dummyWallet = {
    publicKey: authority,
    signAllTransactions: async <T extends Transaction[]>(txs: T) => txs,
    signTransaction: async <T extends Transaction>(tx: T) => tx,
  };

  return DidSolService.build(didId, { connection: conn, wallet: dummyWallet });
}
