// src/services/authRepository.ts
export class AuthRepository {
    redirectTo(url: string) {
      // 전체 페이지 이동(쿠키/리다이렉트에 유리)
      window.location.href = url;
    }
  }
  