// components/search/PeopleRow.tsx
"use client";

import type { Talent } from "@/models/talent";
import { MapPinIcon } from "@heroicons/react/24/solid";

export function PeopleRow({ talent }: { talent: Talent }) {
  const name = talent.name ?? `User #${talent.id}`;
  const positions = (talent.positions ?? []).join(" • ");
  const skills = (talent.requiredSkills ?? []).join(" · ");

  return (
    <div className="rounded-xl bg-[#1B1C2E] p-4 ring-1 ring-white/10">
      <div className="flex items-center gap-4">
        {talent.profileImageUrl ? (
          <img
            src={talent.profileImageUrl}
            alt={name}
            className="h-12 w-12 rounded-full object-cover ring-1 ring-white/10"
          />
        ) : (
          <div className="h-12 w-12 rounded-full bg-white/10 ring-1 ring-white/10" />
        )}

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <div className="truncate text-sm font-semibold text-white">{name}</div>
            {/* 예시 뱃지들 */}
            {positions && (
              <span className="rounded-md bg-white/10 px-2 py-0.5 text-[11px] text-white/80 ring-1 ring-white/10">
                {positions}
              </span>
            )}
          </div>
          {skills && (
            <div className="mt-1 truncate text-xs text-[#7CFFA3]">{skills}</div>
          )}
          {talent.location && (
            <div className="mt-1 flex items-center gap-1 text-xs text-white/60">
              <MapPinIcon className="h-3.5 w-3.5" /> {talent.location}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button className="rounded-md bg-purple-500/90 px-4 py-2 text-xs font-semibold text-white hover:bg-purple-500">
            Follow +
          </button>
          <button className="rounded-md bg-white/10 px-4 py-2 text-xs font-semibold text-white ring-1 ring-white/10 hover:bg-white/15">
            Contact
          </button>
        </div>
      </div>
    </div>
  );
}
