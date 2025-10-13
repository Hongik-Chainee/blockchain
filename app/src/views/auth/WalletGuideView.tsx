'use client';

import Link from 'next/link';
import { CustomConnectButton } from '@/components/auth/CustomConnectButton';

export function WalletGuideView() {
  return (
    <div className="min-h-screen bg-secondary text-white">
      <div className="mx-auto max-w-6xl px-6 py-14 lg:flex lg:gap-10">
        {/* Left: Progress */}
        <aside className="mb-10 w-full lg:mb-0 lg:w-60">
          <h3 className="text-sm font-semibold text-white/70">Process</h3>
          <ol className="mt-4 space-y-4">
            <StepItem index={1} label="연동된 앱 인증" status="done" />
            <StepItem index={2} label="DID 발급" status="done" />
            <StepItem index={3} label="Pantom 설치" status="current" />
          </ol>
        </aside>

        {/* Right: Content */}
        <main className="flex-1">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/40">
                {/* Wallet icon */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M3 7.5a2.5 2.5 0 0 1 2.5-2.5H19a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5.5A2.5 2.5 0 0 1 3 16.5v-9Z" stroke="currentColor" className="text-white/70" strokeWidth="1.5"/>
                  <path d="M21 10.5h-4.75a2.25 2.25 0 0 0 0 4.5H21" stroke="currentColor" className="text-white/70" strokeWidth="1.5" />
                  <circle cx="16.75" cy="12.75" r="1" fill="currentColor" className="text-white/70" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold leading-tight md:text-3xl">Pantom 지갑 설치 가이드</h1>
                <p className="mt-1 text-sm text-white/70">
                  블록체인 서비스를 이용하기 위한 Pantom 지갑 설치 및 설정 방법을 안내합니다
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            {/* 1 */}
            <StepCard index={1} title="Pantom 확장 프로그램 설치" desc="Chrome, Firefox에서 Pantom 확장 프로그램을 다운로드하고 설치합니다.">
              <div className="flex flex-wrap gap-3">
                <BadgeButton label="Chrome" href="https://chromewebstore.google.com/detail/phantom/bfnaelmomeimhlpmgjnjophhpkkoljpa"/>
                <BadgeButton label="Firefox" href="https://addons.mozilla.org/en-US/firefox/addon/phantom-app/"/>
                <BadgeButton label="Edge" href="https://chromewebstore.google.com/detail/phantom/bfnaelmomeimhlpmgjnjophhpkkoljpa"/>
              </div>
            </StepCard>

            {/* 2 */}
            <StepCard index={2} title="지갑 생성 및 시드 구문 백업" desc="새 지갑을 생성하고 12개 단어로 구성된 시드 구문을 안전한 곳에 보관합니다.">
              <AlertNote>
                시드 구문은 절대 타인과 공유하지 마세요. 지갑 복구에 필요한 중요한 정보입니다.
              </AlertNote>
            </StepCard>

            {/* 3 */}
            <StepCard index={3} title="Solana 네트워크 설정" desc="Solana 네트워크에 연결해 계정을 생성합니다.">
              <span className="inline-flex items-center rounded-full bg-background/60 px-3 py-1 text-sm text-white/80 ring-1 ring-white/10">
                Mainnet Beta
              </span>
            </StepCard>

            {/* 4 */}
            <StepCard index={4} title="서비스 연결 및 서명" desc="웹사이트에서 지갑 연결을 요청하면 Pantom 팝업이 나타납니다.">
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-xl bg-background/60 p-3 ring-1 ring-white/10">
                  <div>
                    <p className="text-sm font-semibold">1. 지갑 연결</p>
                    <p className="text-xs text-white/70">사이트와 지갑을 연결합니다</p>
                  </div>
                  <CustomConnectButton />
                </div>

                <div className="flex items-center justify-between rounded-xl bg-background/40 p-3 ring-1 ring-white/10">
                  <div>
                    <p className="text-sm font-semibold">2. 트랜잭션 서명</p>
                    <p className="text-xs text-white/70">거래 내용을 확인하고 서명합니다</p>
                  </div>
                  <span className="text-xs text-white/60">대기 중…</span>
                </div>
              </div>
            </StepCard>

            {/* Security Note */}
            <div className="rounded-2xl border border-white/10 bg-purple-900/40 p-5">
              <div className="mb-2 text-base font-semibold">보안 주의사항</div>
              <ul className="space-y-1 text-sm text-white/80">
                <li>✔︎ 항상 공식사이트에서 Pantom를 다운로드하세요</li>
                <li>✔︎ 서명하기 전에 트랜잭션 내용을 반드시 확인하세요</li>
                <li>✔︎ 의심스러운 사이트에서는 지갑 연결을 하지 마세요</li>
              </ul>
            </div>

            {/* Help */}
            <div className="mt-6 text-center">
              <p className="mb-3 text-sm text-white/70">도움이 필요하신가요?</p>
              <div className="flex items-center justify-center gap-3">
                <Link href="#" className="rounded-lg border border-white/10 px-4 py-2 text-sm hover:bg-white/5">FAQ</Link>
                <Link href="#" className="rounded-lg bg-[#71FF9C] px-4 py-2 text-sm font-semibold text-black hover:opacity-90">문의하기</Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

/* ---------- UI Partials ---------- */

function StepItem({
  index,
  label,
  status, // 'done' | 'current' | 'todo'
}: {
  index: number;
  label: string;
  status?: 'done' | 'current' | 'todo';
}) {
  const base =
    'flex items-center gap-3 rounded-xl px-3 py-2 ring-1 ring-white/10';
  const active =
    status === 'current'
      ? 'bg-[#0E0F37]/60'
      : status === 'done'
      ? 'bg-emerald-900/20'
      : 'bg-background/40';
  return (
    <li className={`${base} ${active}`}>
      <span
        className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
          status === 'done'
            ? 'bg-[#71FF9C] text-black'
            : 'bg-white/10 text-white'
        }`}
      >
        {index}
      </span>
      <span
        className={`text-sm ${
          status === 'current' ? 'text-white' : 'text-white/80'
        }`}
      >
        {label}
      </span>
    </li>
  );
}

function StepCard({
  index,
  title,
  desc,
  children,
}: {
  index: number;
  title: string;
  desc?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl bg-background/40 p-5 ring-1 ring-white/10">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary/40 text-sm font-bold">
          {index}
        </div>
        <div className="w-full">
          <h3 className="text-base font-semibold">{title}</h3>
          {desc ? <p className="mt-1 text-sm text-white/70">{desc}</p> : null}
          {children ? <div className="mt-4">{children}</div> : null}
        </div>
      </div>
    </section>
  );
}

function BadgeButton({ label, href }: { label: string; href: string }) {
    return (
      <Link
        href={href}
        target="_blank" // 새 탭에서 열기
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-lg bg-background/60 px-3 py-2 text-sm text-white/90 ring-1 ring-white/10 hover:bg-background/70"
      >
        <span className="inline-block h-2 w-2 rounded-full bg-[#71FF9C]" />
        {label}
      </Link>
    );
}

function AlertNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-emerald-400/40 bg-emerald-900/20 px-4 py-3 text-sm text-emerald-200">
      {children}
    </div>
  );
}
