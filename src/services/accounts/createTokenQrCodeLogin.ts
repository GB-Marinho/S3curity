import { API_AUTH_QRCODE_LOGIN } from "@/lib";
import { axiosApiClientSide } from "../config";

export interface CreateTokenQrCodeLoginResponse {
  token: string;
}

export async function createTokenQrCodeLogin(email: string) {
  const data = { email };
  const axiosApi = axiosApiClientSide(); // TODO: falta obter o tokenId para passar no Authorization
  return await axiosApi.post<CreateTokenQrCodeLoginResponse>(
    API_AUTH_QRCODE_LOGIN,
    data
  );
}
