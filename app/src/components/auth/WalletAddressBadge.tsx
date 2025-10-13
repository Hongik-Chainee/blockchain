'use client';

import { useMemo } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

export function WalletAddressBadge() {
  const { publicKey, connected, disconnect } = useWallet();

  // base58 주소 문자열
  const address = useMemo(() => publicKey?.toBase58() ?? '', [publicKey]);
  const short = useMemo(
    () => (address ? `${address.slice(0, 4)}...${address.slice(-4)}` : ''),
    [address]
  );

  if (!connected) {
    // 연결 전에는 아무 것도 안 보여주거나, 연결 버튼을 노출해도 됩니다.
    return null;
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      // 토스트가 있으면 여기서 성공 토스트 띄우기
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-background/60 px-3 py-2 text-sm text-white/90">
      <span className="inline-block h-2 w-2 rounded-full bg-[#71FF9C]" />
      <span className="font-mono">{short}</span>
      <button onClick={copy} className="text-xs opacity-80 hover:opacity-100">
        복사
      </button>
      <span className="opacity-30">|</span>
      <button onClick={() => disconnect()} className="text-xs opacity-80 hover:opacity-100">
        연결 해제
      </button>
    </div>
  );
}
