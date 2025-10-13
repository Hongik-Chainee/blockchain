'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DidStartViewModel } from '@/viewModels/didStartViewModel';

const LINKS = {
  phantomChrome: 'https://chromewebstore.google.com/detail/phantom/bfnaelmomeimhlpmgjnjophhpkkoljpa',
  phantomFirefox: 'https://addons.mozilla.org/en-US/firefox/addon/phantom-app/',
  phantomEdge: 'https://microsoftedge.microsoft.com/addons/detail/phantom/odbfpeaacokmgdlahobbohkkfdagjick',
};

export function DidStartView() {
  const vm = useMemo(() => new DidStartViewModel(), []);
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const section = 'rounded-2xl bg-secondary-dark/90 shadow-2xl p-5 md:p-6';
  const step = 'rounded-xl border border-white/10 bg-white/5 p-4';
  const btn = 'rounded-lg bg-primary px-4 py-3 font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition';
  const pill = 'inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs bg-white/10';

  const connect = async () => {
    setMsg(null); setBusy(true);
    const r = await vm.connectAndVerify();
    setBusy(false);
    if (r.ok) {
      setMsg('지갑 인증이 완료되었습니다.');
      // 다음 페이지로 이동 (예: 추가 정보 → 완료)
      router.push('/onboarding/did/complete');
    } else {
      if (r.error === 'PHANTOM_NOT_FOUND') {
        setMsg('Phantom 지갑을 설치/활성화 해주세요.');
      } else if (r.error === 'NONCE_FAIL') {
        setMsg('서버에서 nonce 발급에 실패했습니다.');
      } else if (r.error === 'VERIFY_FAIL' || r.error === 'SIGNATURE_INVALID') {
        setMsg('서명 검증에 실패했습니다. 다시 시도해주세요.');
      } else {
        setMsg('지갑 연결 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-secondary text-white">
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-10">
        {/* 좌측 Process */}
        <aside className="space-y-4">
          <h3 className="text-lg font-semibold">Process</h3>
          <ol className="space-y-3 text-sm">
            <li className="text-emerald-400">● 약관동의 및 인증</li>
            <li className="text-emerald-400">● DID 발급</li>
            <li className="text-white">● Metamask 설치</li>
          </ol>
        </aside>

        {/* 메인 */}
        <main className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-primary/20 grid place-items-center">
              <svg width="16" height="16" viewBox="0 0 24 24" className="text-primary" fill="none"><path d="M12 2l9 4v6c0 6-4.5 9-9 10-4.5-1-9-4-9-10V6l9-4z" stroke="currentColor" strokeWidth="1.3"/></svg>
            </div>
            <h1 className="text-xl md:text-2xl font-semibold">MetaMask 지갑 설치 가이드</h1>
          </div>
          <p className="text-white/70 text-sm">블록체인 서비스를 이용하기 위한 지갑 설치 및 연동 안내입니다. (실제 사용은 Phantom 지갑)</p>

          {/* 1. 확장 프로그램 설치 */}
          <section className={section}>
            <p className="font-semibold">1  MetaMask 확장 프로그램 설치</p>
            <p className="text-sm text-white/70 mt-1">실제 사용은 <span className="font-semibold text-white">Phantom</span> 입니다. 아래 스토어에서 설치하세요.</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <a className="rounded-lg bg-white text-secondary px-3 py-2 font-medium hover:opacity-90" href={LINKS.phantomChrome} target="_blank" rel="noreferrer">Chrome</a>
              <a className="rounded-lg bg-white text-secondary px-3 py-2 font-medium hover:opacity-90" href={LINKS.phantomFirefox} target="_blank" rel="noreferrer">Firefox</a>
              <a className="rounded-lg bg-white text-secondary px-3 py-2 font-medium hover:opacity-90" href={LINKS.phantomEdge} target="_blank" rel="noreferrer">Edge</a>
            </div>
            <p className="text-xs text-white/50 mt-2">공식 스토어에서만 설치하세요.</p>
          </section>

          {/* 2. 지갑 생성 및 시드 구문 백업 */}
          <section className={section}>
            <p className="font-semibold">2  지갑 생성 및 시드 구문 백업</p>
            <p className="text-sm text-white/70 mt-1">새 지갑을 만든 뒤 시드 구문을 안전한 곳에 보관하세요. 공유 금지!</p>
            <div className="mt-2"><span className={pill}>시드 구문은 절대 타인과 공유하지 마세요</span></div>
          </section>

          {/* 3. (옵션) Solana 네트워크 설정 */}
          <section className={section}>
            <p className="font-semibold">3  Solana 네트워크 설정</p>
            <p className="text-sm text-white/70 mt-1">Phantom은 기본으로 Solana 메인넷을 지원합니다.</p>
            <div className="mt-2"><span className={pill}>Mainnet Beta</span></div>
          </section>

          {/* 4. 서비스 연결 및 서명 */}
          <section className={section}>
            <p className="font-semibold">4  서비스 연결 및 서명</p>
            <p className="text-sm text-white/70 mt-1">지갑이 설치되어 있다면 아래 버튼으로 바로 연결하고, 서버가 준 nonce에 서명하여 DID를 등록합니다.</p>

            <div className="mt-3 grid gap-2">
              <div className={step}>
                <p className="font-medium">1. 지갑 연결</p>
                <p className="text-sm text-white/60">Phantom 지갑으로 연결합니다.</p>
                <div className="mt-2">
                  <button
                    className={btn}
                    onClick={connect}
                    disabled={busy}
                  >
                    {busy ? '연결 중…' : (vm.isInstalled() ? '지갑 연결하기' : '지갑 설치 필요')}
                  </button>
                </div>
              </div>

              <div className={`${step} opacity-90`}>
                <p className="font-medium">2. 서명으로 본인확인</p>
                <p className="text-sm text-white/60">서버가 제공한 nonce에 서명하면 DID가 등록됩니다.</p>
              </div>
            </div>

            {msg && <p className="mt-3 text-sm text-emerald-300">{msg}</p>}
          </section>

          {/* 보안 주의사항 */}
          <section className={section}>
            <p className="font-semibold">보안 주의사항</p>
            <ul className="text-sm text-white/75 mt-2 space-y-1 list-disc pl-5">
              <li>반드시 공식 스토어에서 설치하세요.</li>
              <li>시드 구문/개인키는 절대 공유하지 마세요.</li>
              <li>의심스러운 사이트에서는 서명을 진행하지 마세요.</li>
            </ul>
          </section>

          {/* 하단 CTA */}
          <div className="text-center pt-2">
            <button
              className={btn}
              onClick={() => router.push('/onboarding/did/complete')}
            >
              DID 발급 시작하기 →
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
