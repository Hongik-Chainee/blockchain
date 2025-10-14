'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PersonalInfoViewModel } from '@/viewModels/personalInfoViewModel';

export function PersonalInfoView() {
  const vm = useMemo(() => new PersonalInfoViewModel(), []);
  const [, rerender] = useState(0);
  const force = () => rerender(x => x + 1);
  const router = useRouter();
  const goNext = () => {
    router.push('/onboarding/did'); // ✅ 다음 단계로 이동
  };

  const labelCls = "text-sm text-white/80";
  const boxCls   = "rounded-xl bg-secondary-dark/90 shadow-2xl p-6 md:p-8";
  const inputCls = "w-full rounded-lg bg-white/10 px-4 py-3 outline-none placeholder-white/40";
  const btnPrimary = "rounded-lg bg-primary px-4 py-3 font-medium hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed";
  const chip      = "inline-flex items-center gap-2 rounded-lg bg-white/5 px-4 py-3 w-full justify-between";
  const stepDim   = "text-white/40";
  const stepOn    = "text-emerald-400";

  return (
    <div className="min-h-screen bg-secondary text-white">
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-10">
        {/* Process */}
        <aside className="space-y-4">
          <h3 className="text-lg font-semibold">Process</h3>
          <ol className="space-y-3 text-sm">
            <li className={stepOn}>● 약관동의 & 본인 인증</li>
            <li className={stepDim}>○ DID 발급</li>
            <li className={stepDim}>○ Metamask 설치</li>
          </ol>
        </aside>

        {/* Content */}
        <main className="space-y-8">
          <h1 className="text-2xl font-semibold">회원가입</h1>

          {/* 약관 동의 */}
          <section className={boxCls}>
            <h2 className="text-lg font-semibold mb-4">약관 동의</h2>

            <button
              type="button"
              onClick={() => { vm.setAgreeAll(!vm.agreeAll); force(); }}
              className={`${chip} border border-white/10`}
            >
              <span className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={vm.agreeAll}
                  onChange={e => { vm.setAgreeAll(e.target.checked); force(); }}
                  className="accent-primary h-4 w-4"
                />
                전체 동의
              </span>
              <span className="text-white/40">〉</span>
            </button>

            <div className="mt-4 space-y-3">
              {([
                ['privacy', '[필수] 개인정보 수집 및 이용 동의'],
                ['idService', '[필수] 본인확인 서비스 이용약관 동의'],
                ['thirdParty', '[필수] 고유식별정보 처리 동의'],
                ['telTerms', '[필수] 통신사 이용약관 동의'],
              ] as const).map(([key, label]) => (
                <div key={key} className="flex items-center justify-between rounded-lg bg-white/5 px-4 py-3">
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={vm.agreeRequired[key]}
                      onChange={e => { vm.setAgree(key, e.target.checked); force(); }}
                      className="accent-primary h-4 w-4"
                    />
                    <span className="text-sm">{label}</span>
                  </label>
                  <span className="text-white/40 text-sm">〉</span>
                </div>
              ))}
            </div>
          </section>

          {/* 휴대폰 인증 */}
          <section className={boxCls}>
            <h2 className="text-lg font-semibold mb-4">휴대폰 인증</h2>

            <div className="space-y-5">
              {/* 이름 */}
              <div>
                <label className={labelCls}>이름</label>
                <input
                  className={`${inputCls} mt-2`}
                  placeholder="이름을 입력하세요."
                  value={vm.name}
                  onChange={e => { vm.name = e.target.value; force(); }}
                />
              </div>

              {/* 주민등록번호 */}
              <div>
                <label className={labelCls}>주민등록번호</label>
                <div className="mt-2 grid grid-cols-[1fr_auto_1fr] gap-3 items-center">
                  <input
                    className={inputCls}
                    placeholder="생년월일"
                    maxLength={6}
                    value={vm.rrnFront}
                    onChange={e => { vm.rrnFront = e.target.value.replace(/\D/g,'').slice(0,6); force(); }}
                  />
                  <span className="text-white/50">—</span>
                  <input
                    className={inputCls}
                    placeholder="주민번호 뒷자리"
                    maxLength={1}
                    value={vm.rrnBack}
                    onChange={e => { vm.rrnBack = e.target.value.replace(/\D/g,'').slice(0,1); force(); }}
                  />
                </div>
              </div>

              {/* 통신사 */}
              <div>
                <label className={labelCls}>통신사</label>
                <select
                  className={`${inputCls} mt-2`}
                  value={vm.carrier}
                  onChange={e => { vm.carrier = e.target.value as any; force(); }}
                >
                  <option value="">통신사를 선택하세요.</option>
                  <option value="SKT">SKT</option>
                  <option value="KT">KT</option>
                  <option value="LGU+">LG U+</option>
                </select>
              </div>

              {/* 휴대폰 번호 + 인증요청 */}
              <div>
                <label className={labelCls}>휴대폰 번호</label>
                <div className="mt-2 grid grid-cols-[1fr_auto] gap-3">
                  <input
                    className={inputCls}
                    placeholder="휴대폰 번호를 입력하세요."
                    value={vm.phone}
                    onChange={e => { vm.phone = e.target.value.replace(/\D/g,''); force(); }}
                  />
                  <button
                    type="button"
                    onClick={async () => { const ok = await vm.requestCodeReal(); force(); }}
                    disabled={!vm.canRequest()}
                    className={btnPrimary}
                  >
                    인증요청
                  </button>
                </div>
              </div>

              {/* 인증번호 + 확인 */}
              <div>
                <label className={labelCls}>인증번호</label>
                <div className="mt-2 grid grid-cols-[1fr_auto] gap-3">
                  <input
                    className={inputCls}
                    placeholder="인증번호를 입력하세요."
                    value={vm.code}
                    onChange={e => { vm.code = e.target.value.replace(/\D/g,''); force(); }}
                    disabled={!vm.requested || vm.verified}
                  />
                  <button
                    type="button"
                    onClick={async () => { const ok = await vm.confirmCodeReal(); force(); }}
                    disabled={!vm.canConfirm() || vm.verified}
                    className={btnPrimary}
                  >
                    확인
                  </button>
                </div>
                {vm.verified && (
                  <p className="mt-2 text-emerald-400 text-sm">인증이 완료되었습니다.</p>
                )}
              </div>
            </div>
          </section>

          {/* 다음 단계 버튼 */}
          <div className="pt-2">
            <button
              type="button"
              onClick={goNext}
              // disabled={!vm.canGoNext}
              className={`${btnPrimary} w-full py-4 rounded-xl`}
            >
              다음단계로 넘어가기 →
            </button>
            {/* {!vm.canGoNext && (
              <p className="text-center text-white/50 text-sm mt-2">
                필수 약관 동의와 휴대폰 인증을 완료해주세요.
              </p>
            )} */}
          </div>
        </main>
      </div>
    </div>
  );
}
