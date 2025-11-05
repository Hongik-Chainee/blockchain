import { Connection, PublicKey, Transaction } from "@solana/web3.js";

export default async function finalizeTx(
    conn: Connection,
    tx: Transaction,
    payer: PublicKey
) {
    if (!tx.feePayer) tx.feePayer = payer;
    const { blockhash, lastValidBlockHeight } = await conn.getLatestBlockhash();
    tx.recentBlockhash = blockhash;

    return { tx, blockhash, lastValidBlockHeight };
}