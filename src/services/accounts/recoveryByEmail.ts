import { API_AUTH_RECOVERY_BY_EMAIL } from "@/lib";
import { axiosApi } from "../config";

export async function recoveryByEmail(email: string, baseUrl: string) {
  const data = { email, baseUrl };
  return await axiosApi.post<void>(API_AUTH_RECOVERY_BY_EMAIL, data);
}
