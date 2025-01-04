import { z } from "zod";

export const newPermissionsFormSchema = z.object({
    nome: z.string().min(2, { message: "O nome precisa ter mais que 2 caracteres" })
    .max(150, { message: "O nome não pode ter mais que 150 caracteres" })
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ]+$/, {
      message: "O nome deve ser uma palavra unica, contendo apenas letras",
    }),

    descricao: z.string().max(150, { message: "A descrição não pode ter mais que 150 caracteres" })
})