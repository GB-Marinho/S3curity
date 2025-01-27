"use client";
import Logo from "@/assets/img/logo.png";
import Logotipo from "@/assets/img/logotipo.png";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CardLogin from "@/components/ui/custom/cards/cardLogin";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context";
import {
  handleError,
  PATH_PAGE_ACCOUNTS_RECOVERY,
  PATH_PAGE_ACCOUNTS_REGISTER,
} from "@/lib";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  IconBrandGoogleFilled,
  IconEye,
  IconEyeOff,
  IconMail,
} from "@tabler/icons-react";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginFormSchema } from "./loginFormSchema";

const GoogleButton = React.memo(() => (
  <Button
    variant="outline"
    className="flex w-[50px] h-[50px] bg-red-600 border-none rounded-full"
  >
    <IconBrandGoogleFilled style={{ width: "24px", height: "24px" }} />
  </Button>
));

GoogleButton.displayName = "GoogleButton";

interface LoginFormProps {
  next?: string;
}

export function LoginForm(props: LoginFormProps) {
  const { login } = useAuth();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [mostrarSenha, setMostrarSenha] = useState(false);

  const handlerMostrarSenha = useCallback(() => {
    setMostrarSenha((prev) => !prev);
  }, []);

  async function onSubmit(data: z.infer<typeof loginFormSchema>) {
    try {
      await login(data.email, data.password, false, props.next);
    } catch (error) {
      handleError(error);
    }
  }

  const LinkEsqueceuSenha = useMemo(
    () => (
      <Link
        href={PATH_PAGE_ACCOUNTS_RECOVERY}
        className="ml-auto inline-block text-sm text-zinc-500 hover:text-zinc-200"
      >
        Esqueceu a senha?
      </Link>
    ),
    []
  );

  const LinkCadastro = useMemo(
    () => (
      <Link
        href={PATH_PAGE_ACCOUNTS_REGISTER}
        className="underline text-green-500"
      >
        Cadastre-se aqui
      </Link>
    ),
    []
  );

  const handlerIconMostrarSenha = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      handlerMostrarSenha();
    },
    [handlerMostrarSenha]
  );

  return (
    <CardLogin>
      <CardHeader>
        <div className="w-full flex flex-col justify-center items-center gap-8">
          <div className="flex flex-col gap-3">
            <Image src={Logo} alt="Logo" width={90} />
            <Image src={Logotipo} alt="Logotipo" width={90} />
          </div>
          <CardTitle className="text-2xl">Entre com sua conta</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl">E-mail</FormLabel>
                  <FormControl>
                    <div className="bg-black rounded-lg relative flex items-center">
                      <Input
                        autoFocus
                        autoCapitalize="none"
                        autoComplete="email"
                        inputMode="email"
                        className="bg-transparent pr-12 flex-1 peer h-12"
                        {...field}
                      />
                      <IconMail className="absolute right-3 text-zinc-600 peer-focus:text-zinc-300 pointer-events-none" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl">Senha</FormLabel>
                  <FormControl>
                    <div className="bg-black rounded-lg relative flex items-center">
                      <Input
                        className="bg-transparent pr-12 flex-1 peer h-12"
                        {...field}
                        type={mostrarSenha ? "text" : "password"}
                        required
                        autoComplete="current-password"
                        inputMode="text"
                      />
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
            <div className="grid">{LinkEsqueceuSenha}</div>
            <Button
              type="submit"
              className="w-full btn-primary text-white text-xl py-6"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </Form>
        <div className="grid gap-4">
          <div className="flex items-center">
            <div className="flex-grow">
              <hr className="border-t border-zinc-800" />
            </div>
            <span className="px-2 text-zinc-500">ou</span>
            <div className="flex-grow">
              <hr className="border-t border-zinc-800" />
            </div>
          </div>
          <div className="w-full flex flex-col justify-center items-center">
            <GoogleButton />
          </div>
        </div>
        <div className=" text-center text-sm">
          <span>Ainda não possui conta? {LinkCadastro}</span>
          <br />
          <span className="text-zinc-500 text-xs">
            ou faça login pelo Google clicando no G acima.
          </span>
        </div>
      </CardContent>
    </CardLogin>
  );
}
