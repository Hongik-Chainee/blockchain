import { Cluster, Connection, PublicKey, Transaction } from "@solana/web3.js";
import { finalizeTx } from "./finalize";
import {
    DidSolIdentifier,
    DidSolService,
    VerificationMethodType,
    BitwiseVerificationMethodFlag
} from "@identity.com/sol-did-client";

async function buildService(
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

export async function makeInitTx(
    conn: Connection,
    authority: PublicKey,
    cluster: Cluster
) {
    const svc = await buildService(conn, authority, cluster);
    svc.initialize(undefined, authority)
    const tx = await svc.transaction();

    return finalizeTx(conn, tx, authority);
}

export async function makeAddVmTx(
    conn: Connection,
    authority: PublicKey,
    cluster: Cluster,
    fragment: string,
    isIssuer: boolean
) {
    const flags = isIssuer
        ? [BitwiseVerificationMethodFlag.Assertion]
        : [
            BitwiseVerificationMethodFlag.Authentication,
            BitwiseVerificationMethodFlag.CapabilityInvocation
        ]

    const svc = await buildService(conn, authority, cluster);
    svc.addVerificationMethod(
        {
            fragment,
            keyData: authority.toBuffer(),
            methodType: VerificationMethodType.Ed25519VerificationKey2018,
            flags
        },
        authority
    );
    const tx = await svc.transaction();

    return finalizeTx(conn, tx, authority);
}