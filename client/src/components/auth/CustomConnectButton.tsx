'use client';

import { useWalletModal } from '@solana/wallet-adapter-react-ui';

export function CustomConnectButton() {
  const { setVisible } = useWalletModal();
  return (
    <button
      onClick={() => setVisible(true)} // 클릭 시 지갑 선택 모달 열림
      className="rounded-lg bg-[#71FF9C] px-4 py-2 text-sm font-semibold text-black hover:opacity-90"
    >
      지갑 연결하기 →
    </button>
  );
}
