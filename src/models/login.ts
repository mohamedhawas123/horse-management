export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  data: {
    token: string;
  };
}

export interface AuthState {
  token: string | null;
  loading: boolean;
  error: string | null;
}
