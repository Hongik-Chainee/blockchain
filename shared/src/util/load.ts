import { Keypair } from "@solana/web3.js";
import { Idl } from "@coral-xyz/anchor";
import { readFileSync } from "fs";

export function loadKey(path: string): Keypair {
  const arr = JSON.parse(readFileSync(path, "utf8")) as number[];

  return Keypair.fromSecretKey(Uint8Array.from(arr));
}

export function loadIdl(path: string): Idl {
  return JSON.parse(readFileSync(path, "utf8")) as Idl;
}
