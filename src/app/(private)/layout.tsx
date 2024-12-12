import Cabecalho from "@/components/shared/Cabecalho";
import Drawer from "@/components/shared/Drawer";
import React, { ReactNode } from "react";

interface PrivateLayoutProps {
  children?: ReactNode;
}

export default function PrivateLayout({ children }: PrivateLayoutProps) {
  return (
    <div className="flex h-screen">
        <Drawer/>
      <div className="flex flex-col flex-1 pr-11 pb-11">
        <Cabecalho />
        <main className="flex items-center justify-center h-full bg-[#18181b] rounded-xl">{children}</main>
      </div>
    </div>
  );
}
