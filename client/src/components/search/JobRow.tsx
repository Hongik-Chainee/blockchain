// components/search/JobRow.tsx
'use client';

import type { JobPost } from '@/models/job';
import { BriefcaseIcon, MapPinIcon, CurrencyDollarIcon, CalendarDaysIcon, UserGroupIcon } from '@heroicons/react/24/solid';

function fmtMoney(v?: number | null) {
  if (v == null) return null;
  try { return `${v.toLocaleString()}원`; } catch { return `${v}원`; }
}
function fmtDate(iso?: string | null) {
  if (!iso) return null;
  // deadline: YYYY-MM-DD, createdAt: ISO
  const d = new Date(iso);
  return isNaN(d.getTime()) ? iso : d.toLocaleDateString();
}

export function JobRow({ job }: { job: JobPost }) {
  const payment = fmtMoney(job.payment);
  const deadline = job.deadline ?? null;
  const deadlineText = deadline ? fmtDate(deadline) : null;
  const applicants = typeof job.applicantCount === 'number' ? job.applicantCount : null;
  const location = job.author?.in ?? null;

  return (
    <div className="rounded-xl bg-[#1B1C2E] p-4 ring-1 ring-white/10">
      <div className="flex items-start gap-4">
        {/* 썸네일/아이콘 */}
        <div className="h-12 w-12 shrink-0 rounded-lg bg-white/10 grid place-items-center">
          <BriefcaseIcon className="h-6 w-6 text-white/60" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2">
            <h4 className="truncate text-sm font-semibold text-white">
              {job.title ?? `Job #${job.id}`}
            </h4>
            {/* 상태값은 명세에 없어 생략. 필요 시 author/기타 뱃지 추가 */}
          </div>

          {job.description && (
            <p className="line-clamp-2 text-xs text-white/70">{job.description}</p>
          )}

          {/* 메타 */}
          <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-white/60">
            {location && (
              <span className="inline-flex items-center gap-1">
                <MapPinIcon className="h-3.5 w-3.5" />
                {location}
              </span>
            )}
            {payment && (
              <span className="inline-flex items-center gap-1">
                <CurrencyDollarIcon className="h-3.5 w-3.5" />
                {payment}
              </span>
            )}
            {deadlineText && (
              <span className="inline-flex items-center gap-1">
                <CalendarDaysIcon className="h-3.5 w-3.5" />
                ~ {deadlineText}
              </span>
            )}
            {applicants != null && (
              <span className="inline-flex items-center gap-1">
                <UserGroupIcon className="h-3.5 w-3.5" />
                {applicants} applications
              </span>
            )}
          </div>

          {/* 스킬 태그 */}
          {job.requiredSkills?.length ? (
            <div className="mt-2 flex flex-wrap gap-2">
              {job.requiredSkills.slice(0, 6).map((s, i) => (
                <span key={`${s}-${i}`} className="rounded-full bg-white/5 px-2 py-1 text-[11px] text-white/80 ring-1 ring-white/10">
                  {s}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        <div className="flex shrink-0 flex-col items-stretch gap-2">
          <button className="rounded-md bg-purple-500/90 px-4 py-2 text-xs font-semibold text-white hover:bg-purple-500">
            View details
          </button>
          <button className="rounded-md bg-white/10 px-4 py-2 text-xs font-semibold text-white ring-1 ring-white/10 hover:bg-white/15">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
