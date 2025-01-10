"use client"
import { DataTable } from "@/components/shared/tabela/data-table";
import BarraDePesquisa from "@/components/shared/tabela/BarraDePesquisa";
import { useUsersStore } from "@/hooks/store/userStore";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import ConfirmationDialog from "@/components/ui/custom/confirmationDialog";
import useConfirmDialog from "@/hooks/useConfirmDialog";
import { toast } from "sonner";
import NewUserModal from "@/components/modals/newUserModal";
import { Button } from "@/components/ui/button"

export default function ManagePage() {
    const { users, findUsers, deleteUser } = useUsersStore();
    const { showDialog, handleConfirm, handleCancel } = useConfirmDialog();
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);


    const handlerDelete = async (id: string) => {
        const confirm = await showDialog(setIsDeleteDialogOpen);
        if (confirm) {
            await deleteUser(id)
            const { error } = useUsersStore.getState();
            if (error) {
                toast.error(error)
                findUsers()
            } else {
                toast("Permissão deletada com Sucesso!")
            }
        }
    }

    useEffect(() => {
        findUsers();
    }, [findUsers]);

    const sheach = (
        <BarraDePesquisa
            title="Pesquisar Usuários"
            placeholder="Procurar por nome..."
        >
            <NewUserModal />
        </BarraDePesquisa>
    );

    return (
        <div className="w-full h-full container">
            <DataTable
                columns={columns(handlerDelete)}
                data={users}
                searchBar={sheach}
                searchFor="nome"
            />
            <ConfirmationDialog
                open={isDeleteDialogOpen}
                onClose={() => handleCancel(setIsDeleteDialogOpen)}
                onConfirm={() => handleConfirm(setIsDeleteDialogOpen)}
                description="Deseja realmente deletar este usuário? Ao confirmar, este usuário será DELETADO permanentemente."
            />
        </div>
    );
}
