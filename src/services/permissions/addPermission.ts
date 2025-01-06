import { ErrorResponse } from "@/types"
import { axiosApiClientSide } from "../config"
import { API_PERMISSIONS } from "@/lib"

export async function addPermission(
    name: string,
    description: string,
) {
    const data = {name, description}
    const axiosApi = axiosApiClientSide()
    return await axiosApi.post<void | ErrorResponse>(API_PERMISSIONS, data)
}