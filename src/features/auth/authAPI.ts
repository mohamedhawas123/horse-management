import { LoginCredentials, LoginResponse } from "../../models/login";
import api from "../../services/api";


// Login API call
export const login = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("login", credentials);
  return response.data;
};
