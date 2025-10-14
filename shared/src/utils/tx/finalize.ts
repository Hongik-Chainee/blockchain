import { Connection, PublicKey, Transaction } from "@solana/web3.js";

export async function finalizeTx(
    conn: Connection,
    tx: Transaction,
    payer: PublicKey
) {
    if (!tx.feePayer) tx.feePayer = payer;
    const { blockhash } = await conn.getLatestBlockhash();
    tx.recentBlockhash = blockhash;

    return tx;
}