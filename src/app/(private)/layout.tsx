import Cabecalho from "@/components/shared/cabecalho/Cabecalho";
import Sidebar from "@/components/shared/Sidebar";
import React, { ReactNode } from "react";

interface PrivateLayoutProps {
  children?: ReactNode;
}

export default function PrivateLayout({ children }: PrivateLayoutProps) {
  return (
    <div className="flex h-screen">
        <Sidebar/>
      <div className="flex flex-col flex-1 pr-11 pb-11">
        <Cabecalho />
        <main className="flex items-center justify-center flex-1 bg-[#18181b] rounded-xl p-8">{children}</main>
      </div>
    </div>
  );
}
