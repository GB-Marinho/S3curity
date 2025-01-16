"use client";
import { useUsersStore } from "@/hooks/store/userStore";
import { Perfil, Usuario } from "@/types/Entities";
import { z } from "zod";
import { UpdateUserFormSchema } from "./updateUserformSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePerfilStore } from "@/hooks/store/perfisStore";
import { toast } from "sonner";
import { useEffect } from "react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { IconMail, IconSignature } from "@tabler/icons-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { pegarIniciais } from "@/lib";
import { Checkbox } from "@/components/ui/checkbox";
import { revalidateRoute } from "@/lib/actions/revalidade";
import { PhoneInput } from "@/components/ui/phone-input";
import { Switch } from "@/components/ui/switch";

interface UpdateUserFormProps {
    user: Usuario;
}

export default function UpdateUserForm({
    user,
}: UpdateUserFormProps) {
    const { updateUser, UpdateUserPerfil } = useUsersStore();
    const { perfis, findPerfis } = usePerfilStore();

    const form = useForm<z.infer<typeof UpdateUserFormSchema>>({
        resolver: zodResolver(UpdateUserFormSchema),
        defaultValues: {
            ...user,
            // Adiciona o +55 no inicio do celular - Necessario apenas se o banco não tiver o +55
            celular: user.celular && !user.celular.startsWith("+55") ? `+55${user.celular}` : user.celular,
        },
    });

    
    function houveAlteracao(original: Usuario, atual: Usuario) {
        return (
            JSON.stringify({ ...original, perfis: undefined }) !==
            JSON.stringify({ ...atual, perfis: undefined })
        );
    }

    async function onSubmit(data: z.infer<typeof UpdateUserFormSchema>) {
        if (houveAlteracao(user, data)) {
            await updateUser(data);
        }
        await UpdateUserPerfil(
            data.id,
            data.perfis.map((perfil) => perfil.id)
        );
        const { error } = useUsersStore.getState();
        if (error) {
            toast.error(error);
        } else {
            toast.success("Usuário Editado com Sucesso!");
        }
        await revalidateRoute(`/manage/${user.id}`);
    }

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = () => {
                const base64 = reader.result as string;
                form.setValue("urlPerfil", base64);
                console.log(base64);
            };

            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        console.log(user);
        findPerfis();
    }, []);

    return (
        <Form {...form}>
            <form
                id="updateUserForm"
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-6 py-4"
            >
                <Card className="mx-auto py-2 px-4 sm:px-16 bg-[#09090b] border-none text-white w-full">
                    <div className="flex flex-col lg:flex-row lg:gap-16 gap-6 py-4">
                        <div className="flex flex-col py-4 2xl:px-16 gap-7">
                            <FormField
                                control={form.control}
                                name="urlPerfil"
                                render={() => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="flex flex-grow justify-center relative group">
                                                <label htmlFor="fileInput" className="cursor-pointer">
                                                    <Avatar className="size-40 2xl:size-52 group-hover:opacity-75 transition-opacity">
                                                        <AvatarImage
                                                            src={form.watch("urlPerfil") || undefined}
                                                            alt={form.watch("nome")}
                                                            className=" object-cover"
                                                        />
                                                        <AvatarFallback className="flex items-center justify-center bg-zinc-800">
                                                            <span className="text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-l from-red-500 via-red-700 to-red-900">
                                                                {pegarIniciais(form.watch("nome"))}
                                                            </span>
                                                        </AvatarFallback>
                                                    </Avatar>
                                                </label>
                                                <Input
                                                    id="fileInput"
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleFileChange}
                                                    className="hidden"
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex flex-col flex-grow gap-4">
                            <FormField
                                control={form.control}
                                name="nome"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-xl">Nome</FormLabel>
                                        <FormControl>
                                            <div className="bg-black rounded-lg relative flex items-center">
                                                <Input
                                                    className="bg-transparent pl-11 flex-1 peer h-12"
                                                    {...field}
                                                />
                                                <IconSignature className="absolute left-3 text-zinc-600 peer-focus:text-zinc-300 pointer-events-none" />
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
                                                    className="bg-transparent pl-11 flex-1 peer h-12"
                                                    {...field}
                                                />
                                                <IconMail className="absolute left-3 text-zinc-600 peer-focus:text-zinc-300 pointer-events-none" />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="celular"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-xl">Celular</FormLabel>
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
                            <FormField
                                control={form.control}
                                name="perfis"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-xl">Perfils</FormLabel>
                                        <FormControl>
                                            <div className="flex flex-wrap gap-2 bg-black p-4 justify-center">
                                                {perfis.length === 0 && (
                                                    <p className="text-zinc-400 text-sm">
                                                        Sem perfis disponiveis.
                                                    </p>
                                                )}
                                                {perfis
                                                    .sort((a, b) => a.nome.localeCompare(b.nome))
                                                    .map((perfil) => (
                                                        <div
                                                            key={perfil.id}
                                                            className="flex items-center gap-2 bg-zinc-800 p-2 rounded-md transition-transform  active:scale-95"
                                                        >
                                                            <Checkbox
                                                                id={perfil.id}
                                                                checked={field.value?.some(
                                                                    (p: Perfil) => p.id === perfil.id
                                                                )}
                                                                onCheckedChange={(checked) => {
                                                                    if (checked) {
                                                                        const newValue = [
                                                                            ...(field.value || []),
                                                                            perfil,
                                                                        ];
                                                                        field.onChange(newValue);
                                                                    } else {
                                                                        const newValue = field.value?.filter(
                                                                            (p: Perfil) => p.id !== perfil.id
                                                                        );
                                                                        field.onChange(newValue);
                                                                    }
                                                                }}
                                                                className="w-5 h-5 cursor-default"
                                                            />
                                                            <label htmlFor={perfil.id} className="text-white">
                                                                {perfil.nome}
                                                            </label>
                                                        </div>
                                                    ))}
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                </Card>

            </form>
        </Form>
    );
}
