import React from "react";
import { columns, PermissoesData } from "./columns";
import BarraDePesquisa from "@/components/shared/tabela/BarraDePesquisa";
import { DataTable } from "@/components/shared/tabela/data-table";


export default function PermissoesPage() {
  const data: PermissoesData[] = [
    { id: "1", nome: "Item 1", descricao: "Descrição do Item 1" },
    { id: "2", nome: "Item 2", descricao: "Descrição do Item 2" },
    { id: "3", nome: "Item 3", descricao: "Descrição do Item 3" },
  ];

  const sheach = (
    <BarraDePesquisa
      title="Pesquisar Permissões"
      placeholder="Procurar por nome..."
    ></BarraDePesquisa>
  );

  return (
    <div className="w-full h-full container">
      <DataTable columns={columns} data={data} searchBar={sheach} searchFor="nome"/>
    </div>
  );
}
