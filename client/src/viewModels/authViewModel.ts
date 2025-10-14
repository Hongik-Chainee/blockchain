import { authConfig } from "@/models/authModel";
import { AuthRepository } from "@/services/authRepository";
import { refreshOnce, fetchMe } from "@/services/auth/authApi";

export type NextStep = "KYC" | "DID" | "HOME";

export class AuthViewModel {
  private repo = new AuthRepository();

  public signInWithGoogle() {
    const returnTo = `${window.location.origin}/auth/signin`; // 로그인 끝나고 다시 이 페이지로
    const url = `${authConfig.oauthStartUrl}?returnTo=${encodeURIComponent(returnTo)}`;
    this.repo.redirectTo(url);
  }

  /** 페이지 진입 시: refresh 쿠키로 액세스 토큰 1회 발급 → nextStep 계산 */
  public async detectAuthAndNextStep(): Promise<NextStep | null> {
    const ok = await refreshOnce();
    if (!ok) return null;
    const me = await fetchMe();
    if (!me) return "HOME";
    if (!me.kyc) return "KYC";
    if (!me.did) return "DID";
    return "HOME";
  }
}
