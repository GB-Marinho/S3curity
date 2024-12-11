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
import { registerFormSchema } from "./registerFormSchema";
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
    })

    const [mostrarSenha, setMostrarSenha] = useState(false);

    const handlerMostrarSenha = () => {
        setMostrarSenha(!mostrarSenha);
    };

    function onSubmit(data: z.infer<typeof registerFormSchema>) {
        console.log(data);
    }

    return (
        <>
            <Card className="mx-auto bg-[#18181B] border-none text-white w-[631px]">
                <CardHeader>
                    <div className="w-full flex flex-col justify-center items-center gap-8">
                        <CardTitle className="text-2xl">Cadastrar</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="px-[68px]">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                                                <IconMail className="absolute left-3 text-zinc-600 peer-focus:text-zinc-300 pointer-events-none" />
                                            </div>
                                            {/* <Input placeholder="shadcn" {...field} /> */}
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
                            <FormField
                                control={form.control}
                                name="passwordConfirm"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-xl">Confirmar Senha</FormLabel>
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
                            <FormField
                                control={form.control}
                                name="telephone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-xl">Telefone</FormLabel>
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
                            <Button type="submit" className="w-full btn-primary">
                                Cadastre-se
                            </Button>
                        </form>
                    </Form>
                    <div className="mt-4 text-center text-sm">
                        <span>
                            Já possui conta?{" "}
                            <Link href="/accounts/login" className="underline text-green-500">
                                Faça Login
                            </Link>
                        </span>
                        <br />
                    </div>
                </CardContent>
            </Card>
        </>
    )
}