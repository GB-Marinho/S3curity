"use client"
import { DataTable } from "@/components/shared/tabela/data-table";
import BarraDePesquisa from "@/components/shared/tabela/BarraDePesquisa";
import { useUsersStore } from "@/hooks/store/userStore";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import ConfirmationDialog from "@/components/ui/custom/confirmationDialog";
import useConfirmDialog from "@/hooks/useConfirmDialog";
import { toast } from "sonner";
import NewCustomersModal from "@/components/modals/newCustomersModal";
import { useAuth } from "@/context";

export default function ManagePage() {
    const { users, findUsers, deleteUser } = useUsersStore();
    const {id} = useAuth()
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
                toast("Usuário deletado com Sucesso!")
            }
        }
    }

    useEffect(() => {
        findUsers();
    }, []);

    const sheach = (
        <BarraDePesquisa
            title="Pesquisar Usuários"
            placeholder="Procurar por nome..."
        >
            <NewCustomersModal />
        </BarraDePesquisa>
    );

    return (
        <div className="w-full h-full container">
            <DataTable
                columns={columns(handlerDelete)}
                data={users.filter((user) => user.id !== id)}
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
