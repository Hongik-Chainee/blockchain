import { User } from '@/models/profile';

interface UserInfoProps {
  user: User | null;
}

export function UserInfo({ user }: UserInfoProps) {
  if (!user) return null; // Or a loading skeleton

  return (
    <div className="bg-[#222] p-8 rounded-lg">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
        {/* Left side: User Info */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start flex-1">
          {/* Placeholder for avatar image */}
          <div className="w-32 h-32 sm:w-48 sm:h-48 rounded-full bg-gray-300 mb-4 sm:mb-0 sm:mr-8"></div>
          <div className="text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold">{user.name}</h1>
            <div className="flex justify-center sm:justify-start space-x-2 mt-2">
              {user.tags.map(tag => (
                <span key={tag} className="bg-blue-600 px-3 py-1 rounded-full text-sm">{tag}</span>
              ))}
            </div>
            <div className="mt-4 text-gray-400">
              <p>{user.university}</p>
              <p>{user.location}</p>
              <p>web <a href={`http://${user.website}`} className="text-blue-400" target="_blank" rel="noopener noreferrer">{user.website}</a></p>
            </div>
          </div>
        </div>

        {/* Right side: User Actions */}
        <div className="mt-8 lg:mt-0 lg:ml-8 w-full lg:w-auto lg:min-w-[200px]">
          <div className="flex justify-center lg:justify-between items-center mb-6">
            <div className="text-center mr-8 lg:mr-4">
              <p className="text-gray-400">Followers</p>
              <p className="text-2xl font-bold">{user.followers}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-400">Following</p>
              <p className="text-2xl font-bold">{user.following}</p>
            </div>
          </div>
          <div className="flex flex-col space-y-3">
            <button className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700">
              Share
            </button>
            <button className="bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-600">
              Edit profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
