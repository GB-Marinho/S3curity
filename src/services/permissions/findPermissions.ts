import { API_PERMISSIONS } from "@/lib";
import { axiosApiClientSide } from "../config";
import { Permissao } from "@/types/Entities";


export async function findPermissions() {
    const axiosApi = axiosApiClientSide()
    return await axiosApi.get<Permissao[]>(API_PERMISSIONS)
}