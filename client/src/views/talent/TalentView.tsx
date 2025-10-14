// views/talent/TalentView.tsx
"use client";

import { useRouter } from "next/navigation";
import { useTalentViewModel, SortType } from "@/viewModels/talentViewModel";
import { TalentSearch } from "@/components/talent/TalentSearch";
import { TalentCard } from "@/components/talent/TalentCard";

export function TalentView() {
  const {
    talents,
    loading,
    loadingMore,
    error,
    sort,
    keyword,
    totalElements,
    canLoadMore,
    search,
    loadMore,
    includeMainProject,
  } = useTalentViewModel();

  const router = useRouter();

  const handleSearch = ({ sort, keyword }: { sort: SortType; keyword: string }) => {
    const params = new URLSearchParams({
      q: keyword || "",
      tab: "people",
      pagePeople: "0",
      sortPeople: sort,
      includeMainProject: String(includeMainProject ?? true),
      // 필요하면 여기에 pageJobs, sortJobs 등 추가 가능
    });
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-6 lg:px-10 py-10">
      {/* 타이틀 */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white md:text-3xl">Talent</h1>
      </div>

      {/* 검색 바 */}
      <div className="mb-10">
        <TalentSearch
          onSearch={handleSearch}
          loading={loading && !talents.length}
          defaultSort={sort}
          defaultKeyword={keyword}
        />
      </div>

      {/* 섹션 헤더 */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-white/80">
          Recommended People
        </h2>
        {typeof totalElements === "number" && (
          <span className="text-xs text-white/50">총 {totalElements}명</span>
        )}
      </div>

      {/* 그리드 / 로딩 / 에러 / 빈 상태 */}
      {error ? (
        <div className="rounded-xl bg-red-500/10 p-6 text-sm text-red-200 ring-1 ring-red-500/30">
          오류가 발생했어요. 잠시 후 다시 시도해주세요. <br /> <span className="opacity-70">{error}</span>
        </div>
      ) : (
        <>
          {/* 초기 로딩 스켈레톤 */}
          {loading && talents.length === 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse rounded-2xl bg-[#1B1C2E] p-4 ring-1 ring-white/10"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-white/10" />
                    <div className="flex-1 space-y-2">
                      <div className="h-3 w-2/5 rounded bg-white/10" />
                      <div className="h-2 w-3/5 rounded bg-white/10" />
                      <div className="h-2 w-1/3 rounded bg-white/10" />
                    </div>
                  </div>
                  <div className="mb-3 h-6 w-full rounded bg-white/10" />
                  <div className="aspect-square w-full rounded-xl bg-white/10" />
                </div>
              ))}
            </div>
          ) : talents.length === 0 ? (
            <div className="rounded-xl bg-white/5 p-10 text-center text-white/70 ring-1 ring-white/10">
              검색 결과가 없습니다.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {talents.map((t) => (
                  <TalentCard key={t.id ?? t.name} talent={t} />
                ))}
              </div>

              {/* MORE 버튼 */}
              <div className="mt-8 flex justify-center">
                {canLoadMore && (
                  <button
                    onClick={loadMore}
                    disabled={loadingMore}
                    className="w-full max-w-3xl rounded-2xl bg-white/5 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/10 hover:bg-white/10 disabled:opacity-60"
                  >
                    {loadingMore ? "Loading..." : "MORE >"}
                  </button>
                )}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
