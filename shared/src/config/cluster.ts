import { Cluster, Commitment } from "@solana/web3.js";

export function parseCluster(s: string): Cluster {
  const t = s.toLowerCase();

  switch (t) {
    case "mainnet-beta":
      return "mainnet-beta";
    case "testnet":
      return "testnet";
    case "devnet":
      return "devnet";
    default:
      return "devnet";
  }
}

export function clusterEndpoint(cluster: Cluster): string {
  switch (cluster) {
    case "mainnet-beta":
      return "https://api.mainnet-beta.solana.com";
    case "testnet":
      return "https://api.testnet.solana.com";
    case "devnet":
      return "https://api.devnet.solana.com";
    default:
      return "https://api.devnet.solana.com";
  }
}

export function defaultCommitment(cluster: Cluster): Commitment {
  switch (cluster) {
    case "mainnet-beta":
      return "finalized";
    case "testnet":
      return "confirmed";
    case "devnet":
      return "confirmed";
    default:
      return "confirmed";
  }
}
