'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { saveTokens } from '@/services/auth/tokenStorage';
import { fetchMe } from '@/services/auth/authApi';

export default function AuthCallbackPage() {
  const router = useRouter();
  const [msg, setMsg] = useState('로그인 처리 중…');

  useEffect(() => {
    try {
      const hash = window.location.hash.startsWith('#')
        ? window.location.hash.slice(1)
        : window.location.hash;
      const p = new URLSearchParams(hash);

      const accessToken = p.get('accessToken') || '';
      // accessExp가 안 오면 JWT의 exp를 디코드해서 쓰기
      const accessExpStr = p.get('accessExp');

      if (!accessToken) {
        setMsg('토큰이 없어 로그인에 실패했습니다.');
        return;
      }

      let accessExp: number | null = null;
      if (accessExpStr) {
        accessExp = Number(accessExpStr);
      } else {
        // JWT exp 추출 (Base64url)
        const [, payloadB64] = accessToken.split('.');
        const json = JSON.parse(atob(payloadB64.replace(/-/g, '+').replace(/_/g, '/')));
        accessExp = Number(json?.exp ?? 0);
      }

      if (!accessExp) {
        setMsg('토큰 만료 시간이 유효하지 않습니다.');
        return;
      }

      // 1) 토큰 저장
      saveTokens(accessToken, accessExp);

      // 2) URL에서 해시 제거(토큰 흔적 없애기)
      window.history.replaceState(null, '', '/auth/callback');

      // 3) 다음 페이지 결정
      const nextStep = p.get('nextStep'); // 서버가 넣어줬다면 사용
      const goNext = async () => {
        // 신뢰 위해 서버 상태 확인 (권장)
        const me = await fetchMe();
        if (nextStep === 'KYC' || (!me?.kyc && !me?.did)) {
          router.replace('/onboarding/personal'); // KYC
        } else if (nextStep === 'DID' || (me?.kyc && !me?.did)) {
          router.replace('/onboarding/did');
        } else {
          router.replace('/dashboard');
        }
      };

      setMsg('인증 완료. 이동합니다…');
      void goNext();
    } catch (e) {
      setMsg('로그인 처리 중 오류가 발생했습니다.');
    }
  }, [router]);

  return (
    <main className="min-h-screen grid place-items-center bg-secondary text-white">
      <div className="p-6 rounded-xl bg-secondary-dark/90 shadow-2xl">{msg}</div>
    </main>
  );
}
