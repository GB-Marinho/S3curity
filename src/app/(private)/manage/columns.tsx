"use client";

import { Usuario } from "@/types/Entities";
import { ColumnDef } from "@tanstack/react-table";
import { IconThumbUp, IconThumbDown, IconEdit, IconTrash } from "@tabler/icons-react";
import ModalTrigger from "@/components/ui/custom/buttons/modalTrigger";
import UsersForm from "@/components/forms/users/users-form";

export function columns(handleCancel: (id: string) => void): ColumnDef<Usuario>[] {
    return [
        {
            accessorKey: "nome",
            header: "Nome",
        },
        {
            accessorKey: "email",
            header: "Email",
        },
        {
            accessorKey: "ativo",
            header: "Ativo",
            cell: ({ row }) => {
                const isActive = row.getValue<boolean>("ativo");
                return (
                    <div>
                        {isActive ? <IconThumbUp /> : <IconThumbDown />}
                    </div>
                );
            },
        },
        {
            id: "acoes",
            header: "Ações",
            cell: ({ row }) => (
                <div className="flex gap-2">
                    <ModalTrigger
                        trigger={
                            <button className="text-blue-500 hover:underline">
                                <IconEdit />
                            </button>
                        }
                    >
                        <UsersForm id={row.original.id} />
                    </ModalTrigger>

                    <button
                        className="text-red-500 hover:underline"
                        onClick={() => handleCancel(row.original.id)}
                    >
                        <IconTrash />
                    </button>
                </div>
            ),
        },
    ];
}