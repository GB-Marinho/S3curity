import { API_AUTH_VERIFY_EMAIL_TOKEN } from "@/lib";
import { axiosApi } from "../config";

export interface VerifyEmailTokenResponse {
  isValid: boolean;
}

export async function verifyEmailToken(token: string) {
  const data = { token };
  return await axiosApi.post<VerifyEmailTokenResponse>(
    API_AUTH_VERIFY_EMAIL_TOKEN,
    data
  );
}
