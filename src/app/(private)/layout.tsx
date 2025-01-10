"use client";
import Cabecalho from "@/components/shared/cabecalho/Cabecalho";
import { AppSidebar } from "@/components/shared/sidebar/AppSidebar";
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";
import React, { ReactNode } from "react";

interface PrivateLayoutProps {
  children?: ReactNode;
}

export default function PrivateLayout({ children }: PrivateLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen">
        <AppSidebar />
        <Content>{children}</Content>
      </div>
    </SidebarProvider>
  );
}

function Content({ children }: PrivateLayoutProps) {
  const sidebar = useSidebar();

  const mainClass = sidebar.open
    ? "flex flex-col flex-1 md:pr-11 md:pl-0 px-6 pb-11"
    : "flex flex-col flex-1 md:px-11 px-6 pb-11";
  return (
    <div className={mainClass}>
      <Cabecalho />
      <main className="flex flex-1 justify-center bg-[#18181b] rounded-xl p-8">
        {children}
      </main>
    </div>
  );
}
