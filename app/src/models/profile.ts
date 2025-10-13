
export interface User {
  name: string;
  tags: string[];
  university: string;
  location: string;
  website: string;
  followers: number;
  following: number;
  avatarUrl: string; // Added for the avatar image
}

export interface Project {
  name: string;
  description: string;
  imageUrl: string; // Added for the project image
}

export interface JobPosting {
  name: string;
  status: 'OPEN' | 'Closed';
  details: string;
}

export interface Resume {
  name: string;
  lastUpdate: string;
}

export interface Introduction {
    title: string;
    body: string;
}
