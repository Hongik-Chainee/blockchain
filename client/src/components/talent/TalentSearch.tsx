// components/talent/TalentSearch.tsx
"use client";

import { useState } from "react";
import type { SortType } from "@/viewModels/talentViewModel";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

interface TalentSearchProps {
  onSearch: (params: { sort: SortType; keyword: string }) => void;
  loading?: boolean;
  defaultSort?: SortType;
  defaultKeyword?: string;
}

export function TalentSearch({
  onSearch,
  loading,
  defaultSort = "RECENT",
  defaultKeyword = "",
}: TalentSearchProps) {
  const [sort, setSort] = useState<SortType>(defaultSort);
  const [keyword, setKeyword] = useState<string>(defaultKeyword);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ sort, keyword });
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-3xl">
      <div className="relative flex items-center gap-3">
        {/* 검색 인풋 */}
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="관심 있는 프로젝트를 검색해보세요!"
            className="w-full rounded-full bg-[#1B1C2E] pl-12 pr-4 py-3 text-sm text-white placeholder-white/50 ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        {/* 정렬 */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortType)}
          disabled={loading}
          className="rounded-full bg-[#1B1C2E] px-4 py-3 text-sm text-white ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          <option value="RECENT">최근 등록</option>
          <option value="NAME">이름순</option>
          <option value="LOCATION">지역순</option>
          <option value="POPULAR">인기순</option>
        </select>

        {/* 검색 버튼 */}
        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-gradient-to-r from-[#9B6BFF] to-[#E076FF] px-6 py-3 text-sm font-semibold text-white shadow disabled:opacity-60"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>
    </form>
  );
}
