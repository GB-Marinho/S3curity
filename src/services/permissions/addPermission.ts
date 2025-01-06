import { ErrorResponse } from "@/types";
import { axiosApiClientSide } from "../config";
import { API_PERMISSIONS } from "@/lib";

export async function addPermission(name: string, description: string) {
  const data = { name, description };
  const axiosApi = axiosApiClientSide();

  try {
    const response = await axiosApi.post<void | ErrorResponse>(
      API_PERMISSIONS,
      data
    );

    if (response.status >= 200 && response.status < 300) {
      return response.data;
    }
    if (response.data?.message) {
      throw new Error(response.data.message);
    }

    throw new Error("Erro ao criar permissão");
  } catch (error: any) {
    if (error.response) {
      if (error.response.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error("Erro ao processar resposta da API");
    } else if (error.request) {
      throw new Error(
        "Erro de rede. Não foi possível se comunicar com o servidor."
      );
    } else {
      throw new Error(error.message || "Erro desconhecido");
    }
  }
}
