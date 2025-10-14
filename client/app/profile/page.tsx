import { UserProfile } from '@/views/profile/UserProfile'; // 경로는 실제 위치에 맞게 조정

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background text-white">
      <UserProfile />
    </div>
  );
}
