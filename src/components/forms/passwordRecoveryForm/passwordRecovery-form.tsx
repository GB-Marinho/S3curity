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
import { IconMail } from "@tabler/icons-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { passwordRecoveryFormShema } from "./passwordRecoveryFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import CardLogin from "@/components/ui/cardLogin";
import { toast } from "sonner";

const BotaoEnviar = React.memo(() => (
  <Button type="submit" className="w-full btn-primary text-xl text-white py-6">
    Enviar
  </Button>
));

BotaoEnviar.displayName = "BotaoEnviar"

export function PasswordRecoveryForm() {
  const form = useForm<z.infer<typeof passwordRecoveryFormShema>>({
    resolver: zodResolver(passwordRecoveryFormShema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: z.infer<typeof passwordRecoveryFormShema>) {
    return new Promise((resolve) => {
      setTimeout(() => {
        toast.success(`Verifique o seu e-mail!`, {
          description: (
            <pre className="mt-2 p-2 bg-green-950 rounded-md">
              <code className="text-white"> 
                {JSON.stringify(data, null, 2)}
              </code>
            </pre>
          ),
        })
        resolve(null);
      }, 3000)
    })
  }

  return (
    <CardLogin>
      <CardHeader>
        <div className="w-full flex flex-col justify-center items-center gap-8">
          <CardTitle className="text-2xl">Solicitar troca de senha</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl">Email</FormLabel>
                  <FormControl>
                    <div className="bg-black rounded-lg relative flex items-center">
                      <Input
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
            <div className="my-6">
              <BotaoEnviar/>
            </div>
          </form>
        </Form>
      </CardContent>
    </CardLogin>
  );
}
