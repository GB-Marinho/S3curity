import { Usuario } from "@/types/Entities";
import { create } from "zustand";
import {
    addUser,
    findUsers,
    updateUser,
    deleteUser
} from "@/services";

interface UsersState {
    users: Usuario[];
    isLoading: boolean;
    error: string | null;

    findUsers: () => Promise<void>;
    addUser: (user: Omit<Usuario, "id">) => Promise<void>;
    updateUser: (user: Usuario) => Promise<void>;
    deleteUser: (id: string) => Promise<void>;
}

export const useUsersStore = create<UsersState>((set, get) => ({
    users: [],
    isLoading: false,
    error: null,

    findUsers: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await findUsers();
            set({ users: response.data });
        } catch (error: any) {
            set({
                error: error.message || "Erro ao buscar usuários",
            });
        } finally {
            set({ isLoading: false });
        }
    },

    addUser: async (newUser) => {
        set({ isLoading: true, error: null });
        try {
            await addUser(newUser.nome, newUser.email, newUser.senha, newUser.senhaConfirmacao, newUser.telefone);
            await get().findUsers();
        } catch (error: any) {
            set({
                error: error.message || "Erro ao adicionar usuário",
            });
        } finally {
            set({ isLoading: false });
        }
    },

    updateUser: async (userEdit: any) => {
        set({ isLoading: true, error: null });
        try {
            await updateUser(userEdit);
            await get().findUsers();
        } catch (error: any) {
            set({
                error: error.message || "Erro ao editar permissão",
            });
        } finally {
            set({ isLoading: false });
        }
    },

    deleteUser: async (id: any) => {
        set({ isLoading: true, error: null });
        try {
            await deleteUser(id);
            await get().findUsers();
        } catch (error: any) {
            set({
                error: error.message || "Erro ao deletar usuário"
            });
        } finally {
            set({ isLoading: false })
        }
    }
}));
