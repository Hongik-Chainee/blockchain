import { Cluster, Commitment } from "@solana/web3.js";

export function clusterEndpoint(cluster: Cluster): string {
    switch (cluster) {
        case "mainnet-beta": return "https://api.mainnet-beta.solana.com";
        case "testnet": return "https://api.testnet.solana.com";
        case "devnet": return "https://api.devnet.solana.com";
    }

    const _exhaustive: never = cluster;
    return "https://api.devnet.solana.com";
}

export function defaultCommitment(cluster: Cluster): Commitment {
    switch (cluster) {
        case "mainnet-beta": return "finalized";
        case "testnet": return "confirmed";
        case "devnet": return "confirmed";
    }

    const _exhaustive: never = cluster;
    return "confirmed";
};