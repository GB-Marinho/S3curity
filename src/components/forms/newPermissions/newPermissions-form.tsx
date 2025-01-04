"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { newPermissionsFormSchema } from "./newPermissionsFormSchema";
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
import { useCallback, useState } from "react";
import ConfirmationDialog from "@/components/ui/custom/confirmationDialog";
import useConfirmDialog from "@/hooks/useConfirmDialog";
import CardModal from "@/components/ui/custom/cards/cardModal";

interface NewPermissionsFormProps {
  onClose?: () => void;
}

export default function NewPermissionsForm({
  onClose,
}: NewPermissionsFormProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { showDialog, handleConfirm, handleCancel } = useConfirmDialog();

  const form = useForm<z.infer<typeof newPermissionsFormSchema>>({
    resolver: zodResolver(newPermissionsFormSchema),
    defaultValues: {
      nome: "",
      descricao: "",
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

  async function onSubmit(data: z.infer<typeof newPermissionsFormSchema>) {
    if (!data.descricao) {
      const confimacao = await showDialog(setIsDialogOpen);
      if (!confimacao) return;
    }
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log("Dados salvos:", data);
    handlerModal();
  }

  return (
    <CardModal title="Criar Permissão">
      <div className="w-full max-w-[702px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6 py-4"
          >
            <div className="flex flex-col gap-6 pt-5 pb-11">
              <FormField
                control={form.control}
                name="nome"
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
                name="descricao"
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

      <ConfirmationDialog
        open={isDialogOpen}
        onClose={() => handleCancel(setIsDialogOpen)}
        onConfirm={() => handleConfirm(setIsDialogOpen)}
        title="Salvar sem descrição?"
        description="Você está prestes a salvar sem fornecer uma descrição. Deseja continuar?"
      />
    </CardModal>
  );
}
