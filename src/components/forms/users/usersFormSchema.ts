import { z } from "zod";

export const UsersFormSchema = z.object({
    nome: z
      .string()
      .min(2, { message: "O nome precisa ter mais que 2 caracteres" })
      .max(150, { message: "O nome não pode ter mais que 150 caracteres" })
      .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, {
        message: "O nome só pode conter letras",
      }),
    email: z.string().email({ message: "E-mail inválido" }),
})