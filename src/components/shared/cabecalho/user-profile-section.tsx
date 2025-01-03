import { UserInfoSkeleton } from "@/components/skeletons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context";
import { LogOut, User } from "lucide-react";

function pegarIniciais(nome: string) {
  if(!nome) return "";

  const nomes = nome.trim().split(" ").slice(0,2);
  const iniciais = nomes.length > 1 ? nomes.map( value => value.charAt(0).toUpperCase()).join("") : nomes[0].slice(0,2).toLocaleUpperCase();

  return iniciais;
}

export default function UserProfileSection() {
  const { name, email, logout, loading } = useAuth();

  if (loading) return <UserInfoSkeleton />;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex gap-2 px-2 max-w-56 items-center py-1 rounded-lg data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-sidebar-accent" >
          <Avatar className="h-10 w-10 rounded-lg">
            <AvatarImage src="" alt={name}/>
            <AvatarFallback className="bg-zinc-600">
              {pegarIniciais(name!)}
            </AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-semibold">{name}</span>
          <span className="truncate text-xs text-zinc-400">{email}</span>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] min-w-40 rounded-lg">
        <DropdownMenuItem>
          <User />
          <span>Perfil</span>
          </DropdownMenuItem>
        <DropdownMenuSeparator/>
        <DropdownMenuItem onClick={logout}>
          <LogOut/>
        <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
