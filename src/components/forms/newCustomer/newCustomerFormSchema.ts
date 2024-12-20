import { optionSchema } from "@/components/ui/multipleSelector";
import { z } from "zod";

export const newCustomerFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "O nome precisa ter mais que 2 caracteres" })
    .max(150, { message: "O nome não pode ter mais que 150 caracteres" })
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, {
      message: "O nome só pode conter letras",
    }),

    perfis: z.
    array(optionSchema).min(1, {message: "Selecione ao menos um perfil"})
    .nonempty({message: "O perfil não pode ser vazio"}),

    diasDeTrabalho: z.
    array(optionSchema)
    .nonempty({message: "Selecione ao menos um dia de trabalho"}),

    ativo: z
    .string()

}).refine(({ ativo }) =>  ativo === "Ativo" || ativo === "Desativado", {
  message: "O valor deve ser 'Ativo' ou 'Desativado'"});
