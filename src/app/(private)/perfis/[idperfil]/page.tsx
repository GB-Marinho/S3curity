
import UpdatePerfilForm from "@/components/forms/perfil/updatePerfilForm/updatePerfil-form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { API_PERFIS } from "@/lib";
import { findPerfilID } from "@/services/perfis/findPerfilID";
import { Perfil } from "@/types/Entities";
import { IconChevronLeft } from "@tabler/icons-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import React, { useEffect, useState } from "react";

export default async function PerfilPage({
  params,
}: {
  params: { idperfil: string };
}) {
  let perfil: Perfil | null = null;

  try {
    perfil = await findPerfilID(params.idperfil);
  } catch {
    notFound();
  }

  if (!perfil) {
    notFound();
  }

  return (
    <div className="flex flex-col w-full gap-4 container">
      <div className="flex w-full justify-between">
        <Link href={API_PERFIS}>
          <Button variant={"ghost"} className="gap-2">
            <IconChevronLeft />
            Voltar
          </Button>
        </Link>
        <Button
          form="upatePerfilForm"
          type="submit"
          className=" btn-primary text-white px-8"
        >
          Salvar
        </Button>
      </div>
      <UpdatePerfilForm perfil={perfil} />
    </div>
  );

}
