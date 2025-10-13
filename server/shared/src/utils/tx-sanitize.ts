import { PublicKey, SystemProgram, Transaction } from "@solana/web3.js";

export function sanitize(tx: Transaction, payer: PublicKey) {
    tx.feePayer = payer;
    for (const ix of tx.instructions) {
        for (const k of ix.keys) {
            if (k.pubkey.equals(SystemProgram.programId)) k.isSigner = false;
            if (k.pubkey.equals(PublicKey.default)) k.isSigner = false;
        }
    }
    return tx;
}