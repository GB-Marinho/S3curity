import { API_AUTH_QRCODE_LOGIN } from "@/lib";
import { axiosApiClientSide } from "../config";

export async function deleteTokenQrCodeLogin(email: string) {
  const axiosApi = axiosApiClientSide(); // TODO: falta obter o tokenId para passar no Authorization
  return await axiosApi.delete(API_AUTH_QRCODE_LOGIN, {
    params: { email },
  });
}
