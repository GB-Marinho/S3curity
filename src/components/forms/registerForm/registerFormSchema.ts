import { z } from "zod";
import { isValidPhoneNumber} from "react-phone-number-input"

export const registerFormSchema = z.object({

    name: z.string().min(2, { message: "O nome precisa ter mais que 2 caracteres" }).max(150, { message: "O nome não pode ter mais que 150 caracteres" }).regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, { message: "O nome só pode conter letras" }),
    email: z.string().email({ message: "E-mail inválido" }),
    password: z.string().min(6, {
        message: "A senha deve ter no mínimo 6 caracteres",
    }).max(20, {
        message: "A senha deve ter no máximo 20 caracteres",
    }).regex(/[0-9]/, { message: "A senha deve conter ao menos um número" }).regex(/[A-Z]/, { message: "A senha deve conter ao menos uma letra maiúscula" }).regex(/[a-z]/, { message: "A senha deve conter ao menos uma letra minúscula" }).regex(/[!@#$%^&*(),.?":{}|<>]/, { message: "A senha deve conter ao menos um caractere especial" }),
    passwordConfirm: z.string(),
    telephone: z.string().refine(isValidPhoneNumber, {message: "Numero de telefone invalido."})
    // telephone: z.string().min(9, {message: "Telefone deve ter 8 ou mais números"}).max(15, {message: "Telefone deve ter 11 ou menos números"}).refine(isValidPhoneNumber)
}).refine(({ password, passwordConfirm }) => password === passwordConfirm, { message: "As senhas devem ser iguais", path: ['passwordConfirm'] })