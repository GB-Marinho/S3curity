import { API_AUTH_USER_REGISTER } from "@/lib";
import { ErrorResponse } from "@/types";
import { axiosApiClientSide } from "../config";

export async function register(
  name: string,
  email: string,
  password: string,
  passwordConfirm: string,
  telephone: string
) {
  const data = { name, email, password, passwordConfirm, telephone };
  const axiosApi = axiosApiClientSide();
  return await axiosApi.post<void | ErrorResponse>(
    API_AUTH_USER_REGISTER,
    data
  );
}
