/* eslint-disable @typescript-eslint/no-explicit-any */
import { Permissao } from "@/types/Entities";
import { create } from "zustand";
import {
  addPermission,
  deletePermission,
  findPermissionID,
  findPermissions,
  updatePermission,
} from "@/services";

interface PermissionsState {
  permissions: Permissao[];
  isLoading: boolean;
  error: string | null;

  findPermissions: () => Promise<void>;
  findPermissionId: (id: string) => Promise<Permissao | null>;
  addPermission: (permission: Omit<Permissao, "id">) => Promise<void>;
  updatePermission: (permission: Permissao) => Promise<void>;
  deletePermission: (id: string) => Promise<void>;
}

export const usePermissionsStore = create<PermissionsState>((set, get) => ({
  permissions: [],
  isLoading: false,
  error: null,

  findPermissions: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await findPermissions();
      set({ permissions: response.data });
    } catch (error: any) {
      set({
        error: error.message || "Erro ao buscar permissões",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  findPermissionId: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await findPermissionID(id);
      if (!response) {
        throw new Error("Permissão não encontrada.");
      }
      return response;
    } catch (error: any) {
      set({
        error: error.message || "Erro ao buscar permissão",
      });
      return null;
    } finally {
      set({ isLoading: false });
    }
  },

  addPermission: async (newPermission) => {
    set({ isLoading: true, error: null });
    try {
      await addPermission(newPermission.name, newPermission.description);
      await get().findPermissions();
    } catch (error: any) {
      set({
        error: error.message || "Erro ao adicionar permissão",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  updatePermission: async (permissionEdit) => {
    set({ isLoading: true, error: null });
    try {
      await updatePermission(permissionEdit);
      await get().findPermissions();
    } catch (error: any) {
      set({
        error: error.message || "Erro ao editar permissão",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  deletePermission: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await deletePermission(id);
      await get().findPermissions();
    } catch (error: any) {
      set({
        error: error.message || "Erro ao deletar permissão",
      });
    } finally {
      set({ isLoading: false });
    }
  },
}));
