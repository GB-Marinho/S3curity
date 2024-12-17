import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from "next/image";
import Logo from "@/assets/img/logo.png";
import Logotipo from "@/assets/img/logotipo.png";
import {
    IconUser,
    IconBox,
    IconClipboardText
} from "@tabler/icons-react";
import { Combobox } from "../ui/combobox";

const items = [
    {
        title: "Gerenciar",
        url: "/manage",
        icon: IconUser,
    },
    {
        title: "Visualizar",
        url: "#",
        icon: IconBox,
    },
    {
        title: "Relatório",
        url: "#",
        icon: IconClipboardText,
    },
]

export function AppSidebar() {
    return (
        <Sidebar className="border-none">
            <SidebarHeader className="bg-black">
                <div className="flex flex-col gap-2 h-[152px] justify-center items-center">
                    <Image src={Logo} alt="Logo" width={90} />
                    <Image src={Logotipo} alt="Logotipo" width={90} />
                </div>
            </SidebarHeader>
            <SidebarContent className="bg-black">
                <SidebarGroup>
                    <div className="flex justify-center">
                        <Combobox />
                    </div>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupContent className="">
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url} className="flex justify-center">
                                            <div className="h-5 w-5 mr-2">
                                                <item.icon  className="h-5 w-5"/>
                                            </div>
                                            <span className="text-base mr-2" >{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}