import { clsx } from "clsx";

export default function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
        "bg-[#2A2F3B] text-[#9AA4B2] border border-[#3A4152]"
      )}
    >
      {children}
    </span>
  );
}
