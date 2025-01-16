import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";
import { UpdatePerfilFormSchema } from "../../perfil/updatePerfilForm/updatePerfilFormSchema";

export const UpdateUserFormSchema = z.object({
  id: z.string(),
  nome: z
    .string()
    .min(2, { message: "O nome precisa ter mais que 2 caracteres" })
    .max(150, { message: "O nome não pode ter mais que 150 caracteres" })
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, {
      message: "O nome só pode conter letras",
    }),

  email: z.string().email({ message: "E-mail inválido" }),

  ativo: z.boolean(),
  
  perfis: z.array(UpdatePerfilFormSchema),

  
  urlPerfil: z.string().url().optional(),

  celular: z
    .string()
    .refine(isValidPhoneNumber, { message: "Numero de telefone invalido." }).optional(),
});
