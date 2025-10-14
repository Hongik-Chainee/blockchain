'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { AuthViewModel } from '@/viewModels/authViewModel';

export function SignInView() {
  const vm = useMemo(() => new AuthViewModel(), []);
  const router = useRouter();

  const goNext = () => {
    router.push('/onboarding/personal'); // ✅ 개인정보 입력 페이지로 이동
  };

  return (
    <div className="min-h-screen bg-secondary text-white flex flex-col">
      <header className="pt-24 text-center px-6">
        <h1 className="text-3xl md:text-4xl font-semibold">Chainee</h1>
        <p className="mt-3 text-sm md:text-base text-white/70">
          기술로 신뢰를 만들고, 공정한 가치를 누리세요
        </p>
      </header>

      <main className="mt-20 md:mt-24 mx-auto w-full max-w-md px-6">
        <div className="rounded-2xl bg-secondary-dark/90 shadow-2xl p-8 md:p-10">
          <h2 className="text-center text-xl md:text-2xl font-semibold">Log in</h2>

          <div className="mt-6">
            <p className="text-sm text-white/70">Social account Log in</p>

            <button
              type="button"
              onClick={() => vm.signInWithGoogle()}
              className="mt-3 w-full rounded-lg bg-white text-black px-4 py-3 shadow-lg flex items-center justify-center gap-3 hover:bg-white/95 transition"
            >
              <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
                <path d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0353 3.12C17.9503 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.23028 6.86002 8.87028 4.75 12.0003 4.75Z" fill="#EA4335"/>
                <path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z" fill="#4285F4"/>
                <path d="M5.26498 14.2949C5.02498 13.5699 4.88498 12.7999 4.88498 11.9999C4.88498 11.1999 5.01998 10.4299 5.26498 9.7049L1.27498 6.60986C0.45498 8.22986 -0.000488281 10.0599 -0.000488281 11.9999C-0.000488281 13.9399 0.45498 15.7699 1.27498 17.3899L5.26498 14.2949Z" fill="#FBBC05"/>
                <path d="M12.0004 24C15.2404 24 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.23039 17.135 5.26539 14.29L1.27539 17.385C3.25539 21.31 7.31039 24 12.0004 24Z" fill="#34A853"/>
              </svg>
              <span className="text-sm md:text-base font-medium">구글 로그인</span>
            </button>

            {/* ✅ 인증 여부와 무관하게 항상 표시 */}
            <div className="mt-6">
              <div className="w-full text-center text-sm md:text-base font-semibold bg-white/10 rounded-lg py-3">
                인증이 완료되었습니다.
              </div>
              <button
                type="button"
                onClick={goNext}
                className="mt-3 w-full rounded-lg bg-primary px-4 py-3 font-medium hover:opacity-90 transition"
              >
                다음 단계로 넘어가기 →
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
