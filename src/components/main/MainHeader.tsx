import { Bell } from "lucide-react";
import { getCurrentProfile } from "@/services/users";

export default async function MainHeader() {
  const profile = await getCurrentProfile();
  return (
    <div className="flex justify-between mt-10 my-10">
      <div>
        <span>안녕하세요, {profile?.nickname}</span>
      </div>
      <Bell />
    </div>
  );
}
