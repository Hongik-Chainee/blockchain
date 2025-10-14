// views/search/SearchView.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useSearchViewModel, JobSort } from "@/viewModels/searchViewModel";
import { SearchBar } from "@/components/search/SearchBar";
import { PeopleRow } from "@/components/search/PeopleRow";
import { JobRow } from "@/components/search/JobRow";

export default function SearchView({
  initial,
}: {
  initial: {
    q: string;
    tab: "all" | "people" | "jobs";
    pagePeople: number;
    pageJobs: number;
    sortPeople: string;
    sortJobs: JobSort; // JobSort로 타입 좁히고 싶으면 string 대신 JobSort 사용 가능
    includeMainProject: boolean;
  };
}) {
  const vm = useSearchViewModel(initial);
  const router = useRouter();
  const params = useSearchParams();

  // URL 동기화
  useEffect(() => {
    const next = new URLSearchParams(params?.toString() ?? "");
    next.set("q", vm.q);
    next.set("tab", vm.tab);
    next.set("pagePeople", String(vm.pagePeople));
    next.set("pageJobs", String(vm.pageJobs));
    next.set("sortPeople", String(vm.sortPeople));
    next.set("sortJobs", String(vm.sortJobs));
    next.set("includeMainProject", String(vm.includeMainProject));
    router.replace(`/search?${next.toString()}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    vm.q,
    vm.tab,
    vm.pagePeople,
    vm.pageJobs,
    vm.sortPeople,
    vm.sortJobs,
    vm.includeMainProject,
  ]);

  return (
    <div className="mx-auto w-full max-w-7xl px-6 lg:px-10 py-8">
      {/* 상단 검색바 */}
      <div className="mb-6">
        <SearchBar
          defaultValue={vm.q}
          onSubmit={(value) => vm.submitSearch(value)}
          onFilterClick={() => alert("Filters (TODO)")}
        />
      </div>

      {/* 탭 */}
      <div className="mb-6 flex items-center gap-6 border-b border-white/10 pb-2">
        <TabItem
          active={vm.tab === "all"}
          label={`ALL (${vm.allCount})`}
          onClick={() => vm.setTab("all")}
        />
        <TabItem
          active={vm.tab === "people"}
          label={`People (${vm.peopleTotalElements})`}
          onClick={() => vm.setTab("people")}
        />
        <TabItem
          active={vm.tab === "jobs"}
          label={`Jobs (${vm.jobsTotalElements})`}
          onClick={() => vm.setTab("jobs")}
        />
      </div>

      {/* ALL 또는 People 섹션 */}
      {(vm.tab === "all" || vm.tab === "people") && (
        <section className="mb-8">
          <SectionHeader title="People">
            <div className="flex items-center gap-2">
              <select
                value={vm.sortPeople as string}
                onChange={(e) => {
                  vm.setSortPeople(e.target.value);
                  vm.setPagePeople(0);
                }}
                className="rounded-lg bg-white/5 px-3 py-1.5 text-xs text-white ring-1 ring-white/10"
              >
                <option value="RECENT">최근 등록</option>
                <option value="NAME">이름순</option>
                <option value="LOCATION">지역순</option>
                <option value="POPULAR">인기순</option>
              </select>
            </div>
          </SectionHeader>

          {/* 목록 */}
          <div className="space-y-3">
            {vm.peopleLoading && vm.people.length === 0 ? (
              <PeopleSkeletonList />
            ) : vm.people.length === 0 ? (
              <Empty label="No people found" />
            ) : (
              vm.people.map((t) => <PeopleRow key={t.id} talent={t} />)
            )}
          </div>

          {/* 더보기 */}
          {(vm.tab === "people" || vm.tab === "all") && vm.people.length > 0 && (
            <div className="mt-4 flex justify-center">
              {vm.canLoadMorePeople && (
                <button
                  onClick={vm.loadMorePeople}
                  disabled={vm.peopleLoadingMore}
                  className="w-full max-w-3xl rounded-2xl bg-white/5 px-6 py-2 text-sm font-semibold text-white ring-1 ring-white/10 hover:bg-white/10 disabled:opacity-60"
                >
                  {vm.peopleLoadingMore ? "Loading..." : "More people"}
                </button>
              )}
            </div>
          )}
        </section>
      )}

      {/* Jobs 섹션 */}
      {(vm.tab === "all" || vm.tab === "jobs") && (
        <section>
          <SectionHeader title="Job postings">
            <div className="flex items-center gap-2">
              <span className="text-xs text-white/60">Sort by</span>
              <select
                value={vm.sortJobs as string}
                onChange={(e) => {
                  vm.setSortJobs(e.target.value as any);
                  vm.setPageJobs(0);
                }}
                className="rounded-lg bg-white/5 px-3 py-1.5 text-xs text-white ring-1 ring-white/10"
              >
                <option value="RECENT">Recent</option>
                <option value="DEADLINE_ASC">Deadline ↑</option>
                <option value="DEADLINE_DESC">Deadline ↓</option>
                <option value="PAYMENT_ASC">Payment ↑</option>
                <option value="PAYMENT_DESC">Payment ↓</option>
                <option value="APPLICANTS_DESC">Most Applicants</option>
              </select>
            </div>
          </SectionHeader>

          <div className="space-y-3">
            {vm.jobsLoading && vm.jobs.length === 0 ? (
              <JobSkeletonList />
            ) : vm.jobs.length === 0 ? (
              <Empty label="No jobs found" />
            ) : (
              vm.jobs.map((j) => <JobRow key={j.id} job={j} />)
            )}
          </div>

          {/* 더보기 */}
          {(vm.tab === "jobs" || vm.tab === "all") && vm.jobs.length > 0 && (
            <div className="mt-4 flex justify-center">
              {vm.canLoadMoreJobs && (
                <button
                  onClick={vm.loadMoreJobs}
                  disabled={vm.jobsLoadingMore}
                  className="w-full max-w-3xl rounded-2xl bg-white/5 px-6 py-2 text-sm font-semibold text-white ring-1 ring-white/10 hover:bg-white/10 disabled:opacity-60"
                >
                  {vm.jobsLoadingMore ? "Loading..." : "More jobs"}
                </button>
              )}
            </div>
          )}
        </section>
      )}
    </div>
  );
}

function TabItem({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`pb-2 text-sm ${
        active
          ? "text-white border-b-2 border-white"
          : "text-white/60 hover:text-white"
      }`}
    >
      {label}
    </button>
  );
}

function SectionHeader({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-3 mt-2 flex items-center justify-between">
      <h3 className="text-white/90 text-sm font-semibold">{title}</h3>
      <div className="flex items-center gap-2">{children}</div>
    </div>
  );
}

function Empty({ label }: { label: string }) {
  return (
    <div className="rounded-xl bg-white/5 p-6 text-center text-white/70 ring-1 ring-white/10">
      {label}
    </div>
  );
}

function PeopleSkeletonList() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-xl bg-white/5 p-4 ring-1 ring-white/10"
        >
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-white/10" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-1/5 rounded bg-white/10" />
              <div className="h-2 w-2/5 rounded bg-white/10" />
              <div className="h-2 w-1/4 rounded bg-white/10" />
            </div>
            <div className="h-8 w-24 rounded bg-white/10" />
          </div>
        </div>
      ))}
    </>
  );
}

function JobSkeletonList() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-xl bg-white/5 p-4 ring-1 ring-white/10"
        >
          <div className="mb-3 h-3 w-1/3 rounded bg-white/10" />
          <div className="mb-2 h-2 w-2/3 rounded bg-white/10" />
          <div className="h-2 w-1/2 rounded bg-white/10" />
        </div>
      ))}
    </>
  );
}
