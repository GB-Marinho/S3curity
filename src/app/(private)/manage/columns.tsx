"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
    id: string
    nome: string
    perfil: "Item 1" | "Item 2" | "Item 3" | "Item 4"
    ativo: "SIM" | "NÃO"
    horarioTrabalho: string
    diasTrabalho: string
}

export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: "nome",
        header: "Nome",
    },
    {
        accessorKey: "perfil",
        header: "Perfil",
    },
    {
        accessorKey: "ativo",
        header: "Ativo",
    },
    {
        accessorKey: "horarioTrabalho",
        header: "Horário de Trabalho",
    },
    {
        accessorKey: "diasTrabalho",
        header: "Dias de Trabalho",
    },
]