"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PermissionsFormSchema } from "./PermissionsFormSchema";
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
import ButtonSubmit from "@/components/ui/custom/buttons/buttonSubmit";
import ButtonCloseModal from "@/components/ui/custom/buttons/buttonCloseModal";
import { useCallback, useEffect } from "react";
import CardModal from "@/components/ui/custom/cards/cardModal";
import { usePermissionsStore } from "@/hooks/store/permissionsStore";
import { toast } from "sonner";
import { findPermissionID, updatePermission } from "@/services";

interface PermissionsFormProps {
  onClose?: () => void;
  id?: string;
}

export default function PermissionsForm({
  onClose,
  id,
}: PermissionsFormProps) {
  const { addPermission } = usePermissionsStore();

  const form = useForm<z.infer<typeof PermissionsFormSchema>>({
    resolver: zodResolver(PermissionsFormSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

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

  useEffect(() => {
    if (id) {
      const buscarPermissao = async () => {
        const permisao = await findPermissionID(id);
        if (permisao) {
          form.reset({
            name: permisao.name,
            description: permisao.description,
          });
        } else {
          const { error } = usePermissionsStore.getState();
          if (error) {
            toast.error(error);
          }
        }
      };
      buscarPermissao();
    }
  }, [id, findPermissionID, form]);

  async function onSubmit(data: z.infer<typeof PermissionsFormSchema>) {
    if (id) {
      // Editar
      await updatePermission({ id, ...data });
      const { error } = usePermissionsStore.getState();
      if (error) {
        toast.error(error);
      } else {
        toast.success("Permissão atualizada com Sucesso!");
        handlerModal();
      }
    } else {
      // Criar
      await addPermission(data);
      const { error } = usePermissionsStore.getState();
      if (error) {
        toast.error(error);
      } else {
        toast.success("Permissão criada com Sucesso!");
        handlerModal();
      }
    }
  }

  return (
    <CardModal title={`${id? "Editar": "Criar"} Permissão`}>
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
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl">Descrição</FormLabel>
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
            </div>
            <div className="flex justify-center w-full gap-7">
              <ButtonSubmit isSubmitting={form.formState.isSubmitting} />
              <ButtonCloseModal resetForm={resetForm} />
            </div>
          </form>
        </Form>
      </div>
    </CardModal>
  );
}
