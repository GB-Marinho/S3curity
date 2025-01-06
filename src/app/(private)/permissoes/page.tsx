"use client";
import React, { useEffect, useState } from "react";
import { columns } from "./columns";
import BarraDePesquisa from "@/components/shared/tabela/BarraDePesquisa";
import { DataTable } from "@/components/shared/tabela/data-table";
import NewPermissionsModal from "@/components/modals/newPermissionsModal";
import { usePermissionsStore } from "@/hooks/store/permissionsStore";
import ConfirmationDialog from "@/components/ui/custom/confirmationDialog";
import useConfirmDialog from "@/hooks/useConfirmDialog";
import { toast } from "sonner";

export default function PermissoesPage() {
  const { permissions, fetchPermissions, deletePermission } = usePermissionsStore();
  const { showDialog, handleConfirm, handleCancel } = useConfirmDialog();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handlerDelete = async (id:string) => {
    const confirm = await showDialog(setIsDeleteDialogOpen);
    if(confirm){
       await deletePermission(id)
       const {error} = usePermissionsStore.getState();
      if(error){
        toast.error(error)
        fetchPermissions()
      }else{
        toast.success("Deletado com Sucesso")
      }
    }
  }

  useEffect(() => {
    fetchPermissions();
  }, [fetchPermissions]);


  const sheach = (
    <BarraDePesquisa
      title="Pesquisar Permissões"
      placeholder="Procurar por nome..."
    >
      <NewPermissionsModal />
    </BarraDePesquisa>
  );

  return (
    <div className="w-full h-full container">
      <DataTable
        columns={columns(handlerDelete)}
        data={permissions}
        searchBar={sheach}
        searchFor="nome"
      />
      <ConfirmationDialog
        open={isDeleteDialogOpen}
        onClose={() => handleCancel(setIsDeleteDialogOpen)}
        onConfirm={() => handleConfirm(setIsDeleteDialogOpen)}
        description="Deseja realmente deletar esta Permissão? Ao confirmar, esta permissão será DELETADA permanentemente."
      />
    </div>
  );
}
