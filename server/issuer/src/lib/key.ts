import { Keypair } from "@solana/web3.js";
import { readFileSync } from "fs";

export default function loadKey(path: string): Keypair {
    const arr = JSON.parse(readFileSync(path, 'utf8')) as number[];
    return Keypair.fromSecretKey(Uint8Array.from(arr));
}