/* eslint-disable @typescript-eslint/no-explicit-any */
import { Permissao } from "@/types/Entities";
import { create } from "zustand";
import { addPermission, deletePermission, findPermissions } from "@/services";

interface PermissionsState {
  permissions: Permissao[];
  isLoading: boolean;
  error: string | null;

  fetchPermissions: () => Promise<void>;
  addPermission: (permission: Omit<Permissao, "id">) => Promise<void>;
  deletePermission: (id: string) => Promise<void>;
}

export const usePermissionsStore = create<PermissionsState>((set, get) => ({
  permissions: [],
  isLoading: false,
  error: null,

  fetchPermissions: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await findPermissions();
      set({ permissions: response.data, isLoading: false });
    } catch (error: any) {
      set({
        error: error.message || "Erro ao buscar permissões",
        isLoading: false,
      });
    }
  },

  addPermission: async (newPermission) => {
    set({ isLoading: true, error: null });
    try {
      const response = await addPermission(
        newPermission.nome,
        newPermission.descricao
      );
      if (response.status === 201) {
        await get().fetchPermissions();
      }
    } catch (error: any) {
      set({
        error: error.message || "Erro ao adicionar permissão",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  deletePermission: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await deletePermission(id);
      await get().fetchPermissions();
    } catch (error: any) {
      set({
        error: error.message || "Erro ao deletar permissão",
      });
    } finally {
      set({ isLoading: false });
    }
  },
}));
