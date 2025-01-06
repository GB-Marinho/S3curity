"use client"

import { Form, FormField, FormLabel, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { IconEye, IconEyeOff, IconLock } from "@tabler/icons-react";
import CardLogin from "@/components/ui/custom/cards/cardLogin";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { Button } from "@/components/ui/button";
import { passwordEmailRecoverySchema } from "./passwordEmailRecoverySchema";

export default function PasswordRecoveryEmailForm() {

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    const form = useForm<z.infer<typeof passwordEmailRecoverySchema>>({
        resolver: zodResolver(passwordEmailRecoverySchema),
        defaultValues: {
            password: "",
            passwordConfirm: "",
        },
    });

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
        <div className="flex h-screen w-full items-center justify-center px-4">
            <CardLogin>
                <CardHeader>
                    <div className="w-full flex flex-col justify-center items-center gap-8">
                        <CardTitle className="text-2xl">Digite sua nova senha</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="px-[68px]">
                    <Form {...form}>
                        <form onSubmit={onSubmit} className="flex flex-col gap-4">
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
                            <div className="my-6">
                                <Button
                                    type="submit"
                                    className="w-full btn-primary text-white py-6 text-xl"
                                    disabled={form.formState.isSubmitting}
                                >
                                    Redefinir Senha
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </CardLogin>
        </div>
    );
}
