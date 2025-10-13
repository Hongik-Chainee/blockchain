"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { TalentListResponse, Talent } from "@/models/talent";

export type SortType = "RECENT" | "NAME" | "LOCATION" | "POPULAR";
type FetchMode = "replace" | "append";

const DEBUG = typeof window !== "undefined" && process.env.NODE_ENV !== "production";

/** TalentViewModel */
export function useTalentViewModel() {
  const [talents, setTalents] = useState<Talent[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(9);
  const [sort, setSort] = useState<SortType>("RECENT");
  const [includeMainProject, setIncludeMainProject] = useState(true);
  const [keyword, setKeyword] = useState<string>("");

  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const nextModeRef = useRef<FetchMode>("replace");
  const canLoadMore = useMemo(() => page + 1 < totalPages, [page, totalPages]);

  async function fetchTalents(mode: FetchMode = "replace") {
    mode === "append" ? setLoadingMore(true) : setLoading(true);
    setError(null);

    const reqId = Math.random().toString(36).slice(2, 8);
    const started = performance.now();

    try {
      const params = new URLSearchParams({
        page: page.toString(),
        size: size.toString(),
        sort,
        includeMainProject: includeMainProject.toString(),
      });
      if (keyword?.trim()) params.set("keyword", keyword.trim());

      const url = `https://chainee.store/api/talents?${params.toString()}`;

      if (DEBUG) {
        console.groupCollapsed(
          `%c[Talent][${reqId}] fetch ${mode.toUpperCase()}`,
          "color:#9b6bff;font-weight:600"
        );
        console.log("→ URL", url);
        console.log("→ Params", { page, size, sort, includeMainProject, keyword, mode });
      }

      const res = await fetch(url, { headers: { Accept: "application/json" } });

      if (DEBUG) {
        console.log("← Status", res.status, res.statusText);
        // 원문을 보고 싶을 때 Response.clone()으로 원문 확보
        try {
          const raw = await res.clone().text();
          console.log("← Raw body", raw);
        } catch {
          /* ignore */
        }
      }

      if (!res.ok) throw new Error(`API Error: ${res.status}`);

      const data: TalentListResponse = await res.json();

      // 스키마 간단 검증
      const shapeOk =
        data &&
        typeof data.totalElements === "number" &&
        typeof data.totalPages === "number" &&
        Array.isArray(data.talents);

      if (DEBUG) {
        console.log("✓ Shape OK?", shapeOk);
        console.log("← Parsed", data);
        if (Array.isArray(data.talents)) {
          console.table(
            data.talents.map((t: any) => ({
              id: t?.id,
              name: t?.name ?? null,
              location: t?.location ?? null,
              skills: (t?.requiredSkills ?? []).join(", "),
            }))
          );
        }
      }

      setTotalPages(data.totalPages);
      setTotalElements(data.totalElements);
      setTalents((prev) => (mode === "append" ? [...prev, ...data.talents] : data.talents));
    } catch (err: any) {
      if (DEBUG) console.error(`[Talent][${reqId}] ✗ Error`, err);
      setError(err?.message ?? "Unknown error");
    } finally {
      const ms = (performance.now() - started).toFixed(1);
      if (DEBUG) {
        console.log("⏱ Duration(ms)", ms);
        console.groupEnd();
      }
      mode === "append" ? setLoadingMore(false) : setLoading(false);
    }
  }

  useEffect(() => {
    fetchTalents(nextModeRef.current);
    nextModeRef.current = "replace";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, size, sort, includeMainProject, keyword]);

  const search = (p: { sort?: SortType; keyword?: string }) => {
    if (p.sort) setSort(p.sort);
    if (typeof p.keyword === "string") setKeyword(p.keyword);
    nextModeRef.current = "replace";
    setPage(0);
  };

  const loadMore = () => {
    if (!canLoadMore || loadingMore) return;
    nextModeRef.current = "append";
    setPage((v) => v + 1);
  };

  const refetch = (mode: FetchMode = "replace") => {
    nextModeRef.current = mode;
    fetchTalents(mode);
  };

  return {
    talents,
    loading,
    loadingMore,
    error,
    page,
    size,
    sort,
    keyword,
    includeMainProject,
    totalPages,
    totalElements,
    canLoadMore,
    setPage,
    setSize,
    setSort,
    setKeyword,
    setIncludeMainProject,
    refetch,
    search,
    loadMore,
  };
}
