import type { Project, Person } from "@/models/project";

export class ProjectsViewModel {
  query = "";
  projects: Project[] = [
    {
      id: "p1",
      title: "DID Mobile App Frontend Developer",
      company: "",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore...",
      tags: ["Engineering", "Califonia, US", "$1000"],
      author: "John K. Park",
      postedAt: "25/7/31",
      stats: { views: 21, applications: 14 },
    },
    {
      id: "p2",
      title: "Mobile Application UX/UI Designer",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore...",
      tags: ["Design", "Seoul, South Korea", "T3D"],
      author: "Daniel Kim",
      postedAt: "25/6/28",
      stats: { views: 264, applications: 453 },
    },
    {
      id: "p3",
      title: "Backend Developer",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore...",
      tags: ["Engineering", "Tokyo, Japan", "$2,000(DF)"],
      author: "Irumi Sato",
      postedAt: "25/9/12",
      stats: { views: 378, applications: 1435 },
    },
    // 그리드 채우기용 복제
    ...Array.from({ length: 6 }).map((_, i) => ({
      id: `p${i + 10}`,
      title: "DID Mobile App Frontend Developer",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...",
      tags: ["Engineering", "Califonia, US", "$1000"],
      author: "John K. Park",
      postedAt: "25/7/31",
      stats: { views: 21, applications: 14 },
    })),
  ];

  people: Person[] = [
    {
      id: "u1",
      name: "Timothy Smith",
      titleTags: ["Frontend", "Illustrator"],
      skills: ["Vue.js", "JavaScript", "CSS", "HTML"],
      location: "Seoul, South Korea",
    },
    {
      id: "u2",
      name: "Amy. H. Miller",
      titleTags: ["Mobile UX Designer", "Illustrator"],
      skills: ["Vue.js", "JavaScript", "CSS", "HTML"],
      location: "Seoul, South Korea",
    },
    {
      id: "u3",
      name: "John Martin",
      titleTags: ["Frontend", "Illustrator"],
      skills: ["Vue.js", "JavaScript", "CSS", "HTML"],
      location: "Seoul, South Korea",
    },
  ];

  setQuery(q: string) {
    this.query = q;
  }

  get filteredProjects(): Project[] {
    const q = this.query.trim().toLowerCase();
    if (!q) return this.projects;
    return this.projects.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        p.author.toLowerCase().includes(q)
    );
  }
}

export const projectsVM = new ProjectsViewModel();
