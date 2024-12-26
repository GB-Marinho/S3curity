import { API_BASE_URL_USE_CLIENT, API_BASE_URL_USE_SERVER } from "@/lib";
import axios from "axios";

export const axiosApi = axios.create({
  baseURL: API_BASE_URL_USE_SERVER,
  validateStatus: () => true,
});

export const axiosClientApi = axios.create({
  baseURL: API_BASE_URL_USE_CLIENT,
  validateStatus: () => true,
});
