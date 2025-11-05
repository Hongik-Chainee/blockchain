import "dotenv/config";
import { Connection, PublicKey } from "@solana/web3.js";
import { DidSolIdentifier } from "@identity.com/sol-did-client";
import { parseCluster, clusterEndpoint, defaultCommitment } from "shared/src/config/cluster";
import buildService from "shared/src/util/did";
import loadKey from "../lib/key";

const KEYFILE = process.env.KEYFILE!;
const CLUSTER = parseCluster(process.env.CLUSTER!);

const endpoint = clusterEndpoint(CLUSTER);
const commitment = defaultCommitment(CLUSTER);
const connection = new Connection(endpoint, { commitment });
const issuer = loadKey(KEYFILE);

export async function readIssuerDidDoc() {
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

        const document = await svc.resolve();

        return {
            ok: true,
            message: "Document loaded successfully.",
            did,
            document
        };
    } catch (e) {
        return {
            ok: false,
            message: "Failed to read DID document.",
            did,
            error: (e as Error).message,
        };
    }
}

export async function readHolderDidDoc(holder: PublicKey) {
    const did = DidSolIdentifier.create(holder, CLUSTER).toString()
    const svc = buildService(connection, holder, CLUSTER);

    try {
        const exists = await svc.getDidAccount();
        if (!exists) {
            return {
                ok: false,
                message: "DID not found."
            };
        }

        const document = await svc.resolve();

        return {
            ok: true,
            message: "Document loaded successfully.",
            did,
            document
        };
    } catch (e) {
        return {
            ok: false,
            message: "Failed to read DID document.",
            did,
            error: (e as Error).message,
        };
    }
}