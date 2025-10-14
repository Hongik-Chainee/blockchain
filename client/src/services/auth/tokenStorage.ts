// CSR 전용 토큰 저장 유틸

const ACCESS_KEY = "accessToken";
const ACCESS_EXP_KEY = "accessExp"; // epoch seconds

export function saveTokens(accessToken: string, accessExp: number) {
  if (typeof window === "undefined") return;
  localStorage.setItem(ACCESS_KEY, accessToken);
  localStorage.setItem(ACCESS_EXP_KEY, String(accessExp));
}

export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ACCESS_KEY);
}

export function getAccessExp(): number | null {
  if (typeof window === "undefined") return null;
  const v = localStorage.getItem(ACCESS_EXP_KEY);
  return v ? Number(v) : null;
}

export function clearTokens() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(ACCESS_EXP_KEY);
}
