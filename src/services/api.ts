import axios, { InternalAxiosRequestConfig } from "axios";
import { getDecryptedToken } from "../utils/token";

const BASE_URL = "https://frosiatech_itcAlAX.jeyad360.com/organization/v1/d/";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getDecryptedToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
