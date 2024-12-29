import { API_AUTH_CHANGE_PASSWORD_BY_EMAIL_TOKEN } from "@/lib";
import { axiosApiClientSide } from "../config";

export async function changePasswordByEmailToken(
  token: string,
  password: string,
  passwordConfirm: string
) {
  const data = { token, password, passwordConfirm };
  const axiosApi = axiosApiClientSide();
  return await axiosApi.post<void>(
    API_AUTH_CHANGE_PASSWORD_BY_EMAIL_TOKEN,
    data
  );
}
