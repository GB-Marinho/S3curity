import { NavItemType } from "@/types";
import {
  IconBox,
  IconClipboardText,
  IconHome,
  IconLicense,
  IconUserCog,
  IconUsers,
  IconUsersGroup,
} from "@tabler/icons-react";

export const navItems: NavItemType[] = [
  {
    id:"navMain",
    type: "group",
    items: [
      {
        id:"home",
        title: "Home",
        url: "/home",
        icon: IconHome,
        type: "item",
      },
    ],
  },
  {
    id:"primario",
    title: "Primário",
    type: "group",
    items: [
      {
        id:"customers",
        title: "Customers",
        url: "#",
        icon: IconUsersGroup,
        type: "collapsible",
        items: [
          {
            id:"manege",
            title: "Gerenciar",
            url: "/manage",
            icon: IconUserCog,
            type: "item",
          },
          {
            id:"relatorio",
            title: "Relatório",
            url: "/relatorio",
            icon: IconClipboardText,
            type: "item",
          },
        ],
      },
      {
        id:"visualizar",
        title: "Visualizar",
        url: "#",
        icon: IconBox,
        type: "item",
      },
    ],
  },
  {
    id:"secundário",
    title: "Secundario",
    type: "group",
    items: [
      {
        id:"perfis",
        title: "Perfis",
        url: "/perfis",
        icon: IconUsers,
        type: "item",
      },

      {
        id:"permissoes",
        title: "Permissoes",
        url: "/permissoes",
        icon: IconLicense,
        type: "item",
      },
    ],
  },
];
