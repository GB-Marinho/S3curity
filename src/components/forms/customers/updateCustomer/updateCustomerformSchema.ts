import { z } from "zod";
import { UpdatePerfilFormSchema } from "../../perfil/updatePerfilForm/updatePerfilFormSchema";
import { isValidPhoneNumberCustom } from "../newCustomer/newUsersFormSchema";

export const UpdateCustomerFormSchema = z.object({
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

  securityAdmin: z.boolean().default(false),
  
  doisFatores: z.boolean().default(false),

  urlPerfil: z.string().url().optional(),

  telefone: z
    .string()
    .refine(isValidPhoneNumberCustom, { message: "Numero de telefone invalido." }).optional(),
});
