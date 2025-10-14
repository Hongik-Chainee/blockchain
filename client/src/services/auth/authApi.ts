import { saveTokens } from "./tokenStorage";

const BASE = process.env.NEXT_PUBLIC_API_BASE!;

export async function refreshOnce(): Promise<boolean> {
  const res = await fetch(`${BASE}/api/auth/refresh`, {
    method: "POST",
    credentials: "include",
  });
  if (!res.ok) return false;
  const data = await res.json(); // { accessToken, accessExp, ... }
  if (!data?.accessToken || !data?.accessExp) return false;
  saveTokens(data.accessToken, Number(data.accessExp));
  return true;
}

export async function fetchMe(): Promise<{ kyc: boolean; did: boolean } | null> {
  const token = localStorage.getItem("accessToken");
  if (!token) return null;
  const res = await fetch(`${BASE}/api/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
    credentials: "include",
  });
  if (!res.ok) return null;
  const data = await res.json(); // kyc/did 또는 status.kyc/status.did 형태 가정
  const kyc = data?.kyc ?? data?.status?.kyc ?? false;
  const did = data?.did ?? data?.status?.did ?? false;
  return { kyc, did };
}
