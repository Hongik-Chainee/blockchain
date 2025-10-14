import { JobPosting } from '@/models/profile';

interface JobPostingsProps {
  jobPostings: JobPosting[];
}

export function JobPostings({ jobPostings }: JobPostingsProps) {
  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold text-purple-400 mb-4">Job postings</h2>
      <div className="space-y-4">
        {jobPostings.map((job, index) => (
          <div key={index} className="bg-[#222] rounded-lg p-4 flex justify-between items-center">
            <div>
              <div className="flex items-center">
                <h3 className="font-bold mr-2">{job.name}</h3>
                <span className={`text-xs px-2 py-1 rounded-full ${job.status === 'OPEN' ? 'bg-purple-600' : 'bg-gray-600'}`}>{job.status}</span>
              </div>
              <p className="text-gray-400 text-sm mt-1">{job.details}</p>
            </div>
            <button className="bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-700">View details</button>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <button className="bg-[#222] px-6 py-2 rounded-lg hover:bg-gray-700">More postings</button>
      </div>
    </section>
  );
}
