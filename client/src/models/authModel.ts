// src/models/authModel.ts
export type AuthFlow = "jwt";

export interface AuthConfig {
  oauthStartUrl: string;   // Spring 시작 URL
  flow: AuthFlow;          // 백엔드 전략(세션 쿠키 or JWT)
}

export const authConfig: AuthConfig = {
  oauthStartUrl: `${process.env.NEXT_PUBLIC_API_BASE}/oauth2/authorization/google`,
  flow: "jwt", // 백엔드가 세션이면 "session", JWT 발급해 쿼리로 넘기면 "jwt"
};
