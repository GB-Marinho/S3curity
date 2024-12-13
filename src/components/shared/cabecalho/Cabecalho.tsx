import { Separator } from "@/components/ui/separator";
import React from "react";
import UserProfileSection from "./user-profile-section";
import { IconSearch } from "@tabler/icons-react";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Cabecalho() {
  return (
    <div className="bg-black h-[175px] flex-none flex justify-center items-center">
      <SidebarTrigger />
      <div className=" flex flex-1 justify-between items-center">
        <span className="text-2xl">Administrador</span>
        <div className="flex gap-3 items-center px-2">
          <button className="hover:bg-zinc-800 p-[8px] rounded-full">
            <IconSearch />
          </button>
          <Separator orientation="vertical" className="bg-zinc-400 h-10 " />
          <UserProfileSection />
        </div>
      </div>
    </div>
  );
}
