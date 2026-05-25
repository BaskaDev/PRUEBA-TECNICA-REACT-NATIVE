import axios from "axios";
import type { LoginResponse } from "../../../domain/entities/user";
import { API } from "../../../shared/constants/api";
import { apiClient } from "./client";

export async function loginUser(email: string, password: string): Promise<LoginResponse> {
  try {
    const response = await apiClient.post<LoginResponse>(
      API.LOGIN,
      { email, password },
      { timeout: 8000 },
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      throw new Error("Email o contraseña inválidos");
    }
    throw new Error("Error de conexión. Verifica tu internet e intenta de nuevo.");
  }
}
