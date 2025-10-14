"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import ProjectCard from "@/components/projects/ProjectCard";
import PeopleCard from "@/components/projects/PeopleCard";
import Badge from "@/components/projects/Badge";
import { projectsVM } from "@/viewModels/projectsViewModel";

export default function ProjectsView() {
  const vm = projectsVM;

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-6xl mx-auto">
      {/* 상단 타이틀 + 검색 */}
      <div className="flex flex-col gap-4">
        <h1 className="text-center text-white text-xl font-semibold">Projects</h1>

        <div className="mx-auto w-full max-w-3xl relative">
          <MagnifyingGlassIcon className="h-5 w-5 text-[#9AA4B2] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            className="w-full rounded-full bg-[#171A22] border border-[#2A2F3B] pl-10 pr-28 py-3 text-sm text-white placeholder-[#75809A] outline-none"
            placeholder="원하는 프로젝트를 검색해보세요"
            value={vm.query}
            onChange={(e) => vm.setQuery(e.target.value)}
          />
          <button className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-[#7A5AF8] text-white px-5 py-2 text-sm">
            Search
          </button>
        </div>
      </div>

      {/* 추천 프로젝트 섹션 */}
      <section className="mt-8">
        <h2 className="text-[#9AA4B2] text-sm font-semibold">Recommended projects</h2>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {vm.filteredProjects.slice(0, 9).map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>

        <div className="mt-4 flex justify-center">
          <button className="text-xs text-[#9AA4B2] px-4 py-2 border border-[#2A2F3B] rounded-full hover:bg-[#1B1F2A]">
            MORE &gt;
          </button>
        </div>
      </section>

      {/* 추천 인재 섹션 */}
      <section className="mt-10">
        <h2 className="text-[#9AA4B2] text-sm font-semibold">Recommended people</h2>

        <div className="mt-4 space-y-3">
          {vm.people.map((u) => (
            <PeopleCard
              key={u.id}
              name={u.name}
              titleTags={u.titleTags}
              skills={u.skills}
              location={u.location}
              avatarUrl={u.avatarUrl}
            />
          ))}
        </div>
      </section>

      {/* 푸터 비슷한 하단 블록 */}
      <footer className="mt-12 border-t border-[#2A2F3B] pt-8">
        <div className="text-[#75809A] text-sm">
          <p className="font-semibold text-white">Chainee</p>
          <p className="mt-1">서비스 설명/소개 텍스트 영역</p>
          <div className="mt-3 flex gap-3 text-[#9AA4B2]">
            <Badge>ⓒ 2025 Chainee. All rights reserved.</Badge>
          </div>
        </div>
      </footer>
    </div>
  );
}
