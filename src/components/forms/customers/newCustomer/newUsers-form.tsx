"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { IMaskInput } from 'react-imask';
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useUsersStore } from "@/hooks/store/userStore";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  IconEye,
  IconEyeOff,
  IconLock,
  IconMail,
  IconPhone,
  IconSignature,
} from "@tabler/icons-react";
import { MsgSuccess, PATH_PAGE_ACCOUNTS_LOGIN } from "@/lib";
import { useRouter } from "next/navigation";
import { NewUsersFormSchema } from "./newUsersFormSchema";

interface NewUsersFormProps {
  register?: boolean;
  onClose?: () => void;
}

export default function NewUsersForm({
  register = false,
  onClose,
}: NewUsersFormProps) {
  const { addUser, registerUser } = useUsersStore();
  const { push } = useRouter();

  const form = useForm<z.infer<typeof NewUsersFormSchema>>({
    resolver: zodResolver(NewUsersFormSchema),
    defaultValues: {
      nome: "",
      email: "",
      senha: "",
      senhaConfirmacao: "",
      telefone: "",
    },
  });

  function handlerModal() {
    if (onClose) {
      onClose();
    }
  }

  const resetForm = useCallback(() => {
    form.reset();
    form.clearErrors();
  }, []);

  async function onSubmit(data: z.infer<typeof NewUsersFormSchema>) {
    if (register) {
      await registerUser(data);
      toast.success(MsgSuccess.USUARIO_CADASTRADO);
      push(PATH_PAGE_ACCOUNTS_LOGIN);
    } else {
      await addUser(data);
      const { error } = useUsersStore.getState();
      if (error) {
        toast.error(error);
      } else {
        toast.success("Usuário criado com sucesso!");
        handlerModal();
        resetForm();
      }
    }
  }

  const [mostrarSenha, setMostrarSenha] = useState(false);

  const handlerMostrarSenha = useCallback(() => {
    setMostrarSenha((prev) => !prev);
  }, []);

  const handlerIconMostrarSenha = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      handlerMostrarSenha();
    },
    [handlerMostrarSenha]
  );

  return (
    <Form {...form}>
      <form
        id="newUserForm"
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
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
          name="senha"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl">Senha</FormLabel>
              <FormControl>
                <div className="bg-black rounded-lg relative flex items-center">
                  <Input
                    className="bg-transparent pl-11 pr-12 flex-1 peer h-12"
                    {...field}
                    type={mostrarSenha ? "text" : "password"}
                  />
                  <IconLock className=" absolute left-3 text-zinc-600 peer-focus:text-zinc-300" />
                  {mostrarSenha ? (
                    <IconEyeOff
                      onMouseDown={handlerIconMostrarSenha}
                      className="absolute right-3 text-zinc-600 hover:text-zinc-300"
                    />
                  ) : (
                    <IconEye
                      onMouseDown={handlerIconMostrarSenha}
                      className="absolute right-3 text-zinc-600 hover:text-zinc-300"
                    />
                  )}
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
              <FormLabel className="text-xl">Confirmar Senha</FormLabel>
              <FormControl>
                <div className="bg-black rounded-lg relative flex items-center">
                  <Input
                    className="bg-transparent pl-11 flex-1 peer h-12"
                    {...field}
                    type={mostrarSenha ? "text" : "password"}
                  />
                  <IconLock className=" absolute left-3 text-zinc-600 peer-focus:text-zinc-300" />
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
                <div className="bg-black rounded-lg relative flex items-center">
                  <IMaskInput
                    mask={[
                      "(00) 0 0000-0000",
                      "(00) 0000-0000",  
                    ]}
                    dispatch={(appended, dynamicMasked) => {
                      const value = (dynamicMasked.value + appended).replace(/\D/g, "");
                      return value.length > 10
                        ? dynamicMasked.compiledMasks[0] 
                        : dynamicMasked.compiledMasks[1]; 
                    }}
                    unmask={true}
                    value={field.value}
                    onAccept={(value) =>
                      field.onChange(value.replace(/\D/g, ""))
                    }
                    onBlur={field.onBlur}
                    className="bg-transparent pl-11 flex-1 peer h-12 flex w-full rounded-md border-none px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    placeholder="(11) 99999-9999"
                  />
                  <IconPhone className="absolute left-3 text-zinc-600 peer-focus:text-zinc-300 pointer-events-none" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
