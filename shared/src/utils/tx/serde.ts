import { Transaction } from "@solana/web3.js";

export function txToBase64(tx: Transaction): string {
    return Buffer.from(tx.serialize({ requireAllSignatures: false })).toString("base64");
}

export function txFromBase64(b64: string): Transaction {
    const raw = Buffer.from(b64, "base64");
    return Transaction.from(raw);
}