import { getBaseUrl } from "@/utils/api";
import axios, { CreateAxiosDefaults } from "axios";
export function createApiClient() {
  const axiosConfig: CreateAxiosDefaults = { baseURL: getBaseUrl() };
  const axiosClient = axios.create(axiosConfig);
  return axiosClient;
}
