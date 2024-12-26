import { API_AUTH_CHANGE_PASSWORD_BY_EMAIL_TOKEN } from "@/lib";
import { axiosApi } from "../config";

export async function changePasswordByEmailToken(
  token: string,
  password: string,
  passwordConfirm: string
) {
  const data = { token, password, passwordConfirm };
  return await axiosApi.post<void>(
    API_AUTH_CHANGE_PASSWORD_BY_EMAIL_TOKEN,
    data
  );
}
