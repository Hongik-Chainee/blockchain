import "dotenv/config";
import { Connection, PublicKey } from "@solana/web3.js";
import { DidSolIdentifier } from "@identity.com/sol-did-client";
import { createVerifiableCredentialJwt, JwtCredentialPayload } from "did-jwt-vc";
import { EdDSASigner } from "did-jwt";
import { v4 as uuidv4 } from "uuid";
import { parseCluster, clusterEndpoint, defaultCommitment } from "shared/src/config/cluster";
import { currentFragment, collectFragments } from "shared/src/util/fragment";
import buildService from "shared/src/util/did";
import KycSubject from "shared/src/type/kyc";
import loadKey from "../lib/key";

const KEYFILE = process.env.KEYFILE!;
const ISSUER_BASE = process.env.ISSUER_FRAGMENT!.trim();
const CLUSTER = parseCluster(process.env.CLUSTER!);

const endpoint = clusterEndpoint(CLUSTER);
const commitment = defaultCommitment(CLUSTER);
const connection = new Connection(endpoint, { commitment });
const issuer = loadKey(KEYFILE);
const issuerDid = DidSolIdentifier.create(issuer.publicKey, CLUSTER).toString();

export default async function issueVc(holder: PublicKey, subject: KycSubject) {
    const holderDid = DidSolIdentifier.create(holder, CLUSTER).toString();

    if (!subject?.provider?.trim()) {
        return {
            ok: false,
            message: "Invalid KYC subject: provider is required."
        };
    }
    if (!Array.isArray(subject.method) || subject.method.length === 0) {
        return {
            ok: false,
            message: "Invalid KYC subject: method must be a non-empty array."
        };
    }
    if (Number.isNaN(Date.parse(subject.verifiedAt))) {
        return {
            ok: false,
            message: "Invalid KYC subject: verifiedAt must be ISO 8601 UTC string."
        };
    }

    const holderSvc = buildService(connection, holder, CLUSTER);
    const issuerSvc = buildService(connection, issuer.publicKey, CLUSTER);

    try {
        const exists = await holderSvc.getDidAccount();
        if (!exists) {
            return {
                ok: false,
                message: "DID not found."
            };
        }

        const doc = await issuerSvc.resolve();
        const used = collectFragments(doc, ISSUER_BASE);
        const curFrag = currentFragment(ISSUER_BASE, used);

        if (!curFrag) {
            return {
                ok: false,
                message: "Issuer VM not found."
            };
        }

        const scalar = issuer.secretKey.slice(0, 32);
        const now = Math.floor(Date.now() / 1000);
        const jti = `urn:uuid:${uuidv4()}`;

        const payload: JwtCredentialPayload = {
            jti,
            sub: holderDid,
            iat: now,
            nbf: now,
            vc: {
                "@context": ["https://www.w3.org/2018/credentials/v1"],
                type: ["VerifiableCredential", "KycCredential"],
                credentialSubject: subject,
            },
        };

        const jwt = await createVerifiableCredentialJwt(payload, {
            did: issuerDid,
            signer: EdDSASigner(scalar),
            alg: "EdDSA"
        });

        return {
            ok: true,
            message: "VC issued successfully.",
            vc: jwt
        };
    } catch (e) {
        return {
            ok: false,
            message: "Failed to issue VC."
        };
    }
}
