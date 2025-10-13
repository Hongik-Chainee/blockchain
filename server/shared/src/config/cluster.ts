import type { Commitment } from "@solana/web3.js";

export const CLUSTER_NAMES = ["devnet", "testnet", "mainnet-beta"] as const;
export type ClusterName = typeof CLUSTER_NAMES[number];

export function parseCluster(input?: string): ClusterName {
    const v = (input ?? "").trim() as ClusterName;
    if (!CLUSTER_NAMES.includes(v)) {
        throw new Error(`[cluster] Unsupported CLUSTER: "${v}" (devnet|testnet|mainnet-beta)`);
    }
    return v;
}

const ENDPOINT: Record<ClusterName, string> = {
    devnet: "https://api.devnet.solana.com",
    testnet: "https://api.testnet.solana.com",
    "mainnet-beta": "https://api.mainnet-beta.solana.com",
};
export const clusterEndpoint = (c: ClusterName) => ENDPOINT[c];

const DEFAULT_COMMITMENT: Record<ClusterName, Commitment> = {
    devnet: "confirmed",
    testnet: "confirmed",
    "mainnet-beta": "finalized",
};
export const defaultCommitment = (c: ClusterName) => DEFAULT_COMMITMENT[c];
