import { Connection, PublicKey } from "@solana/web3.js";
import { parseCluster, clusterEndpoint, defaultCommitment } from "shared/src/config/cluster";
import { verifyNonce } from "../lib/nonce";
import { verifyVc, verifyVp } from "../lib/vc-vp";
import buildService from "shared/src/util/did";

const SECRET = new TextEncoder().encode(process.env.NONCE_SEED!);

export default async function verifyChallenge(
    nonceJwt: string,
    vcJwt: string,
    vpJwt: string,
    domain: string,
    holder: PublicKey
) {
    try {
        const ISSUER_PUBKEY = process.env.ISSUER_PUBKEY!;
        const CLUSTER = parseCluster(process.env.CLUSTER!);

        const endpoint = clusterEndpoint(CLUSTER);
        const commitment = defaultCommitment(CLUSTER);
        const connection = new Connection(endpoint, { commitment });
        const issuer = new PublicKey(ISSUER_PUBKEY);
        const holderPubKey = holder.toBase58();

        const noncePayload = await verifyNonce(SECRET, nonceJwt);

        if (noncePayload.domain !== domain || noncePayload.holder !== holderPubKey)
            throw new Error();

        const issuerSvc = buildService(connection, issuer, CLUSTER);
        const holderSvc = buildService(connection, holder, CLUSTER);

        const resolver = {
            resolve: async (did: string) => {
                if (did === holderSvc.did) return await holderSvc.resolve();
                if (did === issuerSvc.did) return await issuerSvc.resolve();
                throw new Error();
            }
        }

        const verifiedVc = await verifyVc(vcJwt, resolver);
        const verifiedVp = await verifyVp(vpJwt, resolver);

        return {
            ok: true,
            message: "Challenge verified successfully",
            noncePayload,
            vc: verifiedVc,
            vp: verifiedVp
        };
    } catch (e) {
        return {
            ok: false,
            message: "Challenge verification failed."
        };
    }
}
