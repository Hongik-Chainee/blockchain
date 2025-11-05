import "dotenv/config";
import { PublicKey } from "@solana/web3.js";
import { createNonce } from "../lib/nonce";

const NONCE_TTL = Number(process.env.NONCE_TTL_SEC!);
const SECRET = new TextEncoder().encode(process.env.NONCE_SEED!);

export default async function issueChallenge(domain: string, holder: PublicKey) {
    const holderPub = holder.toBase58();
    const payload = { domain, holder: holderPub };
    const { jwt, exp } = await createNonce(SECRET, payload, NONCE_TTL);

    return {
        ok: true,
        message: "Challenge issued successfully.",
        nonce: jwt,
        exp,
        holder: holderPub,
    };
}
