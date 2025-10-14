"use client";

import Badge from "./Badge";

type Props = {
  name: string;
  titleTags: string[];
  skills: string[];
  location: string;
  avatarUrl?: string;
};

export default function PeopleCard(props: Props) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-[#171A22] border border-[#2A2F3B] px-4 py-3">
      <div className="flex items-center gap-3">
        <img
          src={props.avatarUrl || "/vercel.svg"}
          alt={props.name}
          className="h-12 w-12 rounded-full object-cover bg-[#2A2F3B]"
        />
        <div>
          <div className="flex items-center gap-2">
            <p className="text-white font-semibold">{props.name}</p>
            {props.titleTags.map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>
          <p className="mt-1 text-sm text-[#9AA4B2]">
            {props.skills.join(" · ")}
          </p>
          <p className="mt-0.5 text-xs text-[#75809A]">📍 {props.location}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <button className="rounded-xl bg-[#293248] text-white text-sm px-4 py-1.5 hover:opacity-90">
          Follow +
        </button>
        <button className="rounded-xl bg-[#7A5AF8] text-white text-sm px-4 py-1.5 hover:opacity-90">
          Contact
        </button>
      </div>
    </div>
  );
}
