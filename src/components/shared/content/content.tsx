import { useSidebar } from "@/components/ui/sidebar";
import React, { memo, ReactNode } from "react";
import Cabecalho from "../cabecalho/Cabecalho";
import { cookies } from "next/headers";

interface ContentProps {
  children?: ReactNode;
}

function Content({ children }: ContentProps) {
  const sidebar = useSidebar();

  const mainClass = sidebar.open
    ? "flex flex-col flex-1 md:pr-11 md:pl-0 px-6 pb-11"
    : "flex flex-col flex-1 md:px-11 px-6 pb-11";

  const cookieStore = cookies();
  const isSidebarOpen = cookieStore.get("sidebar-open")?.value === "true";

  return (
    <div className={mainClass}>
      <Cabecalho />
      <main className="flex flex-1 justify-center bg-[#18181b] rounded-xl p-8">
        {children}
      </main>
    </div>
  );
}

export default memo(Content);
