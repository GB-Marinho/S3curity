/* eslint-disable @typescript-eslint/no-explicit-any */
import { UltimoLoginReport } from "@/types";
import { axiosApiClientSide } from "../config";
import { API_REPORT_LAST_USER_LOGIN } from "@/lib";
import qs from "qs";


export async function getUltimoLogin(email: string) {
    const axiosApi = axiosApiClientSide();
  try {
    const query = qs.stringify({ email });
    const url = `${API_REPORT_LAST_USER_LOGIN}?${query}`;

    console.log(url)
    const response = await axiosApi.get<UltimoLoginReport | null>(url);

    if (response.status >= 200 && response.status < 300) {
      if (response.data) {
        return response.data;
      } else {
        throw new Error("[Report ultimo-Login] não encontrado.");
      }
    }
    throw new Error("Erro ao buscar Report");
  } catch (error: any) {
    if (error.response) {
      throw new Error(
        error.response.data?.message || "Erro ao processar resposta da API"
      );
    } else if (error.request) {
      throw new Error(
        "Erro de rede. Não foi possível se comunicar com o servidor."
      );
    } else {
      throw new Error(error.message || "Erro desconhecido");
    }
  }
}
