import { API_AUTH_LOGIN_OTP_VALIDATION } from "@/lib";
import { ErrorResponse } from "@/types";
import { axiosApiClientSide } from "../config";
import { LoginResponse } from "./login";

export async function otpValidation(email: string, otpCode: string) {
  const data = { email, otpCode };
  const axiosApi = axiosApiClientSide();
  return await axiosApi.post<LoginResponse | ErrorResponse>(
    API_AUTH_LOGIN_OTP_VALIDATION,
    data
  );
}
