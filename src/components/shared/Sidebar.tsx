import Image from "next/image";
import React from "react";
import Logo from "@/assets/img/logo.png";
import Logotipo from "@/assets/img/logotipo.png";
import { Combobox } from "../ui/combobox";


export default function Sidebar() {
  return (
    <div className="bg-black w-[300px] flex flex-col flex-none h-screen">
      <div className="flex flex-col gap-2 h-[175px] justify-center items-center">
        <Image src={Logo} alt="Logo" width={90} />
        <Image src={Logotipo} alt="Logotipo" width={90} />
      </div>

      <div>
        <div className="flex justify-center">
          <Combobox />
        </div>
        <div>
    </div>
      </div>
    </div>
  );
}
