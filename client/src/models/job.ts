// models/job.ts
export interface JobAuthor {
  id: number;
  name: string | null;
  profileImageUrl?: string | null;
  positions?: string[] | null;
  from?: string | null;
  in?: string | null; // 위치
  website?: string | null;
  followerCount?: number | null;
  followingCount?: number | null;
}

export interface JobPost {
  id: number;
  title: string;
  description?: string | null;
  payment?: number | null; // 원화 금액
  requiredSkills?: string[] | null;
  duration?: string | null; // "6m" 등
  deadline?: string | null; // "YYYY-MM-DD"
  createdAt?: string | null;
  applicantCount?: number | null;
  author?: JobAuthor | null;
  // 필요 시 thumbnailUrl 등 추가 가능
}

export interface JobListResponse {
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
  posts: JobPost[];
}
