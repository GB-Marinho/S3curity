"use client";
import { Permissao } from "@/types/Entities";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { ColumnDef } from "@tanstack/react-table";

export function columns(handleCancel: (id:string) => void) {
  
  const data: ColumnDef<Permissao>[] = [
    {
      accessorKey: "nome",
      header: "Nome",
    },
    {
      accessorKey: "descricao",
      header: "Descrição",
    },
    {
      id: "acoes",
      header: "Ações",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <button
            className="text-blue-500 hover:underline"
            onClick={() => alert(`Editando ID: ${row.original.id}`)}
          >
            <IconEdit/>
          </button>
          <button
            className="text-red-500 hover:underline"
            onClick={() => handleCancel(row.original.id)}
          >
            <IconTrash/>
          </button>
        </div>
      ),
    },
  ]
  return data
} 
