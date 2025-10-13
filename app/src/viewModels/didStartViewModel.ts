import bs58 from "bs58";
import { didGetNonce, didVerify } from "@/services/did/didApi";

type PhantomProvider = {
  isPhantom?: boolean;
  publicKey?: { toString(): string };
  connect(): Promise<void>;
  signMessage(message: Uint8Array, displayEncoding?: "utf8" | "hex"): Promise<{ signature: Uint8Array }>;
};

export class DidStartViewModel {
  isInstalled(): boolean {
    if (typeof window === "undefined") return false;
    const p = (window as any).solana as PhantomProvider | undefined;
    return !!p?.isPhantom;
  }

  async connectAndVerify(): Promise<{ ok: boolean; error?: string }> {
    try {
      const provider = (window as any).solana as PhantomProvider | undefined;
      if (!provider?.isPhantom) return { ok: false, error: "PHANTOM_NOT_FOUND" };

      // 1) nonce 요청
      const { nonce } = await didGetNonce();

      // 2) 지갑 연결 + 서명
      await provider.connect();
      const address = provider.publicKey?.toString();
      if (!address) return { ok: false, error: "WALLET_NO_ADDRESS" };

      const msg = new TextEncoder().encode(nonce);
      const { signature } = await provider.signMessage(msg, "utf8");
      const signatureBase58 = bs58.encode(signature);

      // 3) 서버 검증
      const did = `did:sol:${address}`;
      await didVerify(did, address, signatureBase58);

      return { ok: true };
    } catch (e: any) {
      return { ok: false, error: e?.message || "UNKNOWN_ERROR" };
    }
  }
}
