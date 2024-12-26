import { API_AUTH_LOGIN } from "@/lib";
import { ErrorResponse } from "@/types";
import { axiosApi } from "../config";

export interface LoginResponse {
  tokenId: string;
  token: string;
}

export async function login(email: string, password: string) {
  const data = { email, password };
  return await axiosApi.post<LoginResponse | ErrorResponse>(
    API_AUTH_LOGIN,
    data
  );
}
