// viewModels/searchViewModel.ts
"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Talent, TalentListResponse } from "@/models/talent";
import type { JobListResponse, JobPost } from "@/models/job";

export type SortType = "RECENT" | "NAME" | "LOCATION" | "POPULAR";
type FetchMode = "replace" | "append";

export interface SearchVMInit {
  q: string;
  tab: "all" | "people" | "jobs";
  pagePeople: number;
  pageJobs: number;
  sortPeople: SortType | string;
  sortJobs: JobSort;            // ✅ 타입 변경
  includeMainProject: boolean;
}

/** ✅ 잡 정렬 타입 (서버 명세) */
export type JobSort =
  | "RECENT"
  | "DEADLINE_ASC"
  | "DEADLINE_DESC"
  | "PAYMENT_ASC"
  | "PAYMENT_DESC"
  | "APPLICANTS_DESC";

// === 엔드포인트 =========================================
const TALENT_SEARCH_ENDPOINT = "https://chainee.store/api/talents/search";
const JOB_SEARCH_ENDPOINT = "https://chainee.store/api/job/posts/search";
// ========================================================

const DEBUG = typeof window !== "undefined" && process.env.NODE_ENV !== "production";

export function useSearchViewModel(initial: SearchVMInit) {
  // 공통
  const [q, setQ] = useState(initial.q ?? "");
  const [tab, setTab] = useState<SearchVMInit["tab"]>(initial.tab ?? "all");

  // People
  const [people, setPeople] = useState<Talent[]>([]);
  const [peopleLoading, setPeopleLoading] = useState(false);
  const [peopleLoadingMore, setPeopleLoadingMore] = useState(false);
  const [peopleError, setPeopleError] = useState<string | null>(null);
  const [pagePeople, setPagePeople] = useState(initial.pagePeople ?? 0);
  const [sortPeople, setSortPeople] = useState<SortType | string>(
    (initial.sortPeople as SortType) ?? "RECENT"
  );
  const [includeMainProject, setIncludeMainProject] = useState(
    initial.includeMainProject ?? true
  );
  const [peopleTotalPages, setPeopleTotalPages] = useState(0);
  const [peopleTotalElements, setPeopleTotalElements] = useState(0);

  // Jobs
  const [jobs, setJobs] = useState<JobPost[]>([]);
  const [jobsLoading, setJobsLoading] = useState(false);
  const [jobsLoadingMore, setJobsLoadingMore] = useState(false);
  const [jobsError, setJobsError] = useState<string | null>(null);
  const [pageJobs, setPageJobs] = useState(initial.pageJobs ?? 0);
  const [sortJobs, setSortJobs] = useState<JobSort>(initial.sortJobs ?? "RECENT");
  const [jobsTotalPages, setJobsTotalPages] = useState(0);
  const [jobsTotalElements, setJobsTotalElements] = useState(0);

  const nextModePeople = useRef<FetchMode>("replace");
  const nextModeJobs = useRef<FetchMode>("replace");

  const canLoadMorePeople = useMemo(() => pagePeople + 1 < peopleTotalPages, [pagePeople, peopleTotalPages]);
  const canLoadMoreJobs = useMemo(() => pageJobs + 1 < jobsTotalPages, [pageJobs, jobsTotalPages]);

  // People fetch
  const fetchPeople = useCallback(
    async (mode: FetchMode = "replace") => {
      if (!q.trim()) {
        setPeople([]); setPeopleTotalElements(0); setPeopleTotalPages(0);
        return;
      }
      mode === "append" ? setPeopleLoadingMore(true) : setPeopleLoading(true);
      setPeopleError(null);

      const params = new URLSearchParams({
        q: q.trim(),
        page: String(pagePeople),
        size: "5",
        includeMainProject: String(includeMainProject),
        sort: String(sortPeople),
      });
      const url = `${TALENT_SEARCH_ENDPOINT}?${params.toString()}`;

      try {
        if (DEBUG) console.log("[People] GET", url);
        const res = await fetch(url, { headers: { Accept: "application/json" } });
        if (!res.ok) throw new Error(`People API ${res.status}`);
        const data: TalentListResponse = await res.json();
        setPeopleTotalElements(data.totalElements);
        setPeopleTotalPages(data.totalPages);
        setPeople((prev) => (mode === "append" ? [...prev, ...data.talents] : data.talents));
      } catch (e: any) {
        setPeopleError(e?.message ?? "Unknown error");
      } finally {
        mode === "append" ? setPeopleLoadingMore(false) : setPeopleLoading(false);
      }
    },
    [q, pagePeople, includeMainProject, sortPeople]
  );

  // Jobs fetch (✅ 새 API 반영)
  const fetchJobs = useCallback(
    async (mode: FetchMode = "replace") => {
      if (!q.trim()) {
        setJobs([]); setJobsTotalElements(0); setJobsTotalPages(0);
        return;
      }
      mode === "append" ? setJobsLoadingMore(true) : setJobsLoading(true);
      setJobsError(null);

      const params = new URLSearchParams({
        q: q.trim(),
        page: String(pageJobs),
        size: "5",
        sort: sortJobs, // RECENT / DEADLINE_ASC / ...
      });
      const url = `${JOB_SEARCH_ENDPOINT}?${params.toString()}`;

      try {
        if (DEBUG) console.log("[Jobs] GET", url);
        const res = await fetch(url, { headers: { Accept: "application/json" } });
        if (!res.ok) throw new Error(`Jobs API ${res.status}`);
        const data: JobListResponse = await res.json();

        setJobsTotalElements(data.totalElements);
        setJobsTotalPages(data.totalPages);
        setJobs((prev) => (mode === "append" ? [...prev, ...data.posts] : data.posts));
      } catch (e: any) {
        setJobsError(e?.message ?? "Unknown error");
      } finally {
        mode === "append" ? setJobsLoadingMore(false) : setJobsLoading(false);
      }
    },
    [q, pageJobs, sortJobs]
  );

  useEffect(() => {
    fetchPeople(nextModePeople.current);
    nextModePeople.current = "replace";
  }, [fetchPeople]);

  useEffect(() => {
    fetchJobs(nextModeJobs.current);
    nextModeJobs.current = "replace";
  }, [fetchJobs]);

  // actions
  const submitSearch = (nextQ: string) => {
    setQ(nextQ);
    nextModePeople.current = "replace";
    nextModeJobs.current = "replace";
    setPagePeople(0);
    setPageJobs(0);
  };

  const loadMorePeople = () => {
    if (!canLoadMorePeople || peopleLoadingMore) return;
    nextModePeople.current = "append";
    setPagePeople((v) => v + 1);
  };

  const loadMoreJobs = () => {
    if (!canLoadMoreJobs || jobsLoadingMore) return;
    nextModeJobs.current = "append";
    setPageJobs((v) => v + 1);
  };

  const allCount = peopleTotalElements + jobsTotalElements;

  return {
    // query
    q, setQ, tab, setTab,

    // people
    people, peopleLoading, peopleLoadingMore, peopleError,
    pagePeople, setPagePeople, sortPeople, setSortPeople,
    includeMainProject, setIncludeMainProject,
    peopleTotalPages, peopleTotalElements, canLoadMorePeople,

    // jobs
    jobs, jobsLoading, jobsLoadingMore, jobsError,
    pageJobs, setPageJobs, sortJobs, setSortJobs,
    jobsTotalPages, jobsTotalElements, canLoadMoreJobs,

    // derived
    allCount,

    // actions
    submitSearch, loadMorePeople, loadMoreJobs,
  };
}
