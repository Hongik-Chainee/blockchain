'use client';

import { useRouter } from 'next/navigation';

export function DidGuideView() {
  const router = useRouter();

  const box = 'rounded-2xl bg-secondary-dark/90 shadow-2xl';
  const tile = 'rounded-xl bg-white text-secondary px-5 py-6';
  const bullet = 'flex items-center gap-3 rounded-xl bg-white/5 px-4 py-4';
  const dim = 'text-white/40';
  const on = 'text-emerald-400';
  const title = 'text-2xl font-semibold';

  const start = () => {
    // 다음 단계: DID 발급 플로우 시작(임시 라우트)
    router.push('/onboarding/did/start');
  };

  return (
    <div className="min-h-screen bg-secondary text-white">
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-10">
        {/* 좌측 Process */}
        <aside className="space-y-4">
          <h3 className="text-lg font-semibold">Process</h3>
          <ol className="space-y-3 text-sm">
            <li className="text-white">● 약관동의 및 인증</li>
            <li className={on}>● DID 발급</li>
            <li className={dim}>○ Metamask 설치</li>
          </ol>
        </aside>

        {/* 메인 콘텐츠 */}
        <main className="space-y-8">
          <h1 className={title}>회원가입</h1>

          {/* 헤더 아이콘 + 타이틀 */}
          <section className={`${box} p-8 text-center`}>
            <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/20 grid place-items-center">
              {/* Shield icon */}
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3z" stroke="currentColor" className="text-primary" strokeWidth="1.5"/>
                <path d="M9 12l2 2 4-4" stroke="currentColor" className="text-primary" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className="text-xl md:text-2xl font-semibold">DID 발급이 필요합니다</h2>
            <p className="mt-2 text-white/70 text-sm">
              안전하고 투명한 프로젝트 협업을 위해<br className="hidden md:block" /> 탈중앙화 신원 인증을 진행해주세요
            </p>
          </section>

          {/* DID 인증의 장점 */}
          <section>
            <h3 className="text-center text-base md:text-lg font-semibold mb-4">DID 인증의 장점</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: '보안성 강화', desc: '개인정보가 분산되어 보호되어 신뢰할 수 있는 신원 관리가 가능합니다.' },
                { title: '빠른 인증', desc: '복잡한 서류 없이 블록체인 기반으로 빠르고 간편하게 인증할 수 있어요.' },
                { title: '글로벌 호환성', desc: '전 세계 어디서나 호환되는 표준형 디지털 신원증명과 호환됩니다.' },
                { title: '신뢰도 향상', desc: '검증된 신원으로 프로젝트 파트너와의 신뢰를 쌓을 수 있는 근거를 구축합니다.' },
              ].map((c, i) => (
                <div key={i} className={`${tile} flex items-start gap-3`}>
                  <div className="shrink-0 h-9 w-9 rounded-full bg-primary/15 grid place-items-center">
                    {/* simple icon dot */}
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="7" className="text-primary" stroke="currentColor" strokeWidth="1.6"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold">{c.title}</p>
                    <p className="text-sm text-secondary/70 mt-1">{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 인증 과정 */}
          <section>
            <h3 className="text-center text-base md:text-lg font-semibold mb-4">인증 과정</h3>
            <div className="space-y-3">
              <div className={bullet}>
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-emerald-400 text-secondary text-xs font-bold">1</span>
                <div className="flex-1">
                  <p className="font-medium">MetaMask 연결</p>
                  <p className="text-sm text-white/60">MetaMask 지갑을 연결하여 블록체인 네트워크에 접속합니다.</p>
                </div>
              </div>
              <div className={bullet}>
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-emerald-400 text-secondary text-xs font-bold">2</span>
                <div className="flex-1">
                  <p className="font-medium">신원 정보 등록</p>
                  <p className="text-sm text-white/60">개인정보와 블록체인 연결정보를 등록하고 검증합니다.</p>
                </div>
              </div>
              <div className={bullet}>
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-emerald-400 text-secondary text-xs font-bold">3</span>
                <div className="flex-1">
                  <p className="font-medium">DID 생성 완료</p>
                  <p className="text-sm text-white/60">고유한 탈중앙 신원식별자(DID)가 생성되어 인증이 완료됩니다.</p>
                </div>
              </div>
            </div>
          </section>

          {/* 안내 박스 */}
          <section className={`${box} p-5`}>
            <div className="flex items-start gap-3">
              <div className="mt-1 h-6 w-6 rounded-full bg-primary/20 grid place-items-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M12 8v5" stroke="currentColor" className="text-primary" strokeWidth="1.8" strokeLinecap="round"/>
                  <circle cx="12" cy="16" r="1" className="text-primary" fill="currentColor"/>
                  <circle cx="12" cy="12" r="10" className="text-primary" stroke="currentColor" strokeWidth="1.2" fill="none"/>
                </svg>
              </div>
              <div className="text-sm text-white/80 space-y-1">
                <p>MetaMask가 필요합니다. 설치되지 않은 경우 다음 단계에서 안내드릴게요.</p>
                <p>DID 발급은 개인 지갑이 필요하며, 이후 모든 프로젝트에서 신뢰 수단이 됩니다.</p>
                <p>개인정보는 발급에 필요한 최소한의 데이터로 안전하게 보관하여 처리합니다.</p>
              </div>
            </div>
          </section>

          {/* 시작 버튼 */}
          <div className="text-center pt-2">
            <button
              onClick={start}
              className="rounded-xl bg-primary px-6 py-4 font-semibold hover:opacity-90 transition"
            >
              DID 발급 시작하기 →
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
