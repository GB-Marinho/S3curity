import { API_AUTH_USER_REGISTER } from "@/lib";
import { ErrorResponse } from "@/types";
import { axiosApiClientSide } from "../config";

export async function register(
  nome: string,
  email: string,
  senha: string,
  senhaConfirmacao: string,
  telefone: string
) {
  const data = { nome, email, senha, senhaConfirmacao, telefone };
  const axiosApi = axiosApiClientSide();
  return await axiosApi.post<void | ErrorResponse>(
    API_AUTH_USER_REGISTER,
    data
  );
}
