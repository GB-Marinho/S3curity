import { API_USERS } from "@/lib";
import { axiosApiClientSide } from "../config";
import { Usuario } from "@/types/Entities";

export async function findUsers() {
    const axiosApi = axiosApiClientSide()
    return await axiosApi.get<Usuario[]>(API_USERS)
}