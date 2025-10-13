
import { useState, useEffect } from 'react';
import { User, Project, JobPosting, Resume, Introduction } from '@/models/profile';

// Helper function to simulate API delay
const fetchWithDelay = <T,>(data: T, delay = 500): Promise<T> =>
  new Promise(resolve => setTimeout(() => resolve(data), delay));

// --- Mock Data (Simulating a backend API response) ---
const mockUser: User = {
  name: 'Yoonseo Lee',
  tags: ['Designer', 'Illustrator'],
  university: 'from Hongik. Univ',
  location: 'in Seoul, Republic of Korea',
  website: 'www.yoonseolee.com',
  followers: 298,
  following: 305,
  avatarUrl: '/avatar.png', // Placeholder image path
};

const mockProjects: Project[] = [
  { name: "Project name 1", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", imageUrl: '/project1.png' },
  { name: "Project name 2", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", imageUrl: '/project2.png' },
  { name: "Project name 3", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", imageUrl: '/project3.png' },
];

const mockJobPostings: JobPosting[] = [
  { name: "Project name A", status: "OPEN", details: "<> Engineering | ~25/7/31 | 14 applications" },
  { name: "Project name B", status: "OPEN", details: "<> Engineering | ~25/7/31 | 14 applications" },
  { name: "Project name C", status: "Closed", details: "<> Engineering | ~25/7/31 | 14 applications" },
];

const mockResumes: Resume[] = [
  { name: "Resume_2025ver", lastUpdate: "8/23/25" },
  { name: "Resume_2024ver", lastUpdate: "8/23/25" },
];

const mockIntroduction: Introduction = {
    title: "Hi! I'm a branding designer, just graduated.",
    body: `Self promotion information Self promotion information Self promotion
           information Self promotion information Self promotion information Self
           promotion information Self promotion information Self promotion information
           Self promotion information Self promotion information Self promotion
           information Self promotion information Self promotion information Self
           promotion information Self promotion information 최대 글자수는?`
}

// --- ViewModel Hook ---
export function useProfileViewModel() {
  const [user, setUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [jobPostings, setJobPostings] = useState<JobPosting[]>([]);
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [introduction, setIntroduction] = useState<Introduction | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setIsLoading(true);
        // Simulate fetching all data in parallel
        const [
            user, 
            projects, 
            jobPostings, 
            resumes,
            introduction
        ] = await Promise.all([
          fetchWithDelay(mockUser),
          fetchWithDelay(mockProjects),
          fetchWithDelay(mockJobPostings),
          fetchWithDelay(mockResumes),
          fetchWithDelay(mockIntroduction)
        ]);

        setUser(user);
        setProjects(projects);
        setJobPostings(jobPostings);
        setResumes(resumes);
        setIntroduction(introduction);

      } catch (error) {
        console.error("Failed to fetch profile data:", error);
        // Here you could set an error state
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  return {
    user,
    projects,
    jobPostings,
    resumes,
    introduction,
    isLoading,
    // In a real app, you'd have functions here to update data, e.g.:
    // updateUser: (updatedUser) => { ... },
  };
}
