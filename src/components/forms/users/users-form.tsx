"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { UsersFormSchema } from "./usersFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useUsersStore } from "@/hooks/store/userStore";
import { toast } from "sonner";
import { findUserID } from "@/services";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import CardModal from "@/components/ui/custom/cards/cardModal";
import ButtonSubmit from "@/components/ui/custom/buttons/buttonSubmit";
import ButtonCloseModal from "@/components/ui/custom/buttons/buttonCloseModal";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";

interface usersFormSchemaProps {
    onClose?: () => void;
    id?: string;
}

export default function UsersForm({ onClose, id }: usersFormSchemaProps) {
    const { addUser, isLoading, updateUser } = useUsersStore();

    const form = useForm<z.infer<typeof UsersFormSchema>>({
        resolver: zodResolver(UsersFormSchema),
        defaultValues: async () => {
            if (!id) return { nome: "", email: "", senha: "", senhaConfirmacao: "", telefone: "" };
            try {
                const user = await findUserID(id);
                console.log(user)
                return { nome: user.nome, email: user.email, senha: user.senha, senhaConfirmacao: user.senhaConfirmacao, telefone: user.telefone };
            } catch (error: any) {
                toast.error(error.message);
                return { nome: "", email: "", senha: "", senhaConfirmacao: "", telefone: "" };
            }
        },
    })

    const resetForm = useCallback(() => {
        form.reset();
        form.clearErrors();
        handlerModal();
    }, []);

    function handlerModal() {
        if (onClose) {
            onClose();
        }
    }


    async function onSubmit(data: z.infer<typeof UsersFormSchema>) {
        if (id) {
            await updateUser({ id, ...data });
            const { error } = useUsersStore.getState();
            console.log("xxxxxxxx Passou aqui")
            if (error) {
                toast.error(error);
            } else {
                toast.success("Usuário atualizado com sucesso!");
                handlerModal();
            }
        } else {
            await addUser(data);
            toast("Usuário criado com sucesso!");
        }
        resetForm();
    }

    return (
        <CardModal title={`${id ? "Editar" : "Criar"} Usuário`}>
            <div className="w-full max-w-[702px]">
                {isLoading ? (
                    <div className="flex justify-center items-center py-20">
                        <span className="loader" /> {/* Um spinner simples */}
                    </div>
                ) : (
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="flex flex-col gap-6 py-4"
                        >
                            <div className="flex flex-col gap-6 pt-5 pb-11">
                                <FormField
                                    control={form.control}
                                    name="nome"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-xl">Nome</FormLabel>
                                            <FormControl>
                                                <div className="bg-black rounded-lg relative flex items-center">
                                                    <Input
                                                        className="bg-transparent  flex-1 peer h-12"
                                                        {...field}
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-xl">E-mail</FormLabel>
                                            <FormControl>
                                                <div className="bg-black rounded-lg relative flex items-center">
                                                    <Input
                                                        className="bg-transparent  flex-1 peer h-12"
                                                        {...field}
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="senha"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-xl">Senha</FormLabel>
                                            <FormControl>
                                                <div className="bg-black rounded-lg relative flex items-center">
                                                    <Input
                                                        className="bg-transparent  flex-1 peer h-12"
                                                        {...field}
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="senhaConfirmacao"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-xl">Confirmação de Senha</FormLabel>
                                            <FormControl>
                                                <div className="bg-black rounded-lg relative flex items-center">
                                                    <Input
                                                        className="bg-transparent  flex-1 peer h-12"
                                                        {...field}
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="telefone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-xl">Telefone</FormLabel>
                                            <FormControl>
                                                <PhoneInput
                                                    numberInputProps={{ className: "bg-black" }}
                                                    defaultCountry="BR"
                                                    international={false}
                                                    placeholder="Digite o numero de telefone"
                                                    maxLength={15}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex justify-center w-full gap-7">
                                <ButtonSubmit isSubmitting={form.formState.isSubmitting} />
                                <ButtonCloseModal resetForm={resetForm} />
                            </div>
                        </form>
                    </Form>
                )}
            </div>
        </CardModal>
    )

}