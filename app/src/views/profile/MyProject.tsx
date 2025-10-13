import { Project } from '@/models/profile';

interface MyProjectProps {
  projects: Project[];
}

export function MyProject({ projects }: MyProjectProps) {
  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold text-purple-400 mb-4">My project</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <div key={index} className="bg-[#222] rounded-lg p-4">
            {/* Assuming imageUrl will be used here in an <img> tag */}
            <div className="bg-purple-500 h-40 rounded-lg mb-4"></div>
            <h3 className="font-bold">{project.name}</h3>
            <p className="text-gray-400 text-sm">{project.description}</p>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <button className="bg-[#222] px-6 py-2 rounded-lg hover:bg-gray-700">More projects</button>
      </div>
    </section>
  );
}
