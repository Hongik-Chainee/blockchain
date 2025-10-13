/** 단일 프로젝트(대표 작업) */
export type TalentMainProject = {
  id: number;
  title: string;
  /** e.g. ipfs://.../metadata.json */
  nftTokenUri: string;
  /** ISO8601 string, e.g. "2025-07-01T12:00:00" */
  completedAt: string;
};

/** 인재(Talent) 기본 정보 */
export type Talent = {
  id: number;
  name: string;
  location: string;
  profileImageUrl: string;
  /** 포지션 라벨들 (예: ["Designer","Illustrator"]) */
  positions: string[];
  /** 대표 작업(없을 수도 있으면 null 허용) */
  mainProject: TalentMainProject | null;
  /** 요구 스킬 태그들 */
  requiredSkills: string[];
  followerCount: number;
  followingCount: number;
  isFollowing: boolean;
};

/** 페이지네이션 포함 응답 */
export type TalentListResponse = {
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
  talents: Talent[];
};