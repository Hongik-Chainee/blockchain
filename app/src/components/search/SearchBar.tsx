// components/search/SearchBar.tsx
"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export function SearchBar({
  defaultValue = "",
  onSubmit,
  onFilterClick,
}: {
  defaultValue?: string;
  onSubmit: (value: string) => void;
  onFilterClick?: () => void;
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const input = form.elements.namedItem("q") as HTMLInputElement;
        onSubmit(input.value);
      }}
      className="flex items-center gap-3"
    >
      <div className="relative flex-1">
        <MagnifyingGlassIcon className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
        <input
          name="q"
          defaultValue={defaultValue}
          placeholder="Search..."
          className="w-full rounded-full bg-[#1B1C2E] pl-12 pr-4 py-3 text-sm text-white placeholder-white/50 ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

      <button
        type="button"
        onClick={onFilterClick}
        className="rounded-full bg-purple-500/90 px-5 py-3 text-sm font-semibold text-white hover:bg-purple-500"
      >
        Filters
      </button>
    </form>
  );
}
