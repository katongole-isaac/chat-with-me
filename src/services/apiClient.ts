/**
 * Default Axios Settings
 *
 */

import axios from "axios";
import config from "@/config/defaults.json";
import checkTokenExpiryAndRenew from "@/helpers/checkTokenExpiry";

const _axiosInstance = axios.create({
  baseURL: config.apiEndpoint,
  headers: {
    Authorization: `Bearer `,
  },
});

_axiosInstance.interceptors.request.use(async (config) => {

  const token = (await checkTokenExpiryAndRenew()) as string;
  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

const apiClient = _axiosInstance;
export default apiClient;
