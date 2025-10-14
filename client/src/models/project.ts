export type Project = {
    id: string;
    title: string;
    company?: string;
    description: string;
    tags: string[];          // ex) ['Engineering','Califonia, US','$1000']
    author: string;          // ex) 'John K. Park'
    postedAt: string;        // ex) '25/7/31'
    stats: { views: number; applications: number };
  };
  
  export type Person = {
    id: string;
    name: string;
    titleTags: string[];     // ex) ['Frontend','Illustrator']
    skills: string[];        // ex) ['Vue.js','JavaScript','CSS','HTML']
    location: string;        // ex) 'Seoul, South Korea'
    avatarUrl?: string;
  };
  