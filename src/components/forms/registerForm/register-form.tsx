"use client";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  IconEye,
  IconEyeOff,
  IconLock,
  IconMail,
  IconSignature,
} from "@tabler/icons-react";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { registerFormSchema } from "./registerFormSchema";
import CardLogin from "@/components/ui/cardLogin";

export function RegisterForm() {
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      telephone: "",
    },
  });

  const [mostrarSenha, setMostrarSenha] = useState(false);

  const handlerMostrarSenha = () => {
    setMostrarSenha(!mostrarSenha);
  };

  function onSubmit(data: z.infer<typeof registerFormSchema>) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(data);
        resolve(null);
      }, 3000);
    });
  }

  return (
    <CardLogin>
      <CardHeader>
        <div className="w-full flex flex-col justify-center items-center gap-8">
          <CardTitle className="text-2xl">Cadastrar</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="px-[68px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="name"
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
              name="password"
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
                          onMouseDown={(e) => {
                            e.preventDefault();
                            handlerMostrarSenha();
                          }}
                          className="absolute right-3 text-zinc-600 hover:text-zinc-300"
                        />
                      ) : (
                        <IconEye
                          onMouseDown={(e) => {
                            e.preventDefault();
                            handlerMostrarSenha();
                          }}
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
              name="passwordConfirm"
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
              name="telephone"
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
            <div className="my-6">
              <Button
                type="submit"
                className="w-full btn-primary text-white py-6 text-xl"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Cadastrando...
                  </>
                ) : (
                  "Cadastre-se"
                )}
              </Button>
            </div>
          </form>
        </Form>
        <div className=" text-center text-sm">
          <span>
            Já possui conta?{" "}
            <Link href="/accounts/login" className="text-green-500">
              Faça Login
            </Link>
          </span>
          <br />
        </div>
      </CardContent>
    </CardLogin>
  );
}