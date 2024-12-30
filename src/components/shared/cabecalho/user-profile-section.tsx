import { UserInfoSkeleton } from "@/components/skeletons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context";

export default function UserProfileSection() {
  const { name, email, logout, loading } = useAuth();

  if (loading) return <UserInfoSkeleton />;

  return (
    <div className="flex gap-2 px-2">
      <Avatar className="h-[53px] w-[53px]">
        <AvatarImage />
        <AvatarFallback className="bg-zinc-600">
          {name?.split(" ")[0]}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col justify-center">
        <div className="text-lg font-bold">{name}</div>
        <div className="text-xs text-zinc-400">{email}</div>
      </div>
      <Button size="icon" onClick={logout}>
        Sair
      </Button>
    </div>
  );
}
