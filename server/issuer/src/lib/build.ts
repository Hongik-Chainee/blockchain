import { Cluster, Connection, PublicKey } from "@solana/web3.js";
import { VerificationMethodType, BitwiseVerificationMethodFlag } from "@identity.com/sol-did-client";
import { collectVmFragments, newFragment } from "shared/src/util/fragment";
import buildService from "shared/src/util/did";
import finalizeTx from "shared/src/util/finalize";

export async function makeInitTx(
    conn: Connection,
    authority: PublicKey,
    cluster: Cluster
) {
    const svc = (await buildService(conn, authority, cluster))
        .withAutomaticAlloc(authority);;
    await svc.initialize(undefined, authority)
    const tx = await svc.transaction();

    return finalizeTx(conn, tx, authority);
}

export async function makeAddVmTx(
    conn: Connection,
    authority: PublicKey,
    cluster: Cluster,
    baseFragment: string,
    isIssuer: boolean
) {
    const svc = (await buildService(conn, authority, cluster))
        .withAutomaticAlloc(authority);
    const doc = await svc.resolve();
    const used = collectVmFragments(doc, baseFragment);
    const newFrag = newFragment(baseFragment, used);

    for (const frag of used) {
        await svc.removeVerificationMethod(frag, authority);
    }

    const flags = isIssuer
        ? [BitwiseVerificationMethodFlag.Assertion]
        : [
            BitwiseVerificationMethodFlag.Authentication,
            BitwiseVerificationMethodFlag.CapabilityInvocation
        ]
    await svc.addVerificationMethod(
        {
            fragment: newFrag,
            keyData: authority.toBuffer(),
            methodType: VerificationMethodType.Ed25519VerificationKey2018,
            flags
        },
        authority
    );

    const tx = await svc.transaction();
    return finalizeTx(conn, tx, authority);
}