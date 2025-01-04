"use client";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { newCustomerFormSchema } from "./newCustomerFormSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import MultipleSelector from "@/components/ui/multipleSelector";
import { OpcoesPerfil } from "@/data/temp/opcoesPerfil";
import { DIAS_DA_SEMANA_OPTION } from "@/data/constants/enums/diasDaSemana";
import { IconChevronDown } from "@tabler/icons-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CardModal from "@/components/ui/custom/cards/cardModal";
import ButtonSubmit from "@/components/ui/custom/buttons/buttonSubmit";
import ButtonCloseModal from "@/components/ui/custom/buttons/buttonCloseModal";


interface NewCustomerFormProps {
  onClose?: () => void;
}

export default function NewCustomerForm({ onClose }: NewCustomerFormProps) {
  const form = useForm<z.infer<typeof newCustomerFormSchema>>({
    resolver: zodResolver(newCustomerFormSchema),
    defaultValues: {
      name: "",
      perfis: [],
      diasDeTrabalho: [],
      ativo: "Desativado",
    },
  });

  function onSubmit(data: z.infer<typeof newCustomerFormSchema>) {
    handlerModal();
  }

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

  return (
    <CardModal title="Criar Usuário">
      <div className="w-full max-w-[702px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6 py-4"
          >
            <div className="flex flex-col gap-6 pt-5 pb-11">
              <FormField
                control={form.control}
                name="name"
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
              <div className="flex flex-col md:flex-row justify-center w-full gap-4">
                <FormField
                  control={form.control}
                  name="perfis"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl className="w-full">
                        <div className="rounded-lg relative flex items-center bg-zinc-800">
                          <MultipleSelector
                            {...field}
                            defaultOptions={OpcoesPerfil}
                            placeholder="Perfil"
                            hidePlaceholderWhenSelected
                            emptyIndicator={
                              <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                                Nenhum resultado encontrado.
                              </p>
                            }
                          />
                          {form.watch("perfis").length === 0 && (
                            <IconChevronDown className="absolute right-3 pointer-events-none h-4 w-4 opacity-50" />
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="diasDeTrabalho"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl className="w-full">
                        <div className="rounded-lg relative flex items-center bg-zinc-800">
                          <MultipleSelector
                            {...field}
                            defaultOptions={DIAS_DA_SEMANA_OPTION}
                            placeholder="Dias de Trabalho"
                            hidePlaceholderWhenSelected
                            emptyIndicator={
                              <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                                Nenhum resultado encontrado.
                              </p>
                            }
                          />
                          {form.watch("diasDeTrabalho").length === 0 && (
                            <IconChevronDown className="absolute right-3 pointer-events-none h-4 w-4 opacity-50" />
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ativo"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <div className="rounded-lg relative flex items-center bg-zinc-800">
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl className="w-full">
                            <SelectTrigger className="bg-transparent">
                              <SelectValue placeholder="Ativo" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Ativo">Ativo</SelectItem>
                            <SelectItem value="Desativado">
                              Desativado
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex justify-center w-full gap-7">
              <ButtonSubmit />
              <ButtonCloseModal resetForm={resetForm} />
            </div>
          </form>
        </Form>
      </div>
    </CardModal>
  );
}
