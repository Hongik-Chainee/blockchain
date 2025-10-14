// app/search/page.tsx
import SearchView from "@/views/search/SearchView";
import type { JobSort } from "@/viewModels/searchViewModel";

const asJobSort = (v?: string): JobSort => {
  switch (v) {
    case "RECENT":
    case "DEADLINE_ASC":
    case "DEADLINE_DESC":
    case "PAYMENT_ASC":
    case "PAYMENT_DESC":
    case "APPLICANTS_DESC":
      return v;
    default:
      return "RECENT";
  }
};

export default async function Page({
  searchParams,
}: {
  // ✅ Next.js 15: searchParams는 Promise
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams; // ✅ 반드시 await

  const q = (sp.q as string) ?? "";
  const tab = ((sp.tab as string) ?? "all") as "all" | "people" | "jobs";

  const pagePeople = Number((sp.pagePeople as string) ?? 0) || 0;
  const pageJobs = Number((sp.pageJobs as string) ?? 0) || 0;

  const sortPeople = (sp.sortPeople as string) ?? "RECENT";
  const sortJobs = asJobSort(sp.sortJobs as string | undefined);

  const includeMainProject =
    (sp.includeMainProject as string) === "false" ? false : true;

  return (
    <SearchView
      initial={{ q, tab, pagePeople, pageJobs, sortPeople, sortJobs, includeMainProject }}
    />
  );
}
