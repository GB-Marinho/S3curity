"use client";

import { IconEdit, IconTrash } from "@tabler/icons-react";
import { ColumnDef } from "@tanstack/react-table";

// Definição do tipo dos dados
export type PermissoesData = {
  id: string;
  nome: string;
  descricao: string;
};

export const columns: ColumnDef<PermissoesData>[] = [
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
          onClick={() => alert(`Excluindo ID? ${row.original.id}`)}
        >
          <IconTrash/>
        </button>
      </div>
    ),
  },
];
