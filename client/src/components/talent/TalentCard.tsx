// components/talent/TalentCard.tsx
"use client";

import { Talent } from "@/models/talent";

interface TalentCardProps {
  talent: Talent;
}

// ipfs://... -> 게이트웨이 URL로 바꿔보기 (이미지 없이 토큰 URI만 있는 경우 대비)
function ipfsToHttp(uri?: string | null) {
  if (!uri) return null;
  if (!uri.startsWith("ipfs://")) return uri;
  const cid = uri.replace("ipfs://", "");
  return `https://ipfs.io/ipfs/${cid}`;
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  const n1 = parts[0]?.[0] ?? "";
  const n2 = parts[1]?.[0] ?? "";
  return (n1 + n2).toUpperCase() || "U";
}

export function TalentCard({ talent }: TalentCardProps) {
  const name = talent.name ?? `User #${talent.id ?? ""}`;
  const location = talent.location ?? "";
  const positions = Array.isArray(talent.positions) ? talent.positions : [];
  const skills = Array.isArray(talent.requiredSkills) ? talent.requiredSkills : [];

  const mp = talent.mainProject ?? null;
  const mpTitle = mp?.title ?? "";
  const mpCompleted =
    mp?.completedAt ? new Date(mp.completedAt).toLocaleDateString() : null;

  // 메인 썸네일은 API에 없을 수 있으므로 안전한 폴백 사용
  const nftLink = ipfsToHttp(mp?.nftTokenUri);

  return (
    <article className="group rounded-2xl bg-[#1B1C2E] ring-1 ring-white/10 p-4 shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(0,0,0,0.45)] transition-all duration-300">
      {/* 헤더 */}
      <header className="mb-3 flex items-center gap-3">
        {talent.profileImageUrl ? (
          <img
            src={talent.profileImageUrl}
            alt={name}
            className="h-12 w-12 rounded-full object-cover ring-1 ring-white/10"
          />
        ) : (
          <div className="h-12 w-12 rounded-full bg-white/10 ring-1 ring-white/10 grid place-items-center text-xs font-semibold text-white/80">
            {initials(name)}
          </div>
        )}
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold text-white">{name}</h3>
          {positions.length > 0 ? (
            <div className="truncate text-xs text-white/70">
              {positions.join(" • ")}
            </div>
          ) : (
            <div className="text-xs text-white/40">—</div>
          )}
          {location ? (
            <div className="truncate text-[11px] text-white/50">{location}</div>
          ) : null}
        </div>
      </header>

      {/* 스킬 바 */}
      {skills.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {skills.slice(0, 6).map((s, i) => (
            <span
              key={`${s}-${i}`}
              className="rounded-full bg-white/5 px-2 py-1 text-[11px] text-white/80 ring-1 ring-white/10"
            >
              {s}
            </span>
          ))}
        </div>
      )}

      {/* 메인 썸네일(정사각) */}
      <div className="relative mb-3 overflow-hidden rounded-xl ring-1 ring-white/10">
        {/* 이미지가 없으므로 폴백 타일 */}
        <div className="aspect-square w-full bg-gradient-to-br from-[#FFC83A] to-[#7CF7A3] grid place-items-center">
          <div className="px-3 text-center">
            <p className="line-clamp-1 text-sm font-semibold text-black/80">
              {mpTitle || "Main Project"}
            </p>
            {nftLink && (
              <p title={mp?.nftTokenUri ?? ""} className="mt-1 line-clamp-1 text-[11px] text-black/60">
                NFT: {mp?.nftTokenUri}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* 캡션 */}
      {(mpTitle || mpCompleted) && (
        <div className="px-1 pb-1">
          {mpTitle ? (
            <p className="line-clamp-1 text-sm font-medium text-white">{mpTitle}</p>
          ) : null}
          {mpCompleted ? (
            <p className="line-clamp-1 text-xs text-white/70">{mpCompleted}</p>
          ) : null}
        </div>
      )}
    </article>
  );
}
