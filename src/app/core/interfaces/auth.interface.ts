export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: string;
}

export interface User {
  id: number;
  email: string;
  username: string;
  career: number;
  credits: number;
}

export interface UserPayload {
  id: number;
  email: string;
  career: number;
  credits: number;
  roles: string[];
  sub: string;
  iat: number;
}
