"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Logo from "@/assets/img/logo.png";
import Logotipo from "@/assets/img/logotipo.png";
import {
    IconMail,
    IconEye,
    IconBrandGoogleFilled,
    IconEyeOff,
} from "@tabler/icons-react";
import { useState } from "react";
import { loginFormSchema } from "./loginFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form";

export function LoginForm() {

    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
         defaultValues: {
           email: "",
           password: "",
         },
    })

    // const teste = form.getValues("email");
    // console.log(teste)

    const [mostrarSenha, setMostrarSenha] = useState(false);

    const handlerMostrarSenha = () => {
        setMostrarSenha(!mostrarSenha);
    };

    function onSubmit(data: z.infer<typeof loginFormSchema>) {
        console.log(data);
    }

    return (
        <>
            <Card className="mx-auto bg-[#18181B] border-none text-white w-[631px]">
                <CardHeader>
                    <div className="w-full flex flex-col justify-center items-center gap-8">
                        <div className="flex flex-col gap-3">
                            <Image src={Logo} alt="Logo" width={90} />
                            <Image src={Logotipo} alt="Logotipo" width={90} />
                        </div>
                        <CardTitle className="text-2xl">Entre com sua conta</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="px-[68px]">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-xl">E-mail</FormLabel>
                                        <FormControl>
                                            <div className="bg-black rounded-lg relative flex items-center">
                                                <Input
                                                    className="bg-transparent pr-12 flex-1 peer h-12"
                                                    {...field}
                                                />
                                                <IconMail className="absolute right-3 text-zinc-600 peer-focus:text-zinc-300 pointer-events-none" />
                                            </div>
                                            {/* <Input placeholder="shadcn" {...field} /> */}
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
                                                />
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
                                            {/* <Input placeholder="shadcn" {...field} /> */}
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full btn-primary">
                                Login
                            </Button>
                        </form>
                    </Form>
                    <div className="grid gap-4">
                        {/* <div className="grid gap-2">
                            <Label htmlFor="email" className="text-xl font-light">Email</Label>
                            <div className="bg-black rounded-lg relative flex items-center">
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    className="bg-transparent pr-12 flex-1 peer h-12"
                                />
                                <IconMail className="absolute right-3 text-zinc-600 peer-focus:text-zinc-300 pointer-events-none" />
                            </div>
                        </div> */}
                        <div className="grid gap-2">
                            {/* <div className="flex items-center">
                                <Label htmlFor="password" className="text-xl">Senha</Label>
                            </div>
                            <div className="bg-black rounded-lg relative flex items-center">
                                <Input
                                    id="password"
                                    type={mostrarSenha ? "text" : "password"}
                                    required
                                    className="bg-transparent pr-12 flex-1 h-12"
                                />
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
                            </div> */}
                            <Link
                                href="#"
                                className="ml-auto inline-block text-sm text-zinc-500"
                            >
                                Esqueceu a senha?
                            </Link>
                        </div>

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
                            <Button
                                variant="outline"
                                className="flex w-[50px] h-[50px] bg-red-600 border-none rounded-full"
                            >
                                <IconBrandGoogleFilled
                                    style={{ width: "24px", height: "24px" }}
                                />
                            </Button>
                        </div>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        <span>
                            Ainda não possui conta?{" "}
                            <Link href="/accounts/register" className="underline text-green-500">
                                Cadastre-se aqui
                            </Link>
                        </span>
                        <br />
                        <span className="text-zinc-500 text-xs">
                            ou faça login pelo Google clicando no G acima.
                        </span>
                    </div>
                </CardContent>
            </Card>
        </>
    );
}
