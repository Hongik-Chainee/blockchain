import { Resume as ResumeModel } from '@/models/profile';

interface ResumeProps {
  resumes: ResumeModel[];
}

export function Resume({ resumes }: ResumeProps) {
  return (
    <section className="mt-16">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h2 className="text-2xl font-bold text-purple-400">Résumé</h2>
          <p className="text-gray-500 text-sm">Only I can see this</p>
        </div>
      </div>
      <div className="space-y-4">
        {resumes.map((resume, index) => (
          <div key={index} className="bg-[#222] rounded-lg p-4 flex justify-between items-center">
            <div>
              <p className="font-bold">{resume.name}</p>
              <p className="text-gray-400 text-sm">Last update: {resume.lastUpdate}</p>
            </div>
            <button className="bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600">Preview</button>
          </div>
        ))}
      </div>
    </section>
  );
}
