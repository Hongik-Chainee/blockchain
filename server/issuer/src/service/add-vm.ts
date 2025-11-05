import "dotenv/config";
import { Connection, PublicKey } from "@solana/web3.js";
import { DidSolIdentifier } from "@identity.com/sol-did-client";
import { parseCluster, clusterEndpoint, defaultCommitment } from "shared/src/config/cluster";
import { makeAddVmTx } from "../lib/build";
import buildService from "shared/src/util/did";
import loadKey from "../lib/key";

const KEYFILE = process.env.KEYFILE!;
const ISSUER_BASE = process.env.ISSUER_FRAGMENT!.trim();
const HOLDER_BASE = process.env.HOLDER_FRAGMENT!.trim();
const CLUSTER = parseCluster(process.env.CLUSTER!);

const endpoint = clusterEndpoint(CLUSTER);
const commitment = defaultCommitment(CLUSTER);
const connection = new Connection(endpoint, { commitment });
const issuer = loadKey(KEYFILE);

export async function addIssuerVm() {
    const did = DidSolIdentifier.create(issuer.publicKey, CLUSTER).toString()
    const svc = buildService(connection, issuer.publicKey, CLUSTER);

    try {
        const exists = await svc.getDidAccount();
        if (!exists) {
            return {
                ok: false,
                message: "DID not found."
            };
        }

        const { tx, blockhash, lastValidBlockHeight } = await makeAddVmTx(
            connection,
            issuer.publicKey,
            CLUSTER,
            ISSUER_BASE,
            true
        );
        tx.sign(issuer);

        const signature = await connection.sendRawTransaction(tx.serialize());
        await connection.confirmTransaction({ signature, blockhash, lastValidBlockHeight }, commitment);

        const document = await svc.resolve();

        return {
            ok: true,
            message: "VM added successfully.",
            document,
            signature
        };
    } catch (e) {
        return {
            ok: false,
            message: "Failed to add VM."
        };
    }
}

export async function addHolderVm(holder: PublicKey) {
    const did = DidSolIdentifier.create(holder, CLUSTER).toString();
    const svc = buildService(connection, holder, CLUSTER);

    try {
        const exists = await svc.getDidAccount();
        if (!exists) {
            return {
                ok: false,
                message: "DID not found."
            };
        }

        const { tx, blockhash, lastValidBlockHeight } =
            await makeAddVmTx(
                connection,
                holder,
                CLUSTER,
                HOLDER_BASE,
                true
            );
        const txBase64 = tx
            .serialize({ requireAllSignatures: false, verifySignatures: false })
            .toString("base64");

        return {
            ok: true,
            message: "Unsigned transaction built.",
            did,
            txBase64,
            blockhash,
            lastValidBlockHeight,
            commitment
        };
    } catch (e) {
        return {
            ok: false,
            message: "Failed to add VM."
        };
    }
}