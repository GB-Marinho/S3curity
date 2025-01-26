import { API_AUTH_LOGIN_CREATE_QRCODE } from "@/lib";
import { axiosApiClientSide } from "../config";

export interface GetTokenToCreateQrCodeResponse {
  token: string;
}

export async function getTokenToCreateQrCode(id: string) {
  const data = { id };
  const axiosApi = axiosApiClientSide(); // TODO: falta obter o tokenId para passar no Authorization
  return await axiosApi.post<GetTokenToCreateQrCodeResponse>(
    API_AUTH_LOGIN_CREATE_QRCODE,
    data
  );
}
