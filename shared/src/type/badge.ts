import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";

export default interface BadgeData {
  contract: PublicKey;
  employee: PublicKey;
  level: any;
  uri: string;
  mintedAt: BN;
}
